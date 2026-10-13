import Hero from "@/components/marketing/Hero";
import AboutSection from "@/components/marketing/AboutSection";
import LogoMarquee from "@/components/marketing/LogoMarquee";
import WorkGrid from "@/components/marketing/WorkGrid";
import ServicesSection from "@/components/marketing/ServicesSection";
import TestimonialsSection from "@/components/marketing/TestimonialsSection";


export default function HomePage() {
  return (
    <main>
      <Hero />

      <section id="about">
        <AboutSection />
      </section>

      <section id="work">
        <LogoMarquee />
        <WorkGrid />
      </section>

      <section id="services"><ServicesSection /></section>

      <section id="testimonials">
        <TestimonialsSection />
     </section>

    </main>
  );
}