import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Categories from '@/components/sections/Categories';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import KitchenBuilder from '@/components/sections/KitchenBuilder';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Testimonials from '@/components/sections/Testimonials';
import AboutPreview from '@/components/sections/AboutPreview';

const Index = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <KitchenBuilder />
      <WhyChooseUs />
      <Testimonials />
      <AboutPreview />
    </main>
    <Footer />
  </>
);

export default Index;
