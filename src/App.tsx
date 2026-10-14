import { MotionConfig } from "motion/react";
import { Footer } from "./components/layout/Footer";
import { Nav } from "./components/layout/Nav";
import { Faq } from "./components/sections/Faq";
import { Features } from "./components/sections/Features";
import { Hero } from "./components/sections/Hero";
import { Install } from "./components/sections/Install";
import { Sites } from "./components/sections/Sites";
import { useBrowser } from "./hooks/useBrowser";

export default function App() {
	const info = useBrowser();

	return (
		<MotionConfig reducedMotion="user">
			<Nav />
			<main>
				<Hero info={info} />
				<Features />
				<Install info={info} />
				<Sites />
				<Faq />
			</main>
			<Footer />
		</MotionConfig>
	);
}
