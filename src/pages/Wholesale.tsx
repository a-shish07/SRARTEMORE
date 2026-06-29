"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import "./WholesaleInquiry.css"

/* ---------- Inline SVG icons (no dependencies) ---------- */

type IconProps = { className?: string }

const IconDiamond = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 3h12l3 5-9 13L3 8l3-5Z" strokeLinejoin="round" />
    <path d="M3 8h18M9 3l-3 5 6 13 6-13-3-5" strokeLinejoin="round" />
  </svg>
)

const IconHeart = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 21s-7-4.35-9.5-8.5C.5 9 2 5.5 5.5 5.5c2 0 3.2 1.2 3.5 2 .3-.8 1.5-2 3.5-2 3.5 0 5 3.5 3 7C19 16.65 12 21 12 21Z" />
  </svg>
)

const IconRefresh = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 12a8 8 0 0 1 13.5-5.8L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.5 5.8L4 16M4 20v-4h4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconBuilding = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M8 7h2M8 11h2M8 15h2M14 7h2M14 11h2M14 15h2M10 21v-3h4v3" strokeLinecap="round" />
  </svg>
)

const IconBag = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 7h12l1 13H5L6 7Z" strokeLinejoin="round" />
    <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
  </svg>
)

const IconList = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="4" width="16" height="16" rx="1" />
    <path d="M8 9h8M8 13h8M8 17h5" strokeLinecap="round" />
  </svg>
)

const IconCrown = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 7l4 4 5-7 5 7 4-4-2 12H5L3 7Z" strokeLinejoin="round" />
  </svg>
)

const IconHeadset = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" strokeLinecap="round" />
    <rect x="3" y="13" width="4" height="6" rx="1" />
    <rect x="17" y="13" width="4" height="6" rx="1" />
    <path d="M20 19a4 4 0 0 1-4 4h-2" strokeLinecap="round" />
  </svg>
)

const IconSearch = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3-3" strokeLinecap="round" />
  </svg>
)

const IconUser = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" strokeLinecap="round" />
  </svg>
)

const IconArrow = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 12h16M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconLock = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="11" width="14" height="9" rx="1" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
  </svg>
)

/* ---------- Data ---------- */

type Benefit = {
  icon: (p: IconProps) => JSX.Element
  title: string
  text: string
}

const benefits: Benefit[] = [
  { icon: IconBag, title: "LOW MOQ", text: "Start with minimum 12 pieces per design." },
  { icon: IconList, title: "FLEXIBLE ORDERING", text: "Order as per your requirement. Min 12 – Max 300 pieces." },
  { icon: IconCrown, title: "QUALITY ASSURED", text: "Finest quality material with intricate laser-cut designs." },
  { icon: IconHeadset, title: "DEDICATED SUPPORT", text: "We're here to assist you from inquiry to delivery." },
]

type Stencil = { name: string; sub: string; image:string }

const stencils: Stencil[] = [
  { name: "Floral Motif", sub: "(Hand)", image:"\Floral Motif.png" },
  { name: "Bridal Pattern", sub: "(Hand)", image:"\Bridal PAttarn .png" },
  { name: "Mandala Design", sub: "(Hand)", image:"\Mandola Design.png" },
  { name: "Finger Design", sub: "(Full Set)", image:"Finger Design .png" },
  { name: "Border Design", sub: "(Assorted)",image:"\Border Design .png" },
  { name: "Arabic Pattern", sub: "(Hand)", image:"\Arabic Design .png" },
]

const features = [
  { icon: IconDiamond, label: "PREMIUM QUALITY" },
  { icon: IconHeart, label: "HANDMADE WITH CARE" },
  { icon: IconRefresh, label: "REUSABLE & DURABLE" },
  { icon: IconBuilding, label: "EXCLUSIVE DESIGNS" },
]

const countries = ["India", "United Arab Emirates", "United States", "United Kingdom", "Canada", "Australia"]
const designs = ["Floral Motif", "Bridal Pattern", "Mandala Design", "Finger Design", "Border Design", "Arabic Pattern"]
const sources = ["Instagram", "Facebook", "Google Search", "Friend / Referral", "Trade Show", "Other"]

/* ---------- Form state type ---------- */

type FormState = {
  fullName: string
  email: string
  phone: string
  business: string
  country: string
  category: string
  design: string
  quantity: number
  extra: string
  source: string
  message: string
  agree: boolean
}

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  business: "",
  country: "",
  category: "Henna Stencils",
  design: "",
  quantity: 12,
  extra: "",
  source: "",
  message: "",
  agree: false,
}

/* ---------- Component ---------- */

export default function WholesaleInquiry() {
  const [form, setForm] = useState<FormState>(initialForm)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setForm((prev) => ({ ...prev, [name]: checked }))
    } else if (name === "quantity") {
      const n = Math.max(12, Math.min(300, Number(value) || 12))
      setForm((prev) => ({ ...prev, quantity: n }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.agree) {
      alert("Please agree to the terms & conditions before submitting.")
      return
    }
    // TODO: replace with your API / email service call
    console.log("[v0] Wholesale inquiry submitted:", form)
    alert("Thank you! Your wholesale inquiry has been submitted.")
    setForm(initialForm)
  }

  return (
    <div className="sa">

      {/* ---------- Hero ---------- */}
      <section className="sa-hero">
        <div className="sa-hero-content">
          <h2 className="sa-hero-title">WHOLESALE<br />INQUIRY</h2>
          <p className="sa-hero-eyebrow">HENNA STENCILS</p>
          <span className="sa-divider" />
          <p className="sa-hero-text">
            Partner with SR ARTÉMORE and bring premium quality Henna Stencils to your customers.
          </p>
          <p className="sa-hero-text">
            Minimum order quantity starts from 12 pieces up to a maximum of 300 pieces per design.
          </p>
          <div className="sa-hero-features">
            {features.map(({ icon: Icon, label }) => (
              <div className="sa-hero-feature" key={label}>
                <span className="sa-hero-feature-ring"><Icon className="sa-ic-gold" /></span>
                <span className="sa-hero-feature-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sa-hero-img"  role="img" aria-label="Henna stencil product set" >
          <img src="/heroo.png" alt="Henna stencil product set" />
        </div>
      </section>

      {/* ---------- Body ---------- */}
      <section className="sa-body">
        
        {/* Left column */}
        <div className="sa-col-left">
          <h2 className="sa-h2">WHY PARTNER WITH US</h2>
          <span className="sa-divider sa-center" />

          <ul className="sa-benefits">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li className="sa-benefit" key={title}>
                <span className="sa-benefit-ring"><Icon className="sa-ic-gold" /></span>
                <div>
                  <h3 className="sa-benefit-title">{title}</h3>
                  <p className="sa-benefit-text">{text}</p>
                </div>
              </li>
            ))}
          </ul>

            <div className="section-line"></div>
          <h2 className="sa-h2 sa-mt">OUR HENNA STENCILS</h2>
          <span className="sa-divider sa-center" />

          <div className="sa-gallery">
            {stencils.map((s) => (
              <figure className="sa-card" key={s.name}>
                {/* <div className="sa-card-img" role="img" aria-label={`${s.name} stencil`} /> */}
                 <img
    className="sa-card-img"
    src={s.image}
    alt={`${s.name} henna stencil design`}
  />
                <figcaption className="sa-card-cap">
                  {s.name}<br /><span className="sa-card-sub">{s.sub}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <button type="button" className="sa-ghost-btn">
            VIEW ALL DESIGNS <IconArrow className="sa-ic-sm" />
          </button>
        </div>

        {/* Right column - Form */}
        <div className="sa-col-right">
          <form className="sa-form" onSubmit={handleSubmit}>
            <h2 className="sa-form-title">WHOLESALE INQUIRY FORM</h2>
            <p className="sa-form-sub">Fill out the form below and our team will get back to you with details.</p>

            <p className="sa-section-label">YOUR DETAILS</p>

            <label className="sa-label">Full Name <span className="sa-req">*</span></label>
            <input className="sa-input" name="fullName" value={form.fullName} onChange={handleChange}
              placeholder="Enter your full name" required />

            <div className="sa-row">
              <div className="sa-field">
                <label className="sa-label">Email Address <span className="sa-req">*</span></label>
                <input className="sa-input" type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="Enter your email" required />
              </div>
              <div className="sa-field">
                <label className="sa-label">Phone Number <span className="sa-req">*</span></label>
                <input className="sa-input" type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="Enter your phone number" required />
              </div>
            </div>

            <label className="sa-label">Business / Store Name <span className="sa-req">*</span></label>
            <input className="sa-input" name="business" value={form.business} onChange={handleChange}
              placeholder="Enter your business name" required />

            <label className="sa-label">Country <span className="sa-req">*</span></label>
            <select className="sa-input" name="country" value={form.country} onChange={handleChange} required>
              <option value="" disabled>Select your country</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <p className="sa-section-label sa-gold">PRODUCT REQUIREMENT</p>

            <label className="sa-label sa-gold">Product Category <span className="sa-req">*</span></label>
            <select className="sa-input" name="category" value={form.category} onChange={handleChange} required>
              <option value="Henna Stencils">Henna Stencils</option>
              <option value="Press On Nails">Press On Nails</option>
              <option value="Bridal Jewellery">Bridal Jewellery</option>
              <option value="Accessories">Accessories</option>
            </select>

            <label className="sa-label">Select Product / Design <span className="sa-req">*</span></label>
            <select className="sa-input" name="design" value={form.design} onChange={handleChange} required>
              <option value="" disabled>Select a design</option>
              {designs.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>

            <label className="sa-label">Quantity (Pcs) <span className="sa-req">*</span></label>
            <div className="sa-qty">
              <span className="sa-qty-tag">Min 10</span>
              <input className="sa-qty-input" type="number" name="quantity" min={10} max={300} step={10}
                value={form.quantity} onChange={handleChange} />
              <span className="sa-qty-tag sa-qty-max">Max 300</span>
            </div>

            <label className="sa-label">What else are you looking for?</label>
            <input className="sa-input" name="extra" value={form.extra} onChange={handleChange}
              placeholder="Any specific size, design, material or custom requirement?" />

            <label className="sa-label">How did you hear about us?</label>
            <select className="sa-input" name="source" value={form.source} onChange={handleChange}>
              <option value="" disabled>Select an option</option>
              {sources.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <p className="sa-section-label">MESSAGE</p>

            <label className="sa-label">Your Message / Requirements <span className="sa-req">*</span></label>
            <textarea className="sa-input sa-textarea" name="message" value={form.message} onChange={handleChange}
              placeholder="Please describe your exact requirements here..." required />

            <label className="sa-check">
              <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
              <span>I agree to the terms &amp; conditions and <a href="#">privacy policy.</a></span>
            </label>

            <button type="submit" className="sa-submit">
              SUBMIT INQUIRY <IconArrow className="sa-ic-sm" />
            </button>

            <p className="sa-secure">
              <IconLock className="sa-ic-sm" /> Your information is safe with us. We will never share your details.
            </p>
          </form>
        </div>
      </section>

      {/* ---------- CTA Banner ---------- */}
      <section className="sa-cta">
        <div className="sa-cta-img" role="img" aria-label="Henna being applied to hand" />
        <div className="sa-cta-content">
          <p className="sa-cta-eyebrow">LET&apos;S GROW TOGETHER</p>
          <h2 className="sa-cta-title">Become Our Wholesale Partner</h2>
          <p className="sa-cta-text">
            Join our growing network of retailers and offer your customers premium quality Henna Stencils that stand out.
          </p>
          <button type="button" className="sa-ghost-btn sa-ghost-light">
            BECOME A PARTNER <IconArrow className="sa-ic-sm" />
          </button>
        </div>
      </section>

    </div>
  )
}