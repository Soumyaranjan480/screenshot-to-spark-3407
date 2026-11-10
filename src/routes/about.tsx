import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageBanner } from "@/components/site/PageBanner";
import { AboutSection, ContactSection, WhyChooseUs } from "@/components/site/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us – PATRA JEWELLERS, Jajpur" },
      {
        name: "description",
        content:
          "PATRA JEWELLERS, led by Bijay Kumar Patra, brings beautiful jewellery and personal customer service to Mangalpur, Jajpur, Odisha.",
      },
      { property: "og:title", content: "About PATRA JEWELLERS" },
      {
        property: "og:description",
        content: "A tradition of trust and elegance in Mangalpur, Jajpur, Odisha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageBanner
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
        eyebrow="Our Story"
        title="About PATRA JEWELLERS"
        description="A jewellery showroom in Mangalpur, Jajpur, where every piece is chosen to become part of your family's memories."
      />
      <AboutSection withLink={false} />
      <WhyChooseUs />
      <section className="py-16 text-center md:py-20">
        <div className="container-lux flex flex-col items-center">
          <p className="max-w-xl font-display text-3xl leading-snug text-foreground sm:text-4xl">
            Find the piece that tells your story.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="gold" size="xl" asChild>
              <Link to="/collections">Explore Collections</Link>
            </Button>
            <Button variant="outline-gold" size="xl" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
