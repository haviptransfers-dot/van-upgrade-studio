import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";
import { MotionConfig } from "framer-motion";
import { PublicRoutes } from "./App";
import { PrerenderContext } from "./lib/prerender";
import { languageFromPath } from "./lib/languagePaths";
const dictionaries = import.meta.glob("./i18n/locales/*.ts");
export async function renderPage(path: string) {
  const language = languageFromPath(path);
  const loader = dictionaries[`./i18n/locales/${language}.ts`];
  if (!loader) throw new Error(`Missing dictionary: ${language}`);
  const dictionary = await loader() as { default: object };
  const instance = createInstance();
  await instance.init({ lng: language, fallbackLng: false, resources: { [language]: { translation: dictionary.default } }, interpolation: { escapeValue: false } });
  const helmetContext = {};
  const page = <HelmetProvider context={helmetContext}><I18nextProvider i18n={instance}><PrerenderContext.Provider value={true}><MotionConfig reducedMotion="always"><StaticRouter location={path}><PublicRoutes /></StaticRouter></MotionConfig></PrerenderContext.Provider></I18nextProvider></HelmetProvider>;
  const body = await new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const output = new PassThrough();
    output.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    output.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    output.on("error", reject);
    const stream = renderToPipeableStream(page, { onAllReady() { stream.pipe(output); }, onShellError: reject, onError: reject });
  });
  const helmet = (helmetContext as { helmet: { title: { toString(): string }; meta: { toString(): string }; link: { toString(): string }; script: { toString(): string } } }).helmet;
  // The server document starts visible; client animation still applies after handover.
  return { body: body.replace(/style="[^"]*"/g, (style) => style.replace(/opacity:0(?=[;"\s])/g, "opacity:1").replace(/transform:[^;"]*/g, "transform:none")), head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString() + helmet.script.toString() };
}