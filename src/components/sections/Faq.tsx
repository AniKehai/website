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
