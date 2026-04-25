import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  // UPDATED: Added isExternal flag and pointed Custom Cabinets to port 5174
  const links = [
    { to: '/', label: 'Home', isExternal: false },
    { to: '/shop', label: 'Shop', isExternal: false },
    { to: 'http://localhost:5174', label: 'Custom Cabinets', isExternal: true },
    { to: '/about', label: 'About', isExternal: false },
    { to: '/contact', label: 'Contact', isExternal: false },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="font-display text-xl lg:text-2xl font-bold tracking-tight text-foreground">
          CABI<span className="text-primary">NOVA</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            l.isExternal ? (
              // External links use standard <a> tags
              <a
                key={l.to}
                href={l.to}
                className="text-sm font-medium tracking-wide transition-colors hover:text-primary text-foreground/70"
              >
                {l.label}
              </a>
            ) : (
              // Internal links use React Router <Link> tags
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${location.pathname === l.to ? 'text-primary' : 'text-foreground/70'}`}
              >
                {l.label}
              </Link>
            )
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/wishlist" className="p-2 hover:bg-secondary rounded-full transition-colors relative">
            <Heart className="w-5 h-5 text-foreground/70" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{wishlistItems.length}</span>
            )}
          </Link>
          <Link to="/cart" className="p-2 hover:bg-secondary rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-foreground/70" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>
            )}
          </Link>
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-border animate-in slide-in-from-top-2">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {links.map(l => (
              l.isExternal ? (
                // External links for mobile
                <a
                  key={l.to}
                  href={l.to}
                  className="py-2 text-sm font-medium text-foreground/70 hover:text-primary"
                >
                  {l.label}
                </a>
              ) : (
                // Internal links for mobile
                <Link
                  key={l.to}
                  to={l.to}
                  className={`py-2 text-sm font-medium ${location.pathname === l.to ? 'text-primary' : 'text-foreground/70'}`}
                >
                  {l.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;