import { useRef } from "react";
import BackToTop from "../components/BackToTop";
import Couple from "../components/Couple";
import Events from "../components/Events";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Greetings from "../components/Greetings";
import Header from "../components/Header";
import Hero from "../components/Hero";
import IntroVideo from "../components/IntroVideo";
import Rsvp from "../components/Rsvp";
import WeddingMusic, {
  type WeddingMusicHandle,
} from "../components/WeddingMusic";

export default function HomePage() {
  const musicRef = useRef<WeddingMusicHandle>(null);

  const startMusic = () => {
    void musicRef.current?.start();
  };

  return (
    <div className="relative">
      <IntroVideo onStartMusic={startMusic} />
      <Header />
      <WeddingMusic ref={musicRef} />
      <main>
        <Hero />
        <Couple />
        <Gallery />
        <Rsvp />
        <Greetings />
        <Events />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
