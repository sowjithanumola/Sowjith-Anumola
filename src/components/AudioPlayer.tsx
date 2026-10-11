import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

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
      // Playback can be blocked or the file can fail to load; keep the UI in sync.
      console.warn('Audio could not be played:', error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white/60 backdrop-blur-md border border-white/40 p-3 rounded-full shadow-lg z-50 transition-colors duration-500">
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
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="text-zinc-900 hover:text-emerald-600 transition-colors"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  );
}
