import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const StatsSection = () => {
  const [surveyed, setSurveyed] = useState(0);
  const [helped, setHelped] = useState(0);
  const [volunteers, setVolunteers] = useState(0);
  const [states, setStates] = useState(0);
  const [districts, setDistricts] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Animate surveyed (2850+)
      const surveyedTimer = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          count += 50;
          if (count >= 2850) {
            count = 2850;
            clearInterval(interval);
          }
          setSurveyed(count);
        }, 15);
      }, 800);

      // Animate helped (850+)
      const helpedTimer = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          count += 20;
          if (count >= 850) {
            count = 850;
            clearInterval(interval);
          }
          setHelped(count);
        }, 20);
      }, 900);

      // Animate volunteers (60+)
      const volunteerTimer = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          count += 2;
          if (count >= 60) {
            clearInterval(interval);
            setVolunteers(60);
          } else {
            setVolunteers(count);
          }
        }, 40);
      }, 1000);

      // Animate states (5+)
      const statesTimer = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          count += 1;
          if (count >= 5) {
            clearInterval(interval);
            setStates(5);
          } else {
            setStates(count);
          }
        }, 100);
      }, 1100);

      // Animate districts (12+)
      const districtsTimer = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          count += 1;
          if (count >= 12) {
            clearInterval(interval);
            setDistricts(12);
          } else {
            setDistricts(count);
          }
        }, 80);
      }, 1200);

      return () => {
        clearTimeout(surveyedTimer);
        clearTimeout(helpedTimer);
        clearTimeout(volunteerTimer);
        clearTimeout(statesTimer);
        clearTimeout(districtsTimer);
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
          {/* Workers Surveyed */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group bg-blood-red/10 p-8 rounded-xl border-2 border-blood-red/40 hover:border-blood-red smooth-transition"
          >
            <div className="text-4xl md:text-5xl font-bold text-blood-red mb-4 group-hover:scale-110 smooth-transition">
              {surveyed}+
            </div>
            <div className="text-lg font-semibold text-eggshell mb-2">Workers Surveyed</div>
            <div className="text-eggshell/70 text-sm">
              Comprehensive data collection
            </div>
          </motion.div>
          
          {/* Workers Helped */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="group bg-blood-red/10 p-8 rounded-xl border-2 border-blood-red/40 hover:border-blood-red smooth-transition"
          >
            <div className="text-4xl md:text-5xl font-bold text-blood-red mb-4 group-hover:scale-110 smooth-transition">
              {helped}+
            </div>
            <div className="text-lg font-semibold text-eggshell mb-2">Workers Helped</div>
            <div className="text-eggshell/70 text-sm">
              Direct interventions and support
            </div>
          </motion.div>
          
          {/* Volunteers */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="group bg-blood-red/10 p-8 rounded-xl border-2 border-blood-red/40 hover:border-blood-red smooth-transition"
          >
            <div className="text-4xl md:text-5xl font-bold text-blood-red mb-4 group-hover:scale-110 smooth-transition">
              {volunteers}+
            </div>
            <div className="text-lg font-semibold text-eggshell mb-2">Volunteers</div>
            <div className="text-eggshell/70 text-sm">
              Passionate youth driving change
            </div>
          </motion.div>

          {/* States */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="group bg-blood-red/10 p-8 rounded-xl border-2 border-blood-red/40 hover:border-blood-red smooth-transition"
          >
            <div className="text-4xl md:text-5xl font-bold text-blood-red mb-4 group-hover:scale-110 smooth-transition">
              {states}+
            </div>
            <div className="text-lg font-semibold text-eggshell mb-2">States</div>
            <div className="text-eggshell/70 text-sm">
              Nationwide presence
            </div>
          </motion.div>

          {/* Districts */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="group bg-blood-red/10 p-8 rounded-xl border-2 border-blood-red/40 hover:border-blood-red smooth-transition"
          >
            <div className="text-4xl md:text-5xl font-bold text-blood-red mb-4 group-hover:scale-110 smooth-transition">
              {districts}+
            </div>
            <div className="text-lg font-semibold text-eggshell mb-2">Districts</div>
            <div className="text-eggshell/70 text-sm">
              Local community reach
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
