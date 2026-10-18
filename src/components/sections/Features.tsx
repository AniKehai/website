import {
	Activity,
	HatGlasses,
	Image,
	Shield,
	Smartphone,
	Zap,
} from "lucide-react";
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
