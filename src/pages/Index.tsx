import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Users, Shield, Star, ChevronDown, MessageCircle, Plane, Ship, Camera, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import Gallery from "@/components/Gallery";
import PrivateTours from "@/components/PrivateTours";
import heroImg from "@/assets/hero-van.jpg";
import interiorImg from "@/assets/van-interior.jpg";
import logoImg from "@/assets/logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const services = [
  { icon: Plane, title: "Airport Transfers", desc: "Athens International Airport pickup & drop-off with flight monitoring" },
  { icon: Ship, title: "Port Transfers", desc: "Piraeus, Rafina & Lavrio port connections for cruise & ferry travelers" },
  { icon: Camera, title: "Private Tours", desc: "Customized day trips to Delphi, Meteora, Nafplio, Sounion & more" },
  { icon: Building, title: "Hotel Transfers", desc: "Door-to-door service between any hotel, villa or Airbnb in Athens" },
];

const features = [
  { icon: Shield, title: "Licensed & Insured", desc: "Fully licensed, professional chauffeur service" },
  { icon: Users, title: "Up to 7 Passengers", desc: "Spacious Mercedes V Class for groups & families" },
  { icon: Clock, title: "24/7 Available", desc: "Round-the-clock service, early morning & late night" },
  { icon: Star, title: "5-Star Rated", desc: "Hundreds of satisfied travelers from around the world" },
];

const Index = () => {
  const whatsappUrl = "https://wa.me/306949393700";

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="H&A Tours" className="h-10 w-10 object-contain" />
            <div>
              <span className="font-display text-lg font-bold text-primary">H&A TOURS</span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">VIP Transfers Athens</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="text-foreground/70 hover:text-primary transition-colors">Services</a>
            <a href="#fleet" className="text-foreground/70 hover:text-primary transition-colors">Our Fleet</a>
            <a href="#gallery" className="text-foreground/70 hover:text-primary transition-colors">Gallery</a>
            <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</a>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Book Now</span>
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Mercedes V Class in Athens" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium"
          >
            Premium Private Transfers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Luxury Transfers{" "}
            <span className="text-primary">in Athens</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-foreground/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Experience Greece in style with our Mercedes V Class. Airport transfers, port pickups, private tours & VIP transportation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-base px-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Booking
              </Button>
            </a>
            <a href="tel:+306949393700">
              <Button size="lg" variant="outline" className="text-base px-8 gap-2 border-primary/30 text-primary hover:bg-primary/10">
                <Phone className="w-5 h-5" />
                Call Us
              </Button>
            </a>
          </motion.div>
        </div>
        <a href="#services" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary/60">
          <ChevronDown className="w-8 h-8" />
        </a>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="text-primary uppercase tracking-[0.2em] text-sm mb-3">What We Offer</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold">Our Services</motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                custom={i}
                className="bg-card border border-border rounded-lg p-8 text-center hover:border-primary/40 transition-colors group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Private Tours */}
      <PrivateTours />

      {/* Fleet / About */}
      <section id="fleet" className="py-24 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img src={interiorImg} alt="Mercedes V Class interior" className="rounded-lg shadow-2xl" loading="lazy" width={800} height={600} />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p variants={fadeUp} custom={0} className="text-primary uppercase tracking-[0.2em] text-sm mb-3">Our Fleet</motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-4xl font-bold mb-6">Mercedes V Class</motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed mb-6">
                Travel in ultimate comfort with our Mercedes V Class — the premium choice for discerning travelers. Spacious leather interior, climate control, complimentary Wi-Fi and bottled water for every journey.
              </motion.p>
              <motion.ul variants={fadeUp} custom={3} className="space-y-3 text-foreground/80">
                {["Up to 7 passengers", "Leather seats & ambient lighting", "Complimentary Wi-Fi & water", "Professional English-speaking driver", "Child seats available on request"].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Gallery />

      {/* Why Choose Us */}
      <section id="about" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-primary uppercase tracking-[0.2em] text-sm mb-3">Why H&A Tours</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold">Why Choose Us</motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i} className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Transfer?</h2>
          <p className="text-muted-foreground mb-8 text-lg">Contact us via WhatsApp for instant booking confirmation. Available in English, Greek, French, German & Italian.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-base px-10 gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
                <MessageCircle className="w-5 h-5" />
                Book via WhatsApp
              </Button>
            </a>
            <a href="mailto:haviptours@gmail.com">
              <Button size="lg" variant="outline" className="text-base px-10 gap-2 border-primary/30 text-primary hover:bg-primary/10">
                <Mail className="w-5 h-5" />
                Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-3">Get In Touch</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">Contact Us</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Phone, label: "Phone / WhatsApp", value: "+30 694 939 3700", href: "tel:+306949393700" },
              { icon: Mail, label: "Email", value: "haviptours@gmail.com", href: "mailto:haviptours@gmail.com" },
              { icon: MapPin, label: "Based In", value: "Athens, Greece", href: "#" },
            ].map((c) => (
              <a key={c.label} href={c.href} className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/40 transition-colors block overflow-hidden">
                <c.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">{c.label}</p>
                <p className="font-medium text-foreground text-sm break-all">{c.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="H&A Tours" className="h-8 w-8 object-contain" loading="lazy" />
            <span className="font-display text-sm font-bold text-primary">H&A TOURS</span>
          </div>
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} H&A VIP Tours. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors hover:scale-110"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
};

export default Index;
