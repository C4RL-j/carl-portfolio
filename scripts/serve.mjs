import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

// Local production preview only. Vercel serves out/ directly.
const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff" };

try { await stat(join(root, "index.html")); }
catch { console.error("Static export missing. Run npm run build first."); process.exit(1); }

createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url || "/", "http://localhost").pathname);
    let target = resolve(root, `.${pathname}`);
    const pathFromRoot = relative(root, target);
    if (pathFromRoot.startsWith("..") || pathFromRoot.includes(":")) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const info = await stat(target);
    if (info.isDirectory()) target = join(target, "index.html");
    const body = await readFile(target);
    const contentType = target === join(root, "opengraph-image") ? "image/png" : mime[extname(target)] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": contentType, "X-Content-Type-Options": "nosniff" });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    const body = await readFile(join(root, "404.html")).catch(() => "Not found");
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(request.method === "HEAD" ? undefined : body);
  }
}).listen(port, "127.0.0.1", () => console.log(`Carl.OS preview: http://127.0.0.1:${port}`));
