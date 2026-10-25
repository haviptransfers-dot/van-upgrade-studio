import { Helmet } from "react-helmet-async";
import { structuredDataForPath } from "@/data/structuredData";

export default function ServiceStructuredData({ path }: { path: string }) {
  const schema = structuredDataForPath(path);
  if (!schema) return null;
  return <Helmet><script id="service-structured-data" type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}