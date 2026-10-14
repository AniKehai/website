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
