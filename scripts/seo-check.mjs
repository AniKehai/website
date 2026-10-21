import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const dist = resolve(import.meta.dirname, "..", "dist");
const problems = [];
const fail = (file, msg) => problems.push(`${file}: ${msg}`);

async function htmlFiles(dir) {
	const out = [];
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) out.push(...(await htmlFiles(p)));
		else if (e.name.endsWith(".html") && !e.name.startsWith("google"))
			out.push(p);
	}
	return out;
}

const routeExists = (href) => {
	const path = href.split(/[?#]/)[0].replace(/\/$/, "");
	if (path === "") return true;
	return (
		existsSync(join(dist, path, "index.html")) ||
		existsSync(join(dist, `${path}.html`)) ||
		existsSync(join(dist, path))
	);
};

const titles = new Map();
const descriptions = new Map();

for (const file of await htmlFiles(dist)) {
	const rel = relative(dist, file);
	const html = await readFile(file, "utf8");
	const is404 = rel === "404.html";

	const title = html.match(/<title>(.*?)<\/title>/)?.[1];
	if (!title) fail(rel, "missing <title>");
	else {
		if (title.length > 70) fail(rel, `title too long (${title.length})`);
		if (titles.has(title) && !is404)
			fail(rel, `duplicate title with ${titles.get(title)}`);
		titles.set(title, rel);
	}

	const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
	if (!desc) fail(rel, "missing meta description");
	else {
		if (desc.length > 170) fail(rel, `description too long (${desc.length})`);
		if (descriptions.has(desc) && !is404)
			fail(rel, `duplicate description with ${descriptions.get(desc)}`);
		descriptions.set(desc, rel);
	}

	const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
	if (h1s !== 1) fail(rel, `expected exactly one <h1>, found ${h1s}`);

	if (!is404 && !/<link rel="canonical" href="https?:\/\/[^"]+"/.test(html))
		fail(rel, "missing canonical");
	if (is404 && !/noindex/.test(html)) fail(rel, "404 page should be noindex");

	const lds = [
		...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
	];
	if (lds.length === 0) fail(rel, "missing JSON-LD");
	for (const m of lds) {
		try {
			JSON.parse(m[1]);
		} catch {
			fail(rel, "invalid JSON-LD");
		}
	}

	for (const m of html.matchAll(/<img\b[^>]*>/g)) {
		if (!/\salt=/.test(m[0]))
			fail(rel, `<img> without alt: ${m[0].slice(0, 60)}`);
	}

	for (const m of html.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"/g)) {
		if (!routeExists(m[1])) fail(rel, `broken internal link ${m[1]}`);
	}
}

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (locs.length < 2) fail("sitemap.xml", "expected multiple URLs");
for (const loc of locs) {
	const path = new URL(loc).pathname;
	if (!routeExists(path)) fail("sitemap.xml", `lists missing page ${path}`);
}
for (const f of ["robots.txt", "llms.txt", "llms-full.txt"])
	if (!existsSync(join(dist, f))) fail(f, "missing");

if (problems.length) {
	console.error(
		`seo-check: ${problems.length} problem(s)\n- ${problems.join("\n- ")}`,
	);
	process.exit(1);
}
console.log(
	`seo-check: OK (${titles.size} pages, ${locs.length} sitemap URLs)`,
);
