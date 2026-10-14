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
								minkxx23 • he/him
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
				{paused ? "Resume playback" : "Pause playback"} — try it
			</motion.button>
		</div>
	);
}
