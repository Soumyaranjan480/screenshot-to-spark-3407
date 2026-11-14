CREATE TABLE public.designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  category_slug text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_path text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.designs TO anon, authenticated;
GRANT INSERT, DELETE ON public.designs TO authenticated;
GRANT ALL ON public.designs TO service_role;
ALTER TABLE public.designs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view designs" ON public.designs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Owner can add designs" ON public.designs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner can delete designs" ON public.designs FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.hidden_designs (
  code text PRIMARY KEY,
  hidden_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hidden_designs TO anon, authenticated;
GRANT INSERT, DELETE ON public.hidden_designs TO authenticated;
GRANT ALL ON public.hidden_designs TO service_role;
ALTER TABLE public.hidden_designs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view removed designs" ON public.hidden_designs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Owner can remove sample designs" ON public.hidden_designs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner can restore sample designs" ON public.hidden_designs FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view jewellery photos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'jewellery-photos');
CREATE POLICY "Owner can upload jewellery photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'jewellery-photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner can delete jewellery photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'jewellery-photos' AND public.has_role(auth.uid(), 'admin'));