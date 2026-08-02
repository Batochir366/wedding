import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { weddingMusic } from "../data/site";

export type WeddingMusicHandle = {
  /** Start playback; call from a user gesture for reliable unmute. */
  start: () => Promise<boolean>;
};

const WeddingMusic = forwardRef<WeddingMusicHandle>(function WeddingMusic(
  _props,
  ref,
) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userStoppedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const applyStartTime = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    if (audio.currentTime < weddingMusic.startAt - 0.5) {
      audio.currentTime = weddingMusic.startAt;
    }
  }, []);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || loadError || userStoppedRef.current) return false;

    applyStartTime();
    audio.muted = false;

    try {
      await audio.play();
      setNeedsTap(false);
      return true;
    } catch {
      try {
        audio.muted = true;
        await audio.play();
        audio.muted = false;
        setNeedsTap(false);
        return true;
      } catch {
        setNeedsTap(true);
        return false;
      }
    }
  }, [applyStartTime, loadError]);

  useImperativeHandle(ref, () => ({ start: startMusic }), [startMusic]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onReady = () => {
      applyStartTime();
      if (!userStoppedRef.current) void startMusic();
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => setLoadError(true);

    audio.addEventListener("loadedmetadata", onReady);
    audio.addEventListener("canplay", onReady);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    // Attempt autoplay on page load (works when the browser allows it).
    void startMusic();

    const unlock = () => {
      if (!userStoppedRef.current && audio.paused) void startMusic();
    };

    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);

    return () => {
      audio.removeEventListener("loadedmetadata", onReady);
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
    };
  }, [applyStartTime, startMusic]);

  const stopMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    userStoppedRef.current = true;
    audio.pause();
    setPlaying(false);
    setNeedsTap(false);
  };

  const resumeMusic = () => {
    userStoppedRef.current = false;
    void startMusic();
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingMusic.src}
        loop
        preload="auto"
        playsInline
        className="sr-only"
        aria-label={weddingMusic.title}
      />

      <div className="fixed right-4 bottom-20 z-60 flex flex-col items-end gap-2 sm:bottom-24">
        {loadError && (
          <p className="max-w-[220px] rounded-lg bg-white px-3 py-2 text-right text-sm text-red-600 shadow-md">
            Дуу файл олдсонгүй
          </p>
        )}

        {needsTap && !playing && !loadError && (
          <button
            type="button"
            onClick={resumeMusic}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-primary-dark"
          >
            Дууг эхлүүлэх
          </button>
        )}

        {playing ? (
          <button
            type="button"
            onClick={stopMusic}
            aria-label="Дууг зогсоох"
            title="Зогсоох"
            className="rounded-full border-2 border-primary bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-primary-dark"
          >
            Зогсоох
          </button>
        ) : (
          !needsTap &&
          !loadError && (
            <button
              type="button"
              onClick={resumeMusic}
              aria-label="Дууг тоглуулах"
              title={weddingMusic.title}
              className="flex size-11 items-center justify-center rounded-full border-2 border-primary bg-white/95 text-lg shadow-md transition hover:bg-primary hover:text-white"
            >
              ▶
            </button>
          )
        )}
      </div>
    </>
  );
});

export default WeddingMusic;
