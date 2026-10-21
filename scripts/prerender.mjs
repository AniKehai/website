import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const serverDir = resolve(root, "dist-server");

const {
	render,
	headHtml,
	sitemapXml,
	robotsTxt,
	llmsTxt,
	llmsFullTxt,
	PAGES,
	NOT_FOUND,
	SITE_URL,
} = await import(pathToFileURL(resolve(serverDir, "entry-server.js")).href);

const template = await readFile(resolve(dist, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
	throw new Error(
		"prerender: could not find an empty #root in dist/index.html",
	);
}
if (!template.includes("<!--prerender-head-->")) {
	throw new Error("prerender: missing <!--prerender-head--> marker");
}

const esc = (s) =>
	s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function build(page) {
	return template
		.replace(/<title>.*?<\/title>/, `<title>${esc(page.title)}</title>`)
		.replace("<!--prerender-head-->", headHtml(page))
		.replace(
			'<div id="root"></div>',
			`<div id="root">${render(page.path)}</div>`,
		);
}

async function write(file, content) {
	await mkdir(dirname(file), { recursive: true });
	await writeFile(file, content);
}

for (const page of PAGES) {
	const file =
		page.path === "/"
			? resolve(dist, "index.html")
			: resolve(dist, page.path.slice(1), "index.html");
	await write(file, build(page));
}
await write(resolve(dist, "404.html"), build(NOT_FOUND));

await write(resolve(dist, "sitemap.xml"), sitemapXml());
await write(resolve(dist, "robots.txt"), robotsTxt());
await write(resolve(dist, "llms.txt"), llmsTxt());
await write(resolve(dist, "llms-full.txt"), llmsFullTxt());

await rm(serverDir, { recursive: true, force: true });
console.log(
	`prerender: wrote ${PAGES.length} pages + 404, sitemap, robots, llms for ${SITE_URL}`,
);
