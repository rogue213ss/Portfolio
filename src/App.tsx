import { useState } from "react";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillMatrix from "./components/SkillMatrix";
import Projects from "./components/Projects";
import GithubSection from "./components/GithubSection";
import Loop from "./components/Loop";
import Timeline from "./components/Timeline";
import CurrentlyBuilding from "./components/CurrentlyBuilding";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-noise relative min-h-screen bg-obsidian">
      <Loader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      {loaded && (
        <>
          <Navigation />
          <main>
            <Hero />
            <About />
            <SkillMatrix />
            <Projects />
            <GithubSection />
            <Loop />
            <Timeline />
            <CurrentlyBuilding />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
