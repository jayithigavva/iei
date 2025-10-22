import { TrendingUp, GraduationCap, Heart, Users, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initiatives = [
    {
      icon: TrendingUp,
      title: "Building a Dashboard",
      description:
        "Built a dashboard to survey informal workers across India and map their vulnerability to a score. The survey is holistic — considering debt cycles, income volatility, awareness and enrolment in government schemes, and migration patterns — to provide data-driven solutions for improving worker welfare.",
    },
    {
      icon: BarChart,
      title: "Pilot Implementation",
      description:
        "Held pilots across surveyed districts to test the accuracy of dashboard solutions. In Punjab, 80% of workers benefited — many opened bank accounts and exited debt. In Faridabad, 75% secured eShram cards and 70% of women started their own bank accounts. In Jaipur, 68% enrolled in government schemes through our awareness and enrolment campaigns. In Bhopal and Gwalior, a ₹40,000 emergency fund distributed to families reduced debt, saving, and income volatility by 45%, proving the dashboard’s success and accuracy.",
    },
    {
      icon: Users,
      title: "Pushing for Policy Reform",
      description:
        "After identifying enrolment struggles caused by migration and documentation gaps, we are advocating for reforms to make government schemes more accessible and portable across states. Our data-backed policy recommendations aim to ensure equitable benefits for all informal workers.",
    },
    {
      icon: Heart,
      title: "Donation Drives",
      description:
        "Conducted donation and emergency support drives to provide immediate relief to vulnerable families. These initiatives directly addressed debt, savings, and income stability challenges, strengthening community resilience and trust.",
    },
  ];
  

  const insightsData = [
    {
      title: "Education Level vs Work and Savings",
      points: [
        "Illiterate → Lowest savings, fewer work hours",
        "10th pass → Longest work hours, negligible savings",
        "12th+ → Highest savings, but still high work demands",
      ],
    },
    {
      title: "Financial Correlations Analysis",
      points: [
        "Age vs Savings → Weak negative correlation (-0.15)",
        "Hours Worked vs Earnings → Weak positive correlation (0.09)",
        "Age vs Hours Worked → Strongest positive correlation (0.23)",
      ],
    },
    {
      title: "Social Security & Awareness Insights",
      points: [
        "45.9% have e-Shram cards, only 1.8% enrolled in PM-SYM",
        "48.3% of women in debt vs 41.7% of men",
        "59% with middle school+ took skill training",
        "42.4% migrated for work; 44.9% migrate seasonally",
      ],
    },
  ];

  const handleBuildingIndexClick = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setShowInsightsModal(true);
      setIsLoading(false);
    }, 400);
  };

  const handleKeyPress = (event: React.KeyboardEvent, onClick?: () => void) => {
    if ((event.key === "Enter" || event.key === " ") && onClick) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <section ref={ref} id="about" className="section-padding bg-background">
      <div className="container-width">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            What We Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-eggshell/80 max-w-3xl mx-auto leading-relaxed"
          >
            Bridging the gap between India's informal economy and formal recognition through data, education, and community empowerment.
          </motion.p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initiatives.map((initiative, index) => {
            const colors = [
              { bg: "from-blood-red/25 to-blood-red/10", icon: "bg-blood-red/30", iconHover: "bg-blood-red/50", text: "text-blood-red", border: "border-blood-red/40" },
              { bg: "from-federal-blue/25 to-federal-blue/10", icon: "bg-federal-blue/30", iconHover: "bg-federal-blue/50", text: "text-federal-blue", border: "border-federal-blue/40" },
              { bg: "from-blood-red/20 to-federal-blue/20", icon: "bg-eggshell/20", iconHover: "bg-eggshell/30", text: "text-eggshell", border: "border-eggshell/40" },
              { bg: "from-federal-blue/25 to-blood-red/25", icon: "bg-gradient-to-br from-blood-red/30 to-federal-blue/30", iconHover: "from-blood-red/50 to-federal-blue/50", text: "text-blood-red", border: "border-blood-red/30" },
            ][index];

            const isClickable = initiative.isClickable;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Card className={`h-full bg-gradient-to-br ${colors.bg} border ${colors.border} hover:shadow-2xl hover:scale-105 smooth-transition backdrop-blur-sm`}>
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${colors.icon} group-hover:${colors.iconHover} smooth-transition`}>
                        <initiative.icon className={`w-10 h-10 ${colors.text}`} />
                      </div>
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${colors.text}`}>
                      {initiative.title}
                    </h3>
                    <p className="text-eggshell/80 leading-relaxed">{initiative.description}</p>
                    {isClickable && (
                      <button
                        onClick={handleBuildingIndexClick}
                        disabled={isLoading}
                        className={`mt-4 ${colors.text} font-bold bg-eggshell/10 hover:bg-eggshell/20 px-4 py-2 rounded-lg border ${colors.border} smooth-transition`}
                      >
                        {isLoading ? 'Loading...' : 'View Data Insights 🔍'}
                      </button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Insights Modal */}
        <Dialog open={showInsightsModal} onOpenChange={setShowInsightsModal}>
          <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-background to-card border-2 border-primary/30">
            <DialogHeader className="text-center relative">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1.2, type: "spring", bounce: 0.6 }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
              >
                <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg glow-effect">
                  <span className="font-bold text-2xl">IEI</span>
                </div>
              </motion.div>
              <DialogTitle className="text-4xl font-bold text-foreground mb-2 mt-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Quantifying the Unseen
              </DialogTitle>
              <p className="text-accent-foreground text-lg">
                India's comprehensive data on informal economy workers
              </p>
            </DialogHeader>

            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {insightsData.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="bg-card border-border h-full">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-foreground mb-4">{insight.title}</h4>
                      <ul className="space-y-3">
                        {insight.points.map((point, i) => (
                          <li key={i} className="text-muted-foreground text-sm leading-relaxed flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AboutSection;
