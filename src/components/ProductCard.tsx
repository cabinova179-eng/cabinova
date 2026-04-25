import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/uii/button';
import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/uii/dialog';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quickView, setQuickView] = useState(false);
  const wishlisted = isInWishlist(product.id);

  // Automatically detect if this product has size options based on its name or specs
  const variants = useMemo(() => {
    const match = product.name.match(/(\d+)\/(\d+)/);
    if (match) return [`${match[1]}mm`, `${match[2]}mm`];

    if (product.specs?.Height && product.specs.Height.includes('/')) {
      return product.specs.Height.split('/').map(s => s.trim());
    }
    return [];
  }, [product]);

  const [selectedSize, setSelectedSize] = useState(variants.length > 0 ? variants[0] : '');

  // Handle adding to cart with the selected size appended to the name
  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const cartItem = variants.length > 0
      ? { ...product, id: `${product.id}-${selectedSize}`, name: `${product.name} (${selectedSize})` }
      : product;

    addToCart(cartItem);
    toast.success(`${cartItem.name} added to cart`);
    setQuickView(false);
  };

  return (
    <>
      <div className="group glass-card rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">

        {/* IMAGE FIX: Used object-contain and added p-4 so cabinet corners aren't cut off */}
        <div className="relative overflow-hidden aspect-square p-4 bg-black/10 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }} className={`p-2 rounded-full bg-background/80 backdrop-blur-sm transition-colors z-10 ${wishlisted ? 'text-primary' : 'text-foreground/70 hover:text-primary'}`}>
              <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickView(true); }} className="p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground/70 hover:text-primary transition-colors z-10">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-display text-sm font-semibold leading-tight mb-1 line-clamp-2 text-foreground">{product.name}</h3>
          </Link>
          <p className="text-xs text-muted-foreground mb-2">{product.category}</p>

          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-primary fill-primary' : 'text-muted'}`} />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
          </div>

          <div className="mt-auto">
            {/* Dynamic Size Selector */}
            {variants.length > 0 && (
              <div className="mb-3">
                <select
                  className="w-full bg-secondary text-xs rounded-lg border border-border p-2 focus:ring-primary focus:border-primary text-foreground outline-none transition-all"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {variants.map(v => (
                    <option key={v} value={v}>Size: {v}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">R{product.price.toLocaleString()}</span>
              <Button size="sm" className="rounded-xl text-xs gold-gradient text-primary-foreground hover:shadow-md hover:shadow-primary/15 transition-all" onClick={handleAddToCart}>
                <ShoppingCart className="w-3 h-3 mr-1" /> Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <Dialog open={quickView} onOpenChange={setQuickView}>
        <DialogContent className="max-w-2xl rounded-2xl bg-card border-border p-6">
          <DialogHeader><DialogTitle className="font-display text-foreground text-xl">{product.name}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">

            {/* Quick View Image Fix */}
            <div className="bg-black/10 rounded-xl p-6 flex items-center justify-center aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{product.category} · {product.material}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-primary fill-primary' : 'text-muted'}`} />)}
                  <span className="text-sm text-muted-foreground ml-1">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <p className="text-3xl font-bold text-primary mb-4">R{product.price.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>

                {/* Dynamic Size Selector (Modal) */}
                {variants.length > 0 && (
                  <div className="mb-6">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Select Size Option</label>
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
              </div>

              <div className="flex gap-3 mt-4">
                <Button className="flex-1 rounded-xl h-12 gold-gradient text-primary-foreground font-semibold" onClick={() => handleAddToCart()}>
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </Button>
                <Button variant="outline" className="rounded-xl h-12 w-12 border-border hover:bg-secondary flex items-center justify-center shrink-0" onClick={() => toggleWishlist(product)}>
                  <Heart className="w-5 h-5" fill={wishlisted ? 'currentColor' : 'none'} />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;