import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28 bg-[hsl(220,10%,12%)]">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Our Collections</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 text-foreground">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {categories.map((cat) => (
            <Link to={`/shop?category=${encodeURIComponent(cat.name)}`} key={cat.name} className="group glass-card rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold mb-1 text-foreground">{cat.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{cat.description}</p>
                <span className="inline-flex items-center text-xs font-medium text-primary group-hover:gap-2 transition-all">
                  Shop Now <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
