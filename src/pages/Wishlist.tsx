import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/uii/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) return (
    <><Navbar /><main className="pt-32 pb-16 min-h-screen text-center container mx-auto px-4">
      <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
      <h1 className="font-display text-2xl font-bold mb-2 text-foreground">Your wishlist is empty</h1>
      <p className="text-muted-foreground mb-6">Save your favourite items for later.</p>
      <Link to="/shop"><Button className="rounded-xl gold-gradient text-primary-foreground">Browse Products</Button></Link>
    </main><Footer /></>
  );

  return (
    <><Navbar /><main className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="font-display text-3xl font-bold mb-8 text-foreground">Wishlist ({items.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(product => (
            <div key={product.id} className="glass-card rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/5">
              <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} className="w-full aspect-square object-cover" /></Link>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold mb-1 text-foreground">{product.name}</h3>
                <p className="text-lg font-bold mb-3 text-primary">R{product.price.toLocaleString()}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 rounded-xl text-xs gold-gradient text-primary-foreground" onClick={() => { addToCart(product); removeFromWishlist(product.id); toast.success('Moved to cart'); }}>
                    <ShoppingCart className="w-3 h-3 mr-1" /> Move to Cart
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl border-primary/20 hover:bg-primary/5" onClick={() => { removeFromWishlist(product.id); toast('Removed from wishlist'); }}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main><Footer /></>
  );
};

export default Wishlist;
