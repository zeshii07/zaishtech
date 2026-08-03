import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

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
  // Debug: Check if directory exists
  console.log('📁 Blog directory path:', postsDirectory);
  console.log('📁 Directory exists:', fs.existsSync(postsDirectory));

  if (!fs.existsSync(postsDirectory)) {
    console.log('❌ Blog directory does NOT exist! Create it at:', postsDirectory);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  console.log('📄 Files found:', fileNames);

  const allPosts = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const post = getPostBySlug(slug);
      console.log(`📝 Post: ${slug} — published: ${post?.published}`);
      return post;
    })
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  console.log('✅ Total published posts:', allPosts.length);

  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    console.log('❌ File not found:', fullPath);
    return null;
  }

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
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''));
}
