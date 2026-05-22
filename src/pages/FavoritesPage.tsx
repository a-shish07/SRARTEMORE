import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';

export default function FavoritesPage({ onNavigate }: any) {
  const { favorites } = useFavorites();

  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '140px' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>My Favorites</h2>
      <div className="products-grid">
        {favorites.map((p: any) => (
          <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
        ))}
      </div>
      {favorites.length === 0 && <p style={{ textAlign: 'center' }}>No favorites yet.</p>}
    </div>
  );
}