import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts, localizePost, WHATSAPP_URL } from "@/data/blogPosts";
import logoImg from "@/assets/logo.webp";

const SITE_URL = "https://haviptransfers.gr";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">{t("blog.notFound")}</h1>
        <Link to="/blog" className="text-primary hover:underline">
          {t("blog.backToBlog")}
        </Link>
      </div>
    );
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <html lang={i18n.language} />
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.date,
            image: `${SITE_URL}${post.image}`,
            author: { "@type": "Organization", name: "H&A VIP Transfers" },
          })}
        </script>
      </Helmet>

      {/* Header */}
      <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="H&A Tours" className="h-9 w-9 object-contain" width={36} height={36} />
            <span className="font-display text-base font-bold text-primary">H&A TOURS</span>
          </Link>
          <Link to="/blog" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("blog.backToBlog")}
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <p className="text-primary uppercase tracking-[0.2em] text-xs mb-3">
          {new Date(post.date).toLocaleDateString(i18n.language, { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-8 leading-tight">{post.title}</h1>
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full rounded-lg shadow-2xl mb-10 aspect-[16/9] object-cover"
          fetchPriority="high"
          decoding="async"
        />

        <article className="space-y-10">
          {post.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-primary">{section.heading}</h2>
              )}
              {section.subheading && (
                <h3 className="font-display text-xl font-semibold mb-3">{section.subheading}</h3>
              )}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="text-foreground/80 leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-3 mt-4">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-foreground/80">
                      <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {/* WhatsApp CTA */}
        <div className="mt-14 bg-card border border-primary/20 rounded-lg p-8 text-center">
          <h2 className="font-display text-2xl font-bold mb-3">{t("blog.ctaTitle")}</h2>
          <p className="text-muted-foreground mb-6">{t("blog.ctaDesc")}</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="text-base px-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
              <MessageCircle className="w-5 h-5" />
              {t("blog.ctaWhatsapp")}
            </Button>
          </a>
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

export default BlogPost;
