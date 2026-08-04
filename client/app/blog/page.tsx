import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Software Development Insights & Tutorials',
  description: 'Technical insights, tutorials, and case studies on custom software development, AI automation, WhatsApp bots, and enterprise solutions by Zaishtech Solutions.',
};

export default function BlogPage() {
  const blogs = getAllPosts();

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="py-32 md:py-40 bg-stone-900 text-white relative overflow-hidden bg-cover bg-center" style={{backgroundImage:"linear-gradient(rgba(28,25,23,.88),rgba(28,25,23,.88)),url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1800&q=85')"}}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Blog</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-medium tracking-tight leading-[1.1]">
            Insights &<br />
            <span className="font-serif italic text-stone-400">engineering stories</span>
          </h1>
          <p className="mt-8 text-lg text-stone-400 leading-relaxed max-w-2xl mx-auto">
            Technical deep-dives, case studies, and tutorials from the Zaishtech team. Learn how we build software that scales businesses.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/contact" className="bg-brand-600 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-brand-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-600/30">Start a Project</Link>
            <a href="https://wa.me/923019299608" target="_blank" rel="noopener noreferrer" className="bg-emerald-600 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-emerald-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-emerald-600/20 flex items-center gap-2">
              <span className="iconify" data-icon="mdi:whatsapp" data-width="18" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="iconify text-stone-300" data-icon="mdi:post-outline" data-width="36" />
              </div>
              <h2 className="text-xl font-medium text-stone-400">Coming soon!</h2>
              <p className="text-sm text-stone-400 mt-2">We&apos;re writing our first posts. Check back soon.</p>
              <Link href="/contact" className="inline-block mt-6 bg-brand-600 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-700 transition-all">Contact Us</Link>
            </div>
          ) : (
            <>
              {/* Featured Post — First one large */}
              {blogs[0] && (
                <Link href={`/blog/${blogs[0].slug}`} className="group block mb-12">
                  <div className="grid lg:grid-cols-2 gap-8 bg-stone-50 rounded-2xl border border-stone-200/50 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[16/10] lg:aspect-auto bg-stone-100 overflow-hidden">
                      {blogs[0].coverImage ? (
                        <img src={blogs[0].coverImage} alt={blogs[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-brand-600/20 via-stone-100 to-blue-500/20 flex items-center justify-center">
                          <div className="text-center">
                            <span className="iconify text-brand-600/40" data-icon="mdi:lightbulb-outline" data-width="64" />
                            <p className="text-sm text-stone-400 mt-2">Featured Article</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{blogs[0].category}</span>
                        <span className="text-xs text-stone-400">{blogs[0].readTime} min read</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-medium tracking-tight group-hover:text-brand-600 transition-colors">{blogs[0].title}</h2>
                      <p className="mt-4 text-stone-500 leading-relaxed">{blogs[0].excerpt}</p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-brand-600">{blogs[0].author?.charAt(0) || 'Z'}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{blogs[0].author}</div>
                          <div className="text-xs text-stone-400">{new Date(blogs[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest of the posts — Grid */}
              {blogs.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.slice(1).map((blog) => (
                    <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group">
                      <article className="bg-white rounded-2xl border border-stone-200/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                        <div className="aspect-[16/9] overflow-hidden">
                          {blog.coverImage ? (
                            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-50 flex items-center justify-center">
                              <span className="iconify text-stone-200" data-icon="mdi:file-document-outline" data-width="40" />
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">{blog.category}</span>
                            <span className="text-stone-300">•</span>
                            <span className="text-xs text-stone-400">{blog.readTime} min read</span>
                          </div>
                          <h3 className="text-lg font-medium tracking-tight group-hover:text-brand-600 transition-colors line-clamp-2">{blog.title}</h3>
                          <p className="mt-2 text-stone-500 text-sm leading-relaxed line-clamp-2">{blog.excerpt}</p>
                          <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
                            <span>{blog.author}</span>
                            <span>•</span>
                            <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-stone-50 border-t border-stone-200">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl font-medium tracking-tight">Get insights in your inbox</h2>
          <p className="mt-3 text-stone-500 text-sm">Weekly tips on software development, AI automation, and scaling your business.</p>
          <Link href="/contact" className="inline-block mt-6 bg-brand-600 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-700 transition-all">Subscribe</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
