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
										Kiwi Browser release →
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
						approve the request. Open any episode on a supported site — your
						Rich Presence updates automatically.
					</p>
				</div>
			</Reveal>
		</section>
	);
}
