### D:/Code/anikehai-web/index.html
```text
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<meta name="title" content="AniKehai â€” Show your anime on Discord" />
		<meta name="description" content="A lightweight, standalone browser extension that natively broadcasts the anime you are watching directly to your Discord Rich Presence. Works with AnimePahe, Aniwave, Miruro, and more." />
		<meta name="keywords" content="Discord anime rich presence, anime discord RPC, show anime on discord profile, discord anime status, wxt extension" />

		<meta property="og:type" content="website" />
		<meta property="og:url" content="https://your-domain.com/" />
		<meta property="og:title" content="AniKehai â€” Show your anime on Discord" />
		<meta property="og:description" content="A lightweight browser extension that natively broadcasts your anime to Discord Rich Presence. Zero desktop apps required." />
		<meta property="og:image" content="https://your-domain.com/og-image.png" />

		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:url" content="https://your-domain.com/" />
		<meta property="twitter:title" content="AniKehai â€” Show your anime on Discord" />
		<meta property="twitter:description" content="A lightweight browser extension that natively broadcasts your anime to Discord Rich Presence." />
		<meta property="twitter:image" content="https://your-domain.com/og-image.png" />

		<meta name="theme-color" content="#0b0b14" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=Noto+Serif+JP:wght@900&display=swap"
			rel="stylesheet"
		/>
		<title>AniKehai â€” Show your anime on Discord</title>
	</head>
	<body>
		<div id="root"></div>
		<script type="module" src="/src/main.tsx"></script>
	</body>
</html>

```

### D:/Code/anikehai-web/package.json
```text
{
	"name": "anikehai-web",
	"private": true,
	"version": "0.0.0",
	"type": "module",
	"scripts": {
		"dev": "vite",
		"build": "tsc -b && vite build",
		"preview": "vite preview",
		"typecheck": "tsc --noEmit",
		"lint": "bunx biome check",
		"lint:fix": "bunx biome check --write",
		"format": "bunx biome format --write",
		"validate": "bun run lint && bun run typecheck"
	},
	"dependencies": {
		"@tailwindcss/vite": "^4.3.3",
		"lucide-react": "^1.57.0",
		"motion": "^14.2.0",
		"react": "^19.3.0",
		"react-dom": "^19.3.0",
		"tailwindcss": "^4.3.3"
	},
	"devDependencies": {
		"@biomejs/biome": "^2.5.15",
		"@types/node": "^26.6.5",
		"@types/react": "^19.3.0",
		"@types/react-dom": "^19.3.0",
		"@vitejs/plugin-react": "^6.1.2",
		"globals": "^17.13.0",
		"typescript": "~7.0.2",
		"vite": "^8.3.4",
		"vite-plugin-prerender": "^1.0.8"
	}
}

```

### D:/Code/anikehai-web/tsconfig.app.json
```text
{
	"compilerOptions": {
		"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
		"target": "es2023",
		"lib": ["ES2023", "DOM"],
		"module": "esnext",
		"types": ["vite/client"],
		"allowArbitraryExtensions": true,
		"skipLibCheck": true,

		/* Bundler mode */
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"verbatimModuleSyntax": true,
		"moduleDetection": "force",
		"noEmit": true,
		"jsx": "react-jsx",

		/* Linting */
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"erasableSyntaxOnly": true,
		"noFallthroughCasesInSwitch": true
	},
	"include": ["src"]
}

```

### D:/Code/anikehai-web/tsconfig.json
```text
{
	"files": [],
	"references": [
		{ "path": "./tsconfig.app.json" },
		{ "path": "./tsconfig.node.json" }
	]
}

```

### D:/Code/anikehai-web/tsconfig.node.json
```text
{
	"compilerOptions": {
		"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
		"target": "es2023",
		"lib": ["ES2023"],
		"types": ["node"],
		"skipLibCheck": true,

		/* Bundler mode */
		"module": "nodenext",
		"allowImportingTsExtensions": true,
		"verbatimModuleSyntax": true,
		"moduleDetection": "force",
		"noEmit": true,

		/* Linting */
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"erasableSyntaxOnly": true,
		"noFallthroughCasesInSwitch": true
	},
	"include": ["vite.config.ts"]
}

```

### D:/Code/anikehai-web/vite.config.ts
```text
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vitePrerender from "vite-plugin-prerender";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		// @ts-expect-error - vite-plugin-prerender has outdated CJS type definitions
		vitePrerender({
			staticDir: path.join(__dirname, "dist"),
			routes: ["/"],
		}),
	],
});

```

### D:/Code/anikehai-web/src/App.tsx
```text
import { MotionConfig } from "motion/react";
import { Footer } from "./components/layout/Footer";
import { Nav } from "./components/layout/Nav";
import { Faq } from "./components/sections/Faq";
import { Features } from "./components/sections/Features";
import { Hero } from "./components/sections/Hero";
import { Install } from "./components/sections/Install";
import { Sites } from "./components/sections/Sites";
import { useBrowser } from "./hooks/useBrowser";

export default function App() {
	const info = useBrowser();

	return (
		<MotionConfig reducedMotion="user">
			<Nav />
			<main>
				<Hero info={info} />
				<Features />
				<Install info={info} />
				<Sites />
				<Faq />
			</main>
			<Footer />
		</MotionConfig>
	);
}

```

### D:/Code/anikehai-web/src/main.tsx
```text
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

```

### D:/Code/anikehai-web/src/components/layout/Footer.tsx
```text
import { LINKS, VERSION } from "../../config/data";
import { Reveal } from "../ui/Reveal";

export function Footer() {
	const links = [
		{ label: "GitHub", href: LINKS.github },
		{ label: "Releases", href: LINKS.releases },
		{ label: "Report an issue", href: LINKS.issues },
		{ label: "Discord", href: LINKS.discord },
	];
	return (
		<footer className="border-t border-white/5">
			<Reveal y={12}>
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-[13px] text-muted sm:flex-row">
					<p>Â© 2026 AniKehai Â· v{VERSION} Â· MIT licensed</p>
					<div className="flex gap-5">
						{links.map((l) => (
							<a
								key={l.label}
								href={l.href}
								target="_blank"
								rel="noreferrer"
								className="transition-colors hover:text-ink"
							>
								{l.label}
							</a>
						))}
					</div>
				</div>
				<p className="px-5 pb-8 text-center text-[11px] text-muted/60">
					Not affiliated with Discord Inc. or any listed anime site.
				</p>
			</Reveal>
		</footer>
	);
}

```

### D:/Code/anikehai-web/src/components/layout/Nav.tsx
```text
import { motion, useScroll, useSpring } from "motion/react";
import { LINKS, VERSION } from "../../config/data";

const items = [
	{ href: "#install", label: "Install" },
	{ href: "#sites", label: "Sites" },
	{ href: "#faq", label: "FAQ" },
];

export function Nav() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

	return (
		<motion.nav
			initial={{ y: -56, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			className="sticky top-0 z-50 border-b border-white/5 bg-void/80 backdrop-blur-md"
		>
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
				<a href="/" className="group flex items-center gap-2.5">
					<img
						src="/favicon.svg"
						alt=""
						className="h-7 w-7 rounded-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
					/>
					<span className="font-display text-[17px] font-extrabold tracking-tight">
						AniKehai
					</span>
					<span className="hidden rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium text-muted sm:inline">
						v{VERSION}
					</span>
				</a>
				<div className="flex items-center gap-1 text-[13px] font-medium text-muted">
					{items.map((i) => (
						<a
							key={i.href}
							href={i.href}
							className="hidden rounded-lg px-3 py-1.5 transition-colors hover:text-ink sm:block"
						>
							{i.label}
						</a>
					))}
					<a
						href={LINKS.github}
						target="_blank"
						rel="noreferrer"
						className="rounded-lg px-3 py-1.5 transition-colors hover:text-ink"
					>
						GitHub
					</a>
					<motion.a
						href={LINKS.discord}
						target="_blank"
						rel="noreferrer"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.96 }}
						className="ml-1 rounded-lg bg-dusk px-3.5 py-1.5 text-white transition-colors hover:bg-dusk/85"
					>
						Discord
					</motion.a>
				</div>
			</div>
			<motion.div
				style={{ scaleX }}
				className="absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-dusk via-cyan to-amber"
			/>
		</motion.nav>
	);
}

```

### D:/Code/anikehai-web/src/components/presence/PresenceCard.tsx
```text
import { MonitorPlay, Pause, Play } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useReducedMotion,
	useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const SHOWS = [
	{
		title: "Fruits Basket: The Final",
		episode: "Episode 10: I Just Love Her",
		poster:
			"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx124194-TJlqMMR7BGn9.jpg",
		total: 23 * 60 + 50,
		start: 13 * 60 + 15,
	},
	{
		title: "Terror in Resonance",
		episode: "Episode 6: Ready or Not",
		poster:
			"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20661-aCR7QgzDfOSI.png",
		total: 22 * 60 + 57,
		start: 27,
	},
	{
		title: "Frieren: Beyond Journey's End",
		episode: "Episode 12: A Real Hero",
		poster:
			"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
		total: 24 * 60 + 12,
		start: 14,
	},
];

function fmt(s: number) {
	const m = Math.floor(s / 60);
	const secs = Math.floor(s % 60);
	return `${m}:${String(secs).padStart(2, "0")}`;
}

export function PresenceCard() {
	const reduce = useReducedMotion();
	const [idx, setIdx] = useState(0);
	const [t, setT] = useState(SHOWS[0].start);
	const [paused, setPaused] = useState(false);
	const show = SHOWS[idx];

	// Progress ticker
	useEffect(() => {
		if (paused) return;
		const id = setInterval(() => setT((v) => (v + 1) % show.total), 1000);
		return () => clearInterval(id);
	}, [paused, show.total]);

	// Cycle through shows
	useEffect(() => {
		if (paused) return;
		const id = setInterval(() => {
			setIdx((i) => {
				const next = (i + 1) % SHOWS.length;
				setT(SHOWS[next].start);
				return next;
			});
		}, 7000);
		return () => clearInterval(id);
	}, [paused]);

	// 3D mouse tilt
	const wrapperRef = useRef<HTMLDivElement>(null);
	const rx = useSpring(0, { stiffness: 140, damping: 16 });
	const ry = useSpring(0, { stiffness: 140, damping: 16 });

	useEffect(() => {
		const el = wrapperRef.current;
		if (!el || reduce || !matchMedia("(pointer: fine)").matches) return;

		const move = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
			rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
		};
		const leave = () => {
			rx.set(0);
			ry.set(0);
		};

		el.addEventListener("pointermove", move);
		el.addEventListener("pointerleave", leave);
		return () => {
			el.removeEventListener("pointermove", move);
			el.removeEventListener("pointerleave", leave);
		};
	}, [reduce, rx, ry]);

	return (
		<div className="relative w-full max-w-90" ref={wrapperRef}>
			<div className="absolute -inset-6 rounded-4xl bg-dusk/20 blur-3xl" />

			<motion.div
				style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
				className="relative text-left"
			>
				<div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#111214] p-5 shadow-2xl shadow-black/50">
					<div className="mb-5 flex items-center gap-4">
						<div className="relative shrink-0">
							<img
								src="https://github.com/minkxx.png"
								alt="Minkxx Profile"
								className="h-17 w-17 rounded-full bg-[#1e1f22] object-cover"
							/>
							<span className="absolute bottom-0 right-0 h-5 w-5 rounded-full border-4 border-[#111214] bg-emerald-500" />
						</div>
						<div className="mt-1 flex flex-col leading-tight">
							<span className="text-xl font-bold text-[#f2f3f5]">Minkxx</span>
							<span className="mt-0.5 text-[13px] text-[#b5bac1]">
								minkxx23 â€¢ he/him
							</span>
						</div>
					</div>

					<div className="rounded-xl bg-[#2b2d31]/50 p-4">
						<p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#f2f3f5]">
							Watching Anime
						</p>

						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={show.title}
								initial={{ opacity: 0, x: 12 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -12 }}
								transition={{ duration: 0.25 }}
								className="flex gap-4"
							>
								<div className="relative shrink-0">
									<img
										src={show.poster}
										alt={show.title}
										className="h-18 w-18 rounded-lg bg-[#1e1f22] object-cover"
									/>
									<div className="absolute -bottom-1.5 -right-1.5 rounded-full bg-[#242529] p-1">
										<div
											className={`grid h-7 w-7 place-items-center rounded-full bg-[#f2f3f5] ${paused ? "" : "pl-0.5"}`}
										>
											{paused ? (
												<Pause
													size={14}
													className="fill-[#111214] text-[#111214]"
												/>
											) : (
												<Play
													size={14}
													className="fill-[#111214] text-[#111214]"
												/>
											)}
										</div>
									</div>
								</div>

								<div className="flex min-w-0 flex-1 flex-col justify-center">
									<p className="truncate text-[14px] font-bold text-[#f2f3f5]">
										{show.title}
									</p>
									<p className="mt-0.5 truncate text-[13px] text-[#b5bac1]">
										{show.episode}
									</p>

									{paused ? (
										<div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium tabular-nums text-[#23a559]">
											<MonitorPlay
												size={13}
												strokeWidth={2.5}
												className="fill-[#23a559]/20"
											/>
											<span>{fmt(t)}</span>
										</div>
									) : (
										<div className="mt-2.5 flex items-center gap-2 text-[11px] font-medium tabular-nums text-[#b5bac1]">
											<span>{fmt(t)}</span>
											<div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
												<div
													className="h-full rounded-full bg-[#f2f3f5] transition-[width] duration-1000 ease-linear"
													style={{ width: `${(t / show.total) * 100}%` }}
												/>
											</div>
											<span>{fmt(show.total)}</span>
										</div>
									)}
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</motion.div>

			<motion.button
				type="button"
				whileTap={{ scale: 0.95 }}
				onClick={() => setPaused((p) => !p)}
				className="relative mx-auto mt-8 flex items-center gap-2 rounded-full border border-white/10 bg-panel-2/70 px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
			>
				{paused ? <Play size={12} /> : <Pause size={12} />}
				{paused ? "Resume playback" : "Pause playback"} â€” try it
			</motion.button>
		</div>
	);
}

```

### D:/Code/anikehai-web/src/components/sections/Faq.tsx
```text
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FAQ } from "../../config/data";
import { Reveal } from "../ui/Reveal";

export function Faq() {
	const [open, setOpen] = useState<number | null>(0);

	return (
		<section id="faq" className="mx-auto max-w-3xl px-5 py-20">
			<Reveal>
				<p className="text-xs font-semibold tracking-[0.22em] text-cyan">FAQ</p>
				<h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
					Questions, answered.
				</h2>
			</Reveal>
			<Reveal delay={0.1} className="mt-8">
				<div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/5 bg-panel/40">
					{FAQ.map((f, i) => {
						const isOpen = open === i;
						return (
							<div key={f.q}>
								<button
									type="button"
									aria-expanded={isOpen}
									onClick={() => setOpen(isOpen ? null : i)}
									className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-[15px] font-semibold transition-colors hover:bg-white/2"
								>
									{f.q}
									<motion.span
										animate={{ rotate: isOpen ? 180 : 0 }}
										transition={{ duration: 0.25 }}
										className="shrink-0 text-muted"
									>
										<ChevronDown size={18} />
									</motion.span>
								</button>
								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.28, ease: "easeOut" }}
											className="overflow-hidden"
										>
											<p className="px-6 pb-5 text-[14px] leading-relaxed text-muted">
												{f.a}
											</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>
			</Reveal>
		</section>
	);
}

```

### D:/Code/anikehai-web/src/components/sections/Features.tsx
```text
import { Activity, Image, Shield, Smartphone, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Reveal } from "../ui/Reveal";

const items: { icon: ReactNode; title: string; body: string }[] = [
	{
		icon: <Activity size={18} />,
		title: "Live progress",
		body: "Watching / Paused states, elapsed time and time remaining using Discord timestamps.",
	},
	{
		icon: <Image size={18} />,
		title: "Real cover art",
		body: "Pulls high-quality covers, with an AniList fallback for sites that protect their assets.",
	},
	{
		icon: <Zap size={18} />,
		title: "Zero overhead",
		body: "Lives entirely in your browser. No Electron app, no background middleware.",
	},
	{
		icon: <Smartphone size={18} />,
		title: "Works on mobile",
		body: "Runs on Android browsers with extension support, with a custom mobile sign-in flow.",
	},
	{
		icon: <Shield size={18} />,
		title: "Privacy toggle",
		body: "Switch broadcasting off from the popup without ever logging out of Discord.",
	},
];

export function Features() {
	return (
		<section className="mx-auto max-w-6xl px-5 pb-20">
			<Reveal>
				<h2 className="font-display text-3xl font-extrabold tracking-tight">
					Small. Fast. Yours.
				</h2>
			</Reveal>
			<div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
				{items.map((f, i) => (
					<Reveal key={f.title} delay={i * 0.08}>
						<motion.div whileHover={{ x: 4 }} className="group flex gap-4">
							<motion.span
								whileHover={{ rotate: -8, scale: 1.12 }}
								className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-cyan transition-colors group-hover:border-cyan/50 group-hover:bg-cyan/10"
							>
								{f.icon}
							</motion.span>
							<div>
								<h3 className="text-[15px] font-semibold">{f.title}</h3>
								<p className="mt-1 text-[13.5px] leading-relaxed text-muted">
									{f.body}
								</p>
							</div>
						</motion.div>
					</Reveal>
				))}
			</div>
		</section>
	);
}

```

### D:/Code/anikehai-web/src/components/sections/Hero.tsx
```text
import { Check, Download } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useMotionTemplate,
	useMotionValue,
	useScroll,
	useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { SITES, VERSION } from "../../config/data";
import type { BrowserInfo } from "../../lib/detect";
import { PresenceCard } from "../presence/PresenceCard";

const LINES = [
	["Let", "Discord", "see"],
	["what", "you're", "watching."],
];

export function Hero({ info }: { info: BrowserInfo }) {
	const ref = useRef<HTMLElement>(null);
	const mx = useMotionValue(-999);
	const my = useMotionValue(-999);
	const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgb(124 92 255 / 0.16), transparent 70%)`;

	const { scrollY } = useScroll();
	const kanjiY = useTransform(scrollY, [0, 700], [0, 140]);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const move = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			mx.set(e.clientX - r.left);
			my.set(e.clientY - r.top);
		};
		window.addEventListener("pointermove", move);
		return () => window.removeEventListener("pointermove", move);
	}, [mx, my]);

	const external = info.ctaHref.startsWith("http");

	return (
		<header id="top" ref={ref} className="relative overflow-hidden">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-20 top-10 h-72 w-72 animate-aurora-a rounded-full bg-dusk/20 blur-3xl"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute right-10 top-40 h-80 w-80 animate-aurora-b rounded-full bg-cyan/10 blur-3xl"
			/>
			<motion.div
				aria-hidden="true"
				style={{ background: spotlight }}
				className="pointer-events-none absolute inset-0"
			/>
			<motion.span
				aria-hidden="true"
				style={{ y: kanjiY }}
				className="pointer-events-none absolute -right-6 -top-10 select-none font-jp text-[22rem] font-black leading-none text-white/2.5 max-lg:hidden"
			>
				æ°—é…
			</motion.span>

			<div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.15fr_1fr] lg:pt-24">
				<div>
					<motion.p
						initial={{ opacity: 0, x: -12 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="text-xs font-semibold tracking-[0.22em] text-cyan"
					>
						æ°—é… Â· THE PRESENCE OF ANIME
					</motion.p>

					<h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
						{LINES.map((line, li) => (
							<span key={line[0]} className="block">
								{line.map((w, wi) => {
									const last =
										li === LINES.length - 1 && wi === line.length - 1;
									return (
										<span
											key={w}
											className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
										>
											<motion.span
												initial={{ y: "110%" }}
												animate={{ y: 0 }}
												transition={{
													duration: 0.7,
													delay: 0.15 + (li * 3 + wi) * 0.08,
													ease: [0.22, 1, 0.36, 1],
												}}
												className={`inline-block ${
													last
														? "animate-gradient bg-linear-to-r from-amber via-dusk to-cyan bg-size-[200%_200%] bg-clip-text text-transparent"
														: ""
												}`}
											>
												{w}
											</motion.span>
										</span>
									);
								})}
							</span>
						))}
					</h1>

					<motion.p
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7, duration: 0.6 }}
						className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted"
					>
						AniKehai is a tiny browser extension that turns your anime episode
						into a live Discord Rich Presence â€” title, episode, cover art and a
						real progress bar. No desktop app. No setup beyond one click.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.85, duration: 0.6 }}
						className="mt-8 flex flex-wrap items-center gap-3"
					>
						<motion.a
							href={info.ctaHref}
							target={external ? "_blank" : undefined}
							rel="noreferrer"
							whileHover={{ y: -3 }}
							whileTap={{ scale: 0.97 }}
							className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-dusk px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-dusk/30"
						>
							<span
								aria-hidden="true"
								className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/25 to-transparent"
							/>
							<Download size={18} strokeWidth={2.4} className="relative" />
							<AnimatePresence mode="wait" initial={false}>
								<motion.span
									key={info.ctaLabel}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -8 }}
									transition={{ duration: 0.18 }}
									className="relative"
								>
									{info.ctaLabel}
								</motion.span>
							</AnimatePresence>
						</motion.a>
						<a
							href="#install"
							className="rounded-xl border border-white/10 px-5 py-3.5 text-[14px] font-medium text-ink transition-colors hover:bg-white/5"
						>
							Other browsers
						</a>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.05 }}
						className="mt-4 flex flex-col gap-2 text-xs text-muted"
					>
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={`${info.id}-${info.os}`}
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -6 }}
								className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium ${
									info.warn
										? "border-amber/30 bg-amber/10 text-amber"
										: "border-cyan/25 bg-cyan/10 text-cyan"
								}`}
							>
								<Check size={12} strokeWidth={3} />
								Detected {info.name} on {info.osName}
							</motion.span>
						</AnimatePresence>
						<span>
							{info.ctaNote} Â· v{VERSION} Â· {SITES.length} sites supported
						</span>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30, scale: 0.96 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
					className="flex flex-col items-center"
				>
					<PresenceCard />
				</motion.div>
			</div>
		</header>
	);
}

```

### D:/Code/anikehai-web/src/components/sections/Install.tsx
```text
import {
	AlertTriangle,
	Check,
	Compass,
	Copy,
	Flame,
	Smartphone,
	Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { GUIDES, LINKS, type Platform } from "../../config/data";
import type { BrowserInfo } from "../../lib/detect";
import { Reveal } from "../ui/Reveal";

const icons: Record<Platform, typeof Flame> = {
	firefox: Flame,
	chrome: Compass,
	android: Smartphone,
};

const order: Platform[] = ["firefox", "chrome", "android"];

function CopyChip({ text }: { text: string }) {
	const [done, setDone] = useState(false);
	return (
		<motion.button
			type="button"
			whileTap={{ scale: 0.95 }}
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(text);
					setDone(true);
					setTimeout(() => setDone(false), 1500);
				} catch {
					/* clipboard unavailable */
				}
			}}
			className="mt-2 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-void px-3 py-1.5 font-mono text-[12px] text-ink transition-colors hover:border-dusk/50"
		>
			{text}
			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					key={done ? "ok" : "copy"}
					initial={{ scale: 0, rotate: -90 }}
					animate={{ scale: 1, rotate: 0 }}
					exit={{ scale: 0 }}
					transition={{ duration: 0.15 }}
				>
					{done ? (
						<Check size={13} className="text-cyan" />
					) : (
						<Copy size={13} />
					)}
				</motion.span>
			</AnimatePresence>
		</motion.button>
	);
}

export function Install({ info }: { info: BrowserInfo }) {
	const [picked, setPicked] = useState<Platform | null>(null);
	const tab = picked ?? info.platform ?? "chrome";
	const guide = GUIDES[tab];

	const primary =
		tab === "firefox"
			? { label: "Open Firefox Add-ons", href: LINKS.firefox }
			: { label: "Download release ZIP", href: LINKS.releases };

	return (
		<section id="install" className="mx-auto max-w-6xl px-5 py-20">
			<Reveal>
				<p className="text-xs font-semibold tracking-[0.22em] text-cyan">
					INSTALLATION
				</p>
				<h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
					Pick your browser.
				</h2>
			</Reveal>

			<Reveal delay={0.1}>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={`${info.id}-${info.os}`}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						className={`mt-6 flex items-start gap-3 rounded-xl border p-4 text-[14px] leading-relaxed ${
							info.warn
								? "border-amber/30 bg-amber/[0.07] text-ink"
								: "border-cyan/25 bg-cyan/6 text-ink"
						}`}
					>
						<span
							className={`mt-0.5 shrink-0 ${info.warn ? "text-amber" : "text-cyan"}`}
						>
							{info.warn ? <AlertTriangle size={18} /> : <Sparkles size={18} />}
						</span>
						<p>
							<span className="font-semibold">
								You're using {info.name} on {info.osName}.
							</span>{" "}
							<span className="text-muted">{info.recommendation}</span>
						</p>
					</motion.div>
				</AnimatePresence>
			</Reveal>

			<div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
				<div
					role="tablist"
					aria-label="Browser"
					className="flex gap-2 lg:flex-col"
				>
					{order.map((p) => {
						const Icon = icons[p];
						const active = p === tab;
						const recommended = p === info.platform;
						return (
							<button
								key={p}
								type="button"
								role="tab"
								aria-selected={active}
								onClick={() => setPicked(p)}
								className={`relative flex flex-1 items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[14px] font-semibold transition-colors lg:flex-none ${
									active
										? "border-transparent text-ink"
										: "border-white/5 text-muted hover:border-white/15 hover:text-ink"
								}`}
							>
								{active && (
									<motion.span
										layoutId="tab-pill"
										transition={{ type: "spring", stiffness: 380, damping: 32 }}
										className="absolute inset-0 rounded-xl border border-dusk/60 bg-dusk/10"
									/>
								)}
								<Icon
									size={18}
									className={`relative ${active ? "text-dusk" : ""}`}
								/>
								<span className="relative">{GUIDES[p].label}</span>
								{recommended && (
									<span className="relative ml-auto hidden rounded-full bg-cyan/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan sm:inline">
										For you
									</span>
								)}
							</button>
						);
					})}
				</div>

				<Reveal delay={0.15}>
					<div className="rounded-2xl border border-white/5 bg-panel/60 p-6 sm:p-8">
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={tab}
								initial={{ opacity: 0, x: 16 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -16 }}
								transition={{ duration: 0.2 }}
							>
								<div className="flex flex-wrap items-center justify-between gap-4">
									<p className="text-[14px] text-muted">{guide.subtitle}</p>
									<motion.a
										href={primary.href}
										target="_blank"
										rel="noreferrer"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.96 }}
										className="rounded-lg bg-dusk px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-dusk/85"
									>
										{primary.label}
									</motion.a>
								</div>

								<ol className="mt-7 flex flex-col">
									{guide.steps.map((s, i) => (
										<motion.li
											key={s.title}
											initial={{ opacity: 0, x: -14 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.08 + i * 0.07, duration: 0.35 }}
											className="relative flex gap-4 pb-6 last:pb-0"
										>
											{i < guide.steps.length - 1 && (
												<motion.span
													initial={{ scaleY: 0 }}
													animate={{ scaleY: 1 }}
													transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
													className="absolute left-3.75 top-8 h-[calc(100%-2rem)] w-px origin-top bg-white/10"
												/>
											)}
											<span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-void font-display text-[13px] font-bold text-amber">
												{i + 1}
											</span>
											<div className="pt-0.5">
												<h3 className="text-[15px] font-semibold">{s.title}</h3>
												<p className="mt-0.5 text-[13.5px] leading-relaxed text-muted">
													{s.body}
												</p>
												{s.copy && (
													<CopyChip text={info.extensionsUrl ?? s.copy} />
												)}
											</div>
										</motion.li>
									))}
								</ol>

								{tab === "android" && (
									<a
										href={LINKS.kiwi}
										target="_blank"
										rel="noreferrer"
										className="mt-6 inline-block text-[13px] font-medium text-cyan hover:underline"
									>
										Kiwi Browser release â†’
									</a>
								)}
							</motion.div>
						</AnimatePresence>
					</div>
				</Reveal>
			</div>

			<Reveal delay={0.1} className="mt-6">
				<div className="rounded-2xl border border-dusk/30 bg-dusk/[0.07] p-6">
					<h3 className="font-display text-lg font-bold">
						Then: link Discord & start watching
					</h3>
					<p className="mt-1.5 max-w-3xl text-[14px] leading-relaxed text-muted">
						Click the AniKehai icon in your toolbar (or browser menu on mobile),
						press <span className="text-ink">Link with Discord</span> and
						approve the request. Open any episode on a supported site â€” your
						Rich Presence updates automatically.
					</p>
				</div>
			</Reveal>
		</section>
	);
}

```

### D:/Code/anikehai-web/src/components/sections/Sites.tsx
```text
import { ChevronDown, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LINKS, SITES } from "../../config/data";
import { Reveal } from "../ui/Reveal";

export function Sites() {
	const [openSite, setOpenSite] = useState<string | null>(null);

	return (
		<section id="sites" className="mx-auto max-w-6xl px-5 py-20">
			<Reveal className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="text-xs font-semibold tracking-[0.22em] text-cyan">
						SUPPORTED SITES
					</p>
					<h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
						Works where you watch.
					</h2>
				</div>
				<a
					href={LINKS.contributing}
					target="_blank"
					rel="noreferrer"
					className="text-[13px] font-medium text-muted transition-colors hover:text-ink"
				>
					Missing one? Add it â†’
				</a>
			</Reveal>

			<ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{SITES.map((s, i) => {
					const isOpen = openSite === s.name;

					return (
						<motion.li
							key={s.name}
							initial={{ opacity: 0, scale: 0.9, y: 16 }}
							whileInView={{ opacity: 1, scale: 1, y: 0 }}
							viewport={{ once: true, margin: "-60px" }}
							transition={{ delay: i * 0.06, duration: 0.4 }}
							className={`group relative rounded-xl border border-white/5 bg-panel/60 transition-colors hover:border-dusk/40 ${
								isOpen ? "z-50" : "z-10"
							}`}
						>
							<button
								type="button"
								aria-expanded={isOpen}
								onClick={() => setOpenSite(isOpen ? null : s.name)}
								className="flex w-full items-center justify-between gap-3 px-4 py-4"
							>
								<div className="flex items-center gap-3">
									<img
										src={s.favicon}
										alt={`${s.name} icon`}
										className="h-8 w-8 rounded-lg bg-void p-1.5 object-contain transition-transform group-hover:scale-110"
									/>
									<span className="text-[14px] font-medium">{s.name}</span>
								</div>
								<motion.div
									animate={{ rotate: isOpen ? 180 : 0 }}
									className="text-muted"
								>
									<ChevronDown size={16} />
								</motion.div>
							</button>

							<AnimatePresence>
								{isOpen && (
									<motion.div
										initial={{ opacity: 0, y: -4, scale: 0.98 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: -4, scale: 0.98 }}
										transition={{ duration: 0.2 }}
										className="absolute left-0 top-[calc(100%+8px)] w-full rounded-xl border border-white/10 bg-panel-2 shadow-2xl shadow-black/80"
									>
										<div className="flex flex-col gap-1 p-2">
											{s.domains.map((domain) => (
												<a
													key={domain}
													href={`https://${domain}`}
													target="_blank"
													rel="noreferrer"
													className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[12.5px] text-muted transition-colors hover:bg-white/5 hover:text-ink"
												>
													{domain}
													<ExternalLink size={12} className="opacity-50" />
												</a>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.li>
					);
				})}
			</ul>
		</section>
	);
}

```

### D:/Code/anikehai-web/src/components/ui/Reveal.tsx
```text
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
	children: ReactNode;
	delay?: number;
	y?: number;
	className?: string;
}

export function Reveal({
	children,
	delay = 0,
	y = 24,
	className,
}: RevealProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

```

### D:/Code/anikehai-web/src/config/data.ts
```text
export const VERSION = "2.6.0";

export const LINKS = {
	firefox: "https://addons.mozilla.org/en-US/firefox/addon/anikehai/",
	releases: "https://github.com/minkxx/AniKehai/releases",
	github: "https://github.com/minkxx/AniKehai",
	issues: "https://github.com/minkxx/AniKehai/issues",
	contributing:
		"https://github.com/minkxx/AniKehai/blob/main/.github/CONTRIBUTING.md",
	discord: "https://discord.gg/w9Q7YUrzpn",
	kiwi: "https://github.com/kiwibrowser/src.next/releases/tag/14310011181",
} as const;

export interface SiteMeta {
	name: string;
	domains: string[];
	favicon: string;
}

export const SITES: SiteMeta[] = [
	{
		name: "Anikoto",
		domains: ["anikototv.to", "anikoto.cz"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=anikototv.to",
	},
	{
		name: "Aniwave",
		domains: ["aniwaves.ru"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=aniwaves.ru",
	},
	{
		name: "AnimePahe",
		domains: ["animepahe.pw"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=animepahe.pw",
	},
	{
		name: "HiAnime",
		domains: ["hianime.at"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=hianime.at",
	},
	{
		name: "Aniwatch",
		domains: ["aniwatch.cx"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=aniwatch.cx",
	},
	{
		name: "ReAnime",
		domains: ["reanime.to"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=reanime.to",
	},
	{
		name: "Miruro",
		domains: ["www.miruro.tv", "www.miruro.to", "www.miruro.cx"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=miruro.tv",
	},
	{
		name: "KissAssAnime",
		domains: ["kaa.lt"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=kaa.lt",
	},
];

export type Platform = "firefox" | "chrome" | "android";

export interface Step {
	title: string;
	body: string;
	copy?: string;
}

export const GUIDES: Record<
	Platform,
	{ label: string; subtitle: string; steps: Step[] }
> = {
	firefox: {
		label: "Firefox",
		subtitle: "Desktop & Android â€” one click, auto-updates.",
		steps: [
			{
				title: "Open the Firefox Add-ons page",
				body: "Head to AniKehai on addons.mozilla.org.",
			},
			{
				title: "Click â€œAdd to Firefoxâ€",
				body: "Confirm the permission prompt. That's the whole install.",
			},
		],
	},
	chrome: {
		label: "Chrome",
		subtitle:
			"Chrome, Edge, Brave, Opera, Vivaldi â€” loaded unpacked until we reach the Web Store.",
		steps: [
			{
				title: "Download the release ZIP",
				body: `Grab anikehai-${VERSION}-chrome.zip from the GitHub Releases page.`,
			},
			{
				title: "Extract the ZIP",
				body: "Unzip it into a normal folder you won't delete.",
			},
			{
				title: "Open the extensions page",
				body: "Paste this into the address bar and press Enter.",
				copy: "chrome://extensions",
			},
			{
				title: "Turn on Developer mode",
				body: "The switch is in the top-right corner.",
			},
			{
				title: "Click â€œLoad unpackedâ€",
				body: "Select the folder you extracted. Done.",
			},
		],
	},
	android: {
		label: "Android",
		subtitle: "Kiwi or Lemur browser â€” sideload the ZIP.",
		steps: [
			{
				title: "Install Kiwi Browser",
				body: "Use the official GitHub release of Kiwi (or any Chrome-extension-capable browser like Lemur).",
			},
			{
				title: "Download the ZIP to your phone",
				body: `Get anikehai-${VERSION}-chrome.zip from the Releases page.`,
			},
			{
				title: "Open Extensions",
				body: "In Kiwi, tap the â‹® menu and choose Extensions.",
			},
			{
				title: "Enable Developer mode",
				body: "Use the toggle at the top right.",
			},
			{
				title: "Load the ZIP",
				body: "Tap â€œ+ (from .zip/.crx/.user.js)â€ and pick the file. Open AniKehai from the bottom of the â‹® menu.",
			},
		],
	},
};

export const FAQ = [
	{
		q: "Do I need a desktop app running?",
		a: "No. Since v2, AniKehai is fully standalone. The extension signs in with Discord OAuth2 and talks to Discord's gateway over WebSockets straight from your browser â€” no Electron app or middleware.",
	},
	{
		q: "How do I link my Discord account?",
		a: "Open the extension popup from your toolbar and click â€œLink with Discordâ€. You'll be sent to Discord's own authorization page to approve it.",
	},
	{
		q: "Can I hide my activity without logging out?",
		a: "Yes. The popup has a privacy toggle that pauses broadcasting instantly while keeping your Discord account linked.",
	},
	{
		q: "It's not showing anything on my profile.",
		a: "Make sure the popup says you're connected, you're on a supported site with an episode playing, and Discord's â€œShare your activityâ€ setting is on. Still stuck? Ask in our Discord server or open a GitHub issue.",
	},
	{
		q: "My favourite site isn't supported.",
		a: "Open a site request on GitHub, or add it yourself â€” each site is a small scraper strategy and the contributing guide walks you through it.",
	},
	{
		q: "Why isn't it on the Chrome Web Store?",
		a: "Not yet. Until then, Chrome installs via â€œLoad unpackedâ€ using the release ZIP. Firefox users get the normal store install.",
	},
];

```

### D:/Code/anikehai-web/src/hooks/useBrowser.ts
```text
import { useEffect, useState } from "react";
import { type BrowserInfo, detectBrowser, resolve } from "../lib/detect";

interface BraveNavigator extends Navigator {
	brave?: { isBrave: () => Promise<boolean> };
}

export function useBrowser(): BrowserInfo {
	const [info, setInfo] = useState<BrowserInfo>(detectBrowser);

	useEffect(() => {
		const brave = (navigator as BraveNavigator).brave;
		if (!brave?.isBrave) return;
		let alive = true;
		brave
			.isBrave()
			.then((is) => {
				if (is && alive) setInfo((prev) => resolve("brave", prev.os));
			})
			.catch(() => {
				/* ignore brave check failures */
			});
		return () => {
			alive = false;
		};
	}, []);

	return info;
}

```

### D:/Code/anikehai-web/src/lib/detect.ts
```text
import { LINKS, type Platform } from "../config/data";

export type BrowserId =
	| "firefox"
	| "chrome"
	| "edge"
	| "brave"
	| "opera"
	| "vivaldi"
	| "samsung"
	| "safari"
	| "other";

export type OsId =
	| "windows"
	| "macos"
	| "linux"
	| "android"
	| "ios"
	| "chromeos"
	| "unknown";

export interface BrowserInfo {
	id: BrowserId;
	name: string;
	os: OsId;
	osName: string;
	platform: Platform | null;
	warn: boolean;
	extensionsUrl: string | null;
	ctaLabel: string;
	ctaHref: string;
	ctaNote: string;
	recommendation: string;
}

const NAMES: Record<BrowserId, string> = {
	firefox: "Firefox",
	chrome: "Chrome",
	edge: "Edge",
	brave: "Brave",
	opera: "Opera",
	vivaldi: "Vivaldi",
	samsung: "Samsung Internet",
	safari: "Safari",
	other: "your browser",
};

const OS_NAMES: Record<OsId, string> = {
	windows: "Windows",
	macos: "macOS",
	linux: "Linux",
	android: "Android",
	ios: "iOS",
	chromeos: "ChromeOS",
	unknown: "your device",
};

const EXT_URLS: Partial<Record<BrowserId, string>> = {
	chrome: "chrome://extensions",
	edge: "edge://extensions",
	brave: "brave://extensions",
	opera: "opera://extensions",
	vivaldi: "vivaldi://extensions",
};

function detectOs(ua: string): OsId {
	if (/android/i.test(ua)) return "android";
	if (/iphone|ipad|ipod/i.test(ua)) return "ios";
	if (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "ios";
	if (/cros/i.test(ua)) return "chromeos";
	if (/windows/i.test(ua)) return "windows";
	if (/mac os/i.test(ua)) return "macos";
	if (/linux/i.test(ua)) return "linux";
	return "unknown";
}

function detectBrowserId(ua: string): BrowserId {
	if (/firefox|fxios/i.test(ua)) return "firefox";
	if (/edg\/|edga|edgios/i.test(ua)) return "edge";
	if (/opr\/|opera/i.test(ua)) return "opera";
	if (/samsungbrowser/i.test(ua)) return "samsung";
	if (/vivaldi/i.test(ua)) return "vivaldi";
	if (/chrome|crios|chromium/i.test(ua)) return "chrome";
	if (/safari/i.test(ua)) return "safari";
	return "other";
}

export function resolve(id: BrowserId, os: OsId): BrowserInfo {
	const base = { id, name: NAMES[id], os, osName: OS_NAMES[os] };

	if (id === "firefox" && os !== "ios") {
		return {
			...base,
			platform: "firefox",
			warn: false,
			extensionsUrl: null,
			ctaLabel: "Add to Firefox",
			ctaHref: LINKS.firefox,
			ctaNote: "Free Â· Firefox Add-ons",
			recommendation:
				"Install straight from the Firefox Add-ons store â€” one click, automatic updates.",
		};
	}

	if (os === "ios" || id === "safari") {
		return {
			...base,
			platform: null,
			warn: true,
			extensionsUrl: null,
			ctaLabel: "See install options",
			ctaHref: "#install",
			ctaNote: "Not available on Safari or iOS",
			recommendation: `AniKehai can't run on ${id === "safari" ? "Safari" : "iOS"}. Open this page in Firefox or a Chromium browser on a computer, or use Firefox / Kiwi on Android.`,
		};
	}

	if (os === "android") {
		return {
			...base,
			platform: "android",
			warn: true,
			extensionsUrl: null,
			ctaLabel: "Get it for Android",
			ctaHref: "#install",
			ctaNote: "Kiwi, Lemur or Firefox Â· see the guide",
			recommendation: `${NAMES[id]} on Android can't run extensions. Use Kiwi Browser (sideload the ZIP) or switch to Firefox for Android.`,
		};
	}

	return {
		...base,
		platform: "chrome",
		warn: false,
		extensionsUrl: EXT_URLS[id] ?? "chrome://extensions",
		ctaLabel:
			id === "other" ? "Download for Chromium" : `Download for ${NAMES[id]}`,
		ctaHref: LINKS.releases,
		ctaNote: "Free Â· load unpacked, takes a minute",
		recommendation: `${NAMES[id]} uses the Chromium build: download the ZIP, extract it and load it unpacked. We'll walk you through it.`,
	};
}

export function detectBrowser(): BrowserInfo {
	if (typeof navigator === "undefined") return resolve("chrome", "unknown");
	const ua = navigator.userAgent;
	return resolve(detectBrowserId(ua), detectOs(ua));
}

```

### D:/Code/anikehai-web/src/styles/index.css
```text
@import "tailwindcss";

@theme {
	--color-void: #0b0b14;
	--color-panel: #15151f;
	--color-panel-2: #1c1c2a;
	--color-ink: #edebf5;
	--color-muted: #8b8aa3;
	--color-amber: #ffb454;
	--color-dusk: #7c5cff;
	--color-cyan: #22d3ee;
	--font-display: "Bricolage Grotesque", "Inter", system-ui, sans-serif;
	--font-jp: "Noto Serif JP", serif;

	--animate-marquee: marquee 40s linear infinite;
	--animate-shimmer: shimmer 3s ease-in-out infinite;
	--animate-gradient: gradient 6s ease infinite;
	--animate-aurora-a: aurora-a 18s ease-in-out infinite;
	--animate-aurora-b: aurora-b 24s ease-in-out infinite;

	@keyframes marquee {
		to {
			transform: translateX(-50%);
		}
	}
	@keyframes shimmer {
		0% {
			transform: translateX(-120%);
		}
		60%,
		100% {
			transform: translateX(120%);
		}
	}
	@keyframes gradient {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
	@keyframes aurora-a {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(-6rem, 4rem) scale(1.25);
		}
	}
	@keyframes aurora-b {
		0%,
		100% {
			transform: translate(0, 0) scale(1.1);
		}
		50% {
			transform: translate(5rem, -3rem) scale(0.9);
		}
	}
}

html {
	scroll-behavior: smooth;
	scroll-padding-top: 5rem;
}

html,
body {
	overflow-x: clip;
	background-color: var(--color-void);
	color: var(--color-ink);
	color-scheme: dark;
	font-family: "Inter", system-ui, -apple-system, sans-serif;
	margin: 0;
	min-height: 100vh;
}

body {
	background-image:
		radial-gradient(
			60rem 30rem at 85% -5%,
			rgb(124 92 255 / 0.16),
			transparent 60%
		),
		radial-gradient(
			40rem 25rem at -5% 20%,
			rgb(34 211 238 / 0.07),
			transparent 60%
		);
	background-repeat: no-repeat;
}

::selection {
	background: rgb(124 92 255 / 0.45);
}

@media (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}
}

@media (prefers-reduced-motion: reduce) {
	[class*="animate-"] {
		animation: none !important;
	}
}

```

