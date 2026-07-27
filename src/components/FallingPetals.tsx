import { useMemo } from "react";

const COLORS = ["#d66371", "#e79aa5", "#dfcacc", "#f4c9d0", "#eab0ba"];

interface Petal {
  left: number;
  size: number;
  color: string;
  opacity: number;
  fallDuration: number;
  fallDelay: number;
  swayDuration: number;
  sway: number;
  spinDuration: number;
  tilt: number;
  blossom: boolean;
}

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createPetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, index) => ({
    left: (index / count) * 100 + random(-4, 4),
    size: random(13, 28),
    color: COLORS[Math.floor(random(0, COLORS.length))],
    opacity: random(0.5, 0.9),
    fallDuration: random(11, 22),
    // Negative delay so the sky is already full of petals on first paint.
    fallDelay: -random(0, 22),
    swayDuration: random(3, 7),
    sway: random(18, 55),
    spinDuration: random(4, 11),
    tilt: random(0, 360),
    blossom: index % 4 === 0,
  }));
}

function PetalShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 30" width="100%" height="100%" aria-hidden="true">
      <path
        d="M12 29.5C6.5 25.5 2.8 19.7 2.8 14.3 2.8 6.4 6.9.5 12 .5s9.2 5.9 9.2 13.8c0 5.4-3.7 11.2-9.2 15.2Z"
        fill={color}
      />
    </svg>
  );
}

function BlossomShape({ color }: { color: string }) {
  return (
    <svg viewBox="-12 -12 24 24" width="100%" height="100%" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy="-6"
          rx="3.4"
          ry="5.6"
          fill={color}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r="2" fill="#f7e3c0" />
    </svg>
  );
}

interface FallingPetalsProps {
  count?: number;
}

export default function FallingPetals({ count = 5 }: FallingPetalsProps) {
  const petals = useMemo(() => createPetals(count), [count]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden motion-reduce:hidden"
    >
      {petals.map((petal, index) => (
        <div
          key={index}
          className="absolute top-0 animate-petal-fall will-change-transform"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.fallDuration}s`,
            animationDelay: `${petal.fallDelay}s`,
          }}
        >
          <div
            className="animate-petal-sway will-change-transform"
            style={
              {
                "--sway": `${petal.sway}px`,
                animationDuration: `${petal.swayDuration}s`,
                animationDelay: `${petal.fallDelay}s`,
              } as React.CSSProperties
            }
          >
            <div
              className="animate-petal-spin will-change-transform"
              style={
                {
                  "--tilt": `${petal.tilt}deg`,
                  width: `${petal.size}px`,
                  height: `${petal.size}px`,
                  opacity: petal.opacity,
                  animationDuration: `${petal.spinDuration}s`,
                } as React.CSSProperties
              }
            >
              {petal.blossom ? (
                <BlossomShape color={petal.color} />
              ) : (
                <PetalShape color={petal.color} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
