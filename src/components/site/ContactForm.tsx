import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactFormMessage, whatsappHref } from "@/lib/business";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{8,15}$/, "Please enter a valid phone number"),
  message: z
    .string()
    .trim()
    .min(5, "Please tell us a little about your enquiry")
    .max(1000, "Message is too long"),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        next[key] ??= issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    window.open(whatsappHref(contactFormMessage(parsed.data)), "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp", {
      description: "Your enquiry is ready to send to PATRA JEWELLERS.",
    });
    form.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-sm border border-border bg-ivory p-6 shadow-soft sm:p-8"
    >
      <h3 className="font-display text-3xl text-foreground">Send an Enquiry</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Share your details and we will continue the conversation on WhatsApp.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="cf-name" className="text-xs font-medium uppercase tracking-[0.16em]">
            Your Name
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
          />
          {errors.name && (
            <p id="cf-name-err" className="mt-1.5 text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-phone" className="text-xs font-medium uppercase tracking-[0.16em]">
            Phone Number
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91"
            className={fieldClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "cf-phone-err" : undefined}
          />
          {errors.phone && (
            <p id="cf-phone-err" className="mt-1.5 text-sm text-destructive">
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-message" className="text-xs font-medium uppercase tracking-[0.16em]">
            Your Enquiry
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            placeholder="I am looking for a gold necklace set for a wedding…"
            className={`${fieldClass} resize-y`}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "cf-message-err" : undefined}
          />
          {errors.message && (
            <p id="cf-message-err" className="mt-1.5 text-sm text-destructive">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" variant="burgundy" size="xl" className="mt-7 w-full">
        <Send /> Send Enquiry
      </Button>
    </form>
  );
}
