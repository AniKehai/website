import { LINKS, SITES, siteSlug } from "../../config/data";
import { SmartLink } from "../ui/SmartLink";

export function SiteIcon({ src, name }: { src: string; name: string }) {
	return (
		<img
			src={src}
			alt={`${name} icon`}
			width={32}
			height={32}
			loading="lazy"
			decoding="async"
			referrerPolicy="no-referrer"
			className="h-8 w-8 shrink-0 rounded-lg bg-void p-1.5 object-contain transition-transform group-hover:scale-110"
		/>
	);
}

export function Sites() {
	return (
		<section id="sites" className="mx-auto max-w-6xl px-5 py-20">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="text-xs font-semibold tracking-[0.22em] text-cyan">
						SUPPORTED SITES
					</p>
					<h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
						Anime sites that work with AniKehai
					</h2>
				</div>
				<SmartLink
					href={LINKS.contributing}
					className="text-[13px] font-medium text-muted transition-colors hover:text-ink"
				>
					Missing one? Add it →
				</SmartLink>
			</div>

			<ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{SITES.map((s) => (
					<li key={s.name}>
						<SmartLink
							href={`/sites/${siteSlug(s.name)}`}
							className="group flex h-full items-center gap-3 rounded-xl border border-white/5 bg-panel/60 px-4 py-4 transition-colors hover:border-dusk/40"
						>
							<SiteIcon src={s.favicon} name={s.name} />
							<span className="min-w-0">
								<span className="block text-[14px] font-medium">{s.name}</span>
								<span className="block truncate text-[12px] text-muted">
									{s.domains[0].replace(/^www\./, "")}
								</span>
							</span>
						</SmartLink>
					</li>
				))}
			</ul>
		</section>
	);
}
