
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}


function getCart() {
    return JSON.parse(localStorage.getItem('inkspire_cart')) || [];
}


function saveCart(cart) {
    localStorage.setItem('inkspire_cart', JSON.stringify(cart));
    updateCartBadge();
}


function updateCartBadge() {
    const badge = document.getElementById('cart-badge-count');
    if (badge) {
        const cart = getCart();
        
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        badge.textContent = count;
    }
}


function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = `<i class="ph ph-check-circle" style="color:var(--accent-gold); font-size:1.2rem;"></i> <span>${message}</span>`;
    container.appendChild(toast);


    setTimeout(() => {
        toast.classList.remove('show');
        toast.style.transform = 'translateX(120%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


const addToCart = throttle((product) => {
    const cart = getCart();
    const existingItem = cart.find(item =>
        item.id === product.id &&
        item.size === product.size &&
        item.material === product.material
    );

    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({ ...product, quantity: product.quantity || 1 });
    }

    saveCart(cart);
    showToast("Added to cart ✓");
}, 500);

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    if (typeof renderCart === 'function') renderCart(); 
}

function updateQuantity(index, delta) {
    const cart = getCart();
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
            return;
        }
        saveCart(cart);
        if (typeof renderCart === 'function') renderCart();
    }
}


window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.getCart = getCart;


document.addEventListener('DOMContentLoaded', updateCartBadge);
