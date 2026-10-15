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
				気配
			</motion.span>

			<div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.15fr_1fr] lg:pt-24">
				<div>
					<motion.p
						initial={{ opacity: 0, x: -12 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="text-xs font-semibold tracking-[0.22em] text-cyan"
					>
						気配 · THE PRESENCE OF ANIME
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
						into a live Discord Rich Presence — title, episode, cover art and a
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
						<div className="min-h-6.5">
							<AnimatePresence mode="wait" initial={false}>
								{info.detected && (
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
								)}
							</AnimatePresence>
						</div>
						<span>
							{info.ctaNote} · v{VERSION} · {SITES.length} sites supported
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
