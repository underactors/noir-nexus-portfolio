import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  jpTitle: string;
  category: string;
  description: string;
  year: string;
  index: number;
  image: string;
  projectUrl?: string;
}

export function ProjectCard({ title, jpTitle, category, description, year, index, image, projectUrl }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isFlipped, setIsFlipped] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleFlip = (e: React.MouseEvent) => {
    // If user clicks the link, don't flip
    if ((e.target as HTMLElement).closest('a')) return;
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="perspective-1000 h-[400px] w-full"
      onClick={handleFlip}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full cursor-pointer"
      >
        {/* Front Side */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="absolute inset-0 backface-hidden border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden"
          onMouseMove={handleMouseMove}
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  650px circle at ${mouseX}px ${mouseY}px,
                  rgba(255, 255, 255, 0.1),
                  transparent 80%
                )
              `,
            }}
          />
          
          <div className="relative p-8 md:p-12 flex flex-col h-full justify-between z-10">
            <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-6">
                <div className="flex flex-col">
                    <span className="text-xs font-mono text-white/40 mb-1">NO. {String(index + 1).padStart(2, '0')}</span>
                    <span className="text-xs tracking-widest text-white/60 uppercase">{category}</span>
                </div>
                <span className="text-xs font-mono text-white/40">{year}</span>
            </div>

            <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-display font-light text-white">
                    {title}
                </h3>
                <p className="text-xl font-jp-serif text-white/30 font-light">
                    {jpTitle}
                </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-end">
                <p className="text-sm text-white/60 max-w-xs font-light leading-relaxed">
                    {description}
                </p>
                <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
            </div>
          </div>
          
          <div className="absolute top-0 right-12 h-full w-[1px] bg-white/5" />
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 backface-hidden border border-white/10 bg-black overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover grayscale opacity-80"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
            <div className="text-center">
              <h3 className="text-3xl font-display text-white mb-2">{title}</h3>
              {projectUrl && (
                <a 
                  href={projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.3em] text-white hover:text-white/70 transition-colors uppercase mt-4 border border-white/20 px-4 py-2"
                >
                  VIEW PROJECT <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
