# Master catalog data model

`data/master-catalog-manifest.json` is the single entry point for inventory consumers.

The catalog intentionally retains records in supplier-specific datasets rather than copying them into one undifferentiated file. This prevents accidental loss of a product's supplier, catalogue, page or display-asset provenance.

Every verified product record contains the same core fields: supplier group, brand, source catalogue, collection, SKU/model code, category, dimensions, finish/design, image-page reference and publication status. Prices and availability stay `null` / `not_confirmed` until the store verifies them.

The manifest distinguishes between inventory records and products that have a direct customer display asset. The Chinese supplier dataset currently preserves SKU provenance through source-page references; the bathroom verified dataset has direct, clean individual display-image paths. The distinction is intentional and is checked before any product is promoted.

`data/bathroom-product-candidates.json` is a review queue, not a storefront dataset. A candidate cannot be published unless its source page, product identity and display asset are visually confirmed.
