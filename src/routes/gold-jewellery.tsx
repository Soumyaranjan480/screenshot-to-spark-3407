import { createFileRoute } from "@tanstack/react-router";
import bannerImage from "@/assets/p-bangles-1.jpg";
import { MetalPage } from "@/components/site/MetalPage";

export const Route = createFileRoute("/gold-jewellery")({
  head: () => ({
    meta: [
      { title: "Gold Jewellery – Necklaces, Earrings, Bangles | PATRA JEWELLERS" },
      {
        name: "description",
        content:
          "Gold necklace sets, earrings, rings, bangles, chains and mangalsutra at PATRA JEWELLERS, Jajpur, Odisha. Enquire on WhatsApp.",
      },
      { property: "og:title", content: "Gold Jewellery | PATRA JEWELLERS" },
      {
        property: "og:description",
        content: "Explore gold necklace sets, earrings, rings, bangles, chains and mangalsutra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <MetalPage
      metal="gold"
      title="Gold Jewellery"
      image={bannerImage}
      description="Necklace sets, earrings, rings, bangles, chains and mangalsutra — gold jewellery for celebrations and everyday elegance."
    />
  ),
});
