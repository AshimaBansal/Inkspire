
const transformProducts = (apiData) =>
    apiData.map(photo => ({
        id: photo.id,
        title: photo.alt_description || "Untitled Artwork",
        image: photo.urls.regular,
        price: Math.max(499, Math.min(4999, photo.likes ? photo.likes * 10 : 999)),
        category: photo.topic_submissions ? "poster" : "3d-print",
        photographer: photo.user.name,
        material: "Matte" 
    }));


const filterProducts = (products, { category, maxPrice, material }) =>
    products.filter(p =>
        (!category || category === 'all' || p.category === category) &&
        (!maxPrice || p.price <= maxPrice) &&
        (!material || material === 'all' || p.material === material)
    );


const sortProducts = (products, sortBy) =>
    [...products].sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "newest") return b.id.localeCompare(a.id); 
        return 0;
    });


const getCartTotal = (cartItems) =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


window.transformProducts = transformProducts;
window.filterProducts = filterProducts;
window.sortProducts = sortProducts;
window.getCartTotal = getCartTotal;
