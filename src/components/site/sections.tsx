import { Link } from "@tanstack/react-router";
import { Gem, HeartHandshake, MapPin, Navigation, Phone, Sparkles, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import showroomImage from "@/assets/showroom.jpg";
import { BUSINESS, defaultEnquiry, mapsHref, telHref, whatsappHref } from "@/lib/business";
import { SectionHeading } from "./SectionHeading";
import { ContactForm } from "./ContactForm";
import { WhatsAppIcon } from "./icons";

export { HomeHero } from "./HomeShowcase";

export function AboutSection({ withLink = true }: { withLink?: boolean }) {
  return (
    <section className="bg-cream py-14 md:py-28">
      <div className="container-lux grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -left-3 -top-3 h-full w-full rounded-sm border border-gold sm:-left-5 sm:-top-5" />
          <img
            src={showroomImage}
            alt="Warmly lit jewellery showroom with gold pieces on burgundy velvet displays"
            width={1280}
            height={1600}
            loading="lazy"
            className="relative aspect-[4/3] w-full rounded-sm object-cover shadow-lift sm:aspect-[4/5]"
          />
        </div>
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Patra Jewellers"
            title="A Tradition of Trust and Elegance"
          />
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85 sm:mt-6 sm:text-lg">
            At PATRA JEWELLERS, we believe jewellery represents love, tradition and memories. We
            bring together beautiful designs and personal customer service to help you find
            jewellery for every special occasion.
          </p>
          <div className="mt-8 flex items-center gap-4 border-l-2 border-gold pl-5">
            <div>
              <p className="eyebrow">Showroom Owner</p>
              <p className="mt-1 font-display text-2xl tracking-wide text-burgundy">
                {BUSINESS.owner}
              </p>
            </div>
          </div>
          {withLink && (
            <Button variant="outline-gold" size="xl" asChild className="mt-10">
              <Link to="/about">Our Story</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: Gem,
    title: "Beautiful Jewellery Collections",
    text: "Gold, silver and traditional pieces chosen for weddings, festivals and everyday grace.",
  },
  {
    icon: HeartHandshake,
    title: "Personal Customer Assistance",
    text: "Unhurried, personal guidance in the showroom and on WhatsApp to help you choose well.",
  },
  {
    icon: Sparkles,
    title: "Traditional and Modern Designs",
    text: "From heritage temple and filigree styles to light, contemporary pieces.",
  },
  {
    icon: Users,
    title: "Trusted Customer Relationships",
    text: "We value every family we serve and look forward to being part of your celebrations.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-14 md:py-28">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Jewellery Chosen With Care"
          description="A showroom experience built around you, your occasion and your family."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-5 md:mt-14 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="group flex items-start gap-4 rounded-sm border border-border bg-card p-5 text-left shadow-soft sm:block sm:p-7 sm:text-center transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center sm:mx-auto sm:h-16 sm:w-16 rounded-full border border-gold/60 bg-cream text-burgundy transition-colors group-hover:bg-burgundy group-hover:text-gold-soft">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="block min-w-0">
                <h3 className="font-display text-xl text-foreground sm:mt-6 sm:text-2xl">{title}</h3>
                <p className="mt-1 text-sm sm:mt-3 leading-relaxed text-muted-foreground">{text}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ContactSection({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section className="bg-burgundy-deep py-14 md:py-28">
      <div className="container-lux grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            as={headingAs}
            align="left"
            tone="light"
            eyebrow="Visit or Contact Us"
            title="We'd Love to Welcome You"
            description="Visit our showroom, call us or send a message on WhatsApp — we're happy to help you find the right piece."
          />

          <div className="mt-10 space-y-6 text-on-dark-muted">
            <p className="font-display text-3xl tracking-[0.12em] text-on-dark">PATRA JEWELLERS</p>
            <div className="flex gap-4">
              <User className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <p>
                <span className="block text-xs uppercase tracking-[0.18em] text-gold-soft">Owner</span>
                <span className="text-on-dark">{BUSINESS.owner}</span>
              </p>
            </div>
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <address className="not-italic">
                <span className="block text-xs uppercase tracking-[0.18em] text-gold-soft">Address</span>
                <span className="text-on-dark">Mangalpur, Jajpur, Odisha – 755011</span>
              </address>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <p>
                <span className="block text-xs uppercase tracking-[0.18em] text-gold-soft">Phone</span>
                <a href={telHref} className="text-on-dark hover:text-gold">
                  {BUSINESS.phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <Button variant="gold" size="xl" asChild className="px-4">
              <a href={telHref}>
                <Phone /> Call Now
              </a>
            </Button>
            <Button variant="whatsapp" size="xl" asChild className="px-4">
              <a href={whatsappHref(defaultEnquiry)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> WhatsApp
              </a>
            </Button>
            <Button variant="outline-light" size="xl" asChild className="col-span-2 px-4 sm:col-span-1">
              <a href={mapsHref} target="_blank" rel="noopener noreferrer">
                <Navigation /> Directions
              </a>
            </Button>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
