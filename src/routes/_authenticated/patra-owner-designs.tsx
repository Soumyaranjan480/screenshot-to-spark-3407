import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ImagePlus, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { fieldClass, labelClass } from "@/components/site/fields";
import { OwnerShell } from "@/components/site/OwnerShell";
import { CATEGORIES, PRODUCTS, getCategory, productsInCategory, type Product } from "@/lib/catalog";
import {
  DESIGN_BUCKET, liveCatalogQueryOptions, nextDesignCode, shrinkPhoto, useCatalogProducts,
  type UploadedDesign,
} from "@/lib/live-catalog";

export const Route = createFileRoute("/_authenticated/patra-owner-designs")({
  head: () => ({
    meta: [
      { title: "Manage Designs – PATRA JEWELLERS" },
      { name: "description", content: "Owner page to upload and remove jewellery designs." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Manage Designs – PATRA JEWELLERS" },
      { property: "og:description", content: "Owner-only design manager." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DesignsPage,
});

function DesignsPage() {
  const { user } = Route.useRouteContext();
  const [category, setCategory] = useState(CATEGORIES[0]!.slug);
  return (
    <OwnerShell user={user} title="Designs" wide>
      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <UploadForm category={category} onCategory={setCategory} />
        <Manager category={category} onCategory={setCategory} />
      </div>
    </OwnerShell>
  );
}

function useRefresh() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: liveCatalogQueryOptions.queryKey });
}

function UploadForm({ category, onCategory }: { category: string; onCategory: (s: string) => void }) {
  const refresh = useRefresh();
  const { remote } = useCatalogProducts();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) { toast.error("Please choose a photo"); return; }
    if (!name.trim()) { toast.error("Please give the design a name"); return; }
    setBusy(true);
    try {
      const blob = await shrinkPhoto(file);
      const ext = blob.type === "image/jpeg" ? "jpg" : (file.name.split(".").pop() || "jpg");
      const path = `${category}/${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from(DESIGN_BUCKET).upload(path, blob, { contentType: blob.type || "image/jpeg" });
      if (up.error) throw up.error;
      const all: Product[] = [...PRODUCTS, ...(remote?.uploaded ?? [])];
      let code = nextDesignCode(category, all);
      let saved = false;
      for (let i = 0; i < 5 && !saved; i++) {
        const { error } = await supabase.from("designs").insert({
          code, name: name.trim().slice(0, 80), category_slug: category,
          description: description.trim().slice(0, 500), image_path: path,
        });
        if (!error) saved = true;
        else if (error.code === "23505") code = code.replace(/\d+$/, (n) => String(Number(n) + 1));
        else { await supabase.storage.from(DESIGN_BUCKET).remove([path]); throw error; }
      }
      if (!saved) throw new Error("code");
      await refresh();
      setFile(null); setName(""); setDescription("");
      toast.success(`Uploaded as ${code} — it's now on the website`);
    } catch {
      toast.error("Couldn't upload. Please check your internet and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="h-fit rounded-sm border border-border bg-ivory p-5 shadow-soft sm:p-6">
      <h2 className="font-display text-2xl">Add a New Design</h2>
      <label className="mt-4 flex aspect-[4/3] cursor-pointer sm:aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-sm border-2 border-dashed border-gold/60 bg-cream text-center text-sm text-muted-foreground">
        {preview ? (
          <img src={preview} alt="Selected photo" className="h-full w-full object-cover" />
        ) : (
          <><ImagePlus className="mb-2 h-8 w-8 text-gold-deep" />Tap to take or choose a photo</>
        )}
        <input type="file" accept="image/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </label>
      <div className="mt-4">
        <label htmlFor="d-cat" className={labelClass}>Jewellery type</label>
        <select id="d-cat" value={category} onChange={(e) => onCategory(e.target.value)} className={fieldClass}>
          {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="d-name" className={labelClass}>Design name</label>
        <input id="d-name" value={name} maxLength={80} onChange={(e) => setName(e.target.value)} placeholder="e.g. Bridal Peacock Choker" className={fieldClass} />
      </div>
      <div className="mt-4">
        <label htmlFor="d-desc" className={labelClass}>Details (optional)</label>
        <textarea id="d-desc" value={description} maxLength={500} rows={3} onChange={(e) => setDescription(e.target.value)} className={fieldClass} />
      </div>
      <Button type="submit" variant="burgundy" size="xl" className="mt-6 w-full" disabled={busy}>
        {busy ? "Uploading…" : "Upload Design"}
      </Button>
    </form>
  );
}

function Manager({ category, onCategory }: { category: string; onCategory: (s: string) => void }) {
  const refresh = useRefresh();
  const { products, remote } = useCatalogProducts();
  const list = productsInCategory(category, products);
  const removed = useMemo(() => {
    const h = new Set((remote?.hidden ?? []).map((c) => c.toLowerCase()));
    return PRODUCTS.filter((p) => h.has(p.code.toLowerCase()));
  }, [remote]);

  async function remove(p: Product) {
    if (p.uploaded) {
      const d = p as UploadedDesign;
      const { error } = await supabase.from("designs").delete().eq("id", d.id);
      if (error) { toast.error("Couldn't delete. Please try again."); return; }
      await supabase.storage.from(DESIGN_BUCKET).remove([d.imagePath]);
    } else {
      const { error } = await supabase.from("hidden_designs").insert({ code: p.code });
      if (error) { toast.error("Couldn't delete. Please try again."); return; }
    }
    await refresh();
    toast.success(`${p.name} removed from the website`);
  }

  async function restore(p: Product) {
    const { error } = await supabase.from("hidden_designs").delete().eq("code", p.code);
    if (error) { toast.error("Couldn't restore. Please try again."); return; }
    await refresh();
    toast.success(`${p.name} is back on the website`);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <label htmlFor="m-cat" className={labelClass}>Showing</label>
          <select id="m-cat" value={category} onChange={(e) => onCategory(e.target.value)} className={fieldClass}>
            {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <Button variant="outline-gold" size="touch" asChild>
          <Link to="/collections/$category" params={{ category }}>View on website</Link>
        </Button>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{list.length} designs on the website</p>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => (
          <li key={p.code} className="flex flex-col overflow-hidden rounded-sm border border-border bg-card">
            <img src={p.image} alt={p.name} loading="lazy" className="aspect-square w-full object-cover" />
            <div className="flex flex-1 flex-col p-2.5">
              <p className="text-[0.62rem] uppercase tracking-[0.14em] text-gold-deep">{p.uploaded ? "Your photo" : "Sample"} · {p.code}</p>
              <p className="mt-1 line-clamp-2 text-sm text-foreground">{p.name}</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-auto w-full text-destructive">
                    <Trash2 /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete {p.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Customers will no longer see this design on the website.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep it</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove(p)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </li>
        ))}
      </ul>

      {removed.length > 0 && (
        <details className="mt-8 rounded-sm border border-border bg-ivory p-4">
          <summary className="cursor-pointer text-sm font-medium">Deleted sample designs ({removed.length})</summary>
          <ul className="mt-3 divide-y divide-border">
            {removed.map((p) => (
              <li key={p.code} className="flex items-center gap-3 py-2">
                <img src={p.image} alt="" className="h-12 w-12 rounded-sm object-cover" />
                <span className="min-w-0 flex-1 truncate text-sm">{p.name} <span className="text-muted-foreground">· {getCategory(p.categorySlug)?.name}</span></span>
                <Button variant="outline" size="sm" onClick={() => restore(p)}><RotateCcw /> Restore</Button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
