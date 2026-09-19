# Ceramic Store

This repository contains the source code, catalog data, and assets for the **Ceramic Store** (Millennium Ceramics) website — an e-commerce catalog for ceramic and sanitary products (tiles, sinks, bathtubs, faucets, shower enclosures, and related items).

## Status

See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for the current state of the project and [CHANGELOG.md](./CHANGELOG.md) for a history of notable changes.

## Repository Structure

```
/docs             Project documentation (data model, ingestion policy, supplier intake notes)
/data             Product catalog data (JSON) — source-verified records, candidates, schema
/public           Storefront pages (HTML/CSS/JS) and product image assets
/public/products  Product images
```

## Data integrity policy

Every catalog record must preserve its source catalog ID, source page reference, and a verified supplier display image before it is treated as customer-facing. Prices are only published after store confirmation, even when a source price is visible on the supplier page. See [docs/CATALOG_INGESTION.md](./docs/CATALOG_INGESTION.md) for the full ingestion policy.

## Branching

The `main` branch always represents a stable, working version of the project. Feature work happens on separate branches and is merged into `main` only when stable.
