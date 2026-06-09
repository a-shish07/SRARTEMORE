import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

type Page =
  | "home" | "products" | "detail" | "cart" | "checkout" | "success" | "about" | "contact" | "favorites"
  | "login" | "dashboard" | "size-guide" | "how-to-apply" | "faq" | "press" | "new-arrivals" | "on-sale" | "best-sellers";

interface ProductsPageProps {
  onNavigate: (page: Page, productId?: number) => void;
  filter?: 'new' | 'sale' | 'best';
}

const SHAPES = ["All Shapes", "Long Almond", "Long Square", "Short Almond", "Short Square", "Jewellery"];
const CATEGORIES = ["All", "Henna Stencils", "Press-On Nails", "Bridal Jewellery", "Fashion"];
const SIZES = ["XS", "S", "M"];

const shapeCount = (shape: string) => {
  const pressOns = products.filter(p => p.category === "Press-On Nails");
  if (shape === "All Shapes") return 16;
  if (shape === "Long Almond") return 4;
  if (shape === "Long Square") return 4;
  if (shape === "Short Almond") return 4;
  if (shape === "Short Square") return 4;
  return pressOns.filter(p => p.sizes.includes(shape)).length;
};

const catCount = (cat: string) => {
  if (cat === "All") return 22;
  if (cat === "Henna Stencils") return 2;
  if (cat === "Press-On Nails") return 16;
  if (cat === "Bridal Jewellery") return 4;
  if (cat === "Fashion") return 0;
  return products.filter(p => p.category === cat).length;
};

export default function ProductsPage({ onNavigate, filter }: ProductsPageProps) {
  const [selectedShape, setSelectedShape] = useState("All Shapes");
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [availFilter, setAvailFilter] = useState<"all" | "in" | "out">("all");
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState(1000);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedCat = localStorage.getItem('selectedCategory');
    if (storedCat) {
      setSelectedCat(storedCat);
      localStorage.removeItem('selectedCategory');
    }
    const storedShape = localStorage.getItem('selectedShape');
    if (storedShape) {
      setSelectedShape(storedShape);
      localStorage.removeItem('selectedShape');
    }
    const handleCategory = (e: any) => setSelectedCat(e.detail);
    window.addEventListener('set-category', handleCategory);
    return () => window.removeEventListener('set-category', handleCategory);
  }, []);

  const filtered = products
    .filter(p => {
      let match = true;
      if (selectedShape !== "All Shapes") {
        match = p.category === "Press-On Nails" && p.sizes.includes(selectedShape);
      }
      if (!match) return false;

      if (selectedCat !== "All") {
        match = p.category === selectedCat;
      }
      return match;
    })
    .filter(p => p.price <= priceRange)
    .filter(p => {
      if (!filter) return true;
      if (filter === 'new') return p.badge === 'new';
      if (filter === 'sale') return p.badge === 'sale';
      if (filter === 'best') return p.featured;
      return true;
    })
    .filter(p => {
      if (availFilter === "in") return p.inStock !== false;
      if (availFilter === "out") return p.inStock === false;
      return true;
    })
    .filter(p => {
      if (selectedSizes.length === 0) return true;
      return selectedSizes.some(sz => p.sizes.includes(sz));
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "featured") return Number(b.featured) - Number(a.featured);
      return 0;
    });

  const inStockCount = 19;
  const outStockCount = 3;

  const toggleSize = (sz: string) => {
    setSelectedSizes(prev =>
      prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz]
    );
  };

  const [showSortDropdown, setShowSortDropdown] = useState(false);

  return (
    <div className="products-container">
      <div className="page-hero">
        <h1 className="products-page-title" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Our Collections
        </h1>
        <p className="breadcrumb">Home → <span>Shop</span></p>
      </div>

      {/* Mobile filter toggle */}
      <div className="mobile-filter-container">
        <div className="mobile-dropdown-row">
          <button
            className="mobile-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="ri-equalizer-line"></i> Filters
          </button>
          <div className="mobile-sort-filter-custom">
            <div className="sort-trigger" onClick={() => setShowSortDropdown(!showSortDropdown)}>
              <span>{sort === 'featured' ? 'Featured' : sort === 'price-asc' ? 'Price: Low to High' : sort === 'price-desc' ? 'Price: High to Low' : 'Top Rated'}</span>
              <i className={showSortDropdown ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}></i>
            </div>
            {showSortDropdown && (
              <div className="sort-dropdown-expanded">
                <div className="sort-options">
                  {[
                    { v: 'featured', l: 'Featured' },
                    { v: 'price-asc', l: 'Price: Low to High' },
                    { v: 'price-desc', l: 'Price: High to Low' },
                    { v: 'rating', l: 'Top Rated' },
                  ].map(o => (
                    <div key={o.v} className={sort === o.v ? 'active' : ''} onClick={() => { setSort(o.v); setShowSortDropdown(false); }}>{o.l}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="mobile-sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div className="mobile-sidebar-panel" onClick={e => e.stopPropagation()}>
            <div className="mobile-sidebar-header">
              <h3>FILTERS</h3>
              <button onClick={() => setSidebarOpen(false)}><i className="ri-close-line"></i></button>
            </div>
            <SidebarContent
              selectedShape={selectedShape} setSelectedShape={setSelectedShape}
              selectedCat={selectedCat} setSelectedCat={setSelectedCat}
              availFilter={availFilter} setAvailFilter={setAvailFilter}
              priceRange={priceRange} setPriceRange={setPriceRange}
              selectedSizes={selectedSizes} toggleSize={toggleSize}
              onNavigate={onNavigate}
              inStockCount={inStockCount} outStockCount={outStockCount}
            />
          </div>
        </div>
      )}

      <div className="shop-layout">
        {/* Desktop Sidebar */}
        <div className="sidebar">
          <SidebarContent
            selectedShape={selectedShape} setSelectedShape={setSelectedShape}
            selectedCat={selectedCat} setSelectedCat={setSelectedCat}
            availFilter={availFilter} setAvailFilter={setAvailFilter}
            priceRange={priceRange} setPriceRange={setPriceRange}
            selectedSizes={selectedSizes} toggleSize={toggleSize}
            onNavigate={onNavigate}
            inStockCount={inStockCount} outStockCount={outStockCount}
          />
        </div>

        {/* Main */}
        <div className="main-content">
          <div className="shop-header">
            <p>Showing <strong>{filtered.length}</strong> products</p>
            <div className="desktop-sort">
              <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
          <div className="products-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="no-results">
              <p>No products match your criteria. Try adjusting the filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SidebarContentProps {
  selectedShape: string;
  setSelectedShape: (s: string) => void;
  selectedCat: string;
  setSelectedCat: (c: string) => void;
  availFilter: "all" | "in" | "out";
  setAvailFilter: (v: "all" | "in" | "out") => void;
  priceRange: number;
  setPriceRange: (v: number) => void;
  selectedSizes: string[];
  toggleSize: (sz: string) => void;
  onNavigate: (page: any) => void;
  inStockCount: number;
  outStockCount: number;
}

function SidebarContent({
  selectedShape, setSelectedShape,
  selectedCat, setSelectedCat,
  availFilter, setAvailFilter,
  priceRange, setPriceRange,
  selectedSizes, toggleSize,
  onNavigate,
  inStockCount, outStockCount,
}: SidebarContentProps) {
  return (
    <>
      <h3 className="filter-title">Categories</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {CATEGORIES.map(cat => {
          const isPressOn = cat === "Press-On Nails";
          const isSelected = selectedCat === cat;
          return (
            <div key={cat} style={{ display: "flex", flexDirection: "column" }}>
              <div
                className={`filter-item ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCat(isSelected ? "All" : cat);
                  if (!isPressOn) setSelectedShape("All Shapes");
                }}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}
              >
                <label style={{
                  color: isSelected ? "var(--gold)" : "inherit",
                  fontWeight: isSelected ? "600" : "400",
                  cursor: "pointer",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px"
                }}>
                  {cat} — {catCount(cat)}
                  {cat === "Fashion" && (
                    <span style={{ 
                      fontSize: "8px", 
                      background: "var(--gold)", 
                      color: "var(--black)", 
                      padding: "1px 4px", 
                      borderRadius: "2px",
                      letterSpacing: "1px",
                      fontWeight: 700,
                      marginLeft: "4px"
                    }}>COMING SOON</span>
                  )}
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="filter-title" style={{ marginTop: "32px" }}>Availability</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <div className="filter-item" onClick={() => setAvailFilter(availFilter === "in" ? "all" : "in")} style={{ cursor: "pointer" }}>
          <label style={{ color: availFilter === "in" ? "var(--gold)" : "inherit", cursor: "pointer", fontSize: "13px" }}>
            {availFilter === "in" ? "✓ " : ""}In Stock — {inStockCount}
          </label>
        </div>
        <div className="filter-item" onClick={() => setAvailFilter(availFilter === "out" ? "all" : "out")} style={{ cursor: "pointer" }}>
          <label style={{ color: availFilter === "out" ? "var(--gold)" : "inherit", cursor: "pointer", fontSize: "13px" }}>
            Out of Stock — {outStockCount}
          </label>
        </div>
      </div>

      <h3 className="filter-title" style={{ marginTop: "32px" }}>Price Range</h3>
     <div className="price-range-wrapper">
  <input
    type="range"
    min={0}
    max={1000}
    step={5}
    value={priceRange}
    onChange={(e) => setPriceRange(Number(e.target.value))}
    className="price-range-slider"
  />
</div>
      <p className="price-display">Up to £{priceRange}</p>

      <h3 className="filter-title" style={{ marginTop: "32px" }}>SIZE</h3>
      {SIZES.map(sz => (
        <div key={sz} className="filter-item" onClick={() => toggleSize(sz)} style={{ cursor: "pointer" }}>
          <label style={{
            color: selectedSizes.includes(sz) ? "var(--gold)" : "inherit",
            fontWeight: selectedSizes.includes(sz) ? "600" : "400",
            cursor: "pointer"
          }}>
            {sz}
          </label>
        </div>
      ))}

      <div className="sidebar-banner">
        <p>Weekly Sale</p>
        <h4>Up to 30% Off</h4>
        <button className="btn-primary" style={{ fontSize: "10px", padding: "10px 20px" }}
          onClick={() => onNavigate("on-sale")}>
          <span>Shop Now</span>
        </button>
      </div>
    </>
  );
}
