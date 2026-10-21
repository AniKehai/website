import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const key = process.env.INDEXNOW_KEY;
if (!key) {
	console.error("Set INDEXNOW_KEY (see comments at the top of this file).");
	process.exit(1);
}
const sitemap = await readFile(
	resolve(import.meta.dirname, "..", "dist", "sitemap.xml"),
	"utf8",
);
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const { origin, host } = new URL(urls[0]);

const res = await fetch("https://api.indexnow.org/IndexNow", {
	method: "POST",
	headers: { "Content-Type": "application/json; charset=utf-8" },
	body: JSON.stringify({
		host,
		key,
		keyLocation: `${origin}/${key}.txt`,
		urlList: urls,
	}),
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urls.length} URLs)`);
