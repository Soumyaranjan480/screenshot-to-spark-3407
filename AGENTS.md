<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Business details (phone, address, owner, WhatsApp links) live only in `src/lib/business.ts`; import from there so contact info never drifts.
- Demo catalog (categories, products, images) lives in `src/lib/catalog.ts` as static data; no backend until real inventory management is needed.
- Site-wide chrome (header, footer, floating WhatsApp, toaster) is mounted in `src/routes/__root.tsx`; pages render only their own sections.
- The contact form hands off to WhatsApp with a prefilled message instead of storing submissions, so no enquiry data is kept on a server.
- Home page showcase (auto-sliding hero + moving jewellery strip) lives in `src/components/site/HomeShowcase.tsx`; its motion respects reduced-motion and pauses on hover/focus so it stays accessible.
- Daily gold/silver rates live in the `metal_rates` table (public read, update only for `admin` role via `has_role`); the site reads it from the browser client so it works on any host. The owner gets `admin` automatically by email via an `auth.users` trigger.
- Public rates and the owner editor share the filtering in `src/lib/rates.ts`; change stored units together with their amounts so existing rates never acquire a misleading basis.
- Owner rate editing is at the unlinked `/patra-owner-rates` page under the `_authenticated` gate; sign-in is email/password at the unlinked `/patra-owner-login` (kept off nav, footer and search engines so customers never see it) (no Google/Lovable OAuth because the site is also deployed outside Lovable hosting, where those redirects don't work).
