import type { ComponentType } from "react";
import { Route, Routes } from "react-router";
import { Footer } from "./components/layout/Footer";
import { Nav } from "./components/layout/Nav";
import { RouteEffects } from "./components/layout/RouteEffects";
import { PAGES, type PageKind } from "./config/pages";
import { BrowserProvider } from "./hooks/useBrowser";
import { About } from "./pages/About";
import { Changelog } from "./pages/Changelog";
import { Compare } from "./pages/Compare";
import { Home } from "./pages/Home";
import { InstallPage } from "./pages/InstallPage";
import { NotFound } from "./pages/NotFound";
import { Privacy } from "./pages/Privacy";
import { SitePage } from "./pages/SitePage";
import { Troubleshooting } from "./pages/Troubleshooting";

const VIEWS: Record<PageKind, ComponentType> = {
	home: Home,
	install: InstallPage,
	site: SitePage,
	troubleshooting: Troubleshooting,
	changelog: Changelog,
	privacy: Privacy,
	about: About,
	compare: Compare,
	notfound: NotFound,
};

export default function App() {
	return (
		<BrowserProvider>
			<RouteEffects />
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-60 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:font-semibold focus:text-void"
			>
				Skip to content
			</a>
			<header className="sticky top-0 z-50">
				<Nav />
			</header>
			<main id="main" tabIndex={-1} className="outline-none">
				<Routes>
					{PAGES.map((p) => {
						const View = VIEWS[p.kind];
						return <Route key={p.path} path={p.path} element={<View />} />;
					})}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</BrowserProvider>
	);
}
