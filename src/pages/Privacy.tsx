import { PageShell, Section } from "../components/ui/PageShell";
import { SmartLink } from "../components/ui/SmartLink";
import { LINKS } from "../config/data";
import { PLAUSIBLE_DOMAIN } from "../config/site";

export function Privacy() {
	return (
		<PageShell
			title="Privacy and permissions"
			lead="What the AniKehai extension and this website do with your information, in plain language."
		>
			<Section title="What the extension reads">
				<p>
					On supported anime sites, AniKehai reads details about the episode
					you're watching (title, episode, cover art and playback progress) so
					it can build your Rich Presence. It doesn't need to run anywhere else.
				</p>
			</Section>
			<Section title="How Discord sign-in works">
				<p>
					You link your account through Discord's own OAuth2 authorization page.
					The extension then updates your presence by talking to Discord's
					gateway over WebSockets directly from your browser. There is no
					desktop app and no background middleware.
				</p>
			</Section>
			<Section title="Cover art">
				<p>
					Cover art comes from the anime site, with an AniList fallback for
					sites that protect their assets, so AniList may receive a request for
					the cover image.
				</p>
			</Section>
			<Section title="Your controls">
				<ul className="list-disc pl-5">
					<li>
						<strong>Privacy toggle:</strong> hides what you watch; Discord shows
						“Anime — Private Session”.
					</li>
					<li>
						<strong>Broadcast toggle:</strong> stops broadcasting without
						logging you out of Discord.
					</li>
				</ul>
			</Section>
			<Section title="This website">
				<p>
					This site has no accounts or forms. Its demo card loads a GitHub
					avatar and AniList cover art, and the supported-sites list loads small
					site icons from Google's favicon service, so those services see
					ordinary image requests.
					{PLAUSIBLE_DOMAIN
						? " Visits are counted with Plausible, a cookie-free analytics service."
						: ""}
				</p>
			</Section>
			<Section title="Check it yourself">
				<p>
					AniKehai is open source under the MIT license, so you can read exactly
					what it does in the{" "}
					<SmartLink href={LINKS.github}>source code on GitHub</SmartLink>.
					Questions? Ask in the{" "}
					<SmartLink href={LINKS.discord}>Discord server</SmartLink>.
				</p>
			</Section>
		</PageShell>
	);
}
