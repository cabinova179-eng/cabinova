import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Ruler, Paintbrush, Factory, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { icon: Ruler, title: 'Measure', desc: 'We visit your space and take precise measurements for a perfect fit.' },
  { icon: Paintbrush, title: 'Design', desc: 'Our designers create a 3D render of your dream kitchen layout.' },
  { icon: Factory, title: 'Manufacture', desc: 'Your cabinets are precision-crafted in our local workshop.' },
  { icon: Wrench, title: 'Install', desc: 'Professional installation with minimal disruption to your home.' },
];

const KitchenBuilder = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28 bg-[hsl(220,10%,12%)]">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Custom Solutions</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 text-foreground">Design Your Dream Kitchen</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">From concept to completion, our streamlined process makes custom cabinetry effortless.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {steps.map((s, i) => (
            <div key={s.title} className="glass-card rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 relative">
              <div className="absolute top-4 right-4 text-4xl font-display font-bold text-foreground/5">{String(i + 1).padStart(2, '0')}</div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/custom-cabinets">
            <button className="px-8 py-3.5 gold-gradient text-primary-foreground rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5">
              Design My Kitchen
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KitchenBuilder;
