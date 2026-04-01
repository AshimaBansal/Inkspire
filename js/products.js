
let allProducts = [];
let currentPage = 1;
let currentQuery = 'art poster';

const MATERIALS = ['Matte', 'Glossy', 'Canvas', 'PLA', 'Resin', 'ABS'];

async function loadProducts(page = 1) {
    currentPage = page;
    const query = localStorage.getItem('inkspire_last_search') || currentQuery;
    showSkeletons();

    try {
        const raw = await fetchProducts(page, query);
        allProducts = transformProducts(raw).map((p, i) => ({
            ...p,
            material: MATERIALS[i % MATERIALS.length]
        }));
        applyFiltersAndRender();
    } catch (err) {
        document.getElementById('product-grid').innerHTML = `
            <div class="empty-state">
                <i class="ph ph-wifi-slash"></i>
                <h3>Failed to load products</h3>
                <p>Check your connection and try again.</p>
            </div>`;
    }
}

function showSkeletons() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = Array.from({ length: 12 }).map(() => `
        <div class="skeleton-card">
            <div class="skeleton skeleton-img"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
            <div class="skeleton skeleton-btn"></div>
        </div>`).join('');
}

function getActiveFilters() {
    const categoryEl = document.querySelector('input[name="category"]:checked');
    const category = categoryEl ? categoryEl.value : 'all';
    const maxPrice = parseInt(document.getElementById('price-slider').value);
    const checkedMaterials = [...document.querySelectorAll('input[name="material"]:checked')].map(cb => cb.value);
    const sortVal = document.getElementById('sort-select').value;
    return { category, maxPrice, checkedMaterials, sortVal };
}

function applyFiltersAndRender() {
    const { category, maxPrice, checkedMaterials, sortVal } = getActiveFilters();

   
    let filtered = filterProducts(allProducts, { category, maxPrice });

   
    if (checkedMaterials.length > 0) {
        filtered = filtered.filter(p => checkedMaterials.includes(p.material));
    }

    const sorted = sortProducts(filtered, sortVal);

    const countEl = document.getElementById('results-count');
    if (countEl) countEl.textContent = `${sorted.length} result${sorted.length !== 1 ? 's' : ''}`;

    renderProductGrid(sorted);
}

function renderProductGrid(products) {
    const grid = document.getElementById('product-grid');
    const wishlist = JSON.parse(localStorage.getItem('inkspire_wishlist') || '[]');

    if (products.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="ph ph-image"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms.</p>
                <button onclick="clearFilters()" class="btn btn-outline" style="margin-top:1rem;">Clear Filters</button>
            </div>`;
        document.getElementById('pagination').innerHTML = '';
        return;
    }

    grid.innerHTML = products.map(p => {
        const wishlisted = wishlist.find(w => w.id === p.id);
        const title = p.title ? p.title.charAt(0).toUpperCase() + p.title.slice(1) : 'Artwork';
        const detailUrl = `product-detail.html?id=${encodeURIComponent(p.id)}&title=${encodeURIComponent(p.title)}&image=${encodeURIComponent(p.image)}&price=${p.price}&category=${encodeURIComponent(p.category)}&photographer=${encodeURIComponent(p.photographer)}`;

        return `
            <article class="product-card">
                <a href="${detailUrl}" class="product-card-image">
                    <img src="${p.image}" alt="${title}" loading="lazy">
                    <button class="wishlist-btn ${wishlisted ? 'wishlisted' : ''}"
                        onclick="toggleWishlist(event, '${p.id}')"
                        data-id="${p.id}"
                        aria-label="${wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
                        <i class="ph ${wishlisted ? 'ph-heart-fill' : 'ph-heart'}"></i>
                    </button>
                </a>
                <div class="product-card-info">
                    <div class="product-category-tag">${p.category === 'poster' ? 'Art Print' : '3D Print'}</div>
                    <h3>${title}</h3>
                    <p class="product-photographer">by ${p.photographer}</p>
                    <div class="product-card-footer">
                        <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
                        <button class="add-to-cart-btn" onclick="quickAddToCart(event, '${p.id}')">
                            <i class="ph ph-plus"></i> Add
                        </button>
                    </div>
                </div>
            </article>`;
    }).join('');

    renderPagination();
}

function quickAddToCart(e, id) {
    e.preventDefault();
    const product = allProducts.find(p => p.id === id);
    if (product) {
        addToCart({
            id: product.id + '-A4-' + product.material,
            title: product.title,
            image: product.image,
            price: product.price,
            size: 'A4',
            material: product.material,
            category: product.category,
            photographer: product.photographer,
            quantity: 1
        });
    }
}

function toggleWishlist(e, id) {
    e.preventDefault();
    e.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem('inkspire_wishlist') || '[]');
    const existing = wishlist.find(w => w.id === id);

    if (existing) {
        wishlist = wishlist.filter(w => w.id !== id);
        showToast('Removed from wishlist');
    } else {
        const product = allProducts.find(p => p.id === id);
        if (product) wishlist.push(product);
        showToast('Saved to wishlist ♥');
    }

    localStorage.setItem('inkspire_wishlist', JSON.stringify(wishlist));

   
    const btn = document.querySelector(`.wishlist-btn[data-id="${id}"]`);
    if (btn) {
        const isNowWishlisted = !!wishlist.find(w => w.id === id);
        btn.classList.toggle('wishlisted', isNowWishlisted);
        btn.querySelector('i').className = `ph ${isNowWishlisted ? 'ph-heart-fill' : 'ph-heart'}`;
    }
}

function renderPagination() {
    const pg = document.getElementById('pagination');
    if (!pg) return;
    pg.innerHTML = `
        <button class="page-btn" onclick="loadProducts(${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''}>
            <i class="ph ph-caret-left"></i>
        </button>
        <button class="page-btn active">${currentPage}</button>
        <button class="page-btn" onclick="loadProducts(${currentPage + 1})">
            <i class="ph ph-caret-right"></i>
        </button>`;
}

function clearFilters() {
    document.querySelectorAll('input[name="category"]')[0].checked = true;
    document.getElementById('price-slider').value = 4999;
    document.getElementById('price-display').textContent = '₹4999';
    document.querySelectorAll('input[name="material"]:checked').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[name="material"]')[0].checked = true;
    document.getElementById('sort-select').value = 'default';
    applyFiltersAndRender();
}


document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const urlCategory = urlParams.get('category');
    if (urlCategory) {
        const radioEl = document.querySelector(`input[name="category"][value="${urlCategory}"]`);
        if (radioEl) radioEl.checked = true;
        currentQuery = urlCategory === '3d-print' ? 'sculpture 3d art' : 'art poster';
    }


    const slider = document.getElementById('price-slider');
    if (slider) {
        slider.addEventListener('input', () => {
            document.getElementById('price-display').textContent = '₹' + slider.value;
            applyFiltersAndRender();
        });
    }


    document.querySelectorAll('input[name="category"]').forEach(r => {
        r.addEventListener('change', () => {
            currentQuery = r.value === '3d-print' ? 'sculpture 3d art' : r.value === 'poster' ? 'art poster' : 'art';
            loadProducts(1);
        });
    });


    document.querySelectorAll('input[name="material"]').forEach(cb => {
        cb.addEventListener('change', applyFiltersAndRender);
    });


    document.getElementById('sort-select').addEventListener('change', applyFiltersAndRender);

    document.getElementById('clear-filters').addEventListener('click', clearFilters);

 
    const toggleBtn = document.getElementById('mobile-filter-toggle');
    const sidebar = document.getElementById('filter-sidebar');
    const overlay = document.getElementById('filter-overlay');

    if (toggleBtn && sidebar && overlay) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    loadProducts(1);
});
