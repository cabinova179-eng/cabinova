import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/uii/button';
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);

  // Automatically detect if this product has size options
  const variants = useMemo(() => {
    if (!product) return [];
    const match = product.name.match(/(\d+)\/(\d+)/);
    if (match) return [`${match[1]}mm`, `${match[2]}mm`];

    if (product.specs?.Height && product.specs.Height.includes('/')) {
      return product.specs.Height.split('/').map(s => s.trim());
    }
    return [];
  }, [product]);

  const [selectedSize, setSelectedSize] = useState(variants.length > 0 ? variants[0] : '');

  // Reset quantity, size, and scroll to top when navigating to a new product
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQty(1);
    if (variants.length > 0) setSelectedSize(variants[0]);
  }, [id, variants]);

  if (!product) return (
    <>
      <Navbar />
      <div className="pt-32 pb-16 text-center min-h-screen">
        <h1 className="text-2xl font-display text-foreground">Product not found</h1>
        <Link to="/shop" className="text-primary mt-4 inline-block hover:underline">← Back to Shop</Link>
      </div>
      <Footer />
    </>
  );

  const wishlisted = isInWishlist(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Handle adding to cart with the selected size
  const handleAddToCart = () => {
    const cartItem = variants.length > 0
      ? { ...product, id: `${product.id}-${selectedSize}`, name: `${product.name} (${selectedSize})` }
      : product;

    addToCart(cartItem, qty);
    toast.success(`${cartItem.name} added to cart`);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image Container fixed with object-contain and padding */}
            <div className="rounded-2xl overflow-hidden bg-black/10 p-8 flex items-center justify-center aspect-square border border-white/5">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{product.category} · {product.dimensions}</span>
              <h1 className="font-display text-3xl lg:text-4xl font-bold mt-2 mb-3 text-foreground">{product.name}</h1>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-primary fill-primary' : 'text-muted'}`} />)}
                <span className="text-sm text-muted-foreground ml-2">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <p className="text-3xl font-bold mb-6 text-primary">R{product.price.toLocaleString()}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              <div className="glass-card rounded-xl p-5 mb-6 border border-border/50">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-xs text-muted-foreground block mb-1">{k}</span>
                      <p className="text-sm font-medium text-foreground">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Size Selector */}
              {variants.length > 0 && (
                <div className="mb-8">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Select Size Option
                  </label>
                  <select
                    className="w-full bg-secondary text-sm rounded-xl border border-border p-3 focus:ring-primary focus:border-primary text-foreground outline-none transition-all"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {variants.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-4 mt-auto">
                <div className="flex items-center border border-border rounded-xl overflow-hidden bg-secondary">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-3 hover:bg-foreground/5 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-medium w-10 text-center">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="p-3 hover:bg-foreground/5 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button className="flex-1 rounded-xl h-12 gold-gradient text-primary-foreground font-semibold" onClick={handleAddToCart}>
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </Button>
                <Button variant="outline" className="rounded-xl h-12 w-12 border-border hover:bg-secondary shrink-0" onClick={() => { toggleWishlist(product); toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }}>
                  <Heart className="w-5 h-5" fill={wishlisted ? 'currentColor' : 'none'} />
                </Button>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-24 border-t border-border pt-12">
              <h2 className="font-display text-2xl font-bold mb-8 text-foreground">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;