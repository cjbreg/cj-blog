declare module 'virtual:blog-posts' {
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
  
    export const posts: Post[];
  }