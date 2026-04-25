import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { Input } from '@/components/uii/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const materials = [...new Set(products.map(p => p.material))];
// Automatically find the most expensive product to set the slider limit correctly
const absoluteMaxPrice = Math.max(...products.map(p => p.price), 5000);

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || '';
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCat);
  const [material, setMaterial] = useState('');
  const [sort, setSort] = useState('');
  const [maxPrice, setMaxPrice] = useState(absoluteMaxPrice);

  // State to handle mobile filter visibility
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && p.category !== category) return false;
      if (material && p.material !== material) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [search, category, material, sort, maxPrice]);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground">Shop All Cabinets</h1>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 bg-secondary text-foreground py-2.5 px-4 rounded-xl border border-border font-medium"
            >
              {showFilters ? <X className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
              {showFilters ? 'Close Filters' : 'Filter & Sort'}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Hidden on mobile unless toggled */}
            <aside className={`lg:w-64 shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-xl bg-secondary border-border" />
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Category</h3>
                <div className="flex flex-col gap-1">
                  <button onClick={() => setCategory('')} className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${!category ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary'}`}>All Categories</button>
                  {categories.map(c => (
                    <button key={c.name} onClick={() => setCategory(c.name)} className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${category === c.name ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary'}`}>{c.name}</button>
                  ))}
                </div>
              </div>

              {materials.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Material</h3>
                  <div className="flex flex-col gap-1">
                    <button onClick={() => setMaterial('')} className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${!material ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary'}`}>All Materials</button>
                    {materials.map(m => (
                      <button key={m} onClick={() => setMaterial(m)} className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${material === m ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary'}`}>{m}</button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  <span>Max Price</span>
                  <span className="text-primary">R{maxPrice.toLocaleString()}</span>
                </div>
                <input type="range" min={200} max={absoluteMaxPrice} step={100} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" />
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Sort By</h3>
                <select value={sort} onChange={e => setSort(e.target.value)} className="w-full text-sm border border-border rounded-lg p-2.5 bg-secondary text-foreground focus:ring-primary">
                  <option value="">Default</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4 font-medium">{filtered.length} products found</p>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              ) : (
                <div className="text-center py-20 bg-secondary/30 rounded-2xl border border-border border-dashed">
                  <p className="text-muted-foreground">No products match your current filters.</p>
                  <button onClick={() => { setCategory(''); setMaterial(''); setSearch(''); setMaxPrice(absoluteMaxPrice); }} className="mt-4 text-primary font-medium hover:underline">
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Shop;