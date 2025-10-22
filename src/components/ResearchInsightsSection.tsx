import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Placeholder images will be replaced with actual uploaded data visualizations
const correlationHeatmap = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTYyOTQ3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iI0Y0RjFFQyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvcnJlbGF0aW9uIEhlYXRtYXA8L3RleHQ+PC9zdmc+";
const educationWorkSavings = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTYyOTQ3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iI0Y0RjFFQyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVkdWNhdGlvbiB2cyBXb3JrL1NhdmluZ3M8L3RleHQ+PC9zdmc+";
const socialSecurityAccess = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTYyOTQ3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iI0Y0RjFFQyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNvY2lhbCBTZWN1cml0eSBBY2Nlc3M8L3RleHQ+PC9zdmc+";

const ResearchInsightsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeInsight, setActiveInsight] = useState(0);

  // Sample data for interactive charts
  const educationData = [
    { level: 'Illiterate', workHours: 6, savings: 2, earnings: 150 },
    { level: '10th Pass', workHours: 12, savings: 1, earnings: 200 },
    { level: '12th+', workHours: 10, savings: 8, earnings: 280 }
  ];

  const correlationData = [
    { metric: 'Age vs Savings', correlation: -0.15, color: '#DC2626' },
    { metric: 'Hours vs Earnings', correlation: 0.09, color: '#F59E0B' },
    { metric: 'Age vs Hours', correlation: 0.23, color: '#10B981' }
  ];

  const socialSecurityData = [
    { scheme: 'e-Shram Cards', enrolled: 45.9, aware: 78.2 },
    { scheme: 'PM-SYM', enrolled: 1.8, aware: 23.4 },
    { scheme: 'Skill Training', enrolled: 59.0, aware: 65.8 }
  ];

  const insights = [
    {
      title: "Education Level vs Work and Savings",
      description: "Educational attainment doesn't guarantee financial security in the informal economy",
      points: [
        "Illiterate workers have lowest savings and fewer work hours",
        "10th pass workers work longest hours but have negligible savings", 
        "12th+ workers achieve highest savings but still face high work demands"
      ],
      image: educationWorkSavings
    },
    {
      title: "Financial Correlations",
      description: "Data reveals concerning patterns in informal worker economics",
      points: [
        "Age vs Savings: Weak negative correlation (-0.15) - older workers struggle more to save",
        "Hours Worked vs Earnings: Weak positive correlation (0.09) - more hours don't guarantee higher income",
        "Age vs Hours Worked: Strongest correlation (0.23) - older workers tend to work longer hours"
      ],
      image: correlationHeatmap
    },
    {
      title: "Social Security & Awareness Gap",
      description: "Significant disconnect between program availability and utilization",
      points: [
        "Low Scheme Awareness: 45.9% have e-Shram cards, only 1.8% enrolled in PM-SYM",
        "Gender & Debt: 48.3% of women vs 41.7% of men reported being in debt",
        "Work Migration: 42.4% migrated for work; 44.9% migrate seasonally"
      ],
      image: socialSecurityAccess
    }
  ];

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveInsight((prev) => (prev + 1) % insights.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isInView, insights.length]);

  return (
    <section ref={ref} className="section-padding bg-gradient-to-br from-oxford-blue via-federal-blue to-oxford-blue relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="animated-stripes"></div>
      </div>
      
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blood-red to-transparent animate-[scanLine_3s_ease-in-out_infinite]"></div>
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-federal-blue to-transparent animate-[scanLine_4s_ease-in-out_infinite]" style={{marginTop: '40%'}}></div>
      </div>

      <div className="container-width mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-eggshell">Data-Driven </span>
            <span className="bg-gradient-to-r from-blood-red to-federal-blue bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className="text-eggshell/80 text-xl max-w-3xl mx-auto font-light">
            Understanding India's Informal Economy Through Numbers
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="card-shadow bg-gradient-to-br from-blood-red/10 to-federal-blue/10 border-2 border-blood-red/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <motion.div
                  key={activeInsight}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blood-red to-federal-blue bg-clip-text text-transparent mb-4">
                    {insights[activeInsight].title}
                  </h3>
                  <p className="text-eggshell mb-6 text-lg font-light">
                    {insights[activeInsight].description}
                  </p>
                  <ul className="space-y-4">
                    {insights[activeInsight].points.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-3 text-eggshell/90 text-base"
                      >
                        <div className="w-3 h-3 bg-blood-red rounded-full mt-1.5 flex-shrink-0 shadow-lg shadow-blood-red/50"></div>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <div className="flex gap-3 mt-8 justify-center">
                  {insights.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveInsight(index)}
                      className={`w-4 h-4 rounded-full smooth-transition border-2 ${
                        index === activeInsight 
                          ? 'bg-blood-red border-blood-red shadow-lg shadow-blood-red/50' 
                          : 'bg-transparent border-glaucous/50 hover:border-glaucous'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="card-shadow bg-eggshell/5 border-glaucous/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src={insights[activeInsight].image} 
                  alt={insights[activeInsight].title}
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <Card className="card-shadow bg-gradient-to-br from-blood-red/10 to-blood-red/5 border-2 border-blood-red/30 backdrop-blur-sm hover:scale-105 smooth-transition">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-blood-red mb-4 flex items-center gap-2">
                <span className="text-2xl">📚</span> Education vs Work Hours
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={educationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(239, 71, 111, 0.1)" />
                  <XAxis 
                    dataKey="level" 
                    tick={{ fill: '#F4F1EC', fontSize: 12 }}
                    axisLine={{ stroke: '#EF476F' }}
                  />
                  <YAxis 
                    tick={{ fill: '#F4F1EC', fontSize: 12 }}
                    axisLine={{ stroke: '#EF476F' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(239, 71, 111, 0.95)', 
                      border: '2px solid #F4F1EC',
                      borderRadius: '12px',
                      color: '#F4F1EC'
                    }}
                  />
                  <Bar dataKey="workHours" fill="#EF476F" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="card-shadow bg-gradient-to-br from-federal-blue/10 to-federal-blue/5 border-2 border-federal-blue/30 backdrop-blur-sm hover:scale-105 smooth-transition">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-federal-blue mb-4 flex items-center gap-2">
                <span className="text-2xl">💹</span> Financial Correlations
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={correlationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 83, 144, 0.1)" />
                  <XAxis 
                    dataKey="metric" 
                    tick={{ fill: '#F4F1EC', fontSize: 10 }}
                    axisLine={{ stroke: '#1E5390' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tick={{ fill: '#F4F1EC', fontSize: 12 }}
                    axisLine={{ stroke: '#1E5390' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 83, 144, 0.95)', 
                      border: '2px solid #F4F1EC',
                      borderRadius: '12px',
                      color: '#F4F1EC'
                    }}
                  />
                  <Bar dataKey="correlation" fill="#1E5390" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="card-shadow bg-gradient-to-br from-glaucous/10 to-glaucous/5 border-2 border-glaucous/30 backdrop-blur-sm hover:scale-105 smooth-transition">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-glaucous mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Scheme Enrollment Gap
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={socialSecurityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 132, 163, 0.1)" />
                  <XAxis 
                    dataKey="scheme" 
                    tick={{ fill: '#F4F1EC', fontSize: 10 }}
                    axisLine={{ stroke: '#6B84A3' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tick={{ fill: '#F4F1EC', fontSize: 12 }}
                    axisLine={{ stroke: '#6B84A3' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(107, 132, 163, 0.95)', 
                      border: '2px solid #F4F1EC',
                      borderRadius: '12px',
                      color: '#F4F1EC'
                    }}
                  />
                  <Bar dataKey="enrolled" fill="#EF476F" />
                  <Bar dataKey="aware" fill="#6B84A3" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="card-shadow bg-gradient-to-r from-blood-red/20 via-federal-blue/20 to-glaucous/20 border-2 border-blood-red/40 backdrop-blur-sm">
            <CardContent className="p-10">
              <h3 className="text-2xl font-bold text-eggshell mb-8">Key Statistics</h3>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="bg-blood-red/10 p-4 rounded-xl border border-blood-red/30">
                  <div className="text-4xl font-bold text-blood-red mb-2 drop-shadow-lg">42.4%</div>
                  <div className="text-eggshell/80 font-medium">Migrated for Work</div>
                </div>
                <div className="bg-federal-blue/10 p-4 rounded-xl border border-federal-blue/30">
                  <div className="text-4xl font-bold text-federal-blue mb-2 drop-shadow-lg">48.3%</div>
                  <div className="text-eggshell/80 font-medium">Women in Debt</div>
                </div>
                <div className="bg-blood-red/10 p-4 rounded-xl border border-blood-red/30">
                  <div className="text-4xl font-bold text-blood-red mb-2 drop-shadow-lg">1.8%</div>
                  <div className="text-eggshell/80 font-medium">PM-SYM Enrollment</div>
                </div>
                <div className="bg-federal-blue/10 p-4 rounded-xl border border-federal-blue/30">
                  <div className="text-4xl font-bold text-federal-blue mb-2 drop-shadow-lg">59%</div>
                  <div className="text-eggshell/80 font-medium">Took Skill Training</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchInsightsSection;