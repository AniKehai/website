import { MonitorPlay, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

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
	const [{ idx, t, swaps }, setPlayer] = useState({
		idx: 0,
		t: SHOWS[0].start,
		swaps: 0,
	});
	const [paused, setPaused] = useState(false);
	const show = SHOWS[idx];

	useEffect(() => {
		if (paused) return;
		const tick = setInterval(
			() => setPlayer((p) => ({ ...p, t: (p.t + 1) % SHOWS[p.idx].total })),
			1000,
		);
		const next = setInterval(
			() =>
				setPlayer((p) => {
					const i = (p.idx + 1) % SHOWS.length;
					return { idx: i, t: SHOWS[i].start, swaps: p.swaps + 1 };
				}),
			7000,
		);
		return () => {
			clearInterval(tick);
			clearInterval(next);
		};
	}, [paused]);

	return (
		<div className="relative w-full max-w-90">
			<div className="rounded-2xl border border-line bg-void p-5 text-left shadow-2xl shadow-black/40">
				<div className="mb-5 flex items-center gap-4">
					<div className="relative shrink-0">
						<img
							src="https://github.com/minkxx.png"
							alt="Minkxx Profile"
							width={68}
							height={68}
							decoding="async"
							referrerPolicy="no-referrer"
							className="h-17 w-17 rounded-full bg-panel object-cover"
						/>
						<span className="absolute bottom-0 right-0 h-5 w-5 rounded-full border-4 border-void bg-emerald-500" />
					</div>
					<div className="mt-1 flex flex-col leading-tight">
						<span className="text-xl font-bold text-ink">Minkxx</span>
						<span className="mt-0.5 text-[13px] text-muted">
							minkxx23 • he/him
						</span>
					</div>
				</div>

				<div className="rounded-xl bg-panel p-3">
					<p className="mb-2 text-[11px] font-medium text-muted">
						Watching anime
					</p>

					<div
						key={show.title}
						className={`flex gap-4 ${swaps > 0 ? "animate-swap" : ""}`}
					>
						<div className="relative shrink-0">
							<img
								src={show.poster}
								alt={show.title}
								width={72}
								height={72}
								decoding="async"
								referrerPolicy="no-referrer"
								className="h-18 w-18 rounded-lg bg-wine object-cover"
							/>
							<div className="absolute -bottom-1.5 -right-1.5 rounded-full bg-panel p-1">
								<div
									className={`grid h-7 w-7 place-items-center rounded-full bg-ink ${paused ? "" : "pl-0.5"}`}
								>
									{paused ? (
										<Pause size={14} className="fill-void text-void" />
									) : (
										<Play size={14} className="fill-void text-void" />
									)}
								</div>
							</div>
						</div>

						<div className="flex min-w-0 flex-1 flex-col justify-center">
							<p className="truncate text-[13px] font-bold text-ink">
								{show.title}
							</p>
							<p className="mt-0.5 truncate text-[11px] text-muted">
								{show.episode}
							</p>

							{paused ? (
								<div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium tabular-nums text-ink">
									<MonitorPlay
										size={13}
										strokeWidth={2.5}
										className="fill-ink/20"
									/>
									<span>{fmt(t)}</span>
								</div>
							) : (
								<div className="mt-1 flex items-center gap-2 text-[11px] font-medium tabular-nums text-muted">
									<span>{fmt(t)}</span>
									<div className="h-0.5 flex-1 overflow-hidden rounded-full bg-ink/20">
										<div
											className="h-full rounded-full bg-ink transition-[width] duration-1000 ease-linear"
											style={{ width: `${(t / show.total) * 100}%` }}
										/>
									</div>
									<span>{fmt(show.total)}</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<button
				type="button"
				onClick={() => setPaused((p) => !p)}
				className="mx-auto mt-7 flex items-center gap-2 rounded-full border border-ink/25 bg-void/40 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-void/70 active:scale-95"
			>
				{paused ? <Play size={13} /> : <Pause size={13} />}
				{paused ? "Resume the demo" : "Pause the demo"}
			</button>
		</div>
	);
}
