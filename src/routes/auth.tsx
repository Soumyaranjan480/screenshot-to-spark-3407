import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { fieldClass, labelClass } from "@/components/site/fields";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Owner Sign In – PATRA JEWELLERS" },
      { name: "description", content: "Sign in for the PATRA JEWELLERS owner to update daily rates." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Owner Sign In – PATRA JEWELLERS" },
      { property: "og:description", content: "Owner-only sign in for PATRA JEWELLERS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (!email) { toast.error("Please enter your email"); return; }
    if (mode !== "forgot" && password.length < 8)
      { toast.error("Password must be at least 8 characters"); return; }

    setBusy(true);
    setNotice(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (data.session) navigate({ to: "/admin" });
        else setNotice("Check your email and tap the confirmation link, then sign in here.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setNotice("If that email has an account, a reset link is on its way.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const titles: Record<Mode, string> = {
    signin: "Owner Sign In",
    signup: "Create Owner Account",
    forgot: "Reset Password",
  };

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-lux">
        <form
          onSubmit={onSubmit}
          noValidate
          className="mx-auto max-w-md rounded-sm border border-border bg-ivory p-6 shadow-soft sm:p-8"
        >
          <p className="eyebrow">Daily Rates</p>
          <h1 className="mt-2 font-display text-4xl text-foreground">{titles[mode]}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Only the shop owner can change today's gold and silver rates.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="auth-email" className={labelClass}>
                Email
              </label>
              <input id="auth-email" name="email" type="email" autoComplete="email" className={fieldClass} />
            </div>
            {mode !== "forgot" && (
              <div>
                <label htmlFor="auth-password" className={labelClass}>
                  Password
                </label>
                <input
                  id="auth-password"
                  name="password"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  className={fieldClass}
                />
              </div>
            )}
          </div>

          {notice && (
            <p role="status" className="mt-5 rounded-sm bg-cream p-3 text-sm text-foreground">
              {notice}
            </p>
          )}

          <Button type="submit" variant="burgundy" size="xl" className="mt-6 w-full" disabled={busy}>
            {busy ? "Please wait…" : titles[mode]}
          </Button>

          <div className="mt-5 flex flex-col items-center gap-2 text-sm">
            {mode !== "signin" && (
              <button type="button" className="text-burgundy underline-offset-4 hover:underline" onClick={() => setMode("signin")}>
                Back to sign in
              </button>
            )}
            {mode === "signin" && (
              <>
                <button type="button" className="text-burgundy underline-offset-4 hover:underline" onClick={() => setMode("forgot")}>
                  Forgot password?
                </button>
                <button type="button" className="text-muted-foreground underline-offset-4 hover:underline" onClick={() => setMode("signup")}>
                  First time? Create the owner account
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
