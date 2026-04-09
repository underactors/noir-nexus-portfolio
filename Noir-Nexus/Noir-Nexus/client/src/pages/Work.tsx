import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";

const allProjects = [
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
  },
  {
    title: "SPECTRE",
    jpTitle: "亡霊",
    category: "Cybersecurity",
    description: "Zero-trust dashboard for enterprise threat monitoring.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1470&auto=format&fit=crop",
    projectUrl: "https://example.com/spectre"
  },
  {
    title: "AURA",
    jpTitle: "雰囲気",
    category: "Luxury Retail",
    description: "Immersive e-commerce experience for high-end fashion.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop",
    projectUrl: "https://example.com/aura"
  },
  {
    title: "NEXUS",
    jpTitle: "連携",
    category: "Infrastructure",
    description: "Global logistics tracking system with real-time 3D visualization.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop",
    projectUrl: "https://example.com/nexus"
  }
];

export default function Work() {
  return (
    <div className="bg-black min-h-screen relative selection:bg-white selection:text-black">
      <Navigation />
      
      {/* Background grain */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24 border-b border-white/10 pb-12"
          >
            <h1 className="text-6xl md:text-8xl font-display text-white mb-4">ARCHIVE</h1>
            <p className="text-white/40 max-w-xl font-light leading-relaxed">
              A collection of selected commercial and personal works. 
              Focusing on clean, typographical interfaces with robust backend architecture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {allProjects.map((project, index) => (
              <ProjectCard 
                key={index}
                index={index}
                {...project}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
