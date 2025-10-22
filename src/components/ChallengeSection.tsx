import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let currentIndex = 0;
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
            setShowCursor(false);
          }
        }, 80);
        return () => clearInterval(interval);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, text, delay]);

  return (
    <span ref={ref}>
      {displayText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
};

const ScoreboardCounter = ({ end, duration = 2, prefix = "", suffix = "", special = "" }: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string; 
  special?: string; 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (startTime === undefined) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        // Easing function for scoreboard effect
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <motion.div 
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="relative"
    >
      <div className="text-4xl md:text-6xl font-black text-eggshell font-mono tracking-wider">
        {special || (
          <>
            {prefix}
            <span className="tabular-nums">{count}</span>
            {suffix}
          </>
        )}
      </div>
      {/* Scoreboard glow effect */}
      <div className="absolute inset-0 text-4xl md:text-6xl font-black text-blood-red/20 font-mono tracking-wider blur-sm">
        {special || (
          <>
            {prefix}
            <span className="tabular-nums">{count}</span>
            {suffix}
          </>
        )}
      </div>
    </motion.div>
  );
};

const ChallengeSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { value: 90, suffix: "%", label: "of India's workforce is informal" },
    { value: 0, suffix: "", label: "representation in national indices" },
    { value: 10, prefix: "<", suffix: "%", label: "know about available schemes" },
    { value: 0, suffix: "", label: "financial literacy levels", special: "Low" }
  ];

  const impactStatements = [
    "No contracts.",
    "No job security.", 
    "No recognition.",
    "No data. No voice."
  ];

  return (
    <section 
      ref={sectionRef}
      id="challenge" 
      className="relative min-h-screen w-full bg-gradient-to-br from-oxford-blue via-oxford-blue to-federal-blue overflow-hidden"
    >
      {/* Parallax background layers */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          transform: isInView ? "translateY(-20px)" : "translateY(0px)",
          transition: "transform 0.6s ease-out"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-federal-blue/30 to-transparent transform -skew-y-12 scale-150"></div>
      </motion.div>

      <div className="relative z-10 section-padding">
        <div className="container-width text-center">
          {/* Typewriter Headline */}
          <div className="min-h-[200px] flex items-center justify-center mb-8">
            <h1 className="text-6xl md:text-8xl font-black uppercase text-eggshell tracking-tight">
              <TypewriterText text="The Invisible 90%" delay={500} />
            </h1>
          </div>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="text-2xl md:text-3xl italic text-eggshell/80 mb-16 font-light"
          >
            The backbone of India's economy — unseen, unrepresented, unheard.
          </motion.p>

          {/* Scoreboard Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 3.0 + index * 0.2,
                  type: "spring",
                  bounce: 0.3
                }}
                className="bg-blood-red/90 backdrop-blur-sm p-8 rounded-xl card-shadow hover:scale-105 smooth-transition relative overflow-hidden border border-blood-red"
              >
                {/* Scoreboard background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blood-red/20 to-transparent"></div>
                <div className="relative z-10">
                  <ScoreboardCounter 
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    special={stat.special}
                    duration={1.5}
                  />
                  <p className="text-eggshell/90 text-sm mt-4 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Blood Red Impact Statements */}
          <div className="space-y-6 mb-12">
            {impactStatements.map((statement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: 4.8 + index * 0.3 }}
                className="relative"
              >
                <motion.p
                  animate={{
                    x: [0, -2, 2, 0],
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 5.2 + index * 0.3,
                    ease: "easeInOut"
                  }}
                  className="text-xl md:text-2xl text-blood-red font-bold relative z-10"
                >
                  {statement}
                </motion.p>
                {/* Pulse glow effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    delay: 5.2 + index * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute inset-0 text-xl md:text-2xl text-blood-red/30 font-bold blur-sm"
                >
                  {statement}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Dramatic Blood Red Swipe Divider */}
          <div className="relative mb-12 h-16 overflow-hidden">
            <motion.div
              initial={{ x: "-100%", scaleX: 0 }}
              animate={isInView ? { x: "0%", scaleX: 1 } : { x: "-100%", scaleX: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: 7.0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="h-4 bg-gradient-to-r from-blood-red via-blood-red to-blood-red/50 mx-auto max-w-4xl origin-left"
            />
            {/* Swipe trail effect */}
            <motion.div
              initial={{ x: "-120%", opacity: 0 }}
              animate={isInView ? { x: "20%", opacity: [0, 1, 0] } : { x: "-120%", opacity: 0 }}
              transition={{ 
                duration: 1.8, 
                delay: 7.0,
                ease: "easeInOut"
              }}
              className="absolute top-0 h-4 w-32 bg-gradient-to-r from-transparent via-eggshell to-transparent blur-sm"
            />
          </div>

          {/* Closing Statement */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 8.0 }}
            className="text-3xl md:text-4xl font-bold text-eggshell mb-12"
          >
            This is the gap we aim to bridge.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 8.4 }}
            onClick={scrollToWork}
            className="bg-blood-red text-eggshell px-12 py-6 rounded-xl text-xl font-bold hover:bg-federal-blue hover:scale-105 smooth-transition shadow-2xl shadow-blood-red/50"
          >
            See How
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;