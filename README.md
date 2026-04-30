# ESP32 & IoT Devices (Template 6)

Next.js 16 storefront for **[PLAN-06-ESP32-IOT.md](../PLAN-06-ESP32-IOT.md)**. Forked from the current storefront stack with themes **Circuit Lab** (default), **Smart Home**, and **Industrial Edge**. Dev server uses port **3007** so it does not clash with other local storefronts. Default company slug: **`esp32-iot`**.

## Quick start

```bash
cd esp32-iot
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL and NEXT_PUBLIC_COMPANY_SLUG as needed
npm run dev
```

Open [http://localhost:3007](http://localhost:3007).

## Backend

Same django-crm API as other templates. Provision a company (slug `esp32-iot` or your choice) via `/admin/setup`. First-party catalog products use blank `supplier_slug`; checkout uses `isCourierGuyCartItem` - see PLAN-06 pitfall section.

## Themes

`data-theme`: `circuit-lab` (default), `smart-home`, `industrial-edge`. Cookie / localStorage key: `site_theme`.

## Scripts

- `npm run dev` - dev server (port 3007)
- `npm run build` - production build
- `npm test` - Vitest
