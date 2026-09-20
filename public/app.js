function loadStoredRequest() {
  try {
    const parsed = JSON.parse(localStorage.getItem("ceramic-request") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}
const state = { products: [], filtered: [], request: loadStoredRequest() };
const $ = (selector) => document.querySelector(selector);
const grid = $("#productGrid");
const template = $("#productTemplate");
const dialog = $("#productDialog");
const zoomDialog = $("#imageZoomDialog");
const label = (value, fallback = "לא צוין") => value || fallback;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const text = (product) => [product.sku_model_code, product.product_name, product.collection_series, product.brand, product.product_type_category, product.color_design, product.finish, ...(product.sizes_mm || [])].filter(Boolean).join(" ").toLowerCase();
const assetSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const productImage = (product) => {
  if (product.display_image) return product.display_image.replace(/^public\//, "./");
  if (product.source_catalog_id === "CN-EAGLE-SINTERED-2026") return `assets/products/sintered/${product.sku_model_code}.jpg`;
  if (product.source_catalog_id === "CN-EAGLE-WHALE-MAX-2024") return `assets/products/whale-max/${product.sku_model_code}.jpg`;
  if (product.source_catalog_id === "CN-EAGLE-FOREST-SONG") return `assets/products/forest-song/${product.sku_model_code}.jpg`;
  if (product.source_catalog_id === "CN-EAGLE-STAR-MARKS") return `assets/products/star-marks/${product.sku_model_code}.jpg`;
  if (product.source_catalog_id === "CN-UNBRANDED-POLISHED") return `assets/products/polished/${product.sku_model_code}.jpg`;
  return `assets/catalog-pages/${assetSlug(product.source_catalog_id)}-p${product.image_page_reference.page}.jpg`;
};
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23eee'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='18' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3E%D7%AA%D7%9E%D7%95%D7%A0%D7%94 %D7%91%D7%90%D7%99%D7%9E%D7%95%D7%AA%3C/text%3E%3C/svg%3E";
const withImageFallback = (imgEl) => { imgEl.addEventListener("error", () => { imgEl.onerror = null; imgEl.src = PLACEHOLDER_IMAGE; }, { once: true }); };
const CUSTOMER_FACING_STATUSES_TO_EXCLUDE = new Set(["source_lifestyle_image_only"]);
const isCustomerFacing = (product) => !CUSTOMER_FACING_STATUSES_TO_EXCLUDE.has(product.display_asset_status);
function saveRequest() { localStorage.setItem("ceramic-request", JSON.stringify(state.request)); $("#requestCount").textContent = state.request.length; }
function addToRequest(product) {
  if (!state.request.some(item => item.sku === product.sku_model_code)) state.request.push({ sku: product.sku_model_code, quantity: "", product });
  saveRequest(); openRequest();
}

function populateFilters(products) {
  const addOptions = (selector, values) => {
    const select = $(selector);
    [...values].sort((a,b) => a.localeCompare(b)).forEach(value => select.add(new Option(value, value)));
  };
  addOptions("#categoryFilter", new Set(products.map(p => p.product_type_category).filter(Boolean)));
  addOptions("#brandFilter", new Set(products.map(p => p.brand).filter(Boolean)));
  addOptions("#sizeFilter", new Set(products.flatMap(p => p.sizes_mm || []).filter(Boolean)));
}
function applyFilters() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const category = $("#categoryFilter").value;
  const brand = $("#brandFilter").value;
  const size = $("#sizeFilter").value;
  const sort = $("#sortSelect").value;
  state.filtered = state.products.filter(product => (!query || text(product).includes(query)) && (!category || product.product_type_category === category) && (!brand || product.brand === brand) && (!size || product.sizes_mm?.includes(size)));
  if (sort === "sku") state.filtered.sort((a,b) => a.sku_model_code.localeCompare(b.sku_model_code));
  if (sort === "brand") state.filtered.sort((a,b) => a.brand.localeCompare(b.brand));
  render();
}
function render() {
  grid.innerHTML = "";
  state.filtered.forEach(product => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".product-card");
    const visual = node.querySelector(".product-visual");
    const image = node.querySelector(".product-image");
    image.src = productImage(product);
    image.alt = `תמונת קטלוג של ${product.sku_model_code}`;
    withImageFallback(image);
    node.querySelector(".product-brand").textContent = label(product.brand);
    node.querySelector(".product-title").textContent = label(product.product_name, product.collection_series);
    node.querySelector(".product-meta").textContent = `${label(product.product_type_category)} · ${(product.sizes_mm || []).join(", ") || "מידה באימות"}`;
    node.querySelector("code").textContent = product.sku_model_code;
    [visual, node.querySelector(".details-button")].forEach(button => button.addEventListener("click", () => openProduct(product)));
    node.querySelector(".add-button").addEventListener("click", () => addToRequest(product));
    grid.append(node);
  });
  $("#resultSummary").textContent = `${state.filtered.length} מוצרים מוצגים`;
  $("#emptyState").hidden = state.filtered.length !== 0;
}
function openProduct(product) {
  $("#dialogContent").innerHTML = `<div class="dialog-layout"><button class="dialog-tile image-zoom-button" type="button" aria-label="הגדלת תמונת המוצר"><img class="dialog-image" src="${productImage(product)}" alt="תמונת קטלוג של ${escapeHtml(product.sku_model_code)}" /><span>לחצו להגדלה</span></button><div class="dialog-info"><p class="eyebrow">${escapeHtml(label(product.brand))}</p><h2>${escapeHtml(label(product.product_name, product.collection_series))}</h2><dl><dt>קוד</dt><dd><code>${escapeHtml(product.sku_model_code)}</code></dd><dt>קטגוריה</dt><dd>${escapeHtml(label(product.product_type_category))}</dd><dt>מידה</dt><dd>${escapeHtml((product.sizes_mm || []).join(", ") || "באימות")}</dd><dt>גימור</dt><dd>${escapeHtml(label(product.finish))}</dd><dt>עיצוב / גוון</dt><dd>${escapeHtml(label(product.color_design))}</dd></dl><button class="button button-primary add-dialog-product" type="button">הוספה לבקשת הצעת מחיר</button><p class="quote-note">התמונה היא חיתוך מהמוצר המקורי בקטלוג. המחיר והמלאי מאושרים לפני הזמנה.</p></div></div>`;
  withImageFallback($(".dialog-image"));
  $(".image-zoom-button").addEventListener("click", () => openZoom(product));
  $(".add-dialog-product").addEventListener("click", () => { dialog.close(); addToRequest(product); });
  dialog.showModal();
}
function openZoom(product) {
  const image = $("#imageZoomImage");
  image.src = productImage(product);
  image.alt = `תמונה מוגדלת של ${product.sku_model_code}`;
  withImageFallback(image);
  zoomDialog.showModal();
}
function renderRequest() {
  const box = $("#requestItems"); box.innerHTML = "";
  $("#requestEmpty").hidden = state.request.length > 0; $("#requestForm").hidden = state.request.length === 0;
  state.request.forEach((item, index) => {
    const row = document.createElement("div"); row.className = "request-item";
    row.innerHTML = `<div><strong>${escapeHtml(label(item.product.product_name, item.product.collection_series))}</strong><small>${escapeHtml(item.sku)} · ${escapeHtml((item.product.sizes_mm || []).join(", "))}</small></div><input type="text" inputmode="decimal" aria-label="כמות עבור ${escapeHtml(item.sku)}" placeholder="כמות" value="${escapeHtml(item.quantity)}"><button class="remove-item" type="button">הסרה</button>`;
    row.querySelector("input").addEventListener("input", e => { item.quantity = e.target.value; saveRequest(); });
    row.querySelector("button").addEventListener("click", () => { state.request.splice(index, 1); saveRequest(); renderRequest(); }); box.append(row);
  });
}
function openRequest() { renderRequest(); $("#requestDialog").showModal(); }
function copyRequest() {
  const name = $("#customerName").value.trim(), phone = $("#customerPhone").value.trim(), note = $("#customerNote").value.trim();
  const items = state.request.map(item => `• ${item.sku} | ${label(item.product.product_name, item.product.collection_series)} | מידה: ${(item.product.sizes_mm || []).join(", ") || "באימות"} | כמות: ${item.quantity || "לא צוין"}`);
  const message = `בקשת הצעת מחיר\nשם: ${name}\nטלפון: ${phone}\n\nמוצרים:\n${items.join("\n")}${note ? `\n\nהערה: ${note}` : ""}`;
  return message;
}
function sendWhatsApp(event) {
  event.preventDefault(); if (!$("#requestForm").reportValidity()) return;
  window.open(`https://wa.me/972546601762?text=${encodeURIComponent(copyRequest())}`, "_blank", "noopener");
  $("#requestFeedback").textContent = "WhatsApp נפתח עם הבקשה המוכנה לשליחה.";
}
function bindEvents() {
  ["#searchInput", "#categoryFilter", "#brandFilter", "#sizeFilter", "#sortSelect"].forEach(selector => $(selector).addEventListener("input", applyFilters));
  $("#resetFilters").addEventListener("click", () => { $("#searchInput").value = ""; $("#categoryFilter").value = ""; $("#brandFilter").value = ""; $("#sizeFilter").value = ""; $("#sortSelect").value = "featured"; applyFilters(); });
  $("#filterToggle").addEventListener("click", () => { const filters = $(".filters"); filters.classList.toggle("is-open"); $("#filterToggle").setAttribute("aria-expanded", filters.classList.contains("is-open")); });
  $("#dialogClose").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  $("#imageZoomClose").addEventListener("click", () => zoomDialog.close());
  zoomDialog.addEventListener("click", event => { if (event.target === zoomDialog) zoomDialog.close(); });
  $("#requestShortcut").addEventListener("click", openRequest);
  $("#requestClose").addEventListener("click", () => $("#requestDialog").close());
  $("#clearRequest").addEventListener("click", () => { state.request = []; saveRequest(); renderRequest(); });
  $("#requestForm").addEventListener("submit", sendWhatsApp);
  $("#copyRequest").addEventListener("click", () => { if (!$("#requestForm").reportValidity()) return; navigator.clipboard.writeText(copyRequest()).then(() => $("#requestFeedback").textContent = "הבקשה הועתקה. אפשר להדביק אותה בכל הודעה.").catch(() => $("#requestFeedback").textContent = "לא ניתן להעתיק אוטומטית בדפדפן זה."); });
  $("#requestDialog").addEventListener("click", event => { if (event.target === $("#requestDialog")) $("#requestDialog").close(); });
  document.querySelectorAll(".category-card").forEach(button => button.addEventListener("click", () => {
    $("#categoryFilter").value = button.dataset.category;
    applyFilters();
    $("#catalog").scrollIntoView({ behavior: "smooth", block: "start" });
  }));
}
const loadJson = (path) => fetch(path).then(response => { if (!response.ok) throw new Error(`Catalog data could not load: ${path}`); return response.json(); });
Promise.all([
  loadJson("../data/master-products.json"),
  loadJson("../data/eagle-tile-products.json"),
  loadJson("../data/tau-products.json"),
]).then(([masterProducts, eagleProducts, tauProducts]) => {
  const combined = [...masterProducts, ...eagleProducts, ...tauProducts];
  state.products = combined.filter(p => p.sku_model_code && isCustomerFacing(p));
  state.filtered = [...state.products];
  $("#productCount").textContent = state.products.length;
  populateFilters(state.products);
  bindEvents();
  saveRequest();
  render();
}).catch(() => { grid.innerHTML = "<p class='empty-state'>לא ניתן לטעון את הקטלוג. יש להפעיל את האתר דרך שרת מקומי.</p>"; });
