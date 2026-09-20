let bathroomProducts = [];
let bathroomFilter = 'all';

const categoryName = {
  'Bathroom vanity': 'ארון אמבטיה',
  'Bathroom sink': 'כיור רחצה',
  'Bathroom sink accessory': 'אביזר לכיור רחצה',
  'Bathroom mirror': 'מראת רחצה',
  'Custom shower enclosure': 'מקלחון',
  'Kitchen sink': 'כיור מטבח',
  'Floor drain': 'ניקוז רצפתי',
  'Bathroom shower system': 'מערכת רחצה',
  'Bathroom faucet': 'ברז כיור',
  'Bathtub': 'אמבטיה',
  'Toilet': 'אסלה',
  'Concealed shower faucet trim': 'פנל למערכת מקלחת מוסתרת',
  'Shower system': 'מערכת מקלחת',
  'Bathroom accessory': 'אביזר לאמבטיה',
  'Basin wall faucet': 'ברז קיר לכיור',
  'Wall-hung toilet': 'אסלה תלויה',
  'Concealed shower/basin wall system': 'מערכת קיר מוסתרת למקלחת/כיור',
  'Toilet seat': 'מושב אסלה',
  'Bathtub screen': 'מחיצת אמבטיה',
  'Basin faucet': 'ברז לכיור',
  'Countertop basin': 'כיור מונח',
  'Vanity with integrated basin': 'ארון עם כיור משולב'
};

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27400%27%3E%3Crect width=%27400%27 height=%27400%27 fill=%27%23eee%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 font-family=%27sans-serif%27 font-size=%2718%27 fill=%27%23999%27 text-anchor=%27middle%27 dominant-baseline=%27middle%27%3E%D7%AA%D7%9E%D7%95%D7%A0%D7%94 %D7%91%D7%90%D7%99%D7%9E%D7%95%D7%AA%3C/text%3E%3C/svg%3E";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function bathroomImage(product) {
  return product.display_image.replace(/^public\//, './');
}

function bathroomVisual(product) {
  const alt = escapeHtml(product.product_name);
  if (!product.display_crop) return `<img src="${bathroomImage(product)}" alt="${alt}" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}'">`;
  const crop = product.display_crop;
  return `<div class="product-visual" role="img" aria-label="${alt}" data-bg="${bathroomImage(product)}" style="background-image:url('${bathroomImage(product)}');background-size:${crop.size_x}% auto;background-position:${crop.position_x}% ${crop.position_y}%;aspect-ratio:${crop.aspect_ratio || '4 / 5'}"></div>`;
}

function checkBackgroundImages() {
  document.querySelectorAll('.product-visual[data-bg]').forEach((el) => {
    const url = el.dataset.bg;
    const probe = new Image();
    probe.onerror = () => { el.style.backgroundImage = `url('${PLACEHOLDER_IMAGE}')`; el.style.backgroundSize = 'cover'; };
    probe.src = url;
  });
}

function renderBathroomProducts() {
  const shown = bathroomProducts.filter(product => bathroomFilter === 'all' || product.product_type_category === bathroomFilter);
  document.querySelector('#count').textContent = bathroomFilter === 'all'
    ? `${shown.length} דגמים מאומתים`
    : `${shown.length} דגמים מאומתים בקטגוריה זו`;
  document.querySelector('#grid').innerHTML = shown.map(product => {
    const widths = product.sizes_mm.length
      ? ` · רוחב ${Math.min(...product.sizes_mm) / 10}–${Math.max(...product.sizes_mm) / 10} ס״מ`
      : '';
    const message = encodeURIComponent(`שלום, אני מעוניין בדגם ${product.sku_model_code}`);
    const source = product.collection_series && product.collection_series !== 'not_confirmed'
      ? `${product.brand} · ${product.collection_series}`
      : product.brand;
    return `<article class="card">${bathroomVisual(product)}<div class="body"><span class="source">${escapeHtml(source)}</span><h2>${escapeHtml(product.product_name)}</h2><p>${escapeHtml(categoryName[product.product_type_category] || product.product_type_category)}${widths}</p><a href="https://wa.me/972546601762?text=${message}">לבירור דגם ${escapeHtml(product.sku_model_code)}</a></div></article>`;
  }).join('');
  document.querySelectorAll('[data-filter]').forEach(button => button.classList.toggle('active', button.dataset.filter === bathroomFilter));
  checkBackgroundImages();
}

fetch('../data/bathroom-verified-products.json', { cache: 'no-store' })
  .then(response => response.json())
  .then(products => {
    bathroomProducts = products;
    renderBathroomProducts();
  })
  .catch(() => {
    document.querySelector('#count').textContent = 'לא ניתן לטעון את הקטלוג כרגע.';
  });

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    bathroomFilter = button.dataset.filter;
    renderBathroomProducts();
  });
});
