import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Press() {
  useReveal();
  return (
    <div className="policy-page">
      <section className="page-hero" style={{ padding: "100px 20px", textAlign: "center", background: "var(--cream)" }}>
        <div className="reveal">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "56px", fontWeight: 300, marginBottom: "16px", color: "var(--dark-beige)" }}>Press & Media</h1>
          <p style={{ color: "var(--gold)", letterSpacing: "4px", textTransform: "uppercase", fontSize: "11px", fontWeight: 500 }}>News & Mentions</p>
          <div style={{ marginTop: "32px", fontSize: "24px", color: "var(--gold)", opacity: 0.8 }}>💅</div>
        </div>
      </section>
      
      <section style={{ maxWidth: "800px", margin: "80px auto", padding: "0 20px", lineHeight: 2, color: "var(--dark-beige)" }}>
        <div className="reveal">
          <p style={{ fontSize: "16px", marginBottom: "60px", whiteSpace: "pre-line", fontWeight: 300 }}>
            Check back soon for our latest press releases, media mentions, and partnership announcements as we continue to grow the SR Artémore brand.
            
            For media inquiries, please contact our PR team.
          </p>
        </div>
        
        <div className="reveal" style={{ padding: "50px", background: "white", border: "1px solid var(--border)", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", marginBottom: "12px", color: "var(--dark-beige)" }}>Media Inquiries</h3>
          <p style={{ fontSize: "14px", marginBottom: "28px", color: "var(--dark-beige)", opacity: 0.8 }}>Interested in featuring our handcrafted luxury nails? We'd love to chat.</p>
          <button className="btn-primary" onClick={() => window.location.href = "mailto:pr@srartemore.com"}>
            <span>Contact PR</span>
          </button>
        </div>
      </section>
    </div>
  );
}
