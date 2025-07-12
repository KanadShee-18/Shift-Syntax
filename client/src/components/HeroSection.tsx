import Demo from "./hero-section/Demo";
import Features from "./hero-section/Features";
import Footer from "./hero-section/Footer";
import Hero from "./hero-section/Hero";
import SupportedFormats from "./hero-section/SupportedFormats";

const HomeSection = () => {
  return (
    <div>
      <Hero />
      <Demo />
      <Features />
      <SupportedFormats />
      <Footer />
    </div>
  );
};

export default HomeSection;
