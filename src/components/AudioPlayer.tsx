import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white border border-zinc-200 p-3 rounded-full shadow-lg z-50">
      <audio ref={audioRef} src={src} loop />
      <button 
        onClick={togglePlay}
        className="text-zinc-900 hover:text-emerald-600 transition-colors"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  );
}
