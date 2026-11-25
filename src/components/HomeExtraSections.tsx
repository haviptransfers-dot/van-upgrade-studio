import { Star } from "lucide-react";
import Link from "./LocalizedLink";
import type { HomeExtra } from "@/lib/homeExtra";

const linkClass = "text-primary underline underline-offset-4";

/** Renders "[label](path)" markup as same-tab localized links. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/);
  return <>{parts.map((p, i) => {
    const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? <Link key={i} to={m[2]} className={linkClass}>{m[1]}</Link> : p;
  })}</>;
}

function Block({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return <section className="px-4 py-12 border-t border-border"><div className="container mx-auto max-w-4xl">
    <h2 className="font-display text-2xl text-primary mb-4">{title}</h2>
    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5">{intro}</p>
    <ul className="space-y-3 text-foreground/80 text-sm md:text-base">{children}</ul>
  </div></section>;
}

const Item = ({ children }: { children: React.ReactNode }) => <li className="flex items-start gap-3"><Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" /><span>{children}</span></li>;

export default function HomeExtraSections({ sections }: { sections: NonNullable<HomeExtra["sections"]> }) {
  const { included, popular, occasions } = sections;
  return <>
    <Block title={included.title} intro={included.intro}>{included.items.map(x => <Item key={x}>{x}</Item>)}</Block>
    <Block title={popular.title} intro={popular.intro}>{popular.items.map(x => <Item key={x.to}><Link to={x.to} className={linkClass}>{x.label}</Link></Item>)}</Block>
    <Block title={occasions.title} intro={occasions.intro}>{occasions.items.map(x => <Item key={x}><Rich text={x} /></Item>)}</Block>
  </>;
}
