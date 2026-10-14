import { useEffect, useState } from "react";
import { type BrowserInfo, detectBrowser, resolve } from "../lib/detect";

interface BraveNavigator extends Navigator {
	brave?: { isBrave: () => Promise<boolean> };
}

export function useBrowser(): BrowserInfo {
	const [info, setInfo] = useState<BrowserInfo>(detectBrowser);

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

	return info;
}
