import { defaultEnquiry, whatsappHref } from "@/lib/business";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref(defaultEnquiry)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with PATRA JEWELLERS on WhatsApp"
      className="fixed bottom-6 right-6 z-30 hidden h-14 md:grid w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
