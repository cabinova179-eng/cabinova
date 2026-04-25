import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Input } from '@/components/uii/input';
import { Label } from '@/components/uii/label';
import { Button } from '@/components/uii/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div ref={ref} className={`container mx-auto px-4 lg:px-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Get in Touch</span>
            <h1 className="font-display text-3xl lg:text-4xl font-bold mt-3 text-foreground">Contact Us</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left Side: Contact Info & Map */}
            <div>
              <div className="space-y-6 mb-8">
                {[
                  { icon: MapPin, label: 'Visit Us', value: 'Design Quarter, Fourways, Johannesburg 2191' },
                  { icon: Phone, label: 'Call Us', value: '074120989' },
                  { icon: Mail, label: 'Email Us', value: 'hello@cabinova.co.za' },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</p>
                      <p className="text-sm font-medium text-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Google Map Embed */}
              <div className="rounded-2xl overflow-hidden h-64 bg-secondary flex items-center justify-center border border-border">
                <iframe
                  src="https://maps.google.com/maps?q=Design%20Quarter,%20Fourways,%20Johannesburg&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cabinova Location Map"
                ></iframe>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="font-display text-xl font-semibold mb-6 text-foreground">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Full Name</Label>
                  <Input required className="rounded-xl mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <Input type="email" required className="rounded-xl mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Message</Label>
                  <textarea
                    required
                    className="w-full mt-1 text-sm border border-border rounded-xl p-3 bg-secondary text-foreground min-h-[150px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <Button type="submit" className="w-full rounded-xl h-11 gold-gradient text-primary-foreground">
                  Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;