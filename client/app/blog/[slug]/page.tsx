import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date, authors: [post.author], tags: post.tags },
  };
}

// Custom MDX components for beautiful rendering
const mdxComponents = {
  h2: ({ children }: any) => (
    <h2 className="text-2xl md:text-3xl font-medium tracking-tight mt-12 mb-4 pb-4 border-b border-stone-200">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl md:text-2xl font-medium tracking-tight mt-10 mb-3">{children}</h3>
  ),
  p: ({ children }: any) => (
    <p className="text-stone-600 leading-relaxed mb-6 text-[17px]">{children}</p>
  ),
  ul: ({ children }: any) => (
    <ul className="space-y-2 mb-6 ml-1">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="space-y-2 mb-6 ml-1 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }: any) => (
    <li className="text-stone-600 leading-relaxed text-[17px] flex items-start gap-2">
      <span className="text-brand-600 mt-1.5 flex-shrink-0">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3"/></svg>
      </span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }: any) => (
    <strong className="text-stone-900 font-semibold">{children}</strong>
  ),
  a: ({ href, children }: any) => (
    <a href={href} className="text-brand-600 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-600 transition-colors">{children}</a>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-brand-600 bg-brand-50 rounded-r-xl px-6 py-4 my-8 italic text-stone-700">{children}</blockquote>
  ),
  code: ({ children }: any) => (
    <code className="bg-stone-100 text-brand-700 px-2 py-0.5 rounded-md text-sm font-mono">{children}</code>
  ),
  pre: ({ children }: any) => (
    <div className="my-8 rounded-xl overflow-hidden shadow-lg">
      <div className="bg-[#1a1a2e] px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-xs text-stone-500 ml-2 font-mono">code</span>
      </div>
      <pre className="bg-[#16213e] !rounded-none !m-0 !p-6 overflow-x-auto">
        <code className="text-sm text-stone-300 font-mono leading-7">{children}</code>
      </pre>
    </div>
  ),
  table: ({ children }: any) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-stone-200 shadow-sm">
      <table className="w-full">{children}</table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-stone-50">{children}</thead>
  ),
  th: ({ children }: any) => (
    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-widest text-stone-500 border-b border-stone-200">{children}</th>
  ),
  td: ({ children }: any) => (
    <td className="px-6 py-4 text-sm text-stone-600 border-b border-stone-100">{children}</td>
  ),
  hr: () => (
    <hr className="my-12 border-stone-200" />
  ),
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Navbar />

      <article className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-stone-400 mb-10">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/blog" className="hover:text-brand-600 transition-colors">Blog</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-stone-600">{post.category}</span>
          </nav>

          {/* Category + Read Time */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{post.category}</span>
            <span className="text-sm text-stone-400">{post.readTime} min read</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.1]">{post.title}</h1>

          {/* Meta */}
          <div className="mt-8 flex items-center gap-4 pb-8 border-b border-stone-200">
            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-brand-600">{post.author?.charAt(0) || 'Z'}</span>
            </div>
            <div>
              <div className="text-sm font-medium">{post.author}</div>
              <div className="text-xs text-stone-400">{new Date(post.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mt-10 aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 shadow-lg">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Excerpt highlight */}
          <div className="mt-10 bg-stone-50 rounded-2xl p-6 border-l-4 border-brand-600">
            <p className="text-stone-700 leading-relaxed text-lg italic">{post.excerpt}</p>
          </div>

          {/* Content */}
          <div className="mt-10">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium bg-stone-100 rounded-full px-4 py-2 text-stone-600 hover:bg-brand-50 hover:text-brand-600 transition-colors">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Author Card */}
          <div className="mt-12 bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-200/50">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-semibold text-brand-600">{post.author?.charAt(0) || 'Z'}</span>
              </div>
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-sm text-stone-500 mt-1">Full-Stack Developer & AI Engineer at Zaishtech Solutions</div>
                <div className="mt-3 flex gap-3">
                  <a href="mailto:zaishtech@gmail.com" className="text-xs text-brand-600 hover:underline">Email</a>
                  <a href="https://wa.me/923019299608" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline">WhatsApp</a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-12 bg-stone-900 text-white rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <h2 className="text-2xl font-medium">Need a similar solution?</h2>
              <p className="mt-2 text-stone-400">We build custom software, AI automation, and enterprise solutions.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-brand-600 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-brand-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-600/30">Get a Free Quote</Link>
                <a href="https://wa.me/923019299608" target="_blank" rel="noopener noreferrer" className="bg-emerald-600 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-emerald-700 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 justify-center">
                  <span className="iconify" data-icon="mdi:whatsapp" data-width="18" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="mt-12 flex items-center justify-between">
            <Link href="/blog" className="text-sm font-medium text-brand-600 hover:underline flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Back to all posts
            </Link>
            <Link href="/contact" className="text-sm font-medium text-stone-400 hover:text-brand-600 transition-colors">Contact Us</Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}