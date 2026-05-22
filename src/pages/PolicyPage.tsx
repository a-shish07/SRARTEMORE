import { useEffect } from "react";

interface PolicyPageProps {
  title: string;
  subtitle: string;
  content: string;
}

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

export default function PolicyPage({ title, subtitle, content }: PolicyPageProps) {
  useReveal();
  return (
    <div className="policy-page">
      <section className="page-hero" style={{ padding: "100px 20px", textAlign: "center", background: "var(--cream)" }}>
        <div className="reveal">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "56px", fontWeight: 300, marginBottom: "16px", color: "var(--dark-beige)" }}>{title}</h1>
          <p style={{ color: "var(--gold)", letterSpacing: "4px", textTransform: "uppercase", fontSize: "11px", fontWeight: 500 }}>{subtitle}</p>
          <div style={{ marginTop: "32px", fontSize: "24px", color: "var(--gold)", opacity: 0.8 }}>💅</div>
        </div>
      </section>
      
      <section style={{ maxWidth: "800px", margin: "80px auto", padding: "0 20px", lineHeight: 2, color: "var(--dark-beige)" }}>
        <div className="reveal">
          <p style={{ fontSize: "16px", marginBottom: "60px", whiteSpace: "pre-line", fontWeight: 300 }}>
            {content}
          </p>
        </div>
        
        <div className="reveal" style={{ padding: "50px", background: "white", border: "1px solid var(--border)", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", marginBottom: "12px", color: "var(--dark-beige)" }}>Need more help?</h3>
          <p style={{ fontSize: "14px", marginBottom: "28px", color: "var(--dark-beige)", opacity: 0.8 }}>Our customer care team is available 24/7 to assist you with any questions.</p>
          <button className="btn-primary" onClick={() => window.location.href = "mailto:support@srartemore.com"}>
            <span>Contact Support</span>
          </button>
        </div>
      </section>
    </div>
  );
}
