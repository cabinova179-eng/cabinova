import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

const AboutPreview = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Our Story</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 mb-6 text-foreground">Crafting Excellence in Every Detail</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cabinova was born from a simple belief: every kitchen deserves cabinetry that's as beautiful as it is functional. Based in Johannesburg, we combine traditional woodworking heritage with cutting-edge manufacturing technology.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Today, we serve homeowners, designers, and developers across South Africa — delivering bespoke solutions that stand the test of time.
            </p>
            <Link to="/about" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Learn more about us →
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=500&fit=crop" alt="Cabinova workshop" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
