import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WorkflowSection from "@/components/WorkflowSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import GeoPortal from "@/components/GeoPortal";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <WorkflowSection />
      <FeaturesSection />
      <div id="portal" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-xs font-mono text-muted-foreground tracking-wider">ГЕОПОРТАЛ</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 max-w-lg leading-tight">
              Интерактивная карта заповедника
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Загружайте GeoJSON слои, управляйте видимостью, кликайте по объектам — данные появятся на дашборде справа.
            </p>
          </div>
          <GeoPortal />
        </div>
      </div>
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
