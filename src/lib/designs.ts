/**
 * Extra designs for every jewellery type (12 per category), photographed on the
 * soft blush backdrop. Images live in src/assets/designs/<category-slug>-NN.jpg.
 */
const images = import.meta.glob<string>("../assets/designs/*.jpg", {
  eager: true,
  import: "default",
});

function img(slug: string, n: number) {
  const key = `../assets/designs/${slug}-${String(n).padStart(2, "0")}.jpg`;
  return images[key] ?? "";
}

type Entry = [name: string, description: string];

type Series = { slug: string; prefix: string; start: number; items: Entry[] };

export const DESIGN_SERIES: Series[] = [
  {
    slug: "gold-necklace-sets",
    prefix: "PJ-GN-",
    start: 103,
    items: [
      ["Lakshmi Temple Necklace Set", "Antique temple necklace with a seated Lakshmi pendant, pearl drops and matching jhumkas."],
      ["Polki Emerald Bead Choker Set", "Broad polki-style choker with a fringe of green drops and long matching earrings."],
      ["Three-Layer Kundan Haar", "Three graduated kundan strands finished with a teardrop pendant and kundan drops."],
      ["Lakshmi Coin Kasu Necklace", "Traditional kasu mala of Lakshmi coins with red and green stone accents."],
      ["Twin Peacock Necklace Set", "Enamel peacock pair with ruby centre and pearl drops, with peacock earrings."],
      ["Ruby Pearl-Drop Choker Set", "Rows of ruby-red stones on a fitted choker with a pearl fringe and matching drops."],
      ["Emerald Bead Layered Set", "Three strands of green beads with floral spacers and an emerald teardrop pendant."],
      ["Pearl Strand Temple Haram", "Multiple pearl strands holding a carved temple pendant, with temple jhumkas."],
      ["Antique Nakshi Necklace Set", "Hand-detailed nakshi work in an antique finish with a goddess centrepiece."],
      ["Kundan Ruby Bridal Choker", "Kundan bridal choker with a ruby flower centre, pearl fringe and kundan jhumkas."],
      ["Ruby Bead Rani Haar", "Long multi-strand ruby bead haar with kundan side motifs and a pendant."],
      ["Leaf Vine Lightweight Necklace", "A light kundan leaf vine necklace with a flower drop — easy to wear often."],
    ],
  },
  {
    slug: "gold-earrings",
    prefix: "PJ-GE-",
    start: 203,
    items: [
      ["Carved Dome Jhumka", "Classic dome jhumkas with carved leaf work and a ring of gold beads."],
      ["Kundan Pearl Chandbali", "Crescent chandbalis set with kundan stones and a fringe of pearls."],
      ["Ruby Halo Studs", "Oval ruby-red studs framed by a halo of sparkling stones."],
      ["Lakshmi Temple Jhumka", "Temple jhumkas with a Lakshmi motif top and a bead-trimmed dome."],
      ["Classic Gold Hoops", "Smooth, polished hoops for everyday wear."],
      ["Kundan Teardrop Danglers", "Flower studs with kundan teardrops and a single pearl drop."],
      ["Enamel Peacock Earrings", "Peacock earrings in blue and green enamel with a pearl drop."],
      ["Kundan Ear Cuff with Chain", "A kundan ear cuff joined to a stud by delicate draped chains."],
      ["Gold Flower Studs", "Textured gold flower studs with a small sparkling centre."],
      ["Kundan Tassel Jhumka", "Slim jhumkas with long gold chain tassels and bead ends."],
      ["Antique Carved Bali", "Half-moon bali hoops with deep antique carving."],
      ["Petite Daily Jhumki", "Small, light jhumkis with a stone-set flower top."],
    ],
  },
  {
    slug: "gold-rings",
    prefix: "PJ-GR-",
    start: 303,
    items: [
      ["Floral Engraved Wide Band", "A wide band with hand-engraved floral work all around."],
      ["Ruby Halo Cocktail Ring", "A large oval ruby-red stone surrounded by sparkling stones."],
      ["Emerald Flower Ring", "Green petal stones arranged into a flower with a bright centre."],
      ["Plain Polished Wedding Band", "A simple, comfortable band with a mirror finish."],
      ["Kundan Emerald Halo Ring", "Kundan petals around a green enamel ring and a clear centre stone."],
      ["Enamel Peacock Ring", "A sculpted peacock in blue enamel with green stone feathers."],
      ["Ruby Lotus Ring", "A blooming lotus of ruby-red petals on a slim gold band."],
      ["Twisted Rope Band", "A twisted rope-style band that catches the light."],
      ["Black Onyx Signet Ring", "A bold signet ring with a polished black stone."],
      ["Pearl Solitaire Ring", "A single pearl held in a gold setting with small side stones."],
      ["Lakshmi Temple Ring", "Antique temple ring with a seated Lakshmi and red stone accents."],
      ["Ruby Emerald Cluster Ring", "A dome of ruby, emerald and clear stones in a cluster."],
    ],
  },
  {
    slug: "gold-bangles",
    prefix: "PJ-GB-",
    start: 403,
    items: [
      ["Floral Carved Bangle Pair", "A pair of bangles with raised flowers and carved leaf work."],
      ["Diamond-Cut Broad Kada", "A broad kada with a sparkling diamond-cut texture."],
      ["Ruby Stone Bangle Stack", "A stack of bangles lined with rows of ruby-red stones."],
      ["Plain Polished Bangle Pair", "Smooth, classic bangles for daily wear."],
      ["Lakshmi Temple Kada", "A temple kada with a Lakshmi shrine and elephant carvings."],
      ["Twisted Rope Bangle", "A single twisted rope bangle with a bright finish."],
      ["Kundan Emerald Bangle", "Kundan stones with green enamel set all around the bangle."],
      ["Enamel Peacock Kada", "An open kada with two facing enamel peacocks."],
      ["Antique Nakshi Bangle Pair", "A pair of antique-finish bangles with detailed nakshi flowers."],
      ["Openable Screw Kada", "An openable kada with carved bead ends and a hinge clasp."],
      ["Slim Daily-Wear Bangle Set", "A set of slim, lightly textured bangles to wear together."],
      ["Floral Filigree Bangle", "A wide filigree bangle with an open flower pattern."],
    ],
  },
  {
    slug: "gold-chains",
    prefix: "PJ-GC-",
    start: 503,
    items: [
      ["Twisted Rope Chain", "A classic twisted rope chain with a rich shine."],
      ["Box Chain with Solitaire Pendant", "A fine box chain with a single sparkling solitaire pendant."],
      ["Singapore Twist Chain", "A light, twisting Singapore chain that sparkles as it moves."],
      ["Curb Link Chain", "Flat curb links in a neat, even pattern."],
      ["Figaro Link Chain", "Alternating long and short links in a figaro pattern."],
      ["Gold Ball Bead Chain", "A chain of round polished gold beads."],
      ["Om Pendant Chain", "A fine chain carrying a polished Om pendant."],
      ["Puffed Heart Pendant Chain", "A delicate chain with a rounded heart pendant."],
      ["Bold Men's Curb Chain", "A heavy, bold curb chain with a strong presence."],
      ["Sleek Snake Chain", "A smooth, flexible snake chain."],
      ["Lakshmi Coin Pendant Chain", "A bead-station chain with a Lakshmi coin pendant."],
      ["Wheat Weave Chain", "A woven wheat-style chain with a rich texture."],
    ],
  },
  {
    slug: "mangalsutra",
    prefix: "PJ-MS-",
    start: 603,
    items: [
      ["Round Nakshi Pendant Mangalsutra", "Double black bead strand with a round carved pendant."],
      ["Diamond Shape Pendant Mangalsutra", "A light strand with a small stone-set diamond-shape pendant."],
      ["Vati Tube Mangalsutra", "Traditional mangalsutra with a carved gold tube pendant."],
      ["Lakshmi Temple Mangalsutra", "Black bead strands with a Lakshmi temple pendant and bead drops."],
      ["Ruby Flower Mangalsutra", "A ruby-red petal flower pendant on double black beads."],
      ["Mangalsutra Bracelet", "A single black bead strand worn on the wrist, with a gold bead."],
      ["Heart Pendant Mangalsutra", "A modern open heart pendant filled with sparkling stones."],
      ["Kundan Teardrop Mangalsutra", "A kundan teardrop pendant with green enamel and a pearl."],
      ["Temple Arch Lakshmi Mangalsutra", "A large temple arch pendant with Lakshmi and gold drops."],
      ["Three-Strand Layered Mangalsutra", "Three layered black bead strands with gold bead stations."],
      ["Solitaire Drop Mangalsutra", "A sleek strand with a clear solitaire and teardrop pendant."],
      ["Infinity Pendant Mangalsutra", "A stone-set infinity pendant on double black beads."],
    ],
  },
  {
    slug: "silver-jewellery",
    prefix: "PJ-SJ-",
    start: 703,
    items: [
      ["Oxidised Ghungroo Choker Set", "An oxidised silver choker with ghungroo fringe and jhumkas."],
      ["Polished Silver Jhumka", "Bright silver jhumkas with a flower top and bead fringe."],
      ["Silver Coin Necklace", "A necklace of small silver coins with a coin centrepiece."],
      ["Oxidised Hasli Collar", "A rigid oxidised silver hasli with carved detailing."],
      ["Filigree Leaf Pendant", "A leaf-shaped silver pendant with filigree and bead drops."],
      ["Oxidised Silver Chandbali", "Oxidised chandbalis with a small jhumka in the centre."],
      ["Flower Nose Pin", "A small silver flower nose pin."],
      ["Flower Link Bracelet", "A silver bracelet of linked flowers."],
      ["Engraved Silver Kada", "A solid silver kada with engraved lines and bead bands."],
      ["Tribal Bead Necklace", "An oxidised tribal necklace with bead fringe and a pendant."],
      ["Flower Toe Rings (Pair)", "A pair of adjustable silver toe rings with flower tops."],
      ["Floral Silver Hair Clip", "A silver hair clip with a flower and leaves."],
    ],
  },
  {
    slug: "silver-anklets",
    prefix: "PJ-SA-",
    start: 802,
    items: [
      ["Ghungroo Cluster Payal", "Silver payal with clusters of tiny ghungroo bells."],
      ["Heavy Bridal Payal", "A broad, heavy bridal payal with coin motifs and bead fringe."],
      ["Fine Bead Chain Anklet", "A fine silver chain anklet with small beads."],
      ["Oxidised Bridal Payal", "An oxidised payal with detailed motifs and bead fringe."],
      ["Silver Bead Anklet", "An anklet of polished silver beads."],
      ["Flower Link Payal", "A payal of linked silver flowers."],
      ["Peepal Leaf Payal", "A payal with a row of peepal leaf charms."],
      ["Ghungroo Fringe Chain Payal", "A chain payal with a soft fringe of ghungroo bells."],
      ["Little Bells Kids' Payal", "A light payal with small bells, sized for children."],
      ["Peacock Motif Payal", "A payal with peacock and leaf motifs and bead drops."],
      ["Engraved Solid Kada Anklet", "A pair of solid silver kada anklets with engraving."],
      ["Minimal Daily Anklet", "A delicate, minimal chain anklet for daily wear."],
    ],
  },
  {
    slug: "silver-rings",
    prefix: "PJ-SR-",
    start: 902,
    items: [
      ["Oxidised Flower Ring", "An oxidised silver ring with a raised flower."],
      ["Polished Silver Band", "A simple, bright silver band."],
      ["Turquoise Oval Ring", "A turquoise-coloured oval stone in a rope-edged silver setting."],
      ["Adjustable Leaf Wrap Ring", "An open ring with two oxidised leaves that wrap the finger."],
      ["Men's Silver Signet Ring", "A smooth silver signet ring with a brushed top."],
      ["Oxidised Peacock Ring", "A detailed oxidised peacock ring."],
      ["Open Twin Flower Ring", "An open rope ring with a flower at each end."],
      ["Red Coral Ring", "A red coral-coloured oval stone in a beaded silver setting."],
      ["Filigree Dome Ring", "A domed silver ring with open filigree flowers."],
      ["Twisted Rope Silver Band", "A twisted rope band in oxidised silver."],
      ["Moonstone Ring", "A glowing moonstone-style oval in a silver setting."],
      ["Black Onyx Silver Ring", "A polished black stone set in silver with bead sides."],
    ],
  },
  {
    slug: "traditional-jewellery",
    prefix: "PJ-TJ-",
    start: 1003,
    items: [
      ["Filigree Crescent Necklace", "A crescent necklace with fine filigree and a fringe of gold beads."],
      ["Floral Maang Tikka", "A round floral maang tikka with a red stone and pearl drops."],
      ["Lakshmi Kamarbandh Waist Belt", "A bridal waist belt with a Lakshmi centre and bead fringe."],
      ["Pearl Chain Bridal Nath", "A bridal nose ring with a pearl chain."],
      ["Lakshmi Bajuband Armlet", "An armlet with a Lakshmi centrepiece and filigree links."],
      ["Pearl Matha Patti", "A bridal head ornament with draped pearl strands."],
      ["Jhumka with Ear Chain", "A temple jhumka with a pearl kaan chain."],
      ["Temple Coin Long Haar", "A long haar of Lakshmi coins with red stone accents."],
      ["Bridal Jada Hair Ornament", "A round bridal hair ornament with a pearl fringe."],
      ["Floral Haath Phool", "A hand ornament joining a bracelet and ring with flowers."],
      ["Ruby Antique Bridal Choker", "A broad antique choker with red stones and pearl fringe."],
      ["Lakshmi Pearl Passa", "A side head ornament with a Lakshmi motif and pearl strands."],
    ],
  },
];

export type DesignProduct = {
  code: string;
  name: string;
  categorySlug: string;
  image: string;
  description: string;
};

export const DESIGN_PRODUCTS: DesignProduct[] = DESIGN_SERIES.flatMap((s) =>
  s.items.map(([name, description], i) => ({
    code: `${s.prefix}${s.start + i}`,
    name,
    categorySlug: s.slug,
    image: img(s.slug, i + 1),
    description,
  })),
);
