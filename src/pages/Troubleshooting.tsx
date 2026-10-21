import { PageShell, Section } from "../components/ui/PageShell";
import { SmartLink } from "../components/ui/SmartLink";
import { LINKS } from "../config/data";

export function Troubleshooting() {
	return (
		<PageShell
			title="Discord Rich Presence not showing? Fix it"
			lead="If AniKehai isn't displaying your anime on your Discord profile, work through these checks in order. Most problems are one of the first four."
		>
			<Section title="1. Check the extension is connected">
				<p>
					Open the AniKehai popup from your toolbar. It should say you're
					connected. If it doesn't, press <strong>Link with Discord</strong> and
					approve the request on Discord's authorization page.
				</p>
			</Section>
			<Section title="2. Play an episode on a supported site">
				<p>
					AniKehai only updates your presence while an episode is playing on a{" "}
					<SmartLink href="/#sites">supported site</SmartLink> and domain. If
					your site or domain isn't on the list, request it on GitHub.
				</p>
			</Section>
			<Section title="3. Turn on Discord's “Share your activity” setting">
				<p>
					Discord has to be allowed to display activity on your profile. Make
					sure “Share your activity” is enabled in your Discord settings, then
					reload the episode.
				</p>
			</Section>
			<Section title="4. Check the privacy and broadcast toggles">
				<p>
					With the privacy toggle on, Discord shows only “Anime — Private
					Session” instead of the title. With broadcasting switched off in the
					popup, nothing is sent at all. Turn the one you want back on; your
					Discord account stays linked either way.
				</p>
			</Section>
			<Section title="5. Use a supported browser">
				<p>
					AniKehai runs on Firefox, Chromium browsers (Chrome, Edge, Brave,
					Opera, Vivaldi) and Android browsers with extension support such as
					Kiwi. Safari and iOS are not supported, and Chrome for Android can't
					run extensions. See the{" "}
					<SmartLink href="/install/android">Android guide</SmartLink> or{" "}
					<SmartLink href="/install/chrome">Chromium guide</SmartLink>.
				</p>
			</Section>
			<Section title="Still stuck?">
				<p>
					Ask in the{" "}
					<SmartLink href={LINKS.discord}>AniKehai Discord server</SmartLink> or{" "}
					<SmartLink href={LINKS.issues}>open a GitHub issue</SmartLink> with
					your browser, operating system and the site you were watching on.
				</p>
			</Section>
		</PageShell>
	);
}
