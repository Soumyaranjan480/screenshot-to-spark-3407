// Single source of truth for PATRA JEWELLERS business details.
export const BUSINESS = {
  name: "PATRA JEWELLERS",
  owner: "VIJAY KUMAR PATRA",
  addressLines: ["Mangalpur, Jajpur", "Odisha, India – 755011"],
  addressFull: "Mangalpur, Jajpur, Odisha, India – 755011",
  phoneDisplay: "+91 98535 27161",
  phoneE164: "+919853527161",
  whatsappNumber: "919853527161",
} as const;

export const telHref = `tel:${BUSINESS.phoneE164}`;

export const mapsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${BUSINESS.name}, ${BUSINESS.addressFull}`,
)}`;

export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  "Mangalpur, Jajpur, Odisha 755011",
)}&output=embed`;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${BUSINESS.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultEnquiry =
  "Hello PATRA JEWELLERS, I would like to know more about your jewellery collections.";

export function productEnquiry(name: string, code: string) {
  return `Hello PATRA JEWELLERS, I am interested in "${name}" (Code: ${code}). Please share more details.`;
}

export function contactFormMessage(input: { name: string; phone: string; message: string }) {
  return [
    "Hello PATRA JEWELLERS, I have an enquiry.",
    "",
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    "",
    input.message,
  ].join("\n");
}
