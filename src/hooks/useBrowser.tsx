import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	type BrowserInfo,
	DEFAULT_INFO,
	detectBrowser,
	resolve,
} from "../lib/detect";

interface BraveNavigator extends Navigator {
	brave?: { isBrave: () => Promise<boolean> };
}

const BrowserContext = createContext<BrowserInfo>(DEFAULT_INFO);

export function BrowserProvider({ children }: { children: ReactNode }) {
	const [info, setInfo] = useState<BrowserInfo>(DEFAULT_INFO);

	useEffect(() => {
		setInfo(detectBrowser());
	}, []);

	useEffect(() => {
		const brave = (navigator as BraveNavigator).brave;
		if (!brave?.isBrave) return;
		let alive = true;
		brave
			.isBrave()
			.then((is) => {
				if (is && alive) setInfo((prev) => resolve("brave", prev.os));
			})
			.catch(() => {
				/* ignore brave check failures */
			});
		return () => {
			alive = false;
		};
	}, []);

	return <BrowserContext value={info}>{children}</BrowserContext>;
}

export function useBrowser(): BrowserInfo {
	return useContext(BrowserContext);
}
