/**
 * InstagramCarousel — @sr_artemore
 * Clean image-only cards, no nav arrows, no embed header/footer UI.
 */

import { useEffect, useRef, useCallback } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const SCROLL_DURATION = 48;
const CARD_W = 300;
const CARD_H = 300;

const POSTS = [
  { id: "DXUBULkjWtP", permalink: "https://www.instagram.com/sr_artemore/p/DXUBULkjWtP/" },
  { id: "DW1Np44jfVi", permalink: "https://www.instagram.com/sr_artemore/p/DW1Np44jfVi/" },
  { id: "DW1NV6TDXVe", permalink: "https://www.instagram.com/sr_artemore/p/DW1NV6TDXVe/" },
  { id: "DW1MwQMDZxS", permalink: "https://www.instagram.com/sr_artemore/p/DW1MwQMDZxS/" },
  { id: "DW1MUFXjfWN", permalink: "https://www.instagram.com/sr_artemore/p/DW1MUFXjfWN/" },
  { id: "DW1MC0ODWLC", permalink: "https://www.instagram.com/sr_artemore/p/DW1MC0ODWLC/" },
  { id: "DW1LhSwDf4c", permalink: "https://www.instagram.com/sr_artemore/p/DW1LhSwDf4c/" },
  { id: "DW1LR5_DZxl", permalink: "https://www.instagram.com/sr_artemore/p/DW1LR5_DZxl/" },
  { id: "DW1KkEGDZ_Y", permalink: "https://www.instagram.com/sr_artemore/p/DW1KkEGDZ_Y/" },
  { id: "DW1KPUSDU7d", permalink: "https://www.instagram.com/sr_artemore/p/DW1KPUSDU7d/" },
  { id: "DW1J13MjQAd", permalink: "https://www.instagram.com/sr_artemore/p/DW1J13MjQAd/" },
  { id: "DWqoYoTDQ0x", permalink: "https://www.instagram.com/sr_artemore/p/DWqoYoTDQ0x/" },
];

// Shift iframe up to hide Instagram's ~56px account header.
// Increase IFRAME_OFFSET_TOP (more negative) if header still bleeds through.
const IFRAME_OFFSET_TOP = -58;
const IFRAME_H = CARD_H - IFRAME_OFFSET_TOP + 52;

function InstaCard({ id, permalink, index }: { id: string; permalink: string; index: number }) {
  const skeletonRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover="hovered"
      style={{
        flexShrink: 0,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 14,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
        background: "rgba(255,255,255,0.04)",
      }}
    >
      {/* Skeleton shimmer */}
      <div
        ref={skeletonRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          borderRadius: 14,
          background:
            "linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(212,175,55,0.09) 50%,rgba(255,255,255,0.04) 75%)",
          backgroundSize: "200% 100%",
          animation: "igShimmer 1.5s ease-in-out infinite",
        }}
      />

      {/* Iframe wrapper — shifted up to clip Instagram's header */}
      <div style={{
        position: "absolute",
        top: IFRAME_OFFSET_TOP,
        left: 0,
        right: 0,
        height: IFRAME_H,
        zIndex: 1,
        overflow: "hidden",
      }}>
        <iframe
          src={`https://www.instagram.com/p/${id}/embed/?cr=1&v=14&hidecaption=1`}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
            pointerEvents: "none",
          }}
          scrolling="no"
          frameBorder={0}
          allowTransparency={true}
          loading="lazy"
          title="Instagram post by @sr_artemore"
          onLoad={() => {
            if (skeletonRef.current) skeletonRef.current.style.display = "none";
          }}
        />
      </div>

      {/* Hover overlay — instagram icon + handle only, NO arrow, NO badge */}
      <motion.a
        href={permalink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View on Instagram"
        variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "18px 16px",
          background:
            "linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.15) 50%,transparent 100%)",
          textDecoration: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f09433" />
                <stop offset="50%" stopColor="#dc2743" />
                <stop offset="100%" stopColor="#bc1888" />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"
              stroke="url(#ig-grad)" strokeWidth="1.8" fill="none" />
            <circle cx="12" cy="12" r="4"
              stroke="url(#ig-grad)" strokeWidth="1.8" fill="none" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad)" />
          </svg>
          <span style={{
            color: "rgba(255,255,255,0.92)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}>
            @sr_artemore
          </span>
        </div>
      </motion.a>

      {/* Gold glow ring on hover */}
      <motion.div
        variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 11,
          borderRadius: 14,
          boxShadow: "0 0 0 2px rgba(212,175,55,0.72), 0 16px 44px rgba(212,175,55,0.13)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

export default function InstagramCarousel() {
  const controls = useAnimation();
  const outerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(outerRef, { margin: "0px 0px -60px 0px" });
  const touchX = useRef(0);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const displayPosts = [...POSTS, ...POSTS];

  const play = useCallback(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: { repeat: Infinity, repeatType: "loop", duration: SCROLL_DURATION, ease: "linear" },
      },
    });
  }, [controls]);

  const pause = useCallback(() => { controls.stop(); }, [controls]);

  useEffect(() => {
    if (isInView) play();
    else controls.stop();
  }, [isInView, play, controls]);

  return (
    <>
      <style>{`
        @keyframes igShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .ig-viewport {
          overflow: hidden;
          cursor: grab;
          padding: 10px 0 28px;
        }
        .ig-viewport:active { cursor: grabbing; }
        .ig-track {
          display: flex;
          gap: 18px;
          width: max-content;
          padding: 0 40px;
        }
        @media (max-width: 600px) {
          .ig-track { padding: 0 14px; gap: 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ig-track { animation: none !important; }
        }
      `}</style>

      <section style={{ padding: "80px 0 0", overflow: "hidden" }} aria-label="Instagram feed — @sr_artemore">

        {/* Header */}
        <motion.div
          className="section-header reveal visible"
          style={{ textAlign: "center", padding: "0 24px 48px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label" style={{
            display: "inline-block", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--gold,#D4AF37)", marginBottom: 12, opacity: 0.85,
          }}>
            @sr_artemore
          </p>
          <h2 className="section-title" style={{ margin: "0 0 14px" }}>
            Follow Our Journey
          </h2>
          <p className="section-sub" style={{ margin: 0 }}>
            <a
              href="https://www.instagram.com/sr_artemore"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--gold,#D4AF37)", textDecoration: "none" }}
            >
              @sr_artemore
            </a>{" "}
            — Tag us to be featured
          </p>
      </motion.div>

      {/* Carousel */}
      <div
        ref={outerRef}
        className="ig-viewport"
        onMouseEnter={pause}
        onMouseLeave={play}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; pause(); }}
        onTouchEnd={(e) => {
          const d = Math.abs(touchX.current - e.changedTouches[0].clientX);
          setTimeout(play, d > 40 ? 900 : 1500);
        }}
      >
        <motion.div className="ig-track" animate={reducedMotion ? undefined : controls}>
          {displayPosts.map((post, idx) => (
            <InstaCard key={`${post.id}-${idx}`} id={post.id} permalink={post.permalink} index={idx} />
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div style={{ display: "flex", justifyContent: "center", margin: "36px 0 80px" }}>
        <a
          href="https://www.instagram.com/sr_artemore"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <span>FOLLOW ON INSTAGRAM</span>
        </a>
      </div>
    </section>
    </>
  );
}