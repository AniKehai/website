import { Faq } from "../components/sections/Faq";
import { Features } from "../components/sections/Features";
import { Hero } from "../components/sections/Hero";
import { Install } from "../components/sections/Install";
import { Overview } from "../components/sections/Overview";
import { Sites } from "../components/sections/Sites";

export function Home() {
	return (
		<>
			<Hero />
			<Overview />
			<Features />
			<Install />
			<Sites />
			<Faq />
		</>
	);
}
