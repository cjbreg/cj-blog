import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
}

const POSTS_DIR = 'posts';
const VIRTUAL_MODULE_ID = 'virtual:blog-posts';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

function getPostFolders(): string[] {
  const postsPath = path.resolve(process.cwd(), POSTS_DIR);
  if (!fs.existsSync(postsPath)) return [];
  
  return fs.readdirSync(postsPath).filter((name) => {
    const fullPath = path.join(postsPath, name);
    return fs.statSync(fullPath).isDirectory();
  });
}

function parsePost(slug: string, basePath: string): Post | null {
  const mdPath = path.join(basePath, slug, 'index.md');
  if (!fs.existsSync(mdPath)) return null;

  const fileContent = fs.readFileSync(mdPath, 'utf-8');
  const { data, content } = matter(fileContent);

  // Transform relative image paths to absolute asset paths
  const transformedContent = content.replace(
    /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
    (_, alt, imgPath) => `![${alt}](/posts/${slug}/${imgPath})`
  );

  const html = marked(transformedContent) as string;

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    summary: data.summary,
    tags: data.tags,
    content: html,
  };
}

export function markdownPostsPlugin(): Plugin {
  const postsPath = path.resolve(process.cwd(), POSTS_DIR);

  return {
    name: 'markdown-posts',

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const slugs = getPostFolders();
        const posts = slugs
          .map((slug) => parsePost(slug, postsPath))
          .filter((p): p is Post => p !== null)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return `export const posts = ${JSON.stringify(posts)};`;
      }
    },

    configureServer(server) {
      // Watch for changes in posts directory
      server.watcher.add(path.resolve(process.cwd(), POSTS_DIR));
    },

    handleHotUpdate({ file, server }) {
      // Reload when markdown files change
      if (file.includes(POSTS_DIR) && file.endsWith('.md')) {
        const module = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
        if (module) {
          server.moduleGraph.invalidateModule(module);
          return [module];
        }
      }
    },
  };
}