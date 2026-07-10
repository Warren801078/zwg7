import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)), "dist");
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
};

function resolvePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = normalize(clean).replace(/^([/\\])+/, "");
  const candidate = join(root, normalized || "index.html");
  if (!candidate.startsWith(root)) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  return join(root, "index.html");
}

createServer((req, res) => {
  const file = resolvePath(req.url || "/");
  if (!file || !existsSync(file)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  res.writeHead(200, {
    "Content-Type": types[extname(file)] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  createReadStream(file).pipe(res);
}).listen(port, host, () => {
  console.log(`Portfolio preview running at http://${host}:${port}/`);
});
