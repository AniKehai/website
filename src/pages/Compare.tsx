import { ButtonLink, PageShell, Section } from "../components/ui/PageShell";

const ROWS = [
	["Needs a desktop app", "No", "No"],
	["Where it runs", "Inside your browser", "Inside your browser"],
	["Android support", "Yes (Firefox, Kiwi, Lemur)", "Generally desktop only"],
	["Focus", "Anime only", "Many websites and services"],
	["Privacy toggle", "Yes, one click", "Varies"],
] as const;

export function Compare() {
	return (
		<PageShell
			title="AniKehai as a PreMiD alternative for anime"
			lead="AniKehai and tools like PreMiD both put what you're doing on Discord. They take different approaches, so here is how they differ and who each suits."
		>
			<Section title="At a glance">
				<div className="overflow-x-auto">
					<table className="w-full min-w-136 border-collapse text-left text-[14px]">
						<thead>
							<tr className="border-b border-mauve text-ink">
								<th className="py-2 pr-4 font-semibold" scope="col">
									&nbsp;
								</th>
								<th className="bg-wine px-4 py-3 font-semibold" scope="col">
									AniKehai
								</th>
								<th className="px-4 py-3 font-semibold" scope="col">
									Premid
								</th>
							</tr>
						</thead>
						<tbody>
							{ROWS.map(([k, a, b]) => (
								<tr key={k} className="border-b border-line">
									<th className="py-3 pr-4 font-medium text-ink" scope="row">
										{k}
									</th>
									<td className="bg-wine px-4 py-3 text-ink">{a}</td>
									<td className="px-4 py-3">{b}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className="text-[13px]">
					The right-hand column describes similar tools such as PreMiD; check their own documentation for current
					details. AniKehai is not affiliated with PreMiD.
				</p>
			</Section>
			<Section title="Choose AniKehai if">
				<ul className="list-disc pl-5">
					<li>You only need anime and want the simplest setup.</li>
					<li>You don't want to run a desktop app.</li>
					<li>You want Rich Presence from an Android browser.</li>
				</ul>
			</Section>
			<Section title="Choose a general tool if">
				<ul className="list-disc pl-5">
					<li>You want presence for many services beyond anime.</li>
					<li>Your anime site isn't supported by AniKehai yet.</li>
				</ul>
				<div className="mt-2">
					<ButtonLink href="/#install">Try AniKehai</ButtonLink>
				</div>
			</Section>
		</PageShell>
	);
}
