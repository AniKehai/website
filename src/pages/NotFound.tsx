import { ButtonLink, PageShell, Section } from "../components/ui/PageShell";
import { SmartLink } from "../components/ui/SmartLink";
import { TROUBLESHOOTING_PATH } from "../config/pages";

export function NotFound() {
	return (
		<PageShell
			title="Page not found"
			lead="That page doesn't exist or has moved. Try one of these instead."
		>
			<Section title="Popular pages">
				<p className="flex flex-wrap gap-x-4 gap-y-1">
					<SmartLink href="/#install">Install AniKehai</SmartLink>
					<SmartLink href="/#sites">Supported sites</SmartLink>
					<SmartLink href={TROUBLESHOOTING_PATH}>
						Rich Presence not showing
					</SmartLink>
				</p>
				<div className="mt-2">
					<ButtonLink href="/">Back to the homepage</ButtonLink>
				</div>
			</Section>
		</PageShell>
	);
}
