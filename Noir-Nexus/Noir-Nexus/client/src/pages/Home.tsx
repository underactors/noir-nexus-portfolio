import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { VideoBackground } from "@/components/VideoBackground";
import { ProjectCard } from "@/components/ProjectCard";
import { Link } from "wouter";
import { SiDiscord, SiLinkedin, SiGithub } from "react-icons/si";

const projects = [
  {
    title: "VANTAGE",
    jpTitle: "優位性",
    category: "Finance / Strategy",
    description: "Algorithmic trading interface for high-frequency institutional markets.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1611974714851-48206138d73e?q=80&w=1470&auto=format&fit=crop",
    projectUrl: "https://example.com/vantage"
  },
  {
    title: "OBSIDIAN",
    jpTitle: "黒曜石",
    category: "Architecture",
    description: "Brutalist portfolio for a Tokyo-based architectural firm.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop",
    projectUrl: "https://example.com/obsidian"
  },
  {
    title: "ECHOES",
    jpTitle: "残響",
    category: "Audio Intelligence",
    description: "AI-driven audio mastering platform for cinema.",
    year: "2025",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop",
    projectUrl: "https://example.com/echoes"
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <div ref={containerRef} className="bg-black min-h-screen relative selection:bg-white selection:text-black">
      <VideoBackground />
      <Navigation />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="h-screen flex flex-col justify-center px-6 md:px-24 pt-20"
        >
          <div className="max-w-6xl mx-auto w-full border-l border-white/10 pl-8 md:pl-16 relative">
            <motion.div 
              style={{ y: textY }}
              className="space-y-2"
            >
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs md:text-sm tracking-[0.4em] text-white/60 uppercase block mb-4"
              >
                Creative Director & Full Stack Engineer
              </motion.span>
              
              <h1 className="text-6xl md:text-9xl font-display font-light text-white leading-[0.9] tracking-tighter mix-blend-difference">
                <span className="block overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="block"
                  >
                    DIGITAL
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="block italic text-white/50"
                  >
                    ELEGANCE
                  </motion.span>
                </span>
              </h1>
              
              <div className="mt-12 flex flex-col md:flex-row gap-8 md:items-end justify-between">
                <p className="max-w-md text-white/70 font-light leading-relaxed border-t border-white/20 pt-6">
                  Crafting refined digital interfaces for the discerning elite. 
                  Specializing in high-performance applications with a cinematic aesthetic.
                </p>
                
                <div className="flex flex-col items-end text-right">
                  <span className="font-jp-serif text-3xl text-white/40">美学と機能</span>
                  <span className="text-xs tracking-widest text-white/30 mt-1">AESTHETICS & FUNCTION</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
          </motion.div>
        </motion.section>

        {/* WORK SECTION */}
        <section className="py-32 px-6 bg-black relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black pointer-events-none -mt-32" />
          
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-24 border-b border-white/10 pb-8">
              <h2 className="text-4xl md:text-6xl font-display text-white">
                SELECTED WORKS <span className="text-white/20 text-3xl align-top font-jp-serif ml-4">作品集</span>
              </h2>
              <Link href="/work" className="hidden md:block text-sm tracking-widest text-white/50 hover:text-white transition-colors">
                VIEW ARCHIVE
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-12 md:gap-24">
              {projects.map((project, index) => (
                <ProjectCard 
                  key={index}
                  index={index}
                  {...project}
                />
              ))}
            </div>
            
            <div className="mt-24 text-center md:hidden">
              <Link href="/work" className="inline-block border border-white/20 px-8 py-3 text-sm tracking-widest text-white hover:bg-white hover:text-black transition-all">
                VIEW ARCHIVE
              </Link>
            </div>
          </div>
        </section>

        {/* QUOTE SECTION */}
        <section className="py-48 px-6 bg-white text-black relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display leading-tight italic">
                "I have to return some videotapes."
              </h2>
              <p className="mt-8 text-sm tracking-[0.3em] uppercase font-bold text-black/40">
                PATRICK BATEMAN
              </p>
            </motion.div>
          </div>
          
          {/* Subtle Grain */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-multiply pointer-events-none"></div>
        </section>
        
        {/* CTA SECTION */}
        <section className="h-[80vh] flex items-center justify-center relative px-6">
            <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1),_transparent_70%)]" />
            </div>
            
            <div className="relative z-10 text-center space-y-8">
                <h2 className="text-5xl md:text-8xl font-display text-white mix-blend-difference">
                    Let's Build<br />Something Real.
                </h2>
                <Link href="/contact" className="inline-block group">
                    <div className="relative overflow-hidden border border-white/20 bg-transparent px-12 py-4 transition-all duration-300 hover:border-white hover:bg-white/5">
                        <span className="relative z-10 text-sm tracking-[0.3em] text-white transition-colors group-hover:text-white">
                            INITIATE CONTACT
                        </span>
                        <div className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0 opacity-10" />
                    </div>
                </Link>
            </div>
        </section>
      </main>

      <footer className="bg-black border-t border-white/10 py-12 px-6 relative z-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-white/30 tracking-widest uppercase">
          <p>© 2024 BATEMAN CORP. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
              <SiDiscord className="w-4 h-4" /> Discord
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
              <SiLinkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
              <SiGithub className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
