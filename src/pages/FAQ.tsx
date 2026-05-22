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

export default function FAQ() {
  useReveal();
  return (
    <div className="policy-page">
      <section className="page-hero" style={{ padding: "100px 20px", textAlign: "center", background: "var(--cream)" }}>
        <div className="reveal">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "56px", fontWeight: 300, marginBottom: "16px", color: "var(--dark-beige)" }}>FAQ</h1>
          <p style={{ color: "var(--gold)", letterSpacing: "4px", textTransform: "uppercase", fontSize: "11px", fontWeight: 500 }}>Common Questions</p>
          <div style={{ marginTop: "32px", fontSize: "24px", color: "var(--gold)", opacity: 0.8 }}>💅</div>
        </div>
      </section>
      
      <section style={{ maxWidth: "800px", margin: "80px auto", padding: "0 20px", lineHeight: 2, color: "var(--dark-beige)" }}>
        <div className="reveal">
          <p style={{ fontSize: "16px", marginBottom: "60px", whiteSpace: "pre-line", fontWeight: 300 }}>
            Our comprehensive FAQ section is currently being updated to provide you with all the answers regarding shipping, custom sizing, and product care.
            
            If you have any pressing questions, our support team is happy to help you via email or WhatsApp.
          </p>
        </div>
        
        <div className="reveal" style={{ padding: "50px", background: "white", border: "1px solid var(--border)", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", marginBottom: "12px", color: "var(--dark-beige)" }}>Still have questions?</h3>
          <p style={{ fontSize: "14px", marginBottom: "28px", color: "var(--dark-beige)", opacity: 0.8 }}>We're here to help you choose the perfect set of luxury nails.</p>
          <button className="btn-primary" onClick={() => window.location.href = "mailto:support@srartemore.com"}>
            <span>Get in Touch</span>
          </button>
        </div>
      </section>
    </div>
  );
}
