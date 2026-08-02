import { useEffect, useRef, useState } from "react";
import { introVideo, ui, wedding } from "../data/site";

type Phase = "idle" | "playing" | "fading" | "done";

const SESSION_KEY = "wedding-intro-seen";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface IntroVideoProps {
  /** Called from the intro tap — keep this synchronous for audio unlock. */
  onStartMusic?: () => void;
}

export default function IntroVideo({ onStartMusic }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === "undefined") return "done";
    if (sessionStorage.getItem(SESSION_KEY) === "1") return "done";
    return "idle";
  });
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    if (phase === "done") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "done") {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, [phase]);

  const finish = () => {
    if (phase === "fading" || phase === "done") return;
    setPhase("fading");
    window.setTimeout(() => setPhase("done"), 1100);
  };

  const start = () => {
    if (phase !== "idle") return;

    // Unlock / start music in the same user-gesture turn.
    onStartMusic?.();

    // Reduced motion: open the invitation without playing the video.
    if (prefersReducedMotion()) {
      finish();
      return;
    }

    setPhase("playing");
    setVideoSrc(introVideo.src);

    // Play on the next frame so the <video> has its src attached.
    requestAnimationFrame(() => {
      const video = videoRef.current;
      if (!video) return;
      video.load();
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          /* Stay on poster until another tap if autoplay is blocked. */
          setPhase("idle");
          setVideoSrc(undefined);
          setVideoVisible(false);
        });
      }
    });
  };

  const onTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime > 0.05 && !videoVisible) {
      setVideoVisible(true);
    }
  };

  if (phase === "done") return null;

  const fading = phase === "fading";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ui.intro.open}
      onClick={phase === "idle" ? start : undefined}
      style={{ backgroundImage: `url(${introVideo.poster})` }}
      className={`fixed inset-0 z-100 h-dvh w-full cursor-pointer touch-manipulation bg-[#f3f1ec] bg-cover bg-center transition-opacity duration-1100 ease-in-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Keep a real <img> above any video so iOS never flashes a black frame. */}
      <img
        src={introVideo.poster}
        alt=""
        draggable={false}
        decoding="async"
        fetchPriority="high"
        sizes="100vw"
        className={`pointer-events-none absolute inset-0 z-20 size-full object-cover object-center transition-opacity duration-150 ${
          videoVisible ? "opacity-0" : "opacity-100"
        }`}
      />

      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={introVideo.poster}
          playsInline
          muted
          preload="auto"
          onTimeUpdate={onTimeUpdate}
          onEnded={finish}
          className={`absolute inset-0 z-10 size-full object-cover object-center transition-opacity duration-150 ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {phase === "idle" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center pb-[max(4rem,env(safe-area-inset-bottom))] text-center">
          <p className="font-heading text-2xl tracking-wide text-ink/80 sm:text-3xl">
            {wedding.groom} &amp; {wedding.bride}
          </p>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.25em] text-ink/55">
            {ui.intro.tap}
          </p>
        </div>
      )}

      {phase !== "fading" && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            if (phase === "idle") {
              start();
              return;
            }
            // Skipping mid-play still ensures music is running.
            onStartMusic?.();
            finish();
          }}
          className="absolute top-[max(1.25rem,env(safe-area-inset-top))] right-5 z-30 rounded-full border border-ink/15 bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-ink/70 backdrop-blur-sm transition hover:bg-white hover:text-ink"
        >
          {phase === "idle" ? ui.intro.open : ui.intro.skip}
        </button>
      )}
    </div>
  );
}
