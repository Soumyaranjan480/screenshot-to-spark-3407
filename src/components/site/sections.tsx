import { Link } from "@tanstack/react-router";
import { Gem, HeartHandshake, MapPin, Navigation, Phone, Sparkles, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-necklace.jpg";
import showroomImage from "@/assets/showroom.jpg";
import { BUSINESS, defaultEnquiry, mapsHref, telHref, whatsappHref } from "@/lib/business";
import { SectionHeading } from "./SectionHeading";
import { ContactForm } from "./ContactForm";
import { WhatsAppIcon } from "./icons";

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-6.75rem)] items-end overflow-hidden bg-burgundy-deep md:min-h-[640px] md:items-center lg:min-h-[720px]">
      <img
        src={heroImage}
        alt="Ornate gold temple necklace and jhumka earrings displayed on burgundy velvet"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[68%_center] md:object-center"
      />
      <div className="bg-hero-overlay absolute inset-0 -z-10" />
      <div className="container-lux pb-14 pt-24 md:py-24">
        <div className="max-w-xl">
          <p className="eyebrow animate-fade-up text-gold-soft">PATRA JEWELLERS · Jajpur, Odisha</p>
          <h1
            className="mt-5 animate-fade-up text-balance text-[2.6rem] leading-[1.02] text-on-dark sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            Where Tradition Meets <em className="text-gold-gradient not-italic">Timeless Elegance</em>
          </h1>
          <p
            className="mt-6 max-w-md animate-fade-up text-base leading-relaxed text-on-dark-muted sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            Discover exquisite jewellery crafted to celebrate your most precious moments.
          </p>
          <div
            className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "360ms" }}
          >
            <Button variant="gold" size="xl" asChild>
              <Link to="/collections">Explore Collections</Link>
            </Button>
            <Button variant="outline-light" size="xl" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ withLink = true }: { withLink?: boolean }) {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-lux grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -left-3 -top-3 h-full w-full rounded-sm border border-gold sm:-left-5 sm:-top-5" />
          <img
            src={showroomImage}
            alt="Warmly lit jewellery showroom with gold pieces on burgundy velvet displays"
            width={1280}
            height={1600}
            loading="lazy"
            className="relative aspect-[4/5] w-full rounded-sm object-cover shadow-lift"
          />
        </div>
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Patra Jewellers"
            title="A Tradition of Trust and Elegance"
          />
          <p className="mt-6 text-pretty text-lg leading-relaxed text-foreground/85">
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
    <section className="py-20 md:py-28">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Jewellery Chosen With Care"
          description="A showroom experience built around you, your occasion and your family."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="group rounded-sm border border-border bg-card p-7 text-center shadow-soft transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift"
            >
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/60 bg-cream text-burgundy transition-colors group-hover:bg-burgundy group-hover:text-gold-soft">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ContactSection({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section className="bg-burgundy-deep py-20 md:py-28">
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

          <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
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
            <Button variant="outline-light" size="xl" asChild className="px-4">
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
