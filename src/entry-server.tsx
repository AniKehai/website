import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.tsx";

export { NOT_FOUND, PAGES } from "./config/pages.ts";
export { SITE_URL } from "./config/site.ts";
export {
	headHtml,
	llmsFullTxt,
	llmsTxt,
	robotsTxt,
	sitemapXml,
} from "./lib/prerender.ts";

export function render(path: string): string {
	return renderToString(
		<StrictMode>
			<StaticRouter location={path}>
				<App />
			</StaticRouter>
		</StrictMode>,
	);
}
