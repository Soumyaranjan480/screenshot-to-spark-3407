import { createFileRoute } from "@tanstack/react-router";
import bannerImage from "@/assets/p-silver-1.jpg";
import { MetalPage } from "@/components/site/MetalPage";

export const Route = createFileRoute("/silver-jewellery")({
  head: () => ({
    meta: [
      { title: "Silver Jewellery – Sets, Anklets & Rings | PATRA JEWELLERS" },
      {
        name: "description",
        content:
          "Oxidised and polished silver jewellery, silver anklets and silver rings at PATRA JEWELLERS, Jajpur, Odisha.",
      },
      { property: "og:title", content: "Silver Jewellery | PATRA JEWELLERS" },
      {
        property: "og:description",
        content: "Explore silver jewellery sets, anklets and rings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <MetalPage
      metal="silver"
      title="Silver Jewellery"
      image={bannerImage}
      description="Handcrafted silver sets, ghungroo anklets and statement rings with timeless charm."
    />
  ),
});
