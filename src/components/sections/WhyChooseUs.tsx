import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Shield, Gem, Zap, Award, Leaf } from 'lucide-react';

const features = [
  { icon: Gem, title: 'Premium Materials', desc: 'Only the finest solid woods, veneers, and engineered materials.' },
  { icon: Shield, title: 'Precision Craftsmanship', desc: 'CNC-machined components with hand-finished detailing.' },
  { icon: Zap, title: 'Fast Installation', desc: 'Professional fitting in as little as 3–5 business days.' },
  { icon: Award, title: '10-Year Warranty', desc: 'Complete peace of mind with our industry-leading guarantee.' },
  { icon: Leaf, title: 'Eco-Friendly', desc: 'FSC-certified timber and low-VOC finishes as standard.' },
];

const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Our Promise</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 text-foreground">Why Choose LuxeCabinet</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map(f => (
            <div key={f.title} className="glass-card rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-sm font-semibold mb-2 text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
