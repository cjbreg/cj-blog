import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { markdownPostsPlugin } from './src/plugins/markdown-posts';

export default defineConfig({
  plugins: [
    react(),
    markdownPostsPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: 'posts/*/*.{jpg,jpeg,png,gif,webp,svg}',
          dest: 'posts',
          rename: (fileName, fileExtension, fullPath) => {
            // Preserve folder structure: posts/slug/image.png -> posts/slug/image.png
            const parts = fullPath.split('/');
            const slug = parts[parts.length - 2];
            return `${slug}/${fileName}`;
          },
        },
      ],
    }),
  ],
  base: '/', // Will change to repo name for GitHub Pages later
});