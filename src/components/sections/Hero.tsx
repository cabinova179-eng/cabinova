import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import heroImage from '@/assets/hero-kitchen.jpg';

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Modern luxury kitchen" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
      </div>
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 relative z-10 pt-20 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
            Premium Kitchen Design
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-foreground">Future-Ready</span>{' '}
            <span className="text-foreground">Kitchen Cabinets</span>
            <br />
            <span className="text-foreground/70">Designed for Modern Living</span>
          </h1>
          <p className="text-lg text-foreground/60 mb-10 leading-relaxed max-w-lg">
            Discover handcrafted cabinetry that blends cutting-edge design with timeless craftsmanship. Built to last, styled to inspire.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop">
              <button className="px-8 py-3.5 gold-gradient text-primary-foreground rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5">
                Shop Cabinets
              </button>
            </Link>
            <Link to="/custom-cabinets">
              <button className="px-8 py-3.5 border border-primary/30 text-primary rounded-xl font-medium text-sm hover:border-primary/60 hover:bg-primary/5 transition-all">
                Create Custom 3D Kitchen
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
