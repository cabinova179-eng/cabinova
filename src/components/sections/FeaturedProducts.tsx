import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const FeaturedProducts = () => {
  const { ref, isVisible } = useScrollAnimation();
  const featured = products.slice(0, 8);

  return (
    <section className="py-20 lg:py-28">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Curated Selection</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 text-foreground">Featured Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
