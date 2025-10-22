import { useState } from "react";
import { Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { workerStories, type WorkerStory } from "@/data/workerStories";

const WorkSection = () => {
  const [selectedStory, setSelectedStory] = useState<WorkerStory | null>(null);

  const openStory = (story: WorkerStory) => setSelectedStory(story);
  const closeStory = () => setSelectedStory(null);

  return (
    <section
      id="work"
      className="relative bg-gradient-to-br from-federal-blue via-federal-blue to-oxford-blue overflow-hidden"
    >
      {/* Scan-line background animation */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-glaucous to-transparent animate-pulse"
          style={{ animation: "scanLine 4s ease-in-out infinite", top: "20%" }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-glaucous/50 to-transparent animate-pulse"
          style={{ animation: "scanLine 5s ease-in-out infinite 1s", top: "60%" }}
        />
      </div>

      {/* Sticky Title */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-federal-blue to-federal-blue/80 backdrop-blur-sm py-8">
        <div className="container-width text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-eggshell tracking-tight">
            Real Stories, Real Voices
          </h2>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-width">
          {/* Intro */}
          <div className="text-center mb-16">
            <p className="text-3xl md:text-4xl font-light text-eggshell mb-12 leading-relaxed">
              Each code unlocks a journey. Scan to see the people behind the numbers.
            </p>
          </div>

          {/* Story Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workerStories.map((worker, index) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: 15, rotateY: 5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
                whileHover={{
                  scale: 1.05,
                  rotateX: -5,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(105, 3, 7, 0.5)",
                }}
                transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="bg-oxford-blue/30 backdrop-blur-sm border-2 border-federal-blue/30 hover:border-blood-red rounded-xl p-8 text-center smooth-transition group cursor-pointer transform-gpu perspective-1000"
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => openStory(worker)}
              >
                {/* QR Code with Glow */}
                <div className="relative w-36 mx-auto mb-4">
                  <img
                    src={worker.qrImage}
                    alt={`QR code for ${worker.name}`}
                    className="w-36 h-36 rounded-lg relative z-10"
                  />
                  {/* Soft glow overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-glaucous/20 to-blood-red/20 blur-sm z-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                  />
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none"
                    animate={{
                      boxShadow: ["0 0 0px rgba(105,3,7,0)", "0 0 20px rgba(105,3,7,0.5)", "0 0 0px rgba(105,3,7,0)"],
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                </div>

                {/* Worker Info */}
                <h3 className="text-xl font-bold text-eggshell mb-2">
                  {worker.name} – {worker.role}
                </h3>

                {/* Tap or Scan Text */}
                <div className="flex items-center justify-center gap-2 text-eggshell/80">
                  <Eye className="w-4 h-4 text-blood-red" />
                  <span className="text-sm">Scan to View Story</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeStory}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-oxford-blue border-2 border-blood-red/50 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeStory}
                className="absolute top-4 right-4 w-8 h-8 bg-blood-red rounded-full flex items-center justify-center hover:bg-federal-blue smooth-transition shadow-lg shadow-blood-red/50"
              >
                <X className="w-4 h-4 text-eggshell" />
              </button>

              {/* Story Content */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-eggshell mb-2">{selectedStory.name}</h2>
                <p className="text-xl text-blood-red italic">{selectedStory.role}</p>
              </div>

              {/* Video Placeholder */}
              <div className="bg-federal-blue/30 rounded-lg p-8 mb-6 text-center border border-federal-blue/50">
                <p className="text-eggshell/80 mb-4">Video Story</p>
                <div className="w-16 h-16 bg-blood-red/20 rounded-full mx-auto flex items-center justify-center border border-blood-red/50">
                  <Eye className="w-8 h-8 text-blood-red" />
                </div>
              </div>

              {/* Story Text */}
              <div className="prose prose-invert max-w-none">
                <p className="text-eggshell/80 leading-relaxed text-lg">{selectedStory.story}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkSection;
