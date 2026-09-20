# Project Status

> This file is always kept up to date to reflect the current state of the project. Update it whenever the project's status changes.

## Current Version

`1.1.8` (re-verified the remaining "blocked" bathroom catalogs by SHA-256; 2 stay genuinely blocked, 2 had their PDFs present. Audited all 442 unpublished candidates by page overlap and found 35 were noise (font-glyph artifacts, cover-page text, or products already verified under a different code token) and removed them; visually verified and promoted 2 genuinely new products (KD2 shower enclosure, MUST02 vanity shelf). Caught and corrected a scoping mistake in the cleanup script itself (an unrelated same-named candidate in a different, still-blocked catalog) before it caused data loss. candidates: 442 -> 404, verified: 369 -> 372.

`1.1.7` (found and closed a real gap the earlier "extraction complete" status missed: 4 Eagle catalogs (87 records) were still text-only, not individually image-verified. Checked by SHA-256 whether their source PDFs are still present rather than assuming the whole group was blocked like SEBACH/Mitrani: 3 of 4 were (78 records), only Star Marks' PDF is genuinely gone (9 records, stays blocked). Individually cropped and verified all 78 against their source pages; live catalog count now correctly 633. Also normalized a supplier_group capitalization inconsistency (Sebach vs SEBACH) found via audit, confirmed against the brand field's consistent casing.

`1.1.6` (continued the catalog data audit: checked cross-file referential integrity, on-disk image existence, sizes_mm/page-ref/status-vocabulary sanity, price/availability integrity and encoding — all clean except the already-known SEBACH/Mitrani missing-image gap. Found and fixed a real policy-violation bug: 87 unconfirmed source_page_only records with no real photo were being shown to customers on the live catalog against the manifest's own publication rule; excluded them in app.js and corrected the manifest's verified-count (1011 -> 924). Verified via headless browser: live product count corrected from 642 to 555. Earlier (1.1.5): finished the whole-project code audit by covering cabinets.html, showers.html, styles.css, and the rest of millennium-design.html's template — fixed an invalid CSS margin shorthand on .eyebrow that the browser was silently dropping. Earlier (1.1.4): full application-code audit of app.js, bathroom-catalog.js and millennium-design.html — fixed a real broken-markup bug affecting 14 products whose names contain a literal quote character, added HTML-escaping everywhere innerHTML is built from data or user input, closed a reverse-tabnabbing gap on 2 WhatsApp links, and guarded an unhandled localStorage parse that could have silently broken the whole catalog page. Earlier: found and fixed 3 orphaned image assets, removed 15 genuine duplicate SPOT catalog records, fixed an inconsistent sizes_mm data format, extracted a previously-unflagged Polisa catalog, corrected a stale master-catalog-manifest.json; site prepared for free hosting)

## Completed

- Repository initialized
- `README.md` added
- `.gitignore` added
- Base folder structure created (`/docs`, `/data`, `/public`, `/public/products`)
- `CHANGELOG.md` added
- Master catalog schema created in `data/catalog-schema.json`
- Source inventory created in `data/source-catalogs.json`
- First Chinese supplier batch ingested: 10 PDF catalogs, source provenance retained
- 104 source-verifiable product records created in `data/master-products.json`
- Product display-image policy and Chinese text-removal workflow documented
- Visual review completed for all six scan-only Chinese catalogs; Allye and Polisa brands verified
- 79 page-level extraction work items added without inventing SKU or size data
- Four Allye polished-porcelain collections and visible sample codes verified at high resolution and added to `data/collection-index.json`
- 17 individual Allye polished-porcelain SKUs added from high-resolution source-page review
- Hebrew RTL storefront prototype added in `public/`, including search, filters, product details and request-price guidance
- Source-page images rendered for every currently verified product card; the catalog and page reference remain preserved
- 50 Eagle Sintered Stone SKUs now have individual tile-only image crops; each crop retains source-page metadata
- Sintered Stone product crops regenerated from 4800px-wide source-page renders for clearer catalogue imagery
- 23 Eagle Whale MAX SKUs now have individual high-resolution tile-only crops; Chinese catalogue captions are excluded from display images while provenance remains in metadata
- 5 Eagle Forest Song SKUs now have individual high-resolution wood-look tile crops
- 9 Eagle Star Marks SKUs now have individual high-resolution representative tile crops; two source-page references were corrected after visual verification
- 17 verified Allye Polished Porcelain SKUs now have individual high-resolution tile-only crops
- Product detail view now supports full-size image zoom for closer material inspection
- Quote-request list added: visitors can select models, enter quantities and copy a formatted request locally for sales follow-up
- Quote requests can be sent directly to the configured store WhatsApp number; no customer data is stored by the site
- Millennium Ceramics identity added with the supplied MP logo, Hebrew store name, address and 1994 establishment year
- Home page is being redesigned around a luxury bathroom hero and category-first catalogue navigation, guided by the supplied prior-design reference
- User-provided Millennium Ceramics design source and its 1,010 accompanying catalogue images are now preserved in the project as the active storefront source
- Multi-model catalogue page scans are retained in the imported source but excluded from customer-facing product cards until individual clean product images are prepared
- Customer catalogue controls refined: categories wrap cleanly, size filters are optional, the catalogue no longer overlays content, and the logo asset is corrected
- Home hero redesigned with a dedicated luxury bathroom image and non-sticky header for a clearer visual hierarchy
- Claude-inspired Hebrew RTL home page implemented as the public landing page, with category-first navigation, verified store contact details and a separate retained catalogue route
- Home page navigation and category presentation refined with a wide product mega-menu and image-led category cards, inspired by the user-supplied tile-store reference without reusing its brand or content
- Brand logo and store name now return customers to the home page from the catalogue
- Bathroom category landing page added with supplier-sourced SEBACH and Mitrani catalogue previews; individual model extraction remains in progress
- Complete 555-page intake index generated for the four new bathroom catalogs, with source-page text-layer status retained for every page
- 442 source-text model-code candidates generated for visual verification; candidates are intentionally not published until model, dimensions and image are confirmed
- All 555 bathroom catalog pages rendered as source-reference images and linked back to their inventory records for clean product-image extraction
- Extracted and source-indexed 769 embedded supplier images from the four bathroom catalogs; all remain unreviewed until mapped to verified product records
- First seven Mitrani MEITAL shower-enclosure records visually verified with clean embedded product images and retained page provenance
- Five additional Mitrani MEITAL shower-enclosure models (ME03PK, ME27, ME07F, ME24 and G47F) visually verified from clean individual supplier images and retained page provenance
- Five more Mitrani MEITAL shower-enclosure models (ME07, ME907F, ME907D, G47 and G47D) visually verified from clean individual supplier images and retained page provenance
- All currently published Mitrani shower model names are now presented in Hebrew while their original supplier codes and source provenance remain unchanged
- Five further Mitrani shower-enclosure models (KME, MCS, ME06, G46 and ME206) were visually verified from clean individual source images and retained page provenance
- Mitrani models MEN, H01 and H20 were visually verified from clean individual source images and retained page provenance
- Mitrani models H401, H491, H441, H48 and H01PK were visually verified from clean individual source images and retained page provenance
- Mitrani models H45, H941, H02PK, H03PK and H27 were visually verified from clean individual source images and retained page provenance
- Mitrani models H07F, H24, H447F, H07 and H907F were visually verified from clean individual source images and retained page provenance
- Mitrani models H907D, H447, H447D, KH and H06 were visually verified from clean individual source images and retained page provenance
- Mitrani models H406, H410, H206, H408 and H406D were visually verified from clean individual source images and retained page provenance
- Mitrani models HN, L and PL were added from clean individual source images; the latter two intentionally retain an unconfirmed collection label instead of inferring a source series
- Mitrani models 7001, 791, HA41, HA748 and 7002PC were added from clean individual source images with explicit unconfirmed collection labels; the page-level 7002PC/KP2 ambiguity is retained in the record note
- Mitrani models HA741, 7002PK, 7002 and P2 were added from clean individual source images, retaining source-page code relationships in notes where the page contains more than one code
- Customer-facing cards now omit an internal `not_confirmed` collection marker while retaining that flag in the source-preserving record for supplier follow-up
- Verified SPOT MAXIMAL tileable floor drain added with a dedicated Hebrew `ניקוזים` catalog filter and source-preserving product record
- Verified SPOT CAPSULE 80 cm integral bathroom basin added with a dedicated Hebrew `כיורי רחצה` filter and source-preserving product record
- Mitrani models HA47F and P were visually verified from clean individual supplier images and added with retained page provenance
- Mitrani models HA47, HA47D, MS, RV, 7006, HA46, RV2 and 7008 were visually verified from clean individual supplier images and added with retained page provenance
- Mitrani models 7006D and MSN were visually verified from clean individual supplier images and added with retained page provenance
- SEBACH Bath Design models ORIENT, ALBA, ARENA, LORD, LOREN PLUS, NIRVANA and RAYBAN were visually verified from individual supplier images and added with retained page provenance
- SEBACH Bath Design models DENNIS, HERMES, BABY THOMAS, THOMAS, WILLIAM and SIAM were visually verified from individual supplier images and added with retained page provenance
- SEBACH Bath Design models FABIOLA, ANDREA, DIVA, PHILIP, ANDREW, AUSTIN, LEON, ARTHUR, PATRICK and KORIN were visually verified from individual supplier images and added with retained page provenance
- SEBACH Bath Design models DRORI, LAGOON, LUNA, SKY, CASTLE, CLAUDIA, KAREN and SIMON were visually verified from individual supplier images and added with retained page provenance
- SEBACH Bath Design models CHRISTINA, MONA LISA, BEATRICE, VICTORIA and SINGLE were visually verified from individual supplier images and added with retained page provenance
- SPOT SAVANNAH shower system 225500 was visually verified and published with a clean individual supplier image and retained source provenance
- Six individual MAXIMAL linear-drain SKUs were added from the SPOT source page with collection-matched imagery, explicit size codes and retained provenance
- Three individual CAPSULE integral-basin sizes were added from the SPOT source page with collection-matched imagery, source-stated dimensions and retained provenance
- SPOT kitchen sinks PHOENIX and BIG 595, plus three clearly mapped toilet models, were added with clean supplier images and retained source provenance
- Six further SPOT toilet models were visually verified with dedicated supplier images and added to the customer-facing toilet category
- SPOT SAAR bath screen and five individually coded LINE acrylic-bathtub sizes were visually verified from clean supplier imagery and added with retained source provenance
- Twelve SPOT DECORATIVE DRAIN and MASTER DRAIN floor-drain SKUs were visually verified from clear source images and added without guessing the individual finish-to-code mapping
- Seven SPOT shower-system SKUs (JAGUAR and SAVANNAH) were verified from direct supplier images, retaining each individual code and explicit collection-image/finish guidance
- Two SPOT basin faucets (STICK and RAIN) were visually verified from clean supplier images and released through a dedicated Hebrew faucet filter
- Nine additional individually coded STICK and RAIN faucet options were added with explicit collection-image and finish-confirmation guidance
- Three source-verified SPOT wall-basin faucet SKUs were added with a direct collection image and retained page provenance
- SPOT MAGIC ACTIVE T1 and T3 toilets were visually verified from their dedicated source pages and added with direct supplier imagery
- Three SPOT countertop-basin variants (ADVA and HOFIT) were visually verified with dimensions, clean supplier images and retained source provenance
- SPOT HEN, GOLAN and LOOP shower models were visually verified from direct source imagery and added with source-stated hardware/size information
- SEBACH Bath Design DA VINCI and VISTA vanity models were visually verified from clean source images and added with source-stated size information
- SEBACH Bath Design VISTA imagery was corrected against the source page and the distinct VIDA model was added with its verified image and dimensions
- Verified bathroom cards now support a source-page crop presentation only when a single supplier product can be displayed without altering its underlying image or provenance; no generated imagery is published through this workflow
- Five SPOT LED bathroom mirrors were visually verified from their exact individual supplier-page photographs and published with a dedicated Hebrew mirror filter; each display is an unaltered source-page crop with retained page provenance
- Five further SPOT LED bathroom mirrors (LUX and capsule forms) were visually verified from exact supplier-page photographs and added to the same mirror category with source-preserving individual display crops
- Ten SPOT round mirrors with brushed metal frames were added as individually coded 60 cm and 80 cm finish variants; code-to-finish mappings and source-page collection photographs are retained
- Five Mitrani by SEBACH DIAMOND integral countertop-basin widths were source-verified and added with code-level dimensions and a clean original supplier-product photo crop
- Six individually coded Rocco by SEBACH ceramic countertop-basin plugs were source-verified by finish, published with a dedicated Hebrew basin-accessories filter, and retained with their original product-photo crop
- First customer-facing shower-model grid published locally for the seven verified Mitrani MEITAL products, with model-specific WhatsApp enquiry links and no unverified source pricing
- First nine SEBACH Bath Design vanity models visually verified with clean embedded product images, dimensions and retained page provenance
- SEBACH Bath Design model KODKOD was visually verified from its individual source image and added with its available width range
- SEBACH Bath Design model ROYAL was visually verified from its individual source image and added with its available width range
- SEBACH Bath Design model SAMUEL was visually verified from its individual source image and added with its available width range
- SEBACH Bath Design models JESSICA and NATALIE were visually verified from individual source images and added with their available width ranges
- SEBACH Bath Design model ZOHAR DOUBLE was visually verified from its individual source image and added with the source-stated 120–200 cm width range
- Customer-facing vanity-model grid published locally; bathroom-category linking is being finalized
- Unified verified bathroom catalogue added; it reads only visually verified supplier records and updates as more models are verified
- Twelve SEBACH shower-enclosure models visually verified from catalogue pages and added with clean embedded supplier images, source pages and dimension ranges
- SEBACH shower-enclosure catalogue reviewed through its final product page; model SHIR was added from the closing product spread
- SPOT catalogue review started with visually verified Rocco by SEBACH kitchen-sink models, retaining catalogue pages and clean supplier imagery
- The unified bathroom catalogue now has a dedicated kitchen-sink filter, so verified Rocco by SEBACH sinks are discoverable without mixing them into bathroom cabinets or shower enclosures
- The unified catalogue always refreshes its verified product dataset instead of reusing a stale browser-cached list during catalogue updates
- Main-page bathroom links now route into the unified verified bathroom catalogue
- Master-catalog manifest added as the canonical entry point for separate supplier datasets, source-preserving record schema, direct-asset count and inventory count
- Read-only catalogue-integrity checker added for duplicate IDs, missing customer images and missing supplier/source provenance
- Four additional bathroom-supplier PDF sources inventoried separately: SEBACH Bath Design, Mitrani showers, SEBACH/Mitrani SPOT accessories, and SEBACH shower enclosures
- Rocco by SEBACH NAIA countertop basin 134401 visually verified with source-stated 80 × 38 × 13 cm dimensions and a clean original supplier-photo crop
- Six Rocco by SEBACH TOP tall cold-water basin-faucet finish variants visually verified with individual codes and unaltered source-photo crop
- Six Rocco by SEBACH EXCELLENT cold-water basin-faucet finish variants visually verified with individual codes and unaltered source-photo crop
- Five Rocco by SEBACH STICK tall single-lever basin-faucet finish variants visually verified with individual codes and unaltered source-photo crop
- Five MAX short gooseneck basin-faucet finish variants visually verified with individual codes and unaltered source-photo crop
- Five Rocco by SEBACH RAIN tall basin-faucet finish variants visually verified with individual codes and unaltered source-photo crop
- Eight MAX XO concealed-shower trim variants visually verified with individual codes, source-stated finishes and unaltered source-photo crops
- Five Rocco by SEBACH RAIN medium basin-faucet finish variants visually verified with individual codes and unaltered source-photo crop
- Six Rocco by SEBACH STICK slim tall basin-faucet finish variants visually verified with individual codes and unaltered source-photo crop
- Six Rocco by SEBACH MINIMAL three-way concealed-shower trim variants visually verified with individual codes and unaltered source-photo crop
- Six Rocco by SEBACH MINIMAL four-way concealed-shower trim variants visually verified with individual codes and unaltered source-photo crop
- Six MAX five-piece shower-package finish variants visually verified with individual codes and unaltered source-photo crop
- Eight MINIMAL multi-part shower-package variants visually verified with individual codes, source-stated finishes and unaltered source-photo crops
- Four additional MINIMAL three-way shower-package finish variants visually verified with individual codes and unaltered source-photo crop
- Six Rocco by SEBACH JET toilet-spray finish variants visually verified with individual codes and unaltered source-photo crop
- Six Rocco by SEBACH SELECT water-outlet and shut-off-handle finish variants visually verified with individual codes and unaltered source-photo crop
- Four SEBACH toilet-seat variants visually verified with individual codes and unaltered source-photo crop
- Two Rocco by SEBACH T1 Tornado wall-hung toilets visually verified with individual codes and unaltered source-photo crop
- Full existing project codebase (storefront pages, catalog data, docs) brought into the `ceramic-store` git repository for the first time; `main` now reflects the real project instead of an empty scaffold
- SPOT July 2026 catalog cross-checked in full against the existing 356-record catalog; 20 previously-missing SKUs added across 9 products (new MAXIMAL square drain sizes, a missing MAX Stick Short bronze finish, a new XO wall-system body and 16 cm spout finish set, a missing Rocco wall-system bronze body, two new Rocco spout-length finish sets, a missing matte-black Rocco oval basin, and the new LAPINO compact vanity)
- SEBACH Shower Enclosures 2025 catalog visually reviewed page-by-page against the existing 13 catalogued models; 9 previously-missing shower/bathtub-screen models added (ROTEM, KD, KDD, HLP, DLP, YANIV, LIRAZ, DAN, NOAM)
- Eagle Ceramics Travertine Collection ingested and fully SKU-extracted: 8 individually-verified white/yellow travertine-look porcelain slab SKUs added to `data/eagle-tile-products.json`, each with a high-resolution (400dpi) source-page crop checked for supplier brand marks
- Site prepared for free static hosting (e.g. GitHub Pages): added a root `index.html` redirect, fixed a stale redirect that made `public/index.html` unreachable, and confirmed (via a headless-browser pass across all 8 storefront pages) that every page loads and renders with no JavaScript errors
- The 147 customer-facing Eagle/ECOEAGLE tile records and 52 TAU Cerámica records are now actually displayed on the storefront (`public/index.html`), not just present as data; combined with the existing 104-record dataset this page now shows 303 verified tile products
- `public/bathroom-catalog.html` (384 verified SEBACH/Mitrani records) is now linked from `public/bathroom.html` navigation; it was previously fully built but unreachable from any page
- Added a graceful placeholder fallback for every product/logo/hero image across the site that references a file not present in this repository, so the known missing-image gap (see Next Steps) no longer shows as broken-image icons
- All 13 collection-level placeholder tile catalogs (ARIK, HOBART, NERO MARGIUA, DUSTIN, TREVI, TERRAZZO, PIETRA, MOON, BARSOOM, WINS, PORTLAND, LARA, CREST) now have individually-verified SKU records (35 total) with real codes, colors, sizes and finishes read directly from the source pages; no brand mark was found in any of them across all pages reviewed, so brand is intentionally left unconfirmed rather than assumed
- Resolved the four unnamed K8FJ693/696/700/701TE Micro Cement product names (Yardang Gray, Yasur Volcanic Ash, Ripple Rock Gray, Navajo Gray) and fixed a finish-field data error found while doing so
- Reviewed the TAU "Promoción Novedades" roundup PDF; it contained 14 genuinely new SKUs (including an entirely new NOVASTONE WALL collection), now added with individual verified images
- Allye Polished Porcelain Tile catalog fully extracted (32 SKUs, all with real images); Allye Rustic Tiles' Milano Series fully extracted (18 SKUs); the separate standalone Milano Series catalog fully extracted (12 SKUs)
- Allye Wall Tiles catalog fully extracted (85 SKUs: 13 main pattern series + 72 decor accent tiles)
- Allye Floor Tiles catalog fully extracted (98 SKUs: HD Inkjet Polished Glazed Tile + HD Inkjet Rustic Tile); its last 3 pages duplicated the already-extracted Polished Porcelain Tile catalog and were correctly skipped
- All five Allye catalogs pending at the start of this session are now fully SKU-extracted with real verified images
- The 17 Chao Xian Shi (超现石) 2023 "old products" SKUs that shared one multi-product row-crop image now have individually-cropped display images
- Found and fully extracted a Polisa-brand tile catalog (6 collections, 62 SKUs) that had been sitting unflagged since before this session
- Corrected `data/master-catalog-manifest.json`, which had drifted out of sync with the actual dataset files across several sessions; all aggregate counts are now recomputed and verified
- Fixed an inconsistent `sizes_mm` data format (310 records stored a raw `[width, height]` number pair instead of a size string) that was breaking the storefront's size filter dropdown by mixing whole-size strings with bare individual numbers
- Full catalog data-integrity audit: found and removed 15 genuine duplicate SPOT July 2026 records (same source page and SKU code re-extracted under a different name in an earlier gap-reconciliation pass) from `data/bathroom-verified-products.json`; verified required-field coverage, image-path conventions and status vocabulary are clean across all datasets

## In Progress
- Verify price, sale unit and availability for every product before storefront publication
- Extract individual SEBACH and Mitrani product records, starting with bathroom cabinets — blocked: the source PDF and the previously-extracted 769-image manifest for these are not present anywhere in this environment; needs the user to re-supply them

## Next Steps

- Complete the remaining source catalog extraction and quality review
- Confirm public pricing, availability and ordering rules
- Crop each source-page image into a SKU-specific tile-only display image, starting with the verified Allye polished range
- Confirm public pricing, availability and ordering rules before enabling purchases
- Locate and re-supply the original 1,010 supplier catalogue images so existing verified records can be backed by their real image assets in this repository (most existing records currently reference `public/bathroom-product-assets/...` paths whose image files are not yet present here)
- Identify the brand behind the 13 tile catalogs added in v0.6.0 (ARIK, HOBART, NERO MARGIUA, DUSTIN, TREVI, TERRAZZO, PIETRA, MOON, BARSOOM, WINS, PORTLAND, LARA, CREST) — no brand mark appears anywhere in any of their source pages, so it remains unconfirmed
- Re-supply the original supplier image archive so the ~1,200+ legacy records that currently fall back to a placeholder (356 of 384 bathroom records, all 851 `millennium-design.html` catalog photos, and the site logo/hero images) can show their real photos
- Verify from a real (non-sandboxed) network that `public/millennium-design.html`'s runtime dependency on `unpkg.com` for React loads reliably once the site is live
- Merge the site-prep branch into `main` and enable free static hosting (e.g. GitHub Pages) once approved
