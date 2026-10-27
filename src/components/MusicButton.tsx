import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { useTranslation } from "react-i18next";
import musicAsset from "@/assets/holiday-music.mp3.asset.json";

// Floating music toggle — always visible (fixed), never autoplays.
// The audio file is only fetched on the first click, so it never
// delays the first paint or any page load.
const MusicButton = () => {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reuse one element; a route change remounts App-level content but this
  // button lives in App itself, so playback continues across pages.
  useEffect(() => {
    const a = new Audio(musicAsset.url);
    a.loop = true;
    a.preload = "none";
    a.volume = 0.35; // deliberately quiet, as requested
    audioRef.current = a;
    return () => {
      a.pause();
      a.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? t("music.pause") : t("music.play")}
      className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-50 w-11 h-11 rounded-full bg-background/90 backdrop-blur-md border border-border text-foreground flex items-center justify-center shadow-lg hover:border-primary/60 hover:text-primary transition-colors"
    >
      {playing ? (
        <Pause className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Music className="h-4 w-4" aria-hidden="true" />
      )}
      {playing && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-40"
        />
      )}
    </button>
  );
};

export default MusicButton;
