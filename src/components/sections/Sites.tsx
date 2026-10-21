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
			className="h-8 w-8 shrink-0 rounded-lg bg-panel object-contain p-1.5"
		/>
	);
}

export function Sites() {
	return (
		<section id="sites" className="mx-auto max-w-6xl px-5 py-24">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
					Anime sites that work with AniKehai
				</h2>
				<SmartLink
					href={LINKS.contributing}
					className="text-[14px] font-medium text-ink underline decoration-mauve underline-offset-4 transition-colors hover:decoration-ink"
				>
					Missing one? Add it
				</SmartLink>
			</div>

			<ul className="reveal mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{SITES.map((s) => (
					<li key={s.name}>
						<SmartLink
							href={`/sites/${siteSlug(s.name)}`}
							className="flex h-full items-center gap-3 rounded-xl border border-line px-4 py-4 transition-colors hover:border-mauve hover:bg-panel"
						>
							<SiteIcon src={s.favicon} name={s.name} />
							<span className="min-w-0">
								<span className="block text-[15px] font-medium text-ink">
									{s.name}
								</span>
								<span className="block truncate text-[13px] text-muted">
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
