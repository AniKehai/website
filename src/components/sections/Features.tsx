import {
	Activity,
	HatGlasses,
	Image,
	Shield,
	Smartphone,
	Zap,
} from "lucide-react";
import type { ReactNode } from "react";

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
		icon: <HatGlasses size={18} />,
		title: "Privacy toggle",
		body: "Hides which anime you watch. Discord only shows 'Anime — Private Session'.",
	},
	{
		icon: <Shield size={18} />,
		title: "Broadcast toggle",
		body: "Switch broadcasting off from the popup without ever logging out of Discord.",
	},
];

export function Features() {
	return (
		<section id="features" className="mx-auto max-w-6xl px-5 pb-20">
			<div>
				<p className="text-xs font-semibold tracking-[0.22em] text-cyan">
					FEATURES
				</p>
				<h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
					What the AniKehai Discord extension does
				</h2>
			</div>
			<div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
				{items.map((f) => (
					<div
						key={f.title}
						className="group flex gap-4 transition-transform hover:translate-x-1"
					>
						<span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-cyan transition-colors group-hover:border-cyan/50 group-hover:bg-cyan/10">
							{f.icon}
						</span>
						<div>
							<h3 className="text-[15px] font-semibold">{f.title}</h3>
							<p className="mt-1 text-[13.5px] leading-relaxed text-muted">
								{f.body}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
