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
  'Toilet': 'אסלה'
};

function bathroomImage(product) {
  return product.display_image.replace(/^public\//, './');
}

function bathroomVisual(product) {
  if (!product.display_crop) return `<img src="${bathroomImage(product)}" alt="${product.product_name}">`;
  const crop = product.display_crop;
  return `<div class="product-visual" role="img" aria-label="${product.product_name}" style="background-image:url('${bathroomImage(product)}');background-size:${crop.size_x}% auto;background-position:${crop.position_x}% ${crop.position_y}%;aspect-ratio:${crop.aspect_ratio || '4 / 5'}"></div>`;
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
    return `<article class="card">${bathroomVisual(product)}<div class="body"><span class="source">${source}</span><h2>${product.product_name}</h2><p>${categoryName[product.product_type_category] || product.product_type_category}${widths}</p><a href="https://wa.me/972546601762?text=${message}">לבירור דגם ${product.sku_model_code}</a></div></article>`;
  }).join('');
  document.querySelectorAll('[data-filter]').forEach(button => button.classList.toggle('active', button.dataset.filter === bathroomFilter));
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
