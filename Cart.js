// Cart functionality
let cart = JSON.parse(localStorage.getItem('coverlyCart')) || [];

// Add to cart with quantity
function addToCart(productId, quantity = 1) {
    const product = window.products.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found!', 'error');
        return;
    }
    
    // Check stock
    if (product.stock < quantity) {
        showNotification(`Only ${product.stock} items available in stock!`, 'error');
        return;
    }
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        
        // Check stock for updated quantity
        if (product.stock < newQuantity) {
            showNotification(`Cannot add more than ${product.stock} items!`, 'error');
            return;
        }
        
        existingItem.quantity = newQuantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            category: product.category,
            giftWrapping: false,
            addedDate: new Date().toISOString()
        });
    }
    
    // Save to localStorage
    localStorage.setItem('coverlyCart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Update stock (in memory only - admin would handle actual inventory)
    // product.stock -= quantity;
    // window.saveProducts();
    
    // Show notification
    showNotification(`${quantity} × ${product.name} added to cart!`);
    
    // Update free shipping progress
    updateShippingProgress();
}

// Remove item from cart
function removeFromCart(productId) {
    const product = cart.find(item => item.id === productId);
    if (!product) return;
    
    // Restore stock (in memory only)
    // const originalProduct = window.products.find(p => p.id === productId);
    // if (originalProduct) {
    //     originalProduct.stock += product.quantity;
    //     window.saveProducts();
    // }
    
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('coverlyCart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} removed from cart!`);
    
    // Update free shipping progress
    updateShippingProgress();
    
    // Reload cart display if on cart page
    if (document.getElementById('cartContent')) {
        loadCart();
    }
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    const product = window.products.find(p => p.id === productId);
    if (!product) return;
    
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    // Check stock
    if (product.stock < newQuantity) {
        showNotification(`Only ${product.stock} items available in stock!`, 'error');
        return;
    }
    
    // Calculate stock difference
    // const stockDifference = newQuantity - item.quantity;
    // product.stock -= stockDifference;
    // window.saveProducts();
    
    item.quantity = newQuantity;
    localStorage.setItem('coverlyCart', JSON.stringify(cart));
    updateCartCount();
    
    // Update free shipping progress
    updateShippingProgress();
    
    // Reload cart display if on cart page
    if (document.getElementById('cartContent')) {
        loadCart();
    }
}

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Set styles based on type
    const backgroundColor = type === 'error' ? '#f44336' : 
                           type === 'warning' ? '#ff9800' : 
                           '#4CAF50';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background-color: ${backgroundColor};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2s forwards;
        max-width: 300px;
    `;
    
    // Add CSS for animations if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 2300);
}

// Save item for later (move to wishlist)
function saveForLater(productId) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    // Add to wishlist
    let wishlist = JSON.parse(localStorage.getItem('coverlyWishlist')) || [];
    wishlist.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        addedDate: new Date().toISOString()
    });
    localStorage.setItem('coverlyWishlist', JSON.stringify(wishlist));
    
    // Remove from cart
    removeFromCart(productId);
    
    // Update wishlist count
    updateWishlistCount();
    
    // Show notification
    showNotification(`${item.name} saved for later!`);
}

// Update wishlist count
function updateWishlistCount() {
    const wishlistCountElements = document.querySelectorAll('.wishlist-count');
    const wishlist = JSON.parse(localStorage.getItem('coverlyWishlist')) || [];
    
    wishlistCountElements.forEach(element => {
        element.textContent = wishlist.length;
    });
}

// Update free shipping progress
function updateShippingProgress() {
    const progressFill = document.getElementById('shippingProgress');
    const progressText = document.getElementById('progressText');
    
    if (!progressFill || !progressText) return;
    
    const subtotal = calculateSubtotal();
    const freeShippingThreshold = 50;
    const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
    
    progressFill.style.width = `${progress}%`;
    
    if (subtotal >= freeShippingThreshold) {
        progressText.textContent = '🎉 Congratulations! You get free shipping!';
    } else {
        const amountNeeded = (freeShippingThreshold - subtotal).toFixed(2);
        progressText.textContent = `Add $${amountNeeded} more for free shipping!`;
    }
}

// Calculate subtotal
function calculateSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Load cart on cart page
function loadCart() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="index.html" class="btn" style="margin-top: 20px;">Continue Shopping</a>
            </div>
        `;
        
        // Hide additional sections
        document.getElementById('couponSection').style.display = 'none';
        document.getElementById('giftWrappingSection').style.display = 'none';
        return;
    }
    
    // Show additional sections
    document.getElementById('couponSection').style.display = 'block';
    document.getElementById('giftWrappingSection').style.display = 'block';
    
    // Calculate totals with discounts
    const subtotal = calculateSubtotal();
    
    // Apply coupon discount if any
    const activeCoupon = JSON.parse(localStorage.getItem('activeCoupon') || 'null');
    const couponDiscount = activeCoupon && typeof activeCoupon.discount === 'number' ? 
        Math.min(activeCoupon.discount, subtotal) : 0;
    
    // Apply loyalty points discount if any
    const usedPoints = JSON.parse(localStorage.getItem('usedLoyaltyPoints') || 'null');
    const pointsDiscount = usedPoints ? usedPoints.discount : 0;
    
    // Calculate gift wrapping cost
    const hasGiftWrapping = cart.some(item => item.giftWrapping);
    const giftWrappingCost = hasGiftWrapping ? 4.99 : 0;
    
    // Calculate shipping
    const shipping = subtotal >= 50 || (activeCoupon && activeCoupon.discount === 'free-shipping') ? 0 : 5.99;
    
    // Calculate tax
    const tax = (subtotal - couponDiscount - pointsDiscount) * 0.08; // 8% tax
    
    // Calculate total
    const total = subtotal - couponDiscount - pointsDiscount + giftWrappingCost + shipping + tax;
    
    // Build cart HTML
    let cartHTML = `
        <div class="cart-items">
            ${cart.map(item => {
                const product = window.products.find(p => p.id === item.id);
                const stockWarning = product && product.stock < 5 ? 
                    `<div class="stock-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        Only ${product.stock} left in stock!
                    </div>` : '';
                
                return `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                            ${item.giftWrapping ? '<i class="fas fa-gift gift-icon"></i>' : ''}
                        </div>
                        <div class="cart-item-info">
                            <h3>${item.name}</h3>
                            <p>${product ? product.description.substring(0, 80) + '...' : 'Premium phone accessory'}</p>
                            ${stockWarning}
                        </div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                        <div class="quantity-selector">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                        <div class="cart-item-actions">
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i> Remove
                            </button>
                            <button class="save-for-later" data-id="${item.id}">
                                <i class="far fa-heart"></i> Save for Later
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <div class="cart-summary">
            <h2>Order Summary</h2>
            
            <div class="summary-row">
                <span>Subtotal (${cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            
            ${couponDiscount > 0 ? `
                <div class="summary-row" style="color: #4CAF50;">
                    <span>Coupon Discount (${activeCoupon.code})</span>
                    <span>-$${couponDiscount.toFixed(2)}</span>
                </div>
            ` : ''}
            
            ${pointsDiscount > 0 ? `
                <div class="summary-row" style="color: #4CAF50;">
                    <span>Loyalty Points Discount</span>
                    <span>-$${pointsDiscount.toFixed(2)}</span>
                </div>
            ` : ''}
            
            ${giftWrappingCost > 0 ? `
                <div class="summary-row">
                    <span>Gift Wrapping</span>
                    <span>$${giftWrappingCost.toFixed(2)}</span>
                </div>
            ` : ''}
            
            <div class="summary-row">
                <span>Shipping</span>
                <span>${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            
            <div class="summary-row">
                <span>Tax</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            
            <div class="summary-row total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            
            <button class="btn checkout-btn" id="checkoutBtn">Proceed to Checkout</button>
            <a href="index.html" class="continue-shopping">Continue Shopping</a>
        </div>
    `;
    
    cartContent.innerHTML = cartHTML;
    
    // Add event listeners
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity + 1);
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    document.querySelectorAll('.save-for-later').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            saveForLater(productId);
        });
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // Check stock availability
            const outOfStockItems = cart.filter(item => {
                const product = window.products.find(p => p.id === item.id);
                return product && product.stock < item.quantity;
            });
            
            if (outOfStockItems.length > 0) {
                showNotification('Some items in your cart are out of stock. Please update your cart.', 'error');
                return;
            }
            
            // Simulate order creation
            const order = {
                id: Date.now(),
                items: [...cart],
                subtotal: subtotal,
                discount: couponDiscount + pointsDiscount,
                shipping: shipping,
                tax: tax,
                total: total,
                date: new Date().toISOString(),
                status: 'pending'
            };
            
            // Save order
            const orders = JSON.parse(localStorage.getItem('coverlyOrders') || '[]');
            orders.push(order);
            localStorage.setItem('coverlyOrders', JSON.stringify(orders));
            
            // Update inventory (simulated)
            cart.forEach(item => {
                const product = window.products.find(p => p.id === item.id);
                if (product) {
                    product.stock -= item.quantity;
                }
            });
            window.saveProducts();
            
            // Clear cart
            cart = [];
            localStorage.setItem('coverlyCart', JSON.stringify(cart));
            updateCartCount();
            
            // Clear discounts
            localStorage.removeItem('activeCoupon');
            localStorage.removeItem('usedLoyaltyPoints');
            
            // Show success message
            alert(`Order #${order.id} placed successfully! Total: $${total.toFixed(2)}\nThank you for your purchase!`);
            
            // Redirect to thank you page or home
            loadCart();
        });
    }
    
    // Update free shipping progress
    updateShippingProgress();
}

// Clear cart (for testing)
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('coverlyCart', JSON.stringify(cart));
        updateCartCount();
        localStorage.removeItem('activeCoupon');
        localStorage.removeItem('usedLoyaltyPoints');
        
        if (document.getElementById('cartContent')) {
            loadCart();
        }
        
        showNotification('Cart cleared!');
    }
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateWishlistCount();
    
    // Load cart if on cart page
    if (document.getElementById('cartContent')) {
        loadCart();
    }
    
    // Update free shipping progress
    updateShippingProgress();
});

// Make functions available globally
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
window.loadCart = loadCart;
window.clearCart = clearCart;
window.saveForLater = saveForLater;
window.updateWishlistCount = updateWishlistCount;
