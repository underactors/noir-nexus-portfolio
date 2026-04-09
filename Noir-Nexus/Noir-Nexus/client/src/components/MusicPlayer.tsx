import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import track1 from "@assets/PASTEL_GHOST_~_DARK_BEACH_[guDJvZp5Bqk]_1775754770355.mp3";
import track2 from "@assets/ᴠɪꜱɪᴏɴ_(ꜱʟᴏᴡᴇᴅ)_[kj1IaJc7wMc]_1775754770357.mp3";
import track3 from "@assets/void_in_blue_-_glare_(outro_to_intro)_[hLbVeMOaS_I]_1775754770357.mp3";

const TRACKS = [
  { src: track1, label: "PASTEL GHOST — DARK BEACH" },
  { src: track2, label: "ᴠɪꜱɪᴏɴ (ꜱʟᴏᴡᴇᴅ)" },
  { src: track3, label: "VOID IN BLUE — GLARE" },
];

const GAP_MS = 5000;

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const gapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [inGap, setInGap] = useState(false);
  const [visible, setVisible] = useState(true);

  const playTrack = useCallback((index: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = TRACKS[index];
    audio.src = track.src;
    audio.currentTime = 0;
    audio.volume = 0.4;
    audio.play().catch(() => {});
    setCurrentIndex(index);
    setInGap(false);
    setPlaying(true);
  }, []);

  const handleEnded = useCallback(() => {
    setInGap(true);
    setPlaying(false);
    gapTimerRef.current = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % TRACKS.length;
      playTrack(nextIndex);
    }, GAP_MS);
  }, [currentIndex, playTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleEnded]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryAutoplay = () => {
      if (!audioRef.current) return;
      audioRef.current.src = TRACKS[0].src;
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => {
        setStarted(true);
        setCurrentIndex(0);
        setPlaying(true);
      }).catch(() => {
        const onInteract = () => {
          if (!audioRef.current) return;
          audioRef.current.src = TRACKS[0].src;
          audioRef.current.volume = 0.4;
          audioRef.current.play().then(() => {
            setStarted(true);
            setCurrentIndex(0);
            setPlaying(true);
          }).catch(() => {});
          ["click", "keydown", "scroll", "touchstart"].forEach((evt) =>
            document.removeEventListener(evt, onInteract)
          );
        };
        ["click", "keydown", "scroll", "touchstart"].forEach((evt) =>
          document.addEventListener(evt, onInteract, { once: true })
        );
      });
    };

    tryAutoplay();

    return () => {
      if (gapTimerRef.current) clearTimeout(gapTimerRef.current);
    };
  }, []);

  const handleStart = () => {
    if (!started) {
      setStarted(true);
      playTrack(0);
    } else {
      if (playing) {
        audioRef.current?.pause();
        setPlaying(false);
        if (gapTimerRef.current) {
          clearTimeout(gapTimerRef.current);
          gapTimerRef.current = null;
          setInGap(false);
        }
      } else {
        if (inGap) {
          const nextIndex = (currentIndex + 1) % TRACKS.length;
          playTrack(nextIndex);
        } else {
          audioRef.current?.play().catch(() => {});
          setPlaying(true);
        }
      }
    }
  };

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
    }
    setMuted((m) => !m);
  };

  return (
    <>
      <audio ref={audioRef} />

      <div
        className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md border border-white/10 px-4 py-3 group">
          {/* Play/Pause button */}
          <button
            data-testid="button-music-toggle"
            onClick={handleStart}
            className="text-white/50 hover:text-white transition-colors duration-200 flex-shrink-0"
            aria-label={playing ? "Pause music" : "Play music"}
          >
            {playing ? (
              <span className="flex gap-[3px] items-end h-4">
                <span
                  className="w-[3px] bg-white/70 rounded-sm animate-[equalizerA_0.8s_ease-in-out_infinite]"
                  style={{ height: "100%" }}
                />
                <span
                  className="w-[3px] bg-white/70 rounded-sm animate-[equalizerB_0.9s_ease-in-out_infinite]"
                  style={{ height: "60%" }}
                />
                <span
                  className="w-[3px] bg-white/70 rounded-sm animate-[equalizerA_0.7s_ease-in-out_infinite_0.1s]"
                  style={{ height: "80%" }}
                />
              </span>
            ) : inGap ? (
              <Music className="w-4 h-4 opacity-50 animate-pulse" />
            ) : (
              <Music className="w-4 h-4" />
            )}
          </button>

          {/* Track info */}
          <div
            className="overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-500 ease-in-out"
          >
            <div className="whitespace-nowrap">
              <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase leading-none mb-0.5">
                {inGap ? "INTERLUDE" : `TRACK ${currentIndex + 1} / ${TRACKS.length}`}
              </p>
              <p className="text-[11px] tracking-wider text-white/60 truncate max-w-[180px]">
                {inGap ? "— — —" : TRACKS[currentIndex].label}
              </p>
            </div>
          </div>

          {/* Mute button */}
          <button
            data-testid="button-music-mute"
            onClick={handleMute}
            className="text-white/30 hover:text-white/70 transition-colors duration-200 flex-shrink-0"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Hide toggle */}
        <button
          data-testid="button-music-hide"
          onClick={() => setVisible((v) => !v)}
          className="absolute -top-5 right-0 text-[9px] tracking-[0.3em] text-white/20 hover:text-white/50 transition-colors"
        >
          {visible ? "HIDE" : "MUSIC"}
        </button>
      </div>

      {!visible && (
        <button
          data-testid="button-music-show"
          onClick={() => setVisible(true)}
          className="fixed bottom-6 left-6 z-50 text-[9px] tracking-[0.3em] text-white/20 hover:text-white/50 transition-colors"
        >
          MUSIC
        </button>
      )}
    </>
  );
}
