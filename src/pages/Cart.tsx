import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/uii/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const shipping = totalPrice > 5000 ? 0 : 499;

  if (items.length === 0) return (
    <><Navbar /><main className="pt-32 pb-16 min-h-screen text-center container mx-auto px-4">
      <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
      <h1 className="font-display text-2xl font-bold mb-2 text-foreground">Your cart is empty</h1>
      <p className="text-muted-foreground mb-6">Browse our collection and add some items.</p>
      <Link to="/shop"><Button className="rounded-xl gold-gradient text-primary-foreground">Continue Shopping</Button></Link>
    </main><Footer /></>
  );

  return (
    <><Navbar /><main className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="font-display text-3xl font-bold mb-8 text-foreground">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="glass-card rounded-2xl p-4 flex gap-4 items-center">
                <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`} className="font-display text-sm font-semibold hover:text-primary transition-colors line-clamp-1 text-foreground">{product.name}</Link>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <p className="text-sm font-bold mt-1 text-primary">R{product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-secondary"><Minus className="w-3 h-3" /></button>
                  <span className="px-3 text-sm">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-secondary"><Plus className="w-3 h-3" /></button>
                </div>
                <span className="text-sm font-bold w-24 text-right text-foreground">R{(product.price * quantity).toLocaleString()}</span>
                <button onClick={() => removeFromCart(product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="font-display text-lg font-semibold mb-4 text-foreground">Order Summary</h2>
            <div className="space-y-3 text-sm border-b border-border pb-4 mb-4">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">R{totalPrice.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{shipping === 0 ? 'Free' : `R${shipping}`}</span></div>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6 text-foreground"><span>Total</span><span>R{(totalPrice + shipping).toLocaleString()}</span></div>
            <Link to="/checkout"><Button className="w-full rounded-xl h-11 gold-gradient text-primary-foreground">Proceed to Checkout</Button></Link>
            <Link to="/shop" className="block text-center text-sm text-muted-foreground mt-3 hover:text-primary transition-colors">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </main><Footer /></>
  );
};

export default Cart;
