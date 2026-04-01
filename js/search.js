
function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;


    const lastSearch = localStorage.getItem('inkspire_last_search');
    if (lastSearch && lastSearch !== 'art poster') {
        searchInput.value = lastSearch;
    }

    const handleSearch = debounce(async (query) => {
        const trimmed = query.trim();
        const searchQuery = trimmed || 'art';
        localStorage.setItem('inkspire_last_search', searchQuery);

       
        if (typeof loadProducts === 'function') {
          
            window.currentQuery = searchQuery;
            await loadProducts(1);
        }
    }, 300);

    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });
});
