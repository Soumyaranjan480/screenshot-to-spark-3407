import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { fieldClass, labelClass } from "@/components/site/fields";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set New Password – PATRA JEWELLERS" },
      { name: "description", content: "Choose a new password for the PATRA JEWELLERS owner account." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Set New Password – PATRA JEWELLERS" },
      { property: "og:description", content: "Owner password reset." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated");
    navigate({ to: "/patra-owner-rates" });
  }

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-lux">
        <form
          onSubmit={onSubmit}
          noValidate
          className="mx-auto max-w-md rounded-sm border border-border bg-ivory p-6 shadow-soft sm:p-8"
        >
          <h1 className="font-display text-4xl text-foreground">Set a New Password</h1>
          <p className="mt-2 text-sm text-muted-foreground">Open this page from the link in your email.</p>
          <div className="mt-6">
            <label htmlFor="new-password" className={labelClass}>
              New Password
            </label>
            <input id="new-password" name="password" type="password" autoComplete="new-password" className={fieldClass} />
          </div>
          <Button type="submit" variant="burgundy" size="xl" className="mt-6 w-full" disabled={busy}>
            {busy ? "Saving…" : "Save Password"}
          </Button>
        </form>
      </div>
    </section>
  );
}
