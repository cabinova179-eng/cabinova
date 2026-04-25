import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  { name: 'Sarah M.', role: 'Homeowner, Cape Town', text: 'LuxeCabinet transformed our kitchen beyond imagination. The quality is exceptional and the team was a joy to work with.', rating: 5 },
  { name: 'James K.', role: 'Interior Designer', text: 'I exclusively recommend LuxeCabinet to my clients. Their attention to detail and finish quality is unmatched in the market.', rating: 5 },
  { name: 'Priya D.', role: 'Homeowner, Johannesburg', text: 'From design to installation, the process was seamless. Our custom pantry is the highlight of our new home.', rating: 5 },
  { name: 'Michael R.', role: 'Property Developer', text: "We've fitted over 30 units with LuxeCabinet. Consistent quality, on-time delivery, and great value every time.", rating: 4 },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);

  return (
    <section className="py-20 lg:py-28 bg-[hsl(220,10%,12%)]">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Client Stories</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 text-foreground">What Our Clients Say</h2>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-8 lg:p-10 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(testimonials[idx].rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-primary fill-primary" />)}
            </div>
            <p className="text-lg italic text-foreground/80 leading-relaxed mb-6">"{testimonials[idx].text}"</p>
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-2 text-primary font-semibold text-sm">
              {testimonials[idx].name.charAt(0)}
            </div>
            <p className="font-semibold text-sm text-foreground">{testimonials[idx].name}</p>
            <p className="text-xs text-muted-foreground">{testimonials[idx].role}</p>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={prev} className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === idx ? 'bg-primary' : 'bg-muted'}`} />)}
            </div>
            <button onClick={next} className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
