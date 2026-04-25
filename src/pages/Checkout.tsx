import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/uii/button';
import { Input } from '@/components/uii/input';
import { Label } from '@/components/uii/label';
import { CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

// Tell TypeScript that the Yoco SDK exists on the window object
declare global {
  interface Window {
    YocoSDK: any;
  }
}

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [shippingDetails, setShippingDetails] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postalCode: ''
  });

  const shipping = totalPrice > 5000 ? 0 : 499;
  const finalTotal = totalPrice + shipping;

  // Check if Yoco is loaded
  useEffect(() => {
    if (!window.YocoSDK) {
      toast.error("Yoco payment system failed to load. Please refresh the page.");
    }
  }, []);

  if (placed) return (
    <><Navbar /><main className="pt-32 pb-16 min-h-screen text-center container mx-auto px-4">
      <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
      <h1 className="font-display text-2xl font-bold mb-2 text-foreground">Order Placed Successfully!</h1>
      <p className="text-muted-foreground mb-6">Thank you for your purchase. We'll send you a confirmation email shortly.</p>
      <Link to="/shop"><Button className="rounded-xl gold-gradient text-primary-foreground">Continue Shopping</Button></Link>
    </main><Footer /></>
  );

  if (items.length === 0) return (
    <><Navbar /><main className="pt-32 pb-16 min-h-screen text-center container mx-auto px-4">
      <h1 className="font-display text-2xl font-bold mb-2 text-foreground">Your cart is empty</h1>
      <Link to="/shop"><Button className="rounded-xl mt-4 gold-gradient text-primary-foreground">Shop Now</Button></Link>
    </main><Footer /></>
  );

  const saveOrderToDatabase = async (chargeId: string | null, status: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      const { error } = await supabase.from('orders').insert([{
        user_id: session?.user?.id || null,
        total_amount: finalTotal,
        status: status,
        items: items,
        shipping_details: shippingDetails,
        yoco_charge_id: chargeId
      }]);

      if (error) throw error;

      clearCart();
      setPlaced(true);
      toast.success('Order placed successfully!');
    } catch (err: any) {
      console.error("DB Save Error:", err);
      toast.error("Payment succeeded, but we had trouble saving the order. Please contact support.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);

    if (!window.YocoSDK) {
      toast.error("Payment gateway not loaded.");
      setIsCheckingOut(false);
      return;
    }

    // Initialize the Yoco Popup using your Public Key
    const yoco = new window.YocoSDK({
      publicKey: 'pk_test_84401d9eP41gR3b4e4c4',
    });

    yoco.showPopup({
      amountInCents: Math.round(finalTotal * 100),
      currency: 'ZAR',
      name: 'Cabinova 3D',
      description: 'Custom Cabinetry Order',
      callback: async function (result: any) {
        if (result.error) {
          toast.error(result.error.message || "Payment failed");
          setIsCheckingOut(false);
        } else {
          // Payment was successful! result.id is the Yoco Charge ID.
          toast.success("Payment authorized!");
          await saveOrderToDatabase(result.id, 'Paid');
        }
      }
    });
  };

  return (
    <><Navbar /><main className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="font-display text-3xl font-bold mb-8 text-foreground">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* BILLING DETAILS */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold mb-4 text-foreground">Billing Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">First Name</Label>
                  <Input required value={shippingDetails.firstName} onChange={e => setShippingDetails({ ...shippingDetails, firstName: e.target.value })} className="rounded-xl mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Last Name</Label>
                  <Input required value={shippingDetails.lastName} onChange={e => setShippingDetails({ ...shippingDetails, lastName: e.target.value })} className="rounded-xl mt-1 bg-secondary border-border" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <Input type="email" required value={shippingDetails.email} onChange={e => setShippingDetails({ ...shippingDetails, email: e.target.value })} className="rounded-xl mt-1 bg-secondary border-border" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs text-muted-foreground">Phone</Label>
                  <Input type="tel" required value={shippingDetails.phone} onChange={e => setShippingDetails({ ...shippingDetails, phone: e.target.value })} className="rounded-xl mt-1 bg-secondary border-border" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs text-muted-foreground">Street Address</Label>
                  <Input required value={shippingDetails.address} onChange={e => setShippingDetails({ ...shippingDetails, address: e.target.value })} className="rounded-xl mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">City</Label>
                  <Input required value={shippingDetails.city} onChange={e => setShippingDetails({ ...shippingDetails, city: e.target.value })} className="rounded-xl mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Postal Code</Label>
                  <Input required value={shippingDetails.postalCode} onChange={e => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })} className="rounded-xl mt-1 bg-secondary border-border" />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold mb-4 text-foreground">Payment Method</h2>

              {/* Single Static Card Option */}
              <div className="flex items-center gap-3 p-4 rounded-xl border border-primary bg-primary/5 text-left mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Visa / Mastercard</span>
              </div>

              <div className="bg-secondary/50 rounded-xl p-4 text-sm text-muted-foreground flex items-center gap-3 border border-border">
                <CreditCard className="w-6 h-6 text-primary shrink-0" />
                <p>A secure Yoco payment window will open when you place your order.</p>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="glass-card rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="font-display text-lg font-semibold mb-4 text-foreground">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{product.name} × {quantity}</span>
                  <span className="text-foreground">R{(product.price * quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">R{totalPrice.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{shipping === 0 ? 'Free' : `R${shipping}`}</span></div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-border text-foreground">
              <span>Total</span>
              <span>R{finalTotal.toLocaleString()}</span>
            </div>

            <Button
              type="submit"
              disabled={isCheckingOut}
              className="w-full rounded-xl h-11 mt-6 gold-gradient text-primary-foreground flex items-center justify-center gap-2"
            >
              {isCheckingOut ? <Loader2 className="w-5 h-5 animate-spin" /> : "Place Order"}
            </Button>
          </div>
        </form>
      </div>
    </main><Footer /></>
  );
};

export default Checkout;