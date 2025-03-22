import { Button } from "@/components/ui/button";
import AboutSection from "@/containers/landing-page/about-section/AboutSection";
import FeatureSection from "@/containers/landing-page/feature-section/FeatureSection";
import Footer from "@/containers/landing-page/footer-section/Footer";
import HeroSection from "@/containers/landing-page/hero-section/HeroSection";
import HowItWorksSection from "@/containers/landing-page/how-it-works-section/HowItWorks";
import Navbar from "@/containers/landing-page/nav-section/Navbar";
import PricingSection from "@/containers/landing-page/pricing-section/PricingSection";
import StatisticsSection from "@/containers/landing-page/statistics-section/StatisticsSection";
import Testimonial from "@/containers/landing-page/testimonial-section/Testimonial";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection/>
      <section className="w-full py-16 padding bg-background flex items-center justify-center flex-col gap-5">
        <h2 className="text-3xl text-foreground font-bold text-center">Ready to streamline your job search?</h2>
        <Button className="cursor-pointer bg-blue-500 text-white hover:bg-blue-700" role="button" aria-label="Get started for free">
        Start Tracking for Free
        </Button>
      </section>
      <Testimonial />
      <StatisticsSection/>
      <PricingSection />
      <AboutSection />
      <Footer />
    </>
  );
}
