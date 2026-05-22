import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let raf: number;
    let rx = 0, ry = 0;
    let mx = 0, my = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    };

    const animate = () => {
      // Maximized to 0.9 for near-instant follow
      rx += (mx - rx) * 0.9; 
      ry += (my - ry) * 0.9;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => { 
      cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
      cursor.style.background = "#e8d5b0"; // Lighter gold on hover
    };
    const onLeave = () => { 
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      cursor.style.background = "#c9a96e"; // Base gold
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, .product-card, .cat-card").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Inline styles for the Luxury Gold look
  const dotStyle: React.CSSProperties = {
    position: 'fixed',
    width: '8px',
    height: '8px',
    background: '#c9a96e', // Classic Luxury Gold
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    transition: 'transform 0.2s ease-out, background 0.2s ease'
  };

  const ringStyle: React.CSSProperties = {
    position: 'fixed',
    width: '35px',
    height: '35px',
    border: '1.5px solid #c9a96e', // Gold Border
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9998,
    transform: 'translate(-50%, -50%)',
  };

  return (
    <>
      <div ref={cursorRef} style={dotStyle} className="cursor" />
      <div ref={ringRef} style={ringStyle} className="cursor-ring" />
    </>
  );
}