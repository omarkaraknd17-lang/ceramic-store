# Catalog ingestion and display-image policy

## Source inventory

`data/source-catalogs.json` is the receipt ledger for every PDF supplied to this project. Each record preserves the supplier group, stated brand, original filename, page count, SHA-256 fingerprint and ingestion state. It is intentionally separate from `data/master-products.json`.

The current batch is one Chinese supplier group. It is not merged with TAU, SEBACH, MITRANI or any future supplier. The prior conversation refers to those catalogs, but their PDF attachments are not available in this workspace; they must be reattached before product records can be extracted. They must receive their own `supplier_group` values when ingested.

## Product record rules

- `source_catalog_id` and `image_page_reference` are mandatory for every extracted product.
- A blank price or availability is not a zero price or in-stock claim. It means confirmation is pending.
- Do not add a product to a public storefront until its price, unit of sale and availability have been checked.
- Do not use a marketing name inferred from an image. Store `null` and flag the page for OCR or human review instead.

## Chinese-text display-image workflow

The goal is a clean product-display derivative, never a new source identity.

1. Render the referenced catalog page at high resolution and retain the untouched source page outside `public/`.
2. Crop only the tile/product area. Prefer a source swatch or isolated slab image; do not crop out a logo or label if it is part of the product itself.
3. Remove Chinese overlay text only when it is a separate editorial overlay. Use inpainting or a clean crop, and inspect the tile pattern, edges, grout lines and colors against the original.
4. Save the derivative with the product ID, for example `public/products/CN-EAGLE-WHALE-MAX-2024_W2YLB105E.webp`.
5. Add derivative metadata: `source_catalog_id`, source page, original filename, `edit_type: text_overlay_removed`, reviewer and review date. Keep that metadata alongside the derivative, not only in image pixels.
6. Human-review every derivative before publishing. Reject it if text removal changes a vein, pattern repeat, colour, edge or product marking.

Brand, supplier group and source catalog remain in the underlying product record even where display text is removed.

## Low-cost storefront direction

The first storefront should be a simple catalog: category browsing, filters, product detail, price and an enquiry / order path. Keep content in the JSON catalog and static product assets first; add checkout only after product prices, stock rules, delivery zones and payment provider are decided. This avoids a recurring platform cost before the catalog is reliable.
