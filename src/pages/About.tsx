import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Award, Users, Leaf, ShieldCheck, Hammer, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen overflow-hidden">

        {/* Hero Section */}
        <section ref={ref} className={`container mx-auto px-4 lg:px-8 mb-20 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4 block">Our Story</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-6 text-foreground">
              Redefining the Heart of the Home
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Cabinova, we believe a kitchen is more than just a place to cook. It is the architectural centerpiece of your home. We exist to build cabinetry that fuses breathtaking modern aesthetics with unbreakable structural integrity.
            </p>
          </div>
        </section>

        {/* The Cabinova Story - Image & Text Split */}
        <section className="container mx-auto px-4 lg:px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 pr-0 lg:pr-8">
              <h2 className="font-display text-3xl font-bold text-foreground">Born in Johannesburg, Built for the Future.</h2>
              <p className="text-muted-foreground leading-relaxed">
                Based in the design hub of Fourways, Johannesburg, Cabinova has evolved from a boutique woodworking studio into one of South Africa's premier modular kitchen manufacturers. We were founded on a singular principle: <strong>kitchen cabinetry shouldn't just look good on day one; it should look good on day ten thousand.</strong>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The traditional cabinetry market is often plagued by flat-packs that warp over time, or bespoke options that take months to deliver and cost a fortune. We bridge that gap. By streamlining our manufacturing process and focusing heavily on engineered excellence, we provide custom-level quality at accessible price points.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, our team of 45+ skilled artisans and engineers works tirelessly to deliver precision-cut floor units, tall grocery pantries, and elegant wall displays that transform ordinary houses into dream homes.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden h-[500px] shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop"
                alt="Cabinova Kitchen Design"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* The Manufacturing Process */}
        <section className="bg-secondary/50 py-24 mb-24 border-y border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Precision at Every Step</h2>
              <p className="text-muted-foreground">We don't just build boxes. We engineer storage solutions. Here is how we guarantee excellence in every cabinet.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Material Selection',
                  desc: 'We source only premium, high-density engineered boards and durable melamine finishes that are highly resistant to moisture, heat, and daily wear-and-tear.'
                },
                {
                  step: '02',
                  title: 'CNC Routing',
                  desc: 'Every panel is cut using advanced computer-numerical-control (CNC) machinery. This guarantees millimeter-perfect accuracy so your units align flawlessly.'
                },
                {
                  step: '03',
                  title: 'Premium Assembly',
                  desc: 'From heavy-duty soft-close drawer runners to robust bi-fold hinges, we equip our cabinets with top-tier hardware designed for a lifetime of smooth operation.'
                }
              ].map((process, idx) => (
                <div key={idx} className="relative p-8 glass-card rounded-2xl border border-border/50">
                  <span className="absolute -top-6 -left-2 text-7xl font-display font-bold text-primary/10 select-none">
                    {process.step}
                  </span>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground relative z-10 mt-4">{process.title}</h3>
                  <p className="text-muted-foreground relative z-10 leading-relaxed text-sm">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="container mx-auto px-4 lg:px-8 mb-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Uncompromising Quality', desc: 'No shortcuts. We test our hinges, runners, and surfaces to withstand decades of rigorous kitchen activity.' },
              { icon: ShieldCheck, title: 'Lasting Durability', desc: 'Backed by our comprehensive warranty, our cabinets are structurally engineered to handle heavy loads without sagging.' },
              { icon: Leaf, title: 'Sustainability', desc: 'We utilize 100% FSC-certified timber and implement carbon-neutral manufacturing processes in our workshop.' },
              { icon: Users, title: 'Client-Centric', desc: 'Over 2,000 happy South African homeowners trust Cabinova. We design around your lifestyle and workflow.' },
              { icon: Hammer, title: 'Craftsmanship', desc: 'Technology provides the precision, but our master craftsmen provide the soul and final quality checks.' },
              { icon: Award, title: 'Industry Excellence', desc: 'Recognized across the industry for pushing the boundaries of modular kitchen innovation and aesthetic design.' },
            ].map(v => (
              <div key={v.title} className="glass-card rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 border border-border/40">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-3 text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 lg:px-8">
          <div className="rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden bg-[hsl(220,12%,12%)] border border-primary/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 relative z-10">
              Ready to Build Your Dream Kitchen?
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10 text-lg">
              Browse our extensive collection of floor units, wall units, and specialized cabinets, or reach out to our design team to discuss your custom project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link to="/shop" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 rounded-xl gold-gradient text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                Shop Cabinets <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center rounded-xl bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-colors border border-border">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default About;