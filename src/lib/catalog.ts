import necklace1 from "@/assets/p-necklace-1.jpg";
import necklace2 from "@/assets/p-necklace-2.jpg";
import earrings1 from "@/assets/p-earrings-1.jpg";
import earrings2 from "@/assets/p-earrings-2.jpg";
import ring1 from "@/assets/p-ring-1.jpg";
import ring2 from "@/assets/p-ring-2.jpg";
import bangles1 from "@/assets/p-bangles-1.jpg";
import bangles2 from "@/assets/p-bangles-2.jpg";
import chain1 from "@/assets/p-chain-1.jpg";
import chain2 from "@/assets/p-chain-2.jpg";
import mangalsutra1 from "@/assets/p-mangalsutra-1.jpg";
import mangalsutra2 from "@/assets/p-mangalsutra-2.jpg";
import silver1 from "@/assets/p-silver-1.jpg";
import silver2 from "@/assets/p-silver-2.jpg";
import anklet1 from "@/assets/p-anklet-1.jpg";
import silverRing1 from "@/assets/p-silver-ring-1.jpg";
import traditional1 from "@/assets/p-traditional-1.jpg";
import traditional2 from "@/assets/p-traditional-2.jpg";

export type Metal = "gold" | "silver" | "traditional";

export type Category = {
  slug: string;
  name: string;
  metal: Metal;
  image: string;
  blurb: string;
};

export type Product = {
  code: string;
  name: string;
  categorySlug: string;
  image: string;
  description: string;
  featured?: boolean;
};

export const CATEGORIES: Category[] = [
  {
    slug: "gold-necklace-sets",
    name: "Gold Necklace Sets",
    metal: "gold",
    image: necklace1,
    blurb: "Statement necklace sets for weddings, festivals and family celebrations.",
  },
  {
    slug: "gold-earrings",
    name: "Gold Earrings",
    metal: "gold",
    image: earrings1,
    blurb: "From graceful jhumkas to chandbalis, earrings for every occasion.",
  },
  {
    slug: "gold-rings",
    name: "Gold Rings",
    metal: "gold",
    image: ring1,
    blurb: "Engraved bands and stone-set rings, chosen to be worn and treasured.",
  },
  {
    slug: "gold-bangles",
    name: "Gold Bangles",
    metal: "gold",
    image: bangles1,
    blurb: "Carved, textured and classic bangles for everyday and festive wear.",
  },
  {
    slug: "gold-chains",
    name: "Gold Chains",
    metal: "gold",
    image: chain1,
    blurb: "Fine chains in rope, box and link styles, alone or with a pendant.",
  },
  {
    slug: "mangalsutra",
    name: "Mangalsutra",
    metal: "gold",
    image: mangalsutra1,
    blurb: "Traditional and modern mangalsutra designs with black bead strands.",
  },
  {
    slug: "silver-jewellery",
    name: "Silver Jewellery",
    metal: "silver",
    image: silver1,
    blurb: "Oxidised and polished silver sets with intricate handcrafted motifs.",
  },
  {
    slug: "silver-anklets",
    name: "Silver Anklets",
    metal: "silver",
    image: anklet1,
    blurb: "Payal and anklets with delicate ghungroo detailing.",
  },
  {
    slug: "silver-rings",
    name: "Silver Rings",
    metal: "silver",
    image: silverRing1,
    blurb: "Bold and minimal silver rings with floral and classic designs.",
  },
  {
    slug: "traditional-jewellery",
    name: "Traditional Jewellery",
    metal: "traditional",
    image: traditional1,
    blurb: "Heritage-inspired pieces for brides and ceremonial occasions.",
  },
];

export const PRODUCTS: Product[] = [
  {
    code: "PJ-GN-101",
    name: "Kundan Rani Haar Set",
    categorySlug: "gold-necklace-sets",
    image: necklace1,
    description:
      "A long rani haar with kundan settings, ruby and emerald accents and pearl drops, paired with matching earrings.",
    featured: true,
  },
  {
    code: "PJ-GN-102",
    name: "Polki Emerald Drop Choker",
    categorySlug: "gold-necklace-sets",
    image: necklace2,
    description:
      "A close-fitting choker with uncut polki-style stones and graceful green drops, ideal for receptions and festivities.",
  },
  {
    code: "PJ-GE-201",
    name: "Filigree Pearl Jhumka",
    categorySlug: "gold-earrings",
    image: earrings1,
    description:
      "Dome jhumkas with floral filigree work and a fringe of tiny pearls, topped with a carved flower stud.",
    featured: true,
  },
  {
    code: "PJ-GE-202",
    name: "Granulated Chandbali",
    categorySlug: "gold-earrings",
    image: earrings2,
    description:
      "Crescent chandbalis finished with fine bead granulation and a small jhumka suspended at the centre.",
  },
  {
    code: "PJ-GR-301",
    name: "Floral Engraved Band",
    categorySlug: "gold-rings",
    image: ring1,
    description:
      "A comfortable band engraved all around with flowing floral and leaf patterns.",
  },
  {
    code: "PJ-GR-302",
    name: "Ruby Petal Cocktail Ring",
    categorySlug: "gold-rings",
    image: ring2,
    description:
      "A red centre stone framed by sculpted gold petals — a festive ring with a bold presence.",
    featured: true,
  },
  {
    code: "PJ-GB-401",
    name: "Peacock Carved Bangle Stack",
    categorySlug: "gold-bangles",
    image: bangles1,
    description:
      "A set of richly carved bangles with floral, lattice and peacock motifs, designed to be worn together.",
    featured: true,
  },
  {
    code: "PJ-GB-402",
    name: "Diamond-Cut Kada Pair",
    categorySlug: "gold-bangles",
    image: bangles2,
    description: "A pair of polished kadas with a light-catching diamond-cut texture for daily wear.",
  },
  {
    code: "PJ-GC-501",
    name: "Classic Rope Chain",
    categorySlug: "gold-chains",
    image: chain1,
    description: "A timeless twisted rope chain with a smooth, even finish.",
  },
  {
    code: "PJ-GC-502",
    name: "Box Chain with Lotus Pendant",
    categorySlug: "gold-chains",
    image: chain2,
    description: "A fine box-link chain carrying a small, polished lotus pendant.",
    featured: true,
  },
  {
    code: "PJ-MS-601",
    name: "Lakshmi Pendant Mangalsutra",
    categorySlug: "mangalsutra",
    image: mangalsutra1,
    description:
      "Double strand black beads with gold spacers and an ornate Lakshmi pendant with coloured stones.",
    featured: true,
  },
  {
    code: "PJ-MS-602",
    name: "Modern Geometric Mangalsutra",
    categorySlug: "mangalsutra",
    image: mangalsutra2,
    description: "A short, lightweight mangalsutra with a minimal open-diamond gold pendant.",
  },
  {
    code: "PJ-SJ-701",
    name: "Oxidised Silver Necklace Set",
    categorySlug: "silver-jewellery",
    image: silver1,
    description:
      "A collar-style oxidised silver necklace with teardrop motifs and silver bead fringe, with matching earrings.",
    featured: true,
  },
  {
    code: "PJ-SJ-702",
    name: "Silver Elephant Jhumka",
    categorySlug: "silver-jewellery",
    image: silver2,
    description:
      "Oxidised silver jhumkas with an elephant frieze and a cream stone teardrop stud.",
  },
  {
    code: "PJ-SA-801",
    name: "Ghungroo Silver Payal",
    categorySlug: "silver-anklets",
    image: anklet1,
    description: "A pair of silver anklets lined with tiny ghungroo beads for a gentle chime.",
    featured: true,
  },
  {
    code: "PJ-SR-901",
    name: "Floral Relief Silver Ring",
    categorySlug: "silver-rings",
    image: silverRing1,
    description: "A wide, adjustable silver ring with raised floral relief and oxidised depth.",
  },
  {
    code: "PJ-TJ-1001",
    name: "Filigree Bridal Choker Set",
    categorySlug: "traditional-jewellery",
    image: traditional1,
    description:
      "A broad filigree choker with red stones and bead fringe, paired with matching drop earrings.",
    featured: true,
  },
  {
    code: "PJ-TJ-1002",
    name: "Temple Coin Haar & Maang Tikka",
    categorySlug: "traditional-jewellery",
    image: traditional2,
    description:
      "A long coin haar with a temple pendant, accompanied by a matching maang tikka for bridal looks.",
  },
];

export const METAL_LABEL: Record<Metal, string> = {
  gold: "Gold",
  silver: "Silver",
  traditional: "Traditional",
};

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProduct(code: string) {
  return PRODUCTS.find((p) => p.code.toLowerCase() === code.toLowerCase());
}

export function productsInCategory(slug: string) {
  return PRODUCTS.filter((p) => p.categorySlug === slug);
}

export function categoriesByMetal(metal: Metal) {
  return CATEGORIES.filter((c) => c.metal === metal);
}

export function productsByMetal(metal: Metal) {
  const slugs = new Set(categoriesByMetal(metal).map((c) => c.slug));
  return PRODUCTS.filter((p) => slugs.has(p.categorySlug));
}

export function featuredProducts() {
  return PRODUCTS.filter((p) => p.featured);
}

export function searchCatalog(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { categories: [] as Category[], products: [] as Product[] };
  const categories = CATEGORIES.filter((c) => c.name.toLowerCase().includes(q));
  const products = PRODUCTS.filter((p) => {
    const cat = getCategory(p.categorySlug);
    return (
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      (cat?.name.toLowerCase().includes(q) ?? false)
    );
  });
  return { categories, products };
}
