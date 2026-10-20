import { useState, useRef } from 'react';
import { Play, Pause, Music } from 'lucide-react';

export default function AudioPlayer({ src }: { src: string }) {
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
      console.warn('Audio could not be played:', error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#0e071e]/90 backdrop-blur-xl border border-white/15 px-3.5 py-2.5 rounded-full shadow-2xl hover:border-lime-400/50 transition-all duration-300 group">
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
        aria-label={isPlaying ? 'Pause Sowjith Anthem' : 'Play Sowjith Anthem'}
        className="flex items-center gap-2 text-xs font-mono font-medium text-zinc-300 hover:text-lime-300 focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none rounded-full transition-colors"
      >
        <span className={`p-1.5 rounded-full transition-colors ${isPlaying ? 'bg-lime-400 text-black shadow-[0_0_12px_rgba(163,230,53,0.5)]' : 'bg-white/10 text-white group-hover:bg-lime-400 group-hover:text-black'}`}>
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 pr-1">
          <Music size={12} className={isPlaying ? 'text-lime-400 animate-pulse' : 'text-zinc-500'} />
          <span className="tracking-wider uppercase text-[11px]">{isPlaying ? 'Playing Anthem' : 'Sowjith Anthem'}</span>
        </span>
      </button>
    </div>
  );
}

