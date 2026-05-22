import { useEffect, useState } from "react";
import { testimonials } from "../data/products";

type Page =
  | "home" | "products" | "detail" | "cart" | "checkout" | "success" | "about" | "contact" | "favorites"
  | "login" | "dashboard" | "size-guide" | "how-to-apply" | "faq" | "press" | "new-arrivals" | "on-sale" | "best-sellers";

interface AboutPageProps { onNavigate: (page: Page) => void; }

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  useReveal();
  const [testiIndex, setTestiIndex] = useState(0);
  const nextTesti = () => setTestiIndex((prev) => (prev + 1) % testimonials.length);
  const prevTesti = () => setTestiIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="about-page-container">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-text reveal">
          <h1>Art Born from<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Passion</em></h1>
          <p>SR Artémore was born from a love of beauty and craftsmanship. Every nail is a miniature masterpiece — handcrafted using premium materials to give you a salon-quality experience at home.</p>
          <p>We believe luxury should be accessible, wearable, and utterly beautiful.</p>
          <button className="btn-primary" style={{ marginTop: "24px" }} onClick={() => onNavigate("products")}>
            <span>Explore Collection</span>
          </button>
        </div>
        <div className="about-hero-img reveal">
          <img src="/jewelry.png" alt="Luxury Nails" />
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="about-content">
        <div className="about-grid reveal">
          <img src="/gold-nails.png" alt="Craftsmanship" />
          <div className="about-grid-text">
            <h2>Crafted with Precision</h2>
            <p>Every set is handmade with attention to detail, ensuring elegance, durability, and comfort.</p>
            <p>Our designs blend timeless luxury with modern trends, creating wearable art for every occasion.</p>
          </div>
        </div>

        {/* VALUES SECTION */}
        <div className="values-grid">
          {[
            { icon: <i className="ri-vip-diamond-line"></i>, title: "Luxury Quality", text: "Premium materials and salon-grade finishes for a flawless look." },
            { icon: <i className="ri-brush-line"></i>, title: "Handmade Care", text: "Every design is handcrafted with passion and creativity." },
            { icon: <i className="ri-magic-line"></i>, title: "Elegant Style", text: "Sophisticated aesthetics inspired by modern luxury fashion." },
            { icon: <i className="ri-shield-star-line"></i>, title: "Premium Quality", text: "We use only the finest gel materials, ensuring your press-ons are durable, flexible, and truly luxurious." },
            { icon: <i className="ri-heart-3-line"></i>, title: "Made with Love", text: "Each set is crafted by hand, with attention to every detail — because you deserve nothing less." },
            { icon: <i className="ri-leaf-line"></i>, title: "Reusable & Conscious", text: "Our nails are designed to be reused, reducing waste while keeping you looking fabulous." },
          ].map((v, idx) => (
            <div key={idx} className="value-card reveal" style={{ textAlign: "center" }}>
              <div className="value-icon" style={{ fontSize: "40px", color: "var(--gold)", marginBottom: "20px" }}>{v.icon}</div>
              <div className="value-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 400 }}>{v.title}</div>
              <p className="value-text" style={{ color: "#666", lineHeight: 1.8 }}>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="team-section" style={{ background: "var(--cream)", padding: "90px 30px", textAlign: "center" }}>
        <h2 className="reveal" style={{ fontSize: "48px", marginBottom: "20px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>Our Vision</h2>
        <p className="reveal" style={{ maxWidth: "700px", margin: "auto", color: "#666", lineHeight: 1.9 }}>
          To redefine beauty accessories through artistic, reusable, and luxurious nail designs.
        </p>
      </section>

      <section className="brand-section" style={{ padding: "120px 30px", textAlign: "center", background: "white" }}>
        <div className="reveal">
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", letterSpacing: "4px", color: "var(--gold)", textTransform: "uppercase", marginBottom: "32px", fontWeight: 600 }}>The Brand</p>
          <div style={{ marginBottom: "40px", maxWidth: "300px", margin: "0 auto 40px" }}>
            <img 
              src="/4.png" 
              alt="SR Artémore Logo" 
              style={{ 
                width: "100%", 
                height: "auto", 
                filter: "brightness(0.9)" 
              }} 
            />
          </div>
          <p style={{ fontSize: "20px", color: "var(--gold)", letterSpacing: "1.5px", fontWeight: 600, textTransform: "uppercase" }}>
            Luxury press-on nails & accessories<br/>
            <span style={{ fontSize: "16px", fontStyle: "italic", textTransform: "none", opacity: 0.9 }}>elegantly Handcrafted</span>
          </p>
        </div>
      </section>
    </div>
  );
}
