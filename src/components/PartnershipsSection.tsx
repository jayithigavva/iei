import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PartnershipsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Partners with logo URLs
  const partners = [
    { 
      name: "ACORN India", 
      description: "Community empowerment and advocacy",
      url: "https://acornindia.org.in/",
      logo: "/acorn.jpeg"
    },
    { 
      name: "Rotract Club of KC College", 
      description: "Supporting local social initiatives",
      url: "https://www.instagram.com/rckcofficial?igsh=MXBkODJsMXZwMWZqZQ==",
      logo: "/rotary.jpeg"
    }
  ];

  return (
    <section ref={ref} id="partnerships" className="section-padding bg-federal-blue">
      <div className="container-width">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-eggshell mb-6"
          >
            Our Partnerships
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-eggshell/80 max-w-3xl mx-auto leading-relaxed"
          >
            Collaborating with organizations across India to create meaningful impact in the informal economy sector.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              <Card className="bg-oxford-blue border-2 border-blood-red/30 hover:border-blood-red smooth-transition group cursor-pointer h-full">
                <CardContent className="p-8 text-center">
                  {/* Clickable Logo Image */}
                  <a href={partner.url} target="_blank" rel="noopener noreferrer">
                    <div className="w-24 h-24 mx-auto mb-6 bg-eggshell/10 rounded-full p-2 group-hover:bg-blood-red/20 smooth-transition">
                      <img 
                        src={partner.logo} 
                        alt={`${partner.name} logo`} 
                        className="w-full h-full object-contain mx-auto transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </a>
                  
                  <h3 className="text-xl font-bold text-eggshell mb-3 group-hover:text-blood-red smooth-transition">
                    {partner.name}
                  </h3>
                  
                  <p className="text-eggshell/70 leading-relaxed">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
