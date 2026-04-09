import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";

export default function About() {
  return (
    <div className="bg-black min-h-screen relative selection:bg-white selection:text-black">
      <Navigation />
      
      {/* Background grain */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="md:col-span-4">
               <div className="sticky top-32">
                 <h1 className="text-5xl font-display text-white mb-2">PROFILE</h1>
                 <p className="font-jp-serif text-white/30 text-2xl">プロフィール</p>
                 
                 <div className="mt-12 space-y-6 text-xs tracking-widest text-white/50 uppercase">
                    <div>
                        <span className="block text-white/30 mb-1">Location</span>
                        <span className="text-white">New York / Tokyo</span>
                    </div>
                    <div>
                        <span className="block text-white/30 mb-1">Focus</span>
                        <span className="text-white">Design Systems, Full Stack</span>
                    </div>
                    <div>
                        <span className="block text-white/30 mb-1">Status</span>
                        <span className="text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            Available for hire
                        </span>
                    </div>
                 </div>
               </div>
            </div>

            <div className="md:col-span-8 space-y-16 text-lg text-white/70 font-light leading-relaxed">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                    <p className="first-letter:text-5xl first-letter:font-display first-letter:mr-2 first-letter:float-left first-letter:text-white">
                        I believe in silence. In a world screaming for attention, the most powerful statement is one made with precision and restraint. My work bridges the gap between brutalist aesthetics and refined user experience.
                    </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                    <h3 className="text-white font-display text-3xl mb-6">PHILOSOPHY</h3>
                    <p className="mb-6">
                        Good design is invisible. It works in the background, facilitating goals without friction. I approach every project with a "form follows function" mindset, stripped of unnecessary ornamentation.
                    </p>
                    <p>
                        Drawing inspiration from mid-century modern architecture and 90s corporate noir cinema, I create digital environments that feel physical, weighty, and significant.
                    </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                    <h3 className="text-white font-display text-3xl mb-6">CAPABILITIES</h3>
                    <div className="grid grid-cols-2 gap-8 text-sm">
                        <ul className="space-y-4 border-l border-white/10 pl-6">
                            <li className="text-white font-medium tracking-wide mb-4 uppercase">Design</li>
                            <li>UI / UX Design</li>
                            <li>Design Systems</li>
                            <li>Interaction Design</li>
                            <li>3D Visualization</li>
                        </ul>
                        <ul className="space-y-4 border-l border-white/10 pl-6">
                            <li className="text-white font-medium tracking-wide mb-4 uppercase">Engineering</li>
                            <li>React / Next.js</li>
                            <li>TypeScript</li>
                            <li>Node.js / PostgreSQL</li>
                            <li>WebGL / Three.js</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
