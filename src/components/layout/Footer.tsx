import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
// Removed Button and Input imports since the newsletter is no longer needed

const Footer = () => (
  <footer className="bg-[hsl(220,12%,8%)] border-t border-border">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-xl font-bold text-foreground mb-4">CABI<span className="text-primary">NOVA</span></h3>
          <p className="text-sm leading-relaxed text-muted-foreground">Crafting future-ready kitchen cabinets with precision engineering and sustainable materials.</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-foreground/80 mb-4 uppercase tracking-[0.2em]">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            {[{ to: '/shop', label: 'Shop All' }, { to: '/custom-cabinets', label: 'Custom Cabinets' }, { to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }].map(l => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-foreground/80 mb-4 uppercase tracking-[0.2em]">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-primary/70" /> Design Quarter, Fourways, Johannesburg</span>
            <span className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-primary/70" /> 074120989</span>
            <span className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-primary/70" /> hello@cabinova.co.za</span>
          </div>
          {/* Moved social icons here so they aren't lost after removing the newsletter */}
          <div className="flex gap-3 mt-6">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Updated bottom bar with AI Precision Agency link */}
      <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Cabinova. All rights reserved.</span>
        <span>
          Designed by <a href="https://aiprecision.agency/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors font-medium">AI Precision Agency</a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;