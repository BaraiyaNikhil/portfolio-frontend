import CursorGlow from "./animetions/CursorGlow";
import Stich from "./components/Stich";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import AboutMe from "./pages/AboutMe";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import ContactMe from "./pages/ContactMe";
import Footer from "./components/Footer";
import Skills from "./pages/Skills";

function App() {

  return (
    <>
    <Navbar/>
    <CursorGlow/>
      <div className="relative">
        <Hero />
        <Stich/>
        <AboutMe />
        <Stich/>
        <Experience/>
        <Stich/>
        <Projects/>
        <Stich/>
        <Skills/>
        <Stich/>
        <Education/>
        <Stich/>
        <ContactMe/>
        <Stich/>
      </div>
      <Footer/>
    </>
  )
}

export default App
