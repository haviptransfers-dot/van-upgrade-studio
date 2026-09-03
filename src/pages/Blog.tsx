import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { blogPosts, localizePost } from "@/data/blogPosts";
import logoImg from "@/assets/logo.webp";

const SITE_URL = "https://haviptransfers.gr";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const posts = [...blogPosts]
    .map((p) => localizePost(p, i18n.language))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <html lang={i18n.language} />
        <title>{t("blog.metaTitle")}</title>
        <meta name="description" content={t("blog.metaDescription")} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:title" content={t("blog.metaTitle")} />
        <meta property="og:description" content={t("blog.metaDescription")} />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="H&A Tours" className="h-9 w-9 object-contain" width={36} height={36} />
            <span className="font-display text-base font-bold text-primary">H&A TOURS</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("blog.backHome")}
          </Link>
        </div>
      </header>

      {/* Posts */}
      <main className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary uppercase tracking-[0.2em] text-xs md:text-sm mb-3">{t("blog.eyebrow")}</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold">{t("blog.title")}</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-muted-foreground mb-2">
                  {new Date(post.date).toLocaleDateString(i18n.language, { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <h2 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                  {t("blog.readMore")}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-center gap-2">
          <img src={logoImg} alt="H&A Tours" className="h-8 w-8 object-contain" loading="lazy" />
          <span className="font-display text-sm font-bold text-primary">H&A TOURS</span>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
