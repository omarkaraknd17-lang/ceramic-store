# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [0.5.0] - 2026-09-19

### Added

- Added a root-level `index.html` that redirects to `public/home.html` using a relative path, so the site works correctly when hosted at a domain root or under a GitHub Pages project subpath.
- Wired `data/eagle-tile-products.json` (147 customer-facing SKUs) and `data/tau-products.json` (52 SKUs) into the previously data-only `public/index.html` / `public/app.js` tile catalog, alongside the existing 104 `data/master-products.json` records (303 products total); records marked `source_lifestyle_image_only` are excluded per the manifest's publication rule.
- Linked two previously-orphaned, fully-built catalog pages into the site navigation so they are actually reachable by visitors: `public/bathroom-catalog.html` (384 verified SEBACH/Mitrani records) from `public/bathroom.html`, and `public/index.html` (the tile catalog above) from the home page's product mega-menu.

### Fixed

- Removed a leftover `location.replace("home.html")` redirect in `public/index.html` that immediately bounced visitors away before the page could render, making the tile catalog unreachable even when linked.
- Added graceful broken-image handling (a labeled placeholder instead of a broken-image icon) across every storefront page, since most of the pre-existing legacy product records (e.g. 356 of 384 bathroom records, all 851 embedded `millennium-design.html` catalog photos, and site logo/hero images) reference image files that are not present in this repository — a known, previously-documented gap. This does not restore the missing images; it prevents them from looking broken until the original supplier image archive is re-supplied.
- Fixed a bug introduced while adding the fallback above: the placeholder image's data URI contained unescaped single quotes, which broke out of an inline `onerror="...src='...'"` HTML attribute in `public/bathroom-catalog.js` and threw a `SyntaxError` on every one of the 356 missing-image product cards. Fixed by percent-encoding the quotes.
- Verified with a headless-browser pass across all 8 storefront pages (root redirect, home, bathroom, bathroom catalog, tile catalog, millennium design, cabinets, showers) that every page loads, renders its real product/record count, and throws no JavaScript errors beyond the expected (and now gracefully handled) missing-image 404s.

### Known risk (not fixed, flagged for follow-up)

- `public/millennium-design.html` (the primary "קטלוג" nav destination, 851 embedded records) loads React/ReactDOM at runtime from `unpkg.com` with no bundled fallback; if that CDN is ever unreachable for a visitor, this page will fail to render. Not reproducible as a code bug from this sandbox (its own network policy blocks `unpkg.com`), but worth a real-world check once the site is live.

## [0.4.1] - 2026-09-19

### Added

- Ingested the Eagle Ceramics Travertine Collection (`CN-EAGLE-TRAVERTINE`, deduplicated by SHA-256 against all previously-tracked catalogs) into `data/eagle-tile-products.json`: 8 individually-verified SKUs (JF-01, JFD-01, JF-02, JFD-02, JG-101, JGD-101, JG-102, JGD-102) covering white and yellow travertine-look porcelain slabs, with and without holes, in Polished and Soft Light finishes, each with a source-page display crop and provenance to the product-matrix summary page.
- Re-cropped all 8 Travertine display images at doubled source resolution (400dpi, up from 200dpi) for sharper catalogue imagery; each crop was visually checked and is free of any supplier brand mark.
- Updated `data/master-catalog-manifest.json` aggregate counts to reflect the addition (1142 total catalog inventory records, 687 verified customer-facing records, 43 tracked supplier catalog sources).

## [0.4.0] - 2026-09-19

### Added

- Registered 28 newly-supplied supplier PDF catalogs in the source ledger (`data/source-catalogs.json`) after SHA-256 deduplication against all previously-tracked catalogs; 7 of the uploaded files were confirmed byte-identical re-uploads of already-tracked sources and were skipped.
- Ingested and fully SKU-extracted 10 Eagle Ceramics / ECOEAGLE catalogs into a new `data/eagle-tile-products.json` dataset (139 individually verified SKUs): Solar Stone, Pure Colors, Refined Crystal II, Tanggula Stone II, Snow White, the 2023 Chao Xian Shi (超现石) and Plain Luxury Micro Cement (素奢·微水泥) new-product decks, the 花样年华 decorative pattern series, and the ECOEAGLE SPC flooring and wallboard catalogs (non-ceramic decor lines from the same Eagle Brand Group).
- Registered 13 further single-collection tile spec sheets (HOBART, NERO MARGIUA, DUSTIN, ARIK, TREVI, TERRAZZO, PIETRA, MOON, BARSOOM, WINS, PORTLAND, LARA, CREST) as collection-level placeholder entries pending individual SKU extraction; their brand could not be confirmed from the reviewed pages so it is left unset rather than assumed.
- Ingested and fully SKU-extracted TAU Cerámica (Spain) into a new `data/tau-products.json` dataset (52 SKUs): the EVIAN WALL and BALISTONE collections, the LUXOR metal-mosaic range, and the EVOLVE 2026 new collection (CAMPASPERO, CAMPASPERO WALL, LITHOS, LITHOS WALL and CASTELLO series). This resolves the project's earlier "TAU PDFs not available" gap.
- Added `data/eagle-tile-products.json` and `data/tau-products.json` as new supplier-separated datasets in `data/master-catalog-manifest.json`, keeping Chinese and Spanish supplier groups distinct per the project's source-separation rule.

## [0.3.5] - 2026-09-19

### Added

- Re-ingested the SPOT July 2026 PDF (`spot072026.pdf`, byte-identical to the previously catalogued source) and cross-checked its full text layer against every existing SKU to find gaps: added 20 previously-missing SKUs across 9 products, each with a source-page display crop and source-listed reference price — new MAXIMAL square floor-drain sizes (111100, 111150), the missing bronze PVD finish for the MAX Stick Short faucet (735571), a new XO wall-system universal body (710300), a new XO 16 cm spout + rosette finish set (711604–711607), the missing bronze finish for the Rocco wall-system body (710101), two entirely new Rocco wall-system spout-length sets at 16 cm and 20 cm (710160–710164, 710200–710204), the missing matte-black Rocco oval countertop basin (134101MB), and the new LAPINO compact vanity-with-basin (122260L).
- Re-ingested the SEBACH Shower Enclosures 2025 PDF (byte-identical to the previously catalogued source) and visually reviewed every page not yet covered: added 9 previously-missing shower-enclosure and bathtub-screen models (ROTEM, KD, KDD, HLP, DLP, YANIV, LIRAZ, DAN, NOAM), each with a clean supplier-page display crop, source-stated sizes and a source-listed reference price.
- Initial repository scaffold (README, .gitignore, PROJECT_STATUS, CHANGELOG, folder layout) and this project's full existing catalog/storefront codebase were brought into the `ceramic-store` git repository for the first time.

## [0.3.4] - 2026-09-18

### Changed

- Added two source-verified Rocco by SEBACH T1 Tornado wall-hung toilets with source-preserving display crops.
- Added four source-verified SEBACH toilet-seat variants with source-preserving display crops.
- Added six source-verified Rocco by SEBACH SELECT water-outlet and shut-off-handle variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added six source-verified Rocco by SEBACH JET toilet-spray variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added four source-verified MINIMAL three-way shower-package finish variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added eight source-verified MINIMAL multi-part shower-package variants, retaining code-to-finish provenance and unaltered source-photo crops.
- Added six source-verified MAX five-piece shower-package variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added six source-verified Rocco by SEBACH MINIMAL four-way concealed-shower trim variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added six source-verified Rocco by SEBACH MINIMAL concealed-shower trim variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added six source-verified Rocco by SEBACH STICK slim tall basin-faucet variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added five source-verified Rocco by SEBACH RAIN medium basin-faucet variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added eight source-verified MAX XO concealed-shower trim variants, retaining code-to-finish provenance and unaltered source-photo crops.
- Added five source-verified Rocco by SEBACH RAIN tall basin-faucet variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added five source-verified MAX short gooseneck basin-faucet variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added five source-verified Rocco by SEBACH STICK tall basin-faucet variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added six source-verified Rocco by SEBACH EXCELLENT cold-water basin-faucet variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added six source-verified Rocco by SEBACH TOP tall cold-water basin-faucet variants, retaining code-to-finish provenance and an unaltered source-photo crop.
- Added source-verified Rocco by SEBACH NAIA countertop basin 134401 with source-stated dimensions and an unaltered individual supplier-photo crop.
- Added six source-verified Rocco by SEBACH ceramic basin-plug finishes and a Hebrew `אביזרי כיור` catalogue filter.
- Added five source-verified Mitrani by SEBACH DIAMOND integral countertop-basin widths with codes, dimensions and an unaltered source-photo crop.
- Added ten source-verified SPOT round brushed-metal-frame mirror variants with distinct supplier codes and source-stated finishes.
- Added five additional source-verified SPOT LED bathroom mirrors (LUX and capsule forms) with original page-photo display crops and retained provenance.
- Added five source-verified SPOT LED bathroom mirrors and a Hebrew `מראות` catalogue filter. Their customer images are unaltered in-browser crops of the corresponding individual product photographs on the supplier page.
- Added source-page crop presentation support to the verified bathroom catalogue. This is restricted to an unaltered individual supplier-product view with retained source provenance.
- Added a dedicated Hebrew kitchen-sink filter to the unified verified bathroom catalogue; verified SPOT products remain labeled with their SEBACH/Rocco source provenance.
- Added the visually verified SEBACH Bath Design KODKOD vanity to the customer-facing catalogue, preserving its source page, supplier identity and image reference.
- Added the visually verified SEBACH Bath Design ROYAL vanity to the customer-facing catalogue, preserving its source page, supplier identity and image reference.
- Added the visually verified SEBACH Bath Design SAMUEL vanity to the customer-facing catalogue, preserving its source page, supplier identity and image reference.
- Added the visually verified SEBACH Bath Design JESSICA and NATALIE vanities to the customer-facing catalogue with retained source page and supplier references.
- Ensured the verified bathroom catalogue refreshes its source-preserving product data after catalogue updates.
- Added the visually verified SEBACH Bath Design ZOHAR DOUBLE vanity with its clean product image and source-stated width range.
- Added five visually verified Mitrani MEITAL shower-enclosure models with clean supplier imagery and model-specific customer enquiries.
- Added a second reviewed batch of five Mitrani MEITAL shower-enclosure models with clean supplier imagery and retained source pages.
- Localized the customer-facing names of the original Mitrani shower models to Hebrew without changing their supplier model codes or provenance.
- Added a third reviewed batch of five Mitrani shower-enclosure models, each with a clean supplier image and model-specific customer enquiry link.
- Added the reviewed Mitrani MEN, H01 and H20 shower models with clean product imagery and retained source pages.
- Added five more visually reviewed Mitrani shower models with clean product imagery and retained source pages.
- Added visually reviewed Mitrani HA47F and P shower models with clean source imagery and retained source pages.
- Added eight visually reviewed Mitrani shower and bath-screen models with clean source imagery and retained source pages.
- Added reviewed Mitrani 7006D and MSN models with clean source imagery and retained source pages.
- Added seven visually reviewed SEBACH Bath Design vanity models with clean source imagery, source-stated dimensions and retained source pages.
- Added six visually reviewed SEBACH Bath Design vanity models with clean source imagery, source-stated dimensions and retained source pages.
- Added ten visually reviewed SEBACH Bath Design vanity models with clean source imagery, source-stated dimensions and retained source pages.
- Added eight visually reviewed SEBACH Bath Design vanity models with clean source imagery, source-stated dimensions and retained source pages.
- Added five visually reviewed SEBACH Bath Design vanity models with clean source imagery, source-stated dimensions and retained source pages.
- Added the visually reviewed SPOT SAVANNAH shower system with retained source image and provenance.
- Added six individually coded MAXIMAL linear-drain models from the verified SPOT source page.
- Added three individually coded CAPSULE integral-basin models from the verified SPOT source page.
- Added two verified SPOT kitchen sinks and three verified toilet models, including a Hebrew toilet category filter.
- Added six further verified SPOT toilet models with direct supplier imagery and retained provenance.
- Added a verified SPOT SAAR bath screen and five individually coded LINE acrylic-bathtub sizes with a dedicated Hebrew bathtub filter; shared collection imagery is explicitly noted in their source-preserving records.
- Added twelve verified SPOT DECORATIVE DRAIN and MASTER DRAIN floor-drain SKUs with direct supplier imagery and explicit finish-confirmation guidance.
- Added verified SPOT JAGUAR and SAVANNAH shower-system SKUs with source-preserving imagery and finish-confirmation guidance for non-depicted options.
- Added verified SPOT STICK and RAIN basin faucets plus a Hebrew faucet filter in the bathroom catalogue.
- Added nine additional verified STICK and RAIN faucet SKUs, retaining original code-level provenance while deferring finish confirmation to the store.
- Added three verified SPOT wall-basin faucet SKUs with direct collection imagery and source-page provenance.
- Added verified SPOT MAGIC ACTIVE T1 and T3 toilets with direct supplier imagery and retained page provenance.
- Added three verified SPOT ADVA and HOFIT countertop-basin variants with source-stated dimensions and direct supplier imagery.
- Added verified SPOT HEN, GOLAN and LOOP shower models with direct supplier imagery and retained source provenance.
- Added verified SEBACH Bath Design DA VINCI and VISTA vanities with direct supplier imagery and source-stated sizes.
- Corrected the VISTA supplier image after source-page review and added the distinct SEBACH Bath Design VIDA vanity.
- Added another reviewed five-model Mitrani shower batch with clean product imagery and retained source pages.
- Added five additional reviewed Mitrani shower models with clean product imagery and retained source pages.
- Added reviewed Mitrani HN, L and PL shower models while retaining an explicit unconfirmed collection label where the source did not establish one.
- Added five reviewed Mitrani shower models from clean supplier images while retaining unconfirmed collection metadata rather than inferring it.
- Added four reviewed Mitrani shower models from clean supplier images and retained source-page model-code ambiguities in the relevant product notes.
- Refined customer-facing source labels so internal unconfirmed collection markers are not displayed to shoppers.
- Added a verified SPOT MAXIMAL tileable floor drain and a Hebrew floor-drain catalog filter.
- Added a verified SPOT CAPSULE integral bathroom basin and a Hebrew bathroom-sink catalog filter.
- Added another five visually reviewed Mitrani shower models with clean product imagery and retained source pages.
- Added five more visually reviewed Mitrani shower models with clean product imagery and retained source pages.

## [0.3.2] - 2026-09-17

### Added

- New Hebrew RTL public home page based on the approved visual direction: luxury bathroom hero, category grid, service benefits and WhatsApp contact call-to-action

### Changed

- Root URL now opens the home page; the existing interactive catalogue remains available through its dedicated catalogue links

## [0.3.3] - 2026-09-17

### Added

- Source inventory entries for four newly supplied bathroom catalogs: SEBACH Bath Design 2023, Mitrani Luxury Shower Design 2024, SEBACH/Mitrani SPOT July 2026, and SEBACH Shower Enclosures 2025
- Documented a separate, source-preserving extraction plan for these bathroom supplier groups

### Changed

- Refined the home-page navigation and image-led category layout using the approved tile-store reference as visual inspiration only
- Linked the catalogue brand mark and store name back to the home page
- Routed the bathroom category to a dedicated SEBACH/Mitrani bathroom landing page with source-page previews and direct quote contacts
- Added a source-preserving 555-page intake index for the newly supplied bathroom PDFs
- Generated 442 non-publishable supplier-model candidates for visual review and product-card extraction
- Rendered and source-linked all 555 pages from the four new bathroom catalogs for clean image and model extraction
- Extracted 769 clean embedded supplier-image candidates and indexed their source catalog and page references
- Added seven visually verified Mitrani MEITAL shower-enclosure records with clean supplier images and source-page references
- Added a Hebrew customer-facing shower-model page for those verified records

## [0.3.1] - 2026-09-17

### Added

- Local quote-request list with quantity entry, customer details and a copy-ready Hebrew request message
- Direct WhatsApp delivery for quote requests to the configured store number
- Millennium Ceramics branding, supplied MP logo, store address and blue visual identity
- Luxury bathroom landing-page hero, four direct category paths and store contact strip
- Imported the user-provided Millennium Ceramics storefront source, catalogue-photo index and 1,010 supporting image assets for staged verification
- Excluded multi-model catalogue page scans with captions from customer-facing product cards while preserving their source records
- Refined the catalogue controls and corrected the visible storefront logo
- Replaced the crowded hero image wall with a single luxury bathroom hero image and simplified header behavior
- Home and contact sections, plus direct product-to-request actions

### Changed

- Expanded the storefront navigation and mobile layout for the initial customer journey

## [0.3.0] - 2026-09-17

### Added

- Initial Hebrew RTL storefront with a browsable, filterable 104-product catalog
- Product details dialog and price-on-request guidance without checkout or recurring services
- 21 rendered source-page catalog images connected to all currently verified product cards

### Changed

- Replaced placeholder tile gradients with imagery from the originating catalog page, labelled as source-catalog imagery
- Replaced grouped Sintered Stone page previews with 50 SKU-specific, tile-only source crops
- Regenerated Sintered Stone imagery from high-resolution catalog renders without altering the product appearance
- Added high-resolution, product-only images for 23 Whale MAX SKUs, excluding Chinese captions from display derivatives
- Added high-resolution, product-only wood-look images for 5 Forest Song SKUs
- Added high-resolution representative tile images for 9 Star Marks SKUs and corrected two verified source-page references
- Added high-resolution, product-only images for 17 verified Allye polished-porcelain SKUs
- Added a full-size image zoom from the product-detail view

## [0.2.0] - 2026-09-17

### Added

- Source-preserving catalog schema and ingestion rules
- Inventory of 10 currently available Chinese supplier PDFs, including page counts and SHA-256 fingerprints
- 87 product records extracted from four text-readable Eagle Ceramics catalogs
- A documented workflow for clean Chinese-text display-image derivatives that preserves source provenance

### Changed

- Project focus moved from empty setup to catalog-data foundation; storefront UI remains intentionally deferred

## [0.2.1] - 2026-09-17

### Added

- Visual page inventory for 79 scan-only catalog pages, retained separately from verified product records

### Changed

- Verified Allye and Polisa as brands on six visually reviewed source catalogs

## [0.2.2] - 2026-09-17

### Added

- Verified collection index for Allye Soluble Salt, Micro Crystal, Stone Line and Super White / Super Black polished porcelain series

### Changed

- Added 17 visually verified Allye polished-porcelain SKU records to the master catalog

## [0.2.3] - 2026-09-18

### Added

- Nine visually verified SEBACH Bath Design vanity records and a dedicated Hebrew model grid
- Unified Hebrew bathroom catalogue with a verified-model filter for cabinets and shower enclosures
- Twelve visually verified SEBACH shower-enclosure records with clean product imagery and retained source provenance
- Final SEBACH shower-enclosure model SHIR added from the source catalogue
- First verified Rocco by SEBACH kitchen-sink models added from the SPOT catalogue
- Main navigation routes bathroom visitors to the unified verified bathroom catalogue
- Master catalog manifest documents the source-preserving aggregate product data model
- Added a catalog-integrity verification check for release review

## [0.1.0] - 2026-09-17

### Added

- Initial repository setup
- `README.md`, `.gitignore`, `PROJECT_STATUS.md`
- Base folder structure: `/docs`, `/data`, `/public`, `/public/products`
