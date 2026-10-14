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
					Missing one? Add it →
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
