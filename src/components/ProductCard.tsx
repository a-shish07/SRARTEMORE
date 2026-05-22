import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useNotif } from "./Notification";
import { useFavorites } from "../context/FavoritesContext";

type Page =
  | "home"
  | "products"
  | "detail"
  | "cart"
  | "checkout"
  | "success"
  | "about"
  | "contact"
  | "favorites";

interface ProductCardProps {
  product: Product;
  onNavigate: (page: Page, productId?: number) => void;
}

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  const { addToCart } = useCart();
  const { show } = useNotif();
  const { toggleFavorite, isFavorite } = useFavorites();

  const active = isFavorite(product.id);

  const handleQuickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addToCart(product);
    show(`${product.name} added to cart!`);
  };

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleFavorite(product);
    if (!active) {
      show(`${product.name} saved to favorites!`);
    }
  };

  return (
    <div
      className="product-card"
      onClick={() => onNavigate("detail", product.id)}
    >
      {/* 🔹 IMAGE */}
      <div className="product-img">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        {/* 🔸 BADGE */}
        {product.badge && (
          <span className={`product-badge badge-${product.badge}`}>
            {product.badge.toUpperCase()}
          </span>
        )}

        {/* ❤️ FAVORITE */}
        <button
          className={`product-wish ${active ? "active" : ""}`}
          onClick={handleFavorite}
          aria-label="Add to favorites"
        >
          <i
            className={active ? "ri-heart-3-fill" : "ri-heart-3-line"}
            style={{ color: active ? "var(--gold)" : "inherit" }}
          />
        </button>

        {/* 🔘 HOVER ACTIONS */}
        <div className="product-overlay">
          <button className="quick-add" onClick={handleQuickAdd}>
            <span>Quick Add</span>
          </button>

          <button
            className="quick-view"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("detail", product.id);
            }}
            aria-label="View details"
          >
            <i className="ri-eye-line"></i>
          </button>
        </div>
      </div>

      {/* 🔹 INFO */}
      <div className="product-info">
        {/* ⭐ RATING */}
        <div className="product-rating">
          <span className="stars-sm">
            {"★".repeat(Math.round(product.rating))}
          </span>
          <span className="count">({product.reviews})</span>
        </div>

        {/* 🏷 NAME */}
        <div className="product-name">{product.name}</div>

        {/* 💰 PRICE + SIZES */}
        <div className="product-meta">
          <div className="product-price">
            {product.oldPrice && (
              <span className="old">£{product.oldPrice}</span>
            )}
            <span className="current">£{product.price}</span>
          </div>

          <div className="size-chips">
            {product.sizes.slice(0, 3).map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}