const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const http = require("http");

const BUILD_DIR = path.join(__dirname, "build");
const PORT = 45682;

function findChrome() {
  const candidates =
    process.platform === "darwin"
      ? [
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
          "/Applications/Chromium.app/Contents/MacOS/Chromium",
        ]
      : [
          "/usr/bin/google-chrome-stable",
          "/usr/bin/google-chrome",
          "/usr/bin/chromium-browser",
          "/usr/bin/chromium",
        ];

  if (process.env.CHROME_PATH) candidates.unshift(process.env.CHROME_PATH);

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function serve() {
  return new Promise((resolve) => {
    const handler = (req, res) => {
      let url = req.url.split("?")[0];
      let fp = path.join(BUILD_DIR, url === "/" ? "index.html" : url);
      if (!fs.existsSync(fp)) fp = path.join(BUILD_DIR, "index.html");
      const ext = path.extname(fp);
      const types = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".png": "image/png", ".ico": "image/x-icon", ".json": "application/json", ".xml": "application/xml", ".map": "application/json", ".txt": "text/plain" };
      res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
      fs.createReadStream(fp).pipe(res);
    };
    const server = http.createServer(handler);
    server.listen(PORT, () => resolve(server));
  });
}

async function prerender() {
  const chromePath = findChrome();
  if (!chromePath) {
    console.log("No Chrome/Chromium found, skipping pre-render. Set CHROME_PATH to override.");
    return;
  }
  console.log(`Using browser: ${chromePath}`);

  const server = await serve();
  console.log(`Serving build at http://localhost:${PORT}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-extensions",
        "--disable-background-networking",
        "--disable-sync",
        "--disable-translate",
      ],
    });

    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url();
      if (url.startsWith("http://localhost:" + PORT)) {
        req.continue();
      } else {
        req.abort();
      }
    });

    await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle0", timeout: 15000 });

    const html = await page.content();

    if (!html || html.length < 1000 || !html.includes("Software Development")) {
      console.log(`Pre-render produced insufficient output (${html?.length || 0} bytes), keeping original.`);
      return;
    }

    const indexPath = path.join(BUILD_DIR, "index.html");
    const original = fs.readFileSync(indexPath, "utf-8");
    const headMatch = original.match(/<head>([\s\S]*?)<\/head>/);
    if (!headMatch) {
      console.log("Could not parse original head, keeping original.");
      return;
    }

    const renderedBodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
    if (!renderedBodyMatch) {
      console.log("Could not extract rendered body, keeping original.");
      return;
    }

    const finalHtml = `<!doctype html><html lang="en"><head>${headMatch[1]}</head><body>${renderedBodyMatch[1]}</body></html>`;
    fs.writeFileSync(indexPath, finalHtml);
    console.log(`Pre-rendered index.html: ${finalHtml.length} bytes (was ${original.length} bytes)`);
  } catch (err) {
    console.log("Pre-render failed (non-fatal):", err.message?.substring(0, 200));
  } finally {
    if (browser) await browser.close().catch(() => {});
    server.close();
  }
}

prerender().catch((err) => {
  console.error("Pre-render error (non-fatal):", err.message);
  process.exit(0);
});
