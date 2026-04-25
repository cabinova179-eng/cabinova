import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Input } from '@/components/uii/input';
import { Label } from '@/components/uii/label';
import { Button } from '@/components/uii/button';
import { Ruler, Paintbrush, Factory, Wrench } from 'lucide-react';
import { toast } from 'sonner';

const steps = [
  { icon: Ruler, title: 'Measure', desc: 'We visit your home and take precision measurements using laser technology.' },
  { icon: Paintbrush, title: 'Design', desc: 'Our team creates photorealistic 3D renders so you can visualize your dream kitchen.' },
  { icon: Factory, title: 'Manufacture', desc: 'CNC-machined cabinetry crafted in our Johannesburg workshop using premium materials.' },
  { icon: Wrench, title: 'Install', desc: 'Professional installation by our certified team with a clean, efficient process.' },
];

const CustomCabinets = () => {
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Quote request submitted! We\'ll be in touch within 24 hours.');
  };

  return (
    <><Navbar /><main className="pt-24 pb-16 min-h-screen">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Bespoke Solutions</span>
          <h1 className="font-display text-3xl lg:text-4xl font-bold mt-3 mb-4 text-foreground">Custom Kitchen Cabinets</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Every kitchen is unique. Let us design and build cabinetry that fits your space, style, and lifestyle perfectly.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s, i) => (
            <div key={s.title} className="glass-card rounded-2xl p-6 text-center relative hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-3 right-3 text-3xl font-display font-bold text-foreground/5">{String(i + 1).padStart(2, '0')}</div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><s.icon className="w-6 h-6 text-primary" /></div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="max-w-2xl mx-auto glass-card rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold mb-6 text-center text-foreground">Request a Custom Quote</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label className="text-xs text-muted-foreground">Full Name</Label><Input required className="rounded-xl mt-1 bg-secondary border-border" /></div>
              <div><Label className="text-xs text-muted-foreground">Email</Label><Input type="email" required className="rounded-xl mt-1 bg-secondary border-border" /></div>
              <div><Label className="text-xs text-muted-foreground">Phone</Label><Input type="tel" className="rounded-xl mt-1 bg-secondary border-border" /></div>
              <div><Label className="text-xs text-muted-foreground">Kitchen Size (approx m²)</Label><Input className="rounded-xl mt-1 bg-secondary border-border" /></div>
            </div>
            <div><Label className="text-xs text-muted-foreground">Style Preference</Label>
              <select className="w-full mt-1 text-sm border border-border rounded-xl p-2.5 bg-secondary text-foreground">
                <option>Modern Minimalist</option><option>Classic Shaker</option><option>High-Gloss Contemporary</option><option>Rustic Farmhouse</option><option>Scandinavian</option>
              </select>
            </div>
            <div><Label className="text-xs text-muted-foreground">Additional Notes</Label><textarea className="w-full mt-1 text-sm border border-border rounded-xl p-3 bg-secondary text-foreground min-h-[100px] resize-none" /></div>
            <Button type="submit" className="w-full rounded-xl h-11 gold-gradient text-primary-foreground">Submit Quote Request</Button>
          </form>
        </div>
      </div>
    </main><Footer /></>
  );
};

export default CustomCabinets;
