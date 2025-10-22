import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const StatsSection = () => {
  const [volunteers, setVolunteers] = useState(0);
  const [surveyed, setSurveyed] = useState(0);
  const [partners, setPartners] = useState("3");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Animate volunteers
      const volunteerTimer = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          count += 2;
          setVolunteers(count);
          if (count >= 50) {
            clearInterval(interval);
            setVolunteers(50);
          }
        }, 50);
      }, 800);

      // Animate surveyed people
      const surveyedTimer = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          count += 15; // Adjust speed to reach ~750 smoothly
          if (count >= 750) {
            count = 750;
            clearInterval(interval);
          }
          setSurveyed(count);
        }, 20);
      }, 1000);

      return () => {
        clearTimeout(volunteerTimer);
        clearTimeout(surveyedTimer);
      };
    }
  }, [isInView]);

  return (
    <section ref={ref} className="section-padding bg-gradient-to-r from-federal-blue to-oxford-blue">
      <div className="container-width">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-eggshell mb-6"
          >
            Our Impact
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-eggshell/80"
          >
            Making a difference in India's informal economy
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {/* Volunteers */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group bg-blood-red/10 p-8 rounded-xl border-2 border-blood-red/40 hover:border-blood-red smooth-transition"
          >
            <div className="text-5xl md:text-6xl font-bold text-blood-red mb-4 group-hover:scale-110 smooth-transition">
              {volunteers}+
            </div>
            <div className="text-xl font-semibold text-eggshell mb-2">Volunteers</div>
            <div className="text-eggshell/70">
              Passionate youth driving change
            </div>
          </motion.div>
          
          {/* Surveyed People */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="group bg-federal-blue/10 p-8 rounded-xl border-2 border-federal-blue/40 hover:border-federal-blue smooth-transition"
          >
            <div className="text-5xl md:text-6xl font-bold text-federal-blue mb-4 group-hover:scale-110 smooth-transition">
              {surveyed}+
            </div>
            <div className="text-xl font-semibold text-eggshell mb-2">Surveyed</div>
            <div className="text-eggshell/70">
              Real stories collected from the community
            </div>
          </motion.div>
          
          {/* NGO Partners */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="group bg-blood-red/10 p-8 rounded-xl border-2 border-blood-red/40 hover:border-blood-red smooth-transition"
          >
            <div className="text-5xl md:text-6xl font-bold text-blood-red mb-4 group-hover:scale-110 smooth-transition">
              {partners}
            </div>
            <div className="text-xl font-semibold text-eggshell mb-2">NGO Partners</div>
            <div className="text-eggshell/70">
              Collaborative relationships
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
