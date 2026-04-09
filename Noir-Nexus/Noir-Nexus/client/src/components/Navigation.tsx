import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";

const glyphs = "!<>-_\\/[]{}—=+*^?#________";

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = glyphs;
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="opacity-50 text-white/40">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function ScrambledLink({ href, label, jp, isActive }) {
  const elRef = useRef(null);
  const fxRef = useRef(null);

  useEffect(() => {
    if (elRef.current) {
      fxRef.current = new TextScramble(elRef.current);
    }
  }, []);

  const handleEnter = () => {
    if (fxRef.current) fxRef.current.setText(jp);
  };

  const handleLeave = () => {
    if (fxRef.current) fxRef.current.setText(label);
  };

  return (
    <Link href={href} className="relative group cursor-pointer block">
      <div 
        className="flex flex-col items-end"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <span 
          ref={elRef}
          className={`text-xs font-medium tracking-[0.2em] transition-colors duration-300 ${
            isActive ? "text-white" : "text-white/50 group-hover:text-white"
          }`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}

const links = [
  { href: "/", label: "INDEX", jp: "目次" },
  { href: "/work", label: "WORK", jp: "仕事" },
  { href: "/about", label: "ABOUT", jp: "私について" },
  { href: "/contact", label: "CONTACT", jp: "連絡" },
];

export function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef(null);
  const logoFxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    if (logoRef.current) logoFxRef.current = new TextScramble(logoRef.current);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent border-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          <div 
            className="cursor-pointer group"
            onMouseEnter={() => logoFxRef.current?.setText("バットマン・コーポレーション")}
            onMouseLeave={() => logoFxRef.current?.setText("BATEMAN.CORP")}
          >
            <h1 
              ref={logoRef}
              className="text-xl font-bold tracking-widest text-white transition-colors duration-300 font-display"
            >
              BATEMAN.CORP
            </h1>
            <p className="text-[10px] tracking-[0.3em] text-white/40 font-jp-sans mt-0.5">
              東京・ニューヨーク
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-12">
          {links.map((link) => (
            <ScrambledLink 
              key={link.href} 
              {...link} 
              isActive={location === link.href} 
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
