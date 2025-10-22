import { Instagram, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    // Check if we're on the dashboard page
    if (window.location.pathname === '/dashboard') {
      // Navigate to home page with hash
      window.location.href = `/#${id}`;
    } else {
      // We're on home page, just scroll
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const quickLinks = [
    { label: "About", id: "about" },
    { label: "Our Work", id: "work" },
    { label: "Partnerships", id: "partnerships" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="bg-oxford-blue border-t-2 border-blood-red/40 relative z-10">
      <div className="container-width py-20">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 pr-8 px-[12px] mx-[3px] my-0 py-[2px]">
            <h3 className="text-2xl font-bold text-eggshell mb-4">
              Informal Economy Index
            </h3>
            <p className="text-eggshell/70 leading-relaxed mb-6 max-w-md">
              India's first youth-led index tracking the 90% working in the informal
              economy. Making the unseen visible through data, education, and
              community empowerment.
            </p>

            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/informaleconomyindex?igsh=NnBuejExYnZxejVx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram"
                className="w-10 h-10 bg-blood-red rounded-lg flex items-center justify-center hover:bg-federal-blue smooth-transition border border-blood-red/50"
              >
                <Instagram className="w-5 h-5 text-eggshell" />
              </a>

              <a
                href="mailto:informaleconomyindex@gmail.com"
                aria-label="Email us"
                className="w-10 h-10 bg-blood-red rounded-lg flex items-center justify-center hover:bg-federal-blue smooth-transition border border-blood-red/50"
              >
                <Mail className="w-5 h-5 text-eggshell" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="px-4">
            <h4 className="text-lg font-semibold text-eggshell mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-eggshell/70 hover:text-blood-red smooth-transition text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="px-0 mx-[14px]">
            <h4 className="text-lg font-semibold text-eggshell mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blood-red" />
                <a
                  href="mailto:informaleconomyindex@gmail.com"
                  className="text-eggshell/70 text-sm hover:text-blood-red hover:underline smooth-transition break-all"
                >
                  informaleconomyindex@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blood-red" />
                <span className="text-eggshell/70 text-sm">India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-federal-blue/30 mt-12 pt-8 text-center">
          <p className="text-eggshell/60 text-sm">
            © 2025 Informal Economy Index. All rights reserved. Built with passion for social impact.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
