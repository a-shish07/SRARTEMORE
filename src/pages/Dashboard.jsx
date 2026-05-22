import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SR ARTÉMORE — User Dashboard
// Theme: exact match to website — charcoal/black bg, gold #b8975a accents
// Fonts: Cormorant Garamond (display) + Jost (body)
// Logo: SVG recreation of the SR Artémore emblem from brand images
// ─────────────────────────────────────────────────────────────────────────────

// ── Brand Tokens ──────────────────────────────────────────────────────────────
const T = {
  black:   "#0a0908",
  dark:    "#111008",
  dark2:   "#1a1814",
  gold:    "#b8975a",
  goldLt:  "#d4b06a",
  cream:   "#f5f0e8",
  cream2:  "#ede6d9",
  muted:   "#7a7060",
  border:  "rgba(184,151,90,0.18)",
  borderW: "rgba(255,255,255,0.08)",
  serif:   "'Cormorant Garamond', Georgia, serif",
  sans:    "'Jost', sans-serif",
};

// ── SVG Logo (recreated from brand images) ────────────────────────────────────
function SRLogo({ size = 64, color = "#fff" }) {
  return (
    <img src="/4.png" alt="Logo" style={{ width: size, height: size, objectFit: 'contain' }} />
  );
}

function LogoFull({ onDark = true }) {
  const textColor = onDark ? "#fff" : T.dark;
  const bgColor   = onDark ? T.dark2 : "#fff";
  const logoColor = onDark ? "#fff" : T.dark;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ background: bgColor, padding: 3, border: `1px solid ${T.gold}`, lineHeight: 0, flexShrink: 0 }}>
        <SRLogo size={60} color={logoColor} />
      </div>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const I = {
  home:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  products: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>,
  about:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  contact:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  bell:     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  logout:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  user:     <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  overview: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  orders:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  address:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  settings: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  edit:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  plus:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  menu:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close:    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  bag:      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  nail:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 5 5.5 5 9c0 5 4 9 7 13 3-4 7-8 7-13 0-3.5-3-7-7-7z"/></svg>,
  search:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  heart:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  cart:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
};

// ── Data ──────────────────────────────────────────────────────────────────────
const USER = { name: "Riya Sharma", email: "riya.sharma@example.com", role: "Silver Member", joined: "April 2026", avatar: null };
const STATS = [
  { label: "Total Orders",    value: 3,  sub: "All time"    },
  { label: "Pending Orders",  value: 1,  sub: "In progress" },
  { label: "Saved Addresses", value: 2,  sub: "Locations"   },
];
const RECENT_ORDERS = [];
const ACTIVITY = [
  { title: "SR10 Lotus Mandala",        sub: "Henna Stencil · XS",        date: "Apr 16, 2026", badge: "New Arrival"  },
  { title: "Aurora Chrome Collection",  sub: "Press-on Nails · Medium",   date: "Apr 10, 2026", badge: "In Stock"     },
  { title: "Bridal Jewellery Set",       sub: "Gold Finish · Standard",    date: "Apr 2, 2026",  badge: "Best Seller" },
];
const INITIAL_ADDRESSES = [
  { id: 1, name: "Riya Sharma",  addressLine: "42 MG Road, Apartment 5B", city: "Bengaluru", state: "Karnataka",   zip: "560001", phone: "+91 98765 43210" },
  { id: 2, name: "Priya Sharma", addressLine: "12 Anna Salai",             city: "Chennai",   state: "Tamil Nadu", zip: "600002", phone: "+91 91234 56789" },
];
const EMPTY_FORM = { name: "", phone: "", addressLine: "", city: "", state: "", zip: "" };
const NAV_LINKS  = ["Home", "Products", "About Us", "Contact"];
const SIDEBAR_NAV = [
  { id: "overview",  label: "Overview",        icon: I.overview  },
  { id: "orders",    label: "Orders",           icon: I.orders    },
  { id: "addresses", label: "Addresses",        icon: I.address   },
  { id: "settings",  label: "Profile Settings", icon: I.settings  },
];

// ── Shared helpers ────────────────────────────────────────────────────────────
const GoldLine = () => (
  <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)` }} />
);

const goldBtn = (extra = {}) => ({
  display: "inline-flex", alignItems: "center", gap: 6,
  background: T.dark2, color: T.gold,
  border: `1px solid ${T.gold}`, borderRadius: 2,
  padding: "9px 20px", fontFamily: T.sans, fontSize: 9,
  letterSpacing: "0.2em", textTransform: "uppercase",
  fontWeight: 600, cursor: "pointer", transition: "opacity 0.18s",
  ...extra,
});

const outlineBtn = () => ({
  display: "inline-flex", alignItems: "center", gap: 5,
  background: "#fff", color: T.muted, border: "1px solid #ddd",
  borderRadius: 2, padding: "7px 14px", fontFamily: T.sans,
  fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
});

const dangerBtn = () => ({
  display: "inline-flex", alignItems: "center", gap: 5,
  background: "#fff", color: "#c0392b", border: "1px solid #f0c8c5",
  borderRadius: 2, padding: "7px 12px", fontFamily: T.sans,
  fontSize: 9, letterSpacing: "0.08em", cursor: "pointer",
});

// ─────────────────────────────────────────────────────────────────────────────
// ANNOUNCEMENT BAR
// ─────────────────────────────────────────────────────────────────────────────
function AnnouncementBar() {
  const items = ["100% HANDMADE","AURORA CHROME NAILS","REUSABLE PRESS-ON SETS","SIZES XS · S · M · L"];
  const all = [...items, ...items];
  return (
    <div style={{ background: T.black, borderBottom: `1px solid ${T.border}`, padding: "7px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 48, animation: "ticker 30s linear infinite", whiteSpace: "nowrap" }}>
        {all.map((item, i) => (
          <span key={i} style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ color: T.gold, fontSize: 8 }}>✦</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
function Navbar({ onMenuClick }) {
  return (
    <nav style={{ background: "#fff", borderBottom: "1px solid #e8e0d4", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
      <LogoFull onDark={false} />

      <div style={{ display: "flex", gap: 34, alignItems: "center" }} className="desk-nav">
        {NAV_LINKS.map(label => (
          <a key={label} href="#" style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#333", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = T.gold}
            onMouseLeave={e => e.target.style.color = "#333"}
          >{label}</a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {[I.search, I.heart, I.cart].map((icon, i) => (
          <button key={i} style={{ background: "none", border: "none", cursor: "pointer", color: "#333", display: "flex", padding: 4 }}
            onMouseEnter={e => e.currentTarget.style.color = T.gold}
            onMouseLeave={e => e.currentTarget.style.color = "#333"}
          >{icon}</button>
        ))}
        <button className="mob-menu" onClick={onMenuClick} style={{ background: "none", border: "none", cursor: "pointer", color: "#333", display: "none", padding: 4 }}>{I.menu}</button>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. DASHBOARD HEADER
// ─────────────────────────────────────────────────────────────────────────────
function DashboardHeader() {
  const btn = { background: "rgba(255,255,255,0.07)", border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 4, cursor: "pointer", color: T.cream, transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" };
  const over  = e => { e.currentTarget.style.background = `rgba(184,151,90,0.18)`; e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.gold; };
  const leave = e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = T.cream; };
  return (
    <div style={{ background: T.dark2 }}>
      <GoldLine />
      <div style={{ padding: "20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 18, height: 1, background: T.gold }} />
            <span style={{ fontFamily: T.sans, fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold }}>Member Portal</span>
          </div>
          <h1 style={{ fontFamily: T.serif, fontSize: "clamp(20px, 2.8vw, 28px)", fontWeight: 400, color: T.cream }}>Dashboard</h1>
          <p style={{ fontFamily: T.sans, fontSize: 11, color: "rgba(245,240,232,0.45)", marginTop: 3 }}>
            Welcome back, <span style={{ color: T.gold, fontWeight: 500 }}>{USER.name}</span>
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <button style={{ ...btn, width: 38, height: 38 }} onMouseEnter={over} onMouseLeave={leave}>{I.bell}</button>
            <span style={{ position: "absolute", top: -2, right: -2, width: 7, height: 7, borderRadius: "50%", background: "#e74c3c", border: `1.5px solid ${T.dark2}` }} />
          </div>
          <button style={{ ...btn, padding: "8px 18px", gap: 7, fontFamily: T.sans, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase" }} onMouseEnter={over} onMouseLeave={leave}>
            {I.logout}<span className="logout-lbl">Logout</span>
          </button>
        </div>
      </div>
      <GoldLine />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3A. PROFILE CARD
// ─────────────────────────────────────────────────────────────────────────────
function ProfileCard() {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e0d4", borderRadius: 6, overflow: "hidden" }}>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${T.gold}, ${T.goldLt}, ${T.gold})` }} />
      <div style={{ padding: "22px 18px", textAlign: "center" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: T.dark2, border: `2px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", color: T.gold, boxShadow: `0 0 18px rgba(184,151,90,0.14)` }}>
          {I.user}
        </div>
        <p style={{ fontFamily: T.serif, fontSize: 18, color: T.dark, fontWeight: 400, marginBottom: 3 }}>{USER.name}</p>
        <p style={{ fontFamily: T.sans, fontSize: 11, color: T.muted, marginBottom: 10 }}>{USER.email}</p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(184,151,90,0.08)", border: `1px solid rgba(184,151,90,0.28)`, borderRadius: 20, padding: "3px 12px", marginBottom: 8 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.gold, display: "inline-block" }} />
          <span style={{ fontFamily: T.sans, fontSize: 9, color: T.gold, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600 }}>{USER.role}</span>
        </div>
        <p style={{ fontFamily: T.sans, fontSize: 10, color: "#aaa" }}>Joined {USER.joined}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3B. SIDEBAR NAV
// ─────────────────────────────────────────────────────────────────────────────
function SidebarNav({ active, setActive, onNavClick }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e0d4", borderRadius: 6, overflow: "hidden" }}>
      <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid #f0e8e0" }}>
        <span style={{ fontFamily: T.sans, fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: T.muted }}>Navigation</span>
      </div>
      <div style={{ padding: 6 }}>
        {SIDEBAR_NAV.map(({ id, label, icon }) => {
          const on = active === id;
          return (
            <button key={id} onClick={() => { setActive(id); onNavClick?.(); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 4, border: "none", borderLeft: `2px solid ${on ? T.gold : "transparent"}`, background: on ? "rgba(184,151,90,0.07)" : "transparent", color: on ? T.dark : T.muted, fontFamily: T.sans, fontSize: 11, letterSpacing: "0.05em", cursor: "pointer", textAlign: "left", marginBottom: 2, fontWeight: on ? 600 : 400, transition: "all 0.18s" }}
              onMouseEnter={e => { if (!on) { e.currentTarget.style.background = "rgba(184,151,90,0.04)"; e.currentTarget.style.color = T.dark; } }}
              onMouseLeave={e => { if (!on) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.muted; } }}
            >
              {icon}<span>{label}</span>
              {on && <span style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: T.gold, flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Sidebar({ active, setActive, onNavClick }) {
  return (
    <aside style={{ width: 230, flexShrink: 0, display: "flex", flexDirection: "column", gap: 14 }}>
      <ProfileCard />
      <SidebarNav active={active} setActive={setActive} onNavClick={onNavClick} />
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return <div style={{ background: "#fff", border: "1px solid #e8e0d4", borderRadius: 6, overflow: "hidden", ...style }}>{children}</div>;
}
function CardHeader({ title, sub, action }) {
  return (
    <div style={{ padding: "14px 20px", borderBottom: "1px solid #f0e8e0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div>
        <h2 style={{ fontFamily: T.serif, fontSize: 19, color: T.dark, fontWeight: 400, marginBottom: 2 }}>{title}</h2>
        {sub && <p style={{ fontFamily: T.sans, fontSize: 11, color: T.muted }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4A. STATS CARD
// ─────────────────────────────────────────────────────────────────────────────
function StatsCard({ label, value, sub }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ flex: 1, minWidth: 110, background: "#fff", border: `1px solid ${hov ? "rgba(184,151,90,0.5)" : "#e8e0d4"}`, borderRadius: 6, padding: "18px 16px", position: "relative", overflow: "hidden", transition: "all 0.22s", boxShadow: hov ? "0 6px 20px rgba(184,151,90,0.1)" : "none", transform: hov ? "translateY(-2px)" : "none" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.gold}, ${T.goldLt})`, opacity: hov ? 1 : 0, transition: "opacity 0.22s" }} />
      <p style={{ fontFamily: T.serif, fontSize: 34, fontWeight: 300, color: T.dark, lineHeight: 1, marginBottom: 4 }}>{value}</p>
      <p style={{ fontFamily: T.sans, fontSize: 11, color: T.dark, fontWeight: 500, marginBottom: 2 }}>{label}</p>
      {sub && <p style={{ fontFamily: T.sans, fontSize: 10, color: T.muted }}>{sub}</p>}
    </div>
  );
}

// EMPTY STATE
function EmptyState({ icon, title, sub, btnLabel, onBtn }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "52px 20px", textAlign: "center" }}>
      <div style={{ color: "#ccc" }}>{icon}</div>
      <p style={{ fontFamily: T.serif, fontSize: 18, color: T.dark, fontWeight: 400 }}>{title}</p>
      <p style={{ fontFamily: T.sans, fontSize: 11, color: T.muted, maxWidth: 260 }}>{sub}</p>
      {btnLabel && (
        <button onClick={onBtn} style={goldBtn()}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >{btnLabel}</button>
      )}
    </div>
  );
}

// ACTIVITY ROW
function ActivityRow({ title, sub, date, badge }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", background: hov ? "rgba(184,151,90,0.03)" : "transparent", borderBottom: "1px solid #f8f4f0", transition: "background 0.18s" }}>
      <div style={{ width: 34, height: 34, borderRadius: 4, background: T.dark2, display: "flex", alignItems: "center", justifyContent: "center", color: T.gold, flexShrink: 0 }}>{I.nail}</div>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: T.sans, fontSize: 13, color: T.dark, fontWeight: 500, marginBottom: 2 }}>{title}</p>
        <p style={{ fontFamily: T.sans, fontSize: 11, color: T.muted }}>{sub}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
        <span style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: T.gold, background: "rgba(184,151,90,0.08)", border: `1px solid rgba(184,151,90,0.2)`, padding: "2px 8px", borderRadius: 10 }}>{badge}</span>
        <span style={{ fontFamily: T.sans, fontSize: 10, color: "#bbb" }}>{date}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4B. OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
const tdStyle = { padding: "12px 16px", borderBottom: "1px solid #f8f4f0", color: T.dark, fontFamily: T.sans, fontSize: 12 };

function OverviewSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }} className="stats-row">
        {STATS.map(s => <StatsCard key={s.label} {...s} />)}
      </div>
      <Card>
        <CardHeader title="Recent Orders" sub="Your latest order activity"
          action={RECENT_ORDERS.length > 0 && (
            <a href="#" style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: T.gold, textDecoration: "none", borderBottom: `1px solid rgba(184,151,90,0.3)`, paddingBottom: 1 }}>View All</a>
          )}
        />
        {RECENT_ORDERS.length === 0
          ? <EmptyState icon={I.bag} title="No orders yet" sub="Start shopping to see your orders here" btnLabel="Start Shopping" />
          : <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Order ID","Product","Date","Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 16px", borderBottom: "2px solid #f0e8e0", fontFamily: T.sans, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: T.muted }}>{h}</th>)}</tr></thead>
              <tbody>{RECENT_ORDERS.map(o => <tr key={o.id}><td style={tdStyle}>{o.id}</td><td style={tdStyle}>{o.product}</td><td style={tdStyle}>{o.date}</td><td style={tdStyle}><span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", background: o.status === "Delivered" ? "#f0faf0" : "#fff8f0", color: o.status === "Delivered" ? "#27ae60" : "#e67e22", border: `1px solid ${o.status === "Delivered" ? "#c3e6cb" : "#f5d9b0"}` }}>{o.status}</span></td></tr>)}</tbody>
            </table>
        }
      </Card>
      <Card>
        <CardHeader title="Recent Activity" sub="Your latest interactions and collections" />
        <div>{ACTIVITY.map(a => <ActivityRow key={a.title} {...a} />)}</div>
      </Card>
    </div>
  );
}

// 4C. ORDERS
function OrdersSection() {
  return (
    <Card>
      <CardHeader title="Orders" sub="All your orders in one place" />
      {RECENT_ORDERS.length === 0
        ? <EmptyState icon={I.bag} title="No orders yet" sub="Start shopping to see your orders here" btnLabel="Explore Products" />
        : null}
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADDRESS FORM
// ─────────────────────────────────────────────────────────────────────────────
function AddressForm({ initial = EMPTY_FORM, onSave, onCancel }) {
  const [form, setForm] = useState({ ...initial });
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const inputStyle = { border: "1px solid #ddd", borderRadius: 3, padding: "9px 11px", fontFamily: T.sans, fontSize: 12, color: T.dark, background: "#fafaf8", outline: "none", width: "100%", transition: "border-color 0.15s" };
  const labelStyle = { fontFamily: T.sans, fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted };
  const field = (name, label, placeholder) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: "1 1 140px", minWidth: 140 }}>
      <label style={labelStyle}>{label}</label>
      <input value={form[name]} onChange={set(name)} placeholder={placeholder} required style={inputStyle}
        onFocus={e => e.target.style.borderColor = T.gold}
        onBlur={e => e.target.style.borderColor = "#ddd"}
      />
    </div>
  );

  return (
    <Card>
      <CardHeader title={initial.name ? "Edit Address" : "Add New Address"} sub="Fill in the delivery details below" />
      <div style={{ padding: 20 }}>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {field("name", "Full Name", "Full Name")}
            {field("phone", "Phone Number", "+91 XXXXX XXXXX")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>Address Line</label>
            <input value={form.addressLine} onChange={set("addressLine")} placeholder="Street, Apartment, Building" required style={inputStyle}
              onFocus={e => e.target.style.borderColor = T.gold}
              onBlur={e => e.target.style.borderColor = "#ddd"}
            />
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {field("city", "City", "City")}
            {field("state", "State", "State")}
            <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: "0 0 90px" }}>
              <label style={labelStyle}>Zip Code</label>
              <input value={form.zip} onChange={set("zip")} placeholder="ZIP" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = T.gold}
                onBlur={e => e.target.style.borderColor = "#ddd"}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 4 }}>
            <button type="button" style={outlineBtn()} onClick={onCancel}>Cancel</button>
            <button type="submit" style={goldBtn()}>Save Address</button>
          </div>
        </form>
      </div>
    </Card>
  );
}

// ADDRESS CARD
function AddressCard({ address, onEdit, onDelete }) {
  return (
    <Card>
      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
          <p style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.dark }}>{address.name}</p>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button style={outlineBtn()} onClick={() => onEdit(address)}>{I.edit} Edit</button>
            <button style={dangerBtn()} onClick={() => onDelete(address.id)}>{I.trash} Delete</button>
          </div>
        </div>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginBottom: 3 }}>{address.addressLine}</p>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginBottom: 3 }}>{address.city}, {address.state} — {address.zip}</p>
        <p style={{ fontFamily: T.sans, fontSize: 11, color: "#aaa" }}>{address.phone}</p>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4D. ADDRESSES
// ─────────────────────────────────────────────────────────────────────────────
function AddressesSection() {
  const [addrs, setAddrs]   = useState(INITIAL_ADDRESSES);
  const [mode, setMode]     = useState("list");
  const [target, setTarget] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ fontFamily: T.serif, fontSize: 20, color: T.dark, fontWeight: 400 }}>Addresses</h2>
          <p style={{ fontFamily: T.sans, fontSize: 11, color: T.muted }}>Manage your saved delivery addresses</p>
        </div>
        {mode === "list" && <button style={goldBtn()} onClick={() => setMode("add")}>{I.plus} Add New Address</button>}
      </div>
      {mode === "add" && (
        <AddressForm onSave={f => { setAddrs(p => [...p, { ...f, id: Date.now() }]); setMode("list"); }} onCancel={() => setMode("list")} />
      )}
      {mode === "edit" && target && (
        <AddressForm initial={target}
          onSave={f => { setAddrs(p => p.map(a => a.id === target.id ? { ...f, id: a.id } : a)); setTarget(null); setMode("list"); }}
          onCancel={() => { setTarget(null); setMode("list"); }}
        />
      )}
      {mode === "list" && (
        addrs.length === 0
          ? <Card><EmptyState icon={I.address} title="No addresses saved" sub="Add a delivery address to get started" btnLabel="Add Address" onBtn={() => setMode("add")} /></Card>
          : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 14 }}>
              {addrs.map(a => <AddressCard key={a.id} address={a}
                onEdit={a => { setTarget(a); setMode("edit"); }}
                onDelete={id => setAddrs(p => p.filter(x => x.id !== id))}
              />)}
            </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4E. PROFILE SETTINGS
// ─────────────────────────────────────────────────────────────────────────────
function ProfileSettingsSection() {
  const [form, setForm] = useState({ name: USER.name, email: USER.email });
  const inputStyle = { border: "1px solid #ddd", borderRadius: 3, padding: "9px 11px", fontFamily: T.sans, fontSize: 12, color: T.dark, background: "#fafaf8", outline: "none", width: "100%" };
  const labelStyle = { fontFamily: T.sans, fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted };
  return (
    <Card>
      <CardHeader title="Profile Settings" sub="Update your account information" />
      <div style={{ padding: 20 }}>
        <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["name","email"].map(k => (
              <div key={k} style={{ display: "flex", flexDirection: "column", gap: 5, flex: "1 1 200px" }}>
                <label style={labelStyle}>{k === "name" ? "Full Name" : "Email Address"}</label>
                <input value={form[k]} type={k === "email" ? "email" : "text"} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = T.gold}
                  onBlur={e => e.target.style.borderColor = "#ddd"}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" style={goldBtn()}>Save Changes</button>
          </div>
        </form>
      </div>
    </Card>
  );
}

// ROUTER
function MainContent({ active }) {
  switch (active) {
    case "overview":  return <OverviewSection />;
    case "orders":    return <OrdersSection />;
    case "addresses": return <AddressesSection />;
    case "settings":  return <ProfileSettingsSection />;
    default:          return <OverviewSection />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE DRAWER
// ─────────────────────────────────────────────────────────────────────────────
function MobileDrawer({ open, onClose, active, setActive }) {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(10,9,8,0.55)", zIndex: 200, backdropFilter: "blur(3px)" }} />
      <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: 270, background: "#fff", zIndex: 201, overflowY: "auto", boxShadow: "4px 0 24px rgba(0,0,0,0.2)", animation: "slideIn 0.22s ease" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #e8e0d4", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <LogoFull onDark={false} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, padding: 4 }}>{I.close}</button>
        </div>
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
          <ProfileCard />
          <SidebarNav active={active} setActive={setActive} onNavClick={onClose} />
        </div>
      </div>
    </>
  );
}

// FOOTER
function Footer() {
  return (
    <footer style={{ background: T.dark2, borderTop: `1px solid ${T.border}`, padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
      <span style={{ fontFamily: T.sans, fontSize: 9, color: T.muted, letterSpacing: "0.06em" }}>© 2026 SR Artémore · All rights reserved. Made with ♥ in India.</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <SRLogo size={20} color={T.gold} />
        <span style={{ fontFamily: T.serif, fontSize: 10, color: T.gold, letterSpacing: "0.2em", textTransform: "uppercase" }}>Luxury Press-on Nails</span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [active, setActive]       = useState("overview");
  const [drawerOpen, setDrawer]   = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; -webkit-font-smoothing: antialiased; }
        body { background: #f5f0e8; font-family: 'Jost', sans-serif; }
        button { cursor: pointer; font-family: inherit; }
        a { cursor: pointer; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #e0d6c8; border-radius: 2px; }

        @keyframes ticker   { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes slideIn  { from { transform: translateX(-100%); } to { transform: translateX(0); }  }
        @keyframes fadeUp   { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .page-enter { animation: fadeUp 0.32s ease both; }

        .desk-nav  { display: flex !important; }
        .mob-menu  { display: none !important; }

        @media (max-width: 860px) {
          .desk-nav   { display: none !important; }
          .mob-menu   { display: flex !important; }
          .sidebar-col { display: none !important; }
          .logout-lbl  { display: none !important; }
          .page-enter  { padding-top: 10px !important; }
        }
        @media (max-width: 560px) {
          .stats-row  { flex-direction: column !important; }
          .logout-lbl { display: none !important; }
          .sidebar-col { display: none !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f5f0e8" }}>
        <AnnouncementBar />
        {/* <Navbar onMenuClick={() => setDrawer(true)} /> */}
        <DashboardHeader />

        <div className="page-enter" style={{ flex: 1, display: "flex", gap: 20, padding: "24px 12px", maxWidth: 1200, width: "100%", margin: "0 auto", alignItems: "flex-start" }}>
          <div className="sidebar-col" style={{ display: "flex" }}>
            <Sidebar active={active} setActive={setActive} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <MainContent active={active} />
          </div>
        </div>

        <MobileDrawer open={drawerOpen} onClose={() => setDrawer(false)} active={active} setActive={setActive} />
        <Footer />
      </div>
    </>
  );
}
