import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.tsx";

export { FAQ, LINKS, SITES, VERSION } from "./config/data.ts";

export function render(): string {
	return renderToString(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
