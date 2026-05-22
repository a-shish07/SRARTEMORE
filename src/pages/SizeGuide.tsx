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

export default function SizeGuide() {
  useReveal();
  return (
    <div className="policy-page">
      <section className="page-hero" style={{ padding: "100px 20px", textAlign: "center", background: "var(--cream)" }}>
        <div className="reveal">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "56px", fontWeight: 300, marginBottom: "16px", color: "var(--dark-beige)" }}>Size Guide</h1>
          <p style={{ color: "var(--gold)", letterSpacing: "4px", textTransform: "uppercase", fontSize: "11px", fontWeight: 500 }}>Find Your Perfect Fit</p>
          <div style={{ marginTop: "32px", fontSize: "24px", color: "var(--gold)", opacity: 0.8 }}>💅</div>
        </div>
      </section>
      
      <section style={{ maxWidth: "800px", margin: "80px auto", padding: "0 20px", lineHeight: 2, color: "var(--dark-beige)" }}>
        <div className="reveal">
          <p style={{ fontSize: "16px", marginBottom: "60px", whiteSpace: "pre-line", fontWeight: 300 }}>
            We are preparing a detailed size guide to help you find your perfect fit across all our shapes (Long Almond, Long Square, Short Almond, and Short Square).
            
            In the meantime, feel free to contact us for personalized sizing assistance.
          </p>
        </div>
        
        <div className="reveal" style={{ padding: "50px", background: "white", border: "1px solid var(--border)", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", marginBottom: "12px", color: "var(--dark-beige)" }}>Need Sizing Help?</h3>
          <p style={{ fontSize: "14px", marginBottom: "28px", color: "var(--dark-beige)", opacity: 0.8 }}>Our experts are here to help you measure and choose the best size.</p>
          <button className="btn-primary" onClick={() => window.location.href = "mailto:support@srartemore.com"}>
            <span>Message Us</span>
          </button>
        </div>
      </section>
    </div>
  );
}
