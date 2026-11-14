import { useMemo } from "react";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PRODUCTS, type Product } from "./catalog";

/** Private storage bucket holding the owner's jewellery photos. */
export const DESIGN_BUCKET = "jewellery-photos";
/** Signed photo links stay valid for a week; they are refreshed on every visit. */
const PHOTO_LINK_SECONDS = 60 * 60 * 24 * 7;

export type UploadedDesign = Product & {
  id: string;
  imagePath: string;
  createdAt: string;
  uploaded: true;
};

export type RemoteCatalog = {
  /** Owner uploads, newest first. */
  uploaded: UploadedDesign[];
  /** Codes of built-in pieces the owner removed from the website. */
  hidden: string[];
};

/** Built-in pieces minus the removed ones, with the owner's uploads placed first. */
export function mergeCatalog(base: Product[], remote: RemoteCatalog): Product[] {
  const hidden = new Set(remote.hidden.map((c) => c.toLowerCase()));
  return [...remote.uploaded, ...base.filter((p) => !hidden.has(p.code.toLowerCase()))];
}

/** Next free code for a jewellery type, e.g. PJ-GN-115, following that type's existing codes. */
export function nextDesignCode(categorySlug: string, all: Product[]): string {
  const sample = all.find((p) => p.categorySlug === categorySlug);
  const prefix = sample ? sample.code.replace(/\d+$/, "") : "PJ-NEW-";
  let max = 0;
  for (const p of all) {
    if (!p.code.startsWith(prefix)) continue;
    const n = Number(p.code.slice(prefix.length));
    if (Number.isFinite(n) && n > max) max = n;
  }
  return `${prefix}${max + 1}`;
}

export const liveCatalogQueryOptions = queryOptions({
  queryKey: ["live-catalog"],
  staleTime: 60_000,
  queryFn: async (): Promise<RemoteCatalog> => {
    const [designs, hidden] = await Promise.all([
      supabase
        .from("designs")
        .select("id, code, name, category_slug, description, image_path, created_at")
        .order("created_at", { ascending: false }),
      supabase.from("hidden_designs").select("code"),
    ]);
    if (designs.error) throw designs.error;
    if (hidden.error) throw hidden.error;

    const paths = designs.data.map((d) => d.image_path);
    const urls = new Map<string, string>();
    if (paths.length > 0) {
      const { data, error } = await supabase.storage
        .from(DESIGN_BUCKET)
        .createSignedUrls(paths, PHOTO_LINK_SECONDS);
      if (error) throw error;
      for (const item of data) if (item.path && item.signedUrl) urls.set(item.path, item.signedUrl);
    }

    return {
      hidden: hidden.data.map((h) => h.code),
      uploaded: designs.data.map((d) => ({
        id: d.id,
        code: d.code,
        name: d.name,
        categorySlug: d.category_slug,
        description: d.description || "A new design at our showroom. Ask us for details.",
        image: urls.get(d.image_path) ?? "",
        imagePath: d.image_path,
        createdAt: d.created_at,
        uploaded: true,
      })),
    };
  },
});

/**
 * Every piece customers should see. Shows the built-in pieces straight away and
 * swaps in the owner's changes as soon as they load.
 */
export function useCatalogProducts() {
  const query = useQuery(liveCatalogQueryOptions);
  const products = useMemo(
    () => (query.data ? mergeCatalog(PRODUCTS, query.data) : PRODUCTS),
    [query.data],
  );
  return { products, remote: query.data, ready: query.isSuccess || query.isError };
}

/** Shrinks a phone photo to at most `max` px on its longest side, as a JPEG. */
export async function shrinkPhoto(file: File, max = 1600): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    return blob ?? file;
  } catch {
    // Formats the browser can't read (some HEIC photos) are uploaded as they are.
    return file;
  }
}
