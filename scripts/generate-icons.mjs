import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const pub = resolve(import.meta.dirname, "..", "public");
const jobs = [
	["favicon-48.png", 48],
	["apple-touch-icon.png", 180],
	["icon-192.png", 192],
	["icon-512.png", 512],
];
for (const [file, size] of jobs) {
	execFileSync(
		"npx",
		[
			"--yes",
			"sharp-cli",
			"-i",
			resolve(pub, "favicon.svg"),
			"-o",
			resolve(pub, file),
			"resize",
			String(size),
			String(size),
		],
		{ stdio: "inherit" },
	);
}
console.log("Icons written to public/. Rebuild to link them automatically.");
