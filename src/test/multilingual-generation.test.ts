// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
const { createServer, close } = vi.hoisted(() => ({ createServer: vi.fn(), close: vi.fn() }));
vi.mock("vite", () => ({ createServer }));
import { multilingualPlugin } from "../../multilingualPlugin";
import { canonicalPaths } from "../../canonicalPlugin";

describe("multilingual build renderer", () => {
  it("disables nested dependency discovery and still renders every public language page", async () => {
    const renderPage = vi.fn(async (path: string) => ({ body: `<h1>${path}</h1>`, head: "" }));
    createServer.mockResolvedValue({ ssrLoadModule: async () => ({ renderPage }), close });
    const plugin = multilingualPlugin();
    const handler = typeof plugin.generateBundle === "function" ? plugin.generateBundle : plugin.generateBundle?.handler;
    if (!handler) throw new Error("Missing generation handler");
    const emitted: { fileName: string; source: string }[] = [];
    const bundle = { "index.html": { type: "asset", source: '<html><head></head><body><div id="root"></div></body></html>' } };
    await handler.call({ emitFile: (asset: { fileName: string; source: string }) => emitted.push(asset) } as never, {} as never, bundle as never, false);
    expect(createServer).toHaveBeenCalledWith(expect.objectContaining({
      optimizeDeps: { noDiscovery: true, include: [], entries: [] },
      ssr: { optimizeDeps: { noDiscovery: true, include: [] } },
      server: { middlewareMode: true, watch: null, hmr: false },
      configFile: false,
      esbuild: { jsx: "automatic", jsxDev: false },
    }));
    expect(renderPage.mock.calls.map(([path]) => path)).toEqual(canonicalPaths());
    expect(emitted).toHaveLength(231);
    expect(close).toHaveBeenCalledTimes(1);
  });
});