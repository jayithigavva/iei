import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Our Work", id: "work" },
    { label: "Partnerships", id: "partnerships" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-oxford-blue/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-width">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold text-eggshell hover:text-blood-red smooth-transition"
          >
            IEI
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-eggshell/70 hover:text-eggshell smooth-transition font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-blood-red hover:bg-blood-red/80 text-eggshell px-6 py-2 font-semibold glow-effect smooth-transition"
            >
              Dashboard
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-eggshell"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-oxford-blue/95 backdrop-blur-md border-t border-eggshell/20">
          <div className="container-width py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-eggshell/70 hover:text-eggshell smooth-transition font-medium text-left py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => window.location.href = '/dashboard'}
                className="bg-blood-red hover:bg-blood-red/80 text-eggshell font-semibold mt-2 w-full"
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;