import BackToTop from "../components/BackToTop";
import Blog from "../components/Blog";
import Couple from "../components/Couple";
import Events from "../components/Events";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Greetings from "../components/Greetings";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Rsvp from "../components/Rsvp";
import Story from "../components/Story";

export default function HomePage() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <Couple />
        <Story />
        <Gallery />
        <Rsvp />
        <Greetings />
        <Events />
        <Blog />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
