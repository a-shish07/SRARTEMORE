export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  badge?: 'new' | 'sale';
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  description: string;
  category: "Press-On Nails" | "Henna Stencils" | "Bridal Jewellery" | "Fashion";
  image: string;
  images: string[];
  featured?: boolean;
  inStock?: boolean;
}

export const categories = [
  { name: "Press-On Nails", count: 16, image: "/gold-nails.png" },
  { name: "Henna Stencils", count: 2, image: "/shape-long-almond.png" },
  { name: "Bridal Jewellery", count: 4, image: "/jewelry.png" },
  { name: "Fashion", count: 0, image: "/shape-short-almond.png" },
];

export const products: Product[] = [
  // Henna Stencils
  { id: 1, name: "SR1 – Elegant Swirl & Leaf", price: 7.99, badge: "new", rating: 5, reviews: 24, sizes: ["XS","S","M","Standard Sheet"], colors: ["#000000"], description: "Our signature SR1 stencil. Elegant swirls and delicate leaf patterns.", category: "Henna Stencils", image: "/shape-long-almond.png", images: ["/shape-long-almond.png"], featured: true, inStock: true },
  { id: 2, name: "SR10 – Lotus Mandala", price: 4.99, badge: "sale", oldPrice: 6.99, rating: 4, reviews: 18, sizes: ["XS","S","M","Standard Sheet"], colors: ["#000000"], description: "A beautiful modern lotus design. Perfect for central hand placements.", category: "Henna Stencils", image: "/shape-short-almond.png", images: ["/shape-short-almond.png"], inStock: true },
  // Press on Nails - Long Almond
  { id: 3, name: "Aurora Olive – Long Almond", price: 9.99, badge: "new", rating: 5, reviews: 32, sizes: ["Long Almond"], colors: ["#556b2f"], description: "Handmade press-on nails in stunning Aurora Olive finish.", category: "Press-On Nails", image: "/gold-nails.png", images: ["/gold-nails.png","/shape-long-almond.png"], featured: true, inStock: true },
  { id: 4, name: "Frost Blue – Long Almond", price: 9.99, rating: 5, reviews: 15, sizes: ["Long Almond"], colors: ["#a8c3bc"], description: "Cool, crisp and sophisticated. High-shine finish that lasts.", category: "Press-On Nails", image: "/blue-nails.png", images: ["/blue-nails.png"], inStock: true },
  { id: 5, name: "Golden Velvet – Long Almond", price: 9.99, badge: "new", rating: 5, reviews: 41, sizes: ["Long Almond"], colors: ["#9b7a01"], description: "Luxurious velvet-texture nails with golden undertone.", category: "Press-On Nails", image: "/hero-nail.png", images: ["/hero-nail.png"], featured: true, inStock: true },
  { id: 6, name: "Rosewood Chrome – Long Almond", price: 11.99, rating: 4, reviews: 12, sizes: ["Long Almond"], colors: ["#c0736a"], description: "Vibrant rosewood chrome in long almond shape.", category: "Press-On Nails", image: "/shape-long-almond.png", images: ["/shape-long-almond.png"], inStock: false },
  // Press on Nails - Long Square
  { id: 7, name: "Mystic Emerald – Long Square", price: 9.99, rating: 5, reviews: 28, sizes: ["Long Square"], colors: ["#043927"], description: "Deep rich emerald tones. Reusable and durable.", category: "Press-On Nails", image: "/shape-long-square.png", images: ["/shape-long-square.png"], inStock: true },
  { id: 8, name: "Pearl White – Long Square", price: 8.99, badge: "sale", oldPrice: 11.99, rating: 4, reviews: 9, sizes: ["Long Square"], colors: ["#f5f5f0"], description: "Classic pearl white long square nails — timeless and elegant.", category: "Press-On Nails", image: "/shape-long-square.png", images: ["/shape-long-square.png"], inStock: true },
  { id: 9, name: "Aurora Nude – Long Square", price: 9.99, rating: 5, reviews: 20, sizes: ["Long Square"], colors: ["#d4b8a0"], description: "Subtle aurora nude in long square, perfect for every occasion.", category: "Press-On Nails", image: "/gold-nails.png", images: ["/gold-nails.png"], featured: true, inStock: true },
  { id: 10, name: "Galaxy Black – Long Square", price: 10.99, rating: 4, reviews: 6, sizes: ["Long Square"], colors: ["#0a0a0a"], description: "Bold galaxy-black glitter in long square shape.", category: "Press-On Nails", image: "/blue-nails.png", images: ["/blue-nails.png"], inStock: false },
  // Press on Nails - Short Almond
  { id: 11, name: "Blush Pink – Short Almond", price: 7.99, badge: "new", rating: 5, reviews: 35, sizes: ["Short Almond"], colors: ["#e8b4b8"], description: "Delicate blush pink in short almond — everyday luxury.", category: "Press-On Nails", image: "/shape-short-almond.png", images: ["/shape-short-almond.png"], featured: true, inStock: true },
  { id: 12, name: "Lilac Dreams – Short Almond", price: 7.99, rating: 4, reviews: 14, sizes: ["Short Almond"], colors: ["#c8a2c8"], description: "Soft lilac aurora finish on short almond nails.", category: "Press-On Nails", image: "/shape-short-almond.png", images: ["/shape-short-almond.png"], inStock: true },
  { id: 13, name: "Champagne Glow – Short Almond", price: 8.99, rating: 5, reviews: 22, sizes: ["Short Almond"], colors: ["#c8a96e"], description: "Warm champagne gold aurora on a short almond base.", category: "Press-On Nails", image: "/hero-nail.png", images: ["/hero-nail.png"], inStock: true },
  { id: 14, name: "French Tip – Short Almond", price: 7.99, badge: "sale", oldPrice: 9.99, rating: 4, reviews: 8, sizes: ["Short Almond"], colors: ["#ffffff"], description: "Classic French tip on a short almond shape — forever chic.", category: "Press-On Nails", image: "/shape-short-almond.png", images: ["/shape-short-almond.png"], inStock: false },
  // Press on Nails - Short Square
  { id: 15, name: "Coral Sunset – Short Square", price: 7.99, badge: "new", rating: 5, reviews: 19, sizes: ["Short Square"], colors: ["#f4a460"], description: "Warm coral with golden shimmer — perfect for summer.", category: "Press-On Nails", image: "/shape-short-square.png", images: ["/shape-short-square.png"], inStock: true },
  { id: 16, name: "Merlot Red – Short Square", price: 7.99, rating: 4, reviews: 11, sizes: ["Short Square"], colors: ["#800020"], description: "Rich deep merlot on a short square shape — timeless and bold.", category: "Press-On Nails", image: "/shape-short-square.png", images: ["/shape-short-square.png"], inStock: true },
  { id: 17, name: "Sky Blue – Short Square", price: 7.99, rating: 5, reviews: 17, sizes: ["Short Square"], colors: ["#87ceeb"], description: "Clear sky blue with aurora shimmer — fresh and modern.", category: "Press-On Nails", image: "/blue-nails.png", images: ["/blue-nails.png"], featured: true, inStock: true },
  { id: 18, name: "Nude Beige – Short Square", price: 7.99, rating: 4, reviews: 13, sizes: ["Short Square"], colors: ["#d2b48c"], description: "Understated nude beige — minimal elegance for every day.", category: "Press-On Nails", image: "/gold-nails.png", images: ["/gold-nails.png"], inStock: true },
  // Bridal Jewellery
  { id: 19, name: "Golden Élysée Set", price: 220.00, badge: "new", rating: 5, reviews: 10, sizes: ["XS","S","M","One Size (Adjustable)"], colors: ["#ffd700"], description: "A masterpiece of bridal artistry with intricate gold-plated detailing.", category: "Bridal Jewellery", image: "/jewelry.png", images: ["/jewelry.png"], featured: true, inStock: true },
  { id: 20, name: "Luminous Bloom Headpiece", price: 200.00, rating: 5, reviews: 7, sizes: ["XS","S","M","Flexible Fit"], colors: ["#ffd700","#ffffff"], description: "A delicate floral headpiece that catches the light beautifully.", category: "Bridal Jewellery", image: "/jewelry.png", images: ["/jewelry.png"], inStock: true },
  { id: 21, name: "Majestic Heritage Necklace", price: 350.00, badge: "new", rating: 5, reviews: 5, sizes: ["Standard"], colors: ["#ffd700"], description: "A grand heritage necklace inspired by royal traditions.", category: "Bridal Jewellery", image: "/jewelry.png", images: ["/jewelry.png"], inStock: true },
  { id: 22, name: "Ethereal Pearl Earrings", price: 120.00, rating: 4, reviews: 14, sizes: ["Standard"], colors: ["#ffffff","#ffd700"], description: "Elegant pearl earrings with a touch of gold sparkle.", category: "Bridal Jewellery", image: "/jewelry.png", images: ["/jewelry.png"], inStock: true },
];

export const testimonials = [
  { stars: "★★★★★", text: "Absolutely stunning! The Aurora Olive nails look even more beautiful in person. The holographic shimmer catches light perfectly.", author: "Priya Sharma", location: "Mumbai" },
  { stars: "★★★★★", text: "I've been wearing these for two weeks and they still look brand new. The quality is unmatched and they are so easy to apply.", author: "Ananya Gupta", location: "Delhi" },
  { stars: "★★★★★", text: "Best press-on nails I've ever tried. The sizing options (XS to L) mean they fit perfectly. Will definitely order again!", author: "Kavya Reddy", location: "Bangalore" },
];
