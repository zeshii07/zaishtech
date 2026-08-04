import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const postExtensionPattern = /\.mdx?$/;

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  readTime: number;
  coverImage: string;
  content: string;
  published: boolean;
  metaTitle: string;
  metaDescription: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames
    .filter((name) => postExtensionPattern.test(name))
    .map((fileName) => {
      const slug = fileName.replace(postExtensionPattern, '');
      return getPostBySlug(slug);
    })
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fileName = [`${slug}.mdx`, `${slug}.md`].find((candidate) =>
    fs.existsSync(path.join(postsDirectory, candidate)),
  );

  if (!fileName) {
    return null;
  }

  const fullPath = path.join(postsDirectory, fileName);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    category: data.category || 'Software Engineering',
    tags: data.tags || [],
    author: data.author || 'Zaishtech Solutions',
    readTime: data.readTime || Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
    coverImage: data.coverImage || '',
    content,
    published: data.published !== false,
    metaTitle: data.metaTitle || '',
    metaDescription: data.metaDescription || '',
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((name) => postExtensionPattern.test(name))
    .map((name) => name.replace(postExtensionPattern, ''));
}
