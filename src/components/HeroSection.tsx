import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Smooth Emergence */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat md:bg-cover animate-emerge"
        style={{ 
          backgroundImage: `url(/lovable-uploads/background.jpeg)`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/50" />
      
      {/* Content */}
      <div className="relative z-10 text-center container-width section-padding">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
          Informal Economy{" "}
          <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
            Index
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-eggshell/80 mb-12 max-w-4xl mx-auto leading-relaxed">
          Quantifying the Unseen: India's First Youth-Led Index for Informal Workers
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            size="lg" 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-blood-red hover:bg-blood-red/80 text-eggshell px-8 py-4 text-lg font-semibold glow-effect smooth-transition shadow-xl shadow-blood-red/30"
          >
            Take Survey
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToSection('about')}
            className="border-2 border-eggshell text-eggshell hover:bg-eggshell hover:text-federal-blue px-8 py-4 text-lg font-semibold smooth-transition"
          >
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blood-red rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blood-red rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;