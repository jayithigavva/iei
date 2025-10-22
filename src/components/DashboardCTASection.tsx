import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, FileText, TrendingUp, Users } from "lucide-react";

const DashboardCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: FileText,
      title: "Take the Survey",
      description: "Fill out our comprehensive IEI survey in English or Hindi with voice assistance",
      color: "text-blood-red"
    },
    {
      icon: BarChart3,
      title: "Get Your Score",
      description: "Receive instant IEI vulnerability score across 5 dimensions: Income, Social Security, Debt, Skills, Mobility",
      color: "text-federal-blue"
    },
    {
      icon: TrendingUp,
      title: "Actionable Insights",
      description: "Get personalized recommendations to decrease your vulnerability score",
      color: "text-eggshell"
    },
    {
      icon: Users,
      title: "Real-Time Data",
      description: "See how your district compares with live data from all survey responses",
      color: "text-blood-red"
    }
  ];

  return (
    <section ref={ref} className="section-padding bg-gradient-to-br from-federal-blue via-oxford-blue to-federal-blue relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="animated-stripes"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blood-red to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-federal-blue to-transparent"></div>

      <div className="container-width relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-eggshell">IEI </span>
            <span className="bg-gradient-to-r from-blood-red to-federal-blue bg-clip-text text-transparent">Dashboard</span>
          </h2>
          <p className="text-eggshell/80 text-xl max-w-3xl mx-auto mb-8 font-light">
            India's first interactive dashboard to measure and track informal economy vulnerability
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="h-full bg-eggshell/5 border border-blood-red/20 hover:border-blood-red/50 hover:shadow-lg hover:shadow-blood-red/20 smooth-transition backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blood-red/10 border border-blood-red/30">
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                  </div>
                  <h3 className={`text-lg font-bold mb-3 ${feature.color}`}>{feature.title}</h3>
                  <p className="text-eggshell/70 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="card-shadow bg-gradient-to-br from-blood-red/20 via-federal-blue/15 to-blood-red/20 border-2 border-blood-red/40 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-eggshell mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-eggshell/80 text-lg mb-8 max-w-2xl mx-auto">
                Take our comprehensive IEI survey, discover your vulnerability score, and receive personalized recommendations to improve your economic security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-blood-red hover:bg-blood-red/80 text-eggshell px-8 py-6 text-lg font-bold glow-effect smooth-transition shadow-xl shadow-blood-red/30"
                >
                  📝 Fill the Survey
                </Button>
                <Button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-federal-blue hover:bg-federal-blue/80 text-eggshell px-8 py-6 text-lg font-bold smooth-transition shadow-xl"
                >
                  📊 View Dashboard
                </Button>
              </div>
              <p className="text-eggshell/60 text-sm mt-6">
                Available in English & Hindi • Voice-assisted • 100% Free
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardCTASection;

