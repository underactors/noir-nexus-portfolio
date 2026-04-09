import videoAsset from "@assets/YTDown.com_YouTube_Dark-Queen-4K-live-wallpaper_Media_rg0mkrSo_1771715960206.mp4";

export function VideoBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black/70 z-10" /> {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-40 grayscale contrast-125"
      >
        <source src={videoAsset} type="video/mp4" />
      </video>
      
      {/* Scanline effect */}
      <div className="absolute inset-0 z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 z-20 bg-scanlines opacity-10 pointer-events-none" 
           style={{
             backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
             backgroundSize: "100% 2px, 3px 100%"
           }} 
      />
    </div>
  );
}
