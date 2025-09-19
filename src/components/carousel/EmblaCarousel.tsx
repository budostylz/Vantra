// src/components/common/EmblaCarousel.tsx
import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

type Props = {
  slides: string[];
  options?: EmblaOptionsType;
  height?: number; // px
  radius?: number; // px
};

export default function EmblaCarousel({
  slides,
  options,
  height = 240,
  radius = 16,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, slides.length]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div
      ref={emblaRef}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: radius,
      }}
    >
      {/* Track */}
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: 4,              // slight inset to avoid clipping shadows
        }}
      >
        {slides.map((src, i) => (
          <div
            key={i}
            style={{
              // Snap-like layout: each slide ~85% width for peeking next slide
              flex: "0 0 85%",
              minWidth: 0,
              borderRadius: radius,
              overflow: "hidden",
            }}
          >
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              loading="lazy"
              style={{
                display: "block",
                width: "100%",
                height,
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous slide"
        style={navBtnStyle("left")}
      >
        ‹
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next slide"
        style={navBtnStyle("right")}
      >
        ›
      </button>
    </div>
  );
}

function navBtnStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 8,
    width: 36,
    height: 36,
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: "rgba(255,255,255,0.9)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontSize: 18,
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(0,0,0,.12)",
    backdropFilter: "saturate(180%) blur(6px)",
    outline: "none",
    zIndex: 2,
  } as React.CSSProperties;
}
