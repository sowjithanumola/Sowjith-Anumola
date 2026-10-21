import { useState, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function AudioPlayer({ src }: { src: string }) {
  const { isDark } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      console.warn("Audio could not be played:", error);
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 backdrop-blur-xl border px-3.5 py-2.5 rounded-full shadow-2xl transition-all duration-300 group ${
        isDark
          ? "bg-[#0e071e]/90 border-white/15 hover:border-lime-400/50 text-white"
          : "bg-white/95 border-zinc-200/90 text-zinc-900 hover:border-lime-500 shadow-xl"
      }`}
    >
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause Sowjith Anthem" : "Play Sowjith Anthem"}
        className={`flex items-center gap-2 text-xs font-mono font-medium focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none rounded-full transition-colors ${
          isDark ? "text-zinc-300 hover:text-lime-300" : "text-zinc-700 hover:text-black"
        }`}
      >
        <span
          className={`p-1.5 rounded-full transition-colors ${
            isPlaying
              ? "bg-lime-400 text-black shadow-[0_0_12px_rgba(163,230,53,0.5)]"
              : isDark
                ? "bg-white/10 text-white group-hover:bg-lime-400 group-hover:text-black"
                : "bg-zinc-100 text-zinc-800 border border-zinc-200 group-hover:bg-lime-400 group-hover:text-black"
          }`}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 pr-1">
          <Music
            size={12}
            className={isPlaying ? "text-lime-500 animate-pulse" : "text-zinc-400"}
          />
          <span className="tracking-wider uppercase text-[11px] font-semibold">
            {isPlaying ? "Playing Anthem" : "Sowjith Anthem"}
          </span>
        </span>
      </button>
    </div>
  );
}
