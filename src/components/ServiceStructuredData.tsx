import { Helmet } from "react-helmet-async";
import { structuredDataForPath } from "@/data/structuredData";

export default function ServiceStructuredData({ path }: { path: string }) {
  // The static HTML owns the single business entity throughout client navigation.
  const schema = structuredDataForPath(path, false);
  if (!schema) return null;
  return <Helmet><script id="service-structured-data" type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}