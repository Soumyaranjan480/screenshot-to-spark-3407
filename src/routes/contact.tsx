import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/site/PageBanner";
import { ContactSection } from "@/components/site/sections";
import { mapsEmbedSrc } from "@/lib/business";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us – PATRA JEWELLERS, Mangalpur, Jajpur" },
      {
        name: "description",
        content:
          "Visit PATRA JEWELLERS at Mangalpur, Jajpur, Odisha – 755011. Call or WhatsApp +91 9853527161.",
      },
      { property: "og:title", content: "Contact PATRA JEWELLERS" },
      {
        property: "og:description",
        content: "Mangalpur, Jajpur, Odisha – 755011 · +91 9853527161",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageBanner
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact Us" }]}
        eyebrow="Get in Touch"
        title="Contact PATRA JEWELLERS"
        description="Call, message us on WhatsApp or visit the showroom in Mangalpur, Jajpur."
      />
      <ContactSection />
      <section aria-label="Map" className="bg-cream">
        <iframe
          title="Map showing Mangalpur, Jajpur, Odisha"
          src={mapsEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[360px] w-full border-0 grayscale-[30%] md:h-[440px]"
        />
      </section>
    </>
  );
}
