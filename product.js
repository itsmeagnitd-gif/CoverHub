// Product Data - Now loaded from localStorage or initialized with defaults
let products = JSON.parse(localStorage.getItem('coverlyProducts')) || [];

// Initialize default products if none exist
if (products.length === 0) {
    products = [
        {
            id: 1,
            name: "Leather Phone Case",
            description: "Premium genuine leather case with card slots and RFID protection.",
            price: 24.99,
            originalPrice: 35.99,
            discount: 30,
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            category: "cover",
            stock: 50,
            rating: 4.8,
            reviews: 124,
            features: ["Genuine leather", "Card slots", "RFID protection", "Shockproof", "Compatible with wireless charging"],
            badge: "bestseller",
            variants: [
                { color: "Black", price: 24.99, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                { color: "Brown", price: 26.99, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: 2,
            name: "Clear Shockproof Case",
            description: "Crystal clear case with military-grade drop protection.",
            price: 19.99,
            originalPrice: 29.99,
            discount: 33,
            image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            category: "cover",
            stock: 100,
            rating: 4.5,
            reviews: 89,
            features: ["Military-grade protection", "Crystal clear", "Scratch-resistant", "Anti-yellowing", "Easy installation"],
            badge: "new"
        },
        {
            id: 3,
            name: "Silicone Grip Case",
            description: "Soft silicone case with anti-slip grip and raised edges for screen protection.",
            price: 16.99,
            originalPrice: 24.99,
            discount: 32,
            image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            category: "cover",
            stock: 75,
            rating: 4.3,
            reviews: 67,
            features: ["Anti-slip grip", "Soft silicone", "Raised edges", "Scratch-resistant", "Multiple colors"],
            badge: "limited"
        },
        {
            id: 4,
            name: "Wireless Fast Charger",
            description: "15W fast wireless charger with LED indicator and anti-slip surface.",
            price: 34.99,
            originalPrice: 49.99,
            discount: 30,
            image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            category: "accessory",
            stock: 40,
            rating: 4.7,
            reviews: 156,
            features: ["15W fast charging", "LED indicator", "Anti-slip surface", "Universal compatibility", "Overheat protection"],
            badge: "bestseller"
        },
        {
            id: 5,
            name: "Noise Cancelling Earbuds",
            description: "True wireless earbuds with active noise cancellation and 30-hour battery.",
            price: 49.99,
            originalPrice: 69.99,
            discount: 28,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            category: "accessory",
            stock: 30,
            rating: 4.9,
            reviews: 234,
            features: ["Active noise cancellation", "30-hour battery", "Bluetooth 5.3", "IPX7 waterproof", "Touch controls"],
            badge: "hot"
        }
    ];
    localStorage.setItem('coverlyProducts', JSON.stringify(products));
}

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('coverlyProducts', JSON.stringify(products));
}

// Get next available product ID
function getNextProductId() {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
}

// Function to create a product card with all new features
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    // Badge mapping
    const badgeTexts = {
        'new': 'NEW',
        'bestseller': 'BESTSELLER',
        'limited': 'LIMITED',
        'hot': 'HOT DEAL',
        'sale': 'SALE'
    };
    
    const badgeColors = {
        'new': '#4CAF50',
        'bestseller': '#FF9800',
        'limited': '#9C27B0',
        'hot': '#F44336',
        'sale': '#2196F3'
    };
    
    card.innerHTML = `
        ${product.discount ? `<div class="product-badge" style="background-color: ${badgeColors.sale || '#FFC8DD'}">${product.discount}% OFF</div>` : ''}
        ${product.badge && badgeTexts[product.badge] ? `
            <div class="product-badge type-badge" style="background-color: ${badgeColors[product.badge] || '#A2D2FF'}; top: ${product.discount ? '45px' : '15px'}">
                ${badgeTexts[product.badge]}
            </div>
        ` : ''}
        
        ${product.stock < 10 ? `<div class="stock-badge">Only ${product.stock} left!</div>` : ''}
        
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-overlay">
                <a href="#" class="view-details" data-id="${product.id}">View Details</a>
                <button class="quick-view" data-id="${product.id}">
                    <i class="fas fa-eye"></i> Quick View
                </button>
            </div>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-rating">
                ${generateStarRating(product.rating)}
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                <div>
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                ${product.stock ? `<div class="stock-info">In Stock: ${product.stock}</div>` : ''}
            </div>
            
            ${product.variants && product.variants.length > 0 ? `
                <div class="color-variants">
                    ${product.variants.map((variant, index) => `
                        <span class="color-option ${index === 0 ? 'active' : ''}" 
                              data-price="${variant.price}" 
                              data-image="${variant.image}"
                              style="background-color: ${variant.color.toLowerCase()}; border: 2px solid ${index === 0 ? '#333' : '#ddd'}">
                        </span>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="add-to-wishlist" data-id="${product.id}">
                    <i class="far fa-heart"></i>
                </button>
                <button class="add-to-compare" data-id="${product.id}">
                    <i class="fas fa-exchange-alt"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const productId = parseInt(this.getAttribute('data-id'));
        addToCart(productId);
    });
    
    const viewDetailsBtn = card.querySelector('.view-details');
    viewDetailsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = parseInt(this.getAttribute('data-id'));
        showProductDetails(productId);
    });
    
    const quickViewBtn = card.querySelector('.quick-view');
    if (quickViewBtn) {
        quickViewBtn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            showQuickView(productId);
        });
    }
    
    const wishlistBtn = card.querySelector('.add-to-wishlist');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            toggleWishlist(productId);
        });
    }
    
    // Color variant selection
    const colorOptions = card.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update active state
            colorOptions.forEach(opt => opt.style.borderColor = '#ddd');
            this.style.borderColor = '#333';
            
            // Update price and image
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');
            const priceElement = card.querySelector('.current-price');
            const imgElement = card.querySelector('.product-image img');
            
            if (price && priceElement) {
                priceElement.textContent = `$${parseFloat(price).toFixed(2)}`;
            }
            if (image && imgElement) {
                imgElement.src = image;
            }
        });
    });
    
    return card;
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Show product details modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalContent = document.getElementById('modalContent');
    if (!modalContent) return;
    
    // Format features list
    const featuresList = product.features ? 
        product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('') : '';
    
    // Format variants if available
    const variantsSection = product.variants && product.variants.length > 0 ? `
        <div class="product-variants">
            <h4>Available Colors:</h4>
            <div class="variants-selector">
                ${product.variants.map(variant => `
                    <div class="variant-option" data-price="${variant.price}" data-image="${variant.image}">
                        <div class="variant-color" style="background-color: ${variant.color.toLowerCase()}"></div>
                        <span>${variant.color}</span>
                        <span class="variant-price">$${variant.price.toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';
    
    modalContent.innerHTML = `
        <div class="modal-image">
            <img src="${product.image}" alt="${product.name}" id="mainProductImage">
            <div class="image-thumbnails">
                ${product.variants ? product.variants.map(variant => `
                    <img src="${variant.image}" alt="${variant.color}" class="thumbnail" data-image="${variant.image}">
                `).join('') : ''}
            </div>
        </div>
        <div class="modal-info">
            <h2>${product.name}</h2>
            
            <div class="product-rating-large">
                ${generateStarRating(product.rating)}
                <span class="rating-count">${product.reviews} reviews</span>
                <a href="#reviews" class="view-reviews">View all reviews</a>
            </div>
            
            <div class="modal-price">
                $${product.price.toFixed(2)}
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                ${product.discount ? `<span class="discount-badge">${product.discount}% OFF</span>` : ''}
            </div>
            
            <div class="stock-status">
                <i class="fas fa-check-circle" style="color: #4CAF50;"></i>
                <span>${product.stock > 10 ? 'In Stock' : 'Limited Stock'} (${product.stock} available)</span>
            </div>
            
            <p class="modal-description">${product.description}</p>
            
            ${variantsSection}
            
            <div class="product-features">
                <h3>Features</h3>
                <ul>${featuresList}</ul>
            </div>
            
            <div class="quantity-selector-modal">
                <label for="quantity">Quantity:</label>
                <div class="qty-controls">
                    <button class="qty-minus"><i class="fas fa-minus"></i></button>
                    <input type="number" id="quantity" value="1" min="1" max="${product.stock}">
                    <button class="qty-plus"><i class="fas fa-plus"></i></button>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-primary add-to-cart-modal" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-secondary add-to-wishlist-modal" data-id="${product.id}">
                    <i class="far fa-heart"></i> Add to Wishlist
                </button>
                <button class="btn btn-outline" id="closeModalBtn">
                    Continue Shopping
                </button>
            </div>
            
            <div class="product-meta">
                <div class="meta-item">
                    <i class="fas fa-shipping-fast"></i>
                    <span>Free shipping on orders over $50</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-undo"></i>
                    <span>30-day return policy</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>1-year warranty</span>
                </div>
            </div>
        </div>
    `;
    
    // Open modal
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.add('active');
    }
    
    // Add event listeners for modal
    const addToCartModalBtn = modalContent.querySelector('.add-to-cart-modal');
    if (addToCartModalBtn) {
        addToCartModalBtn.addEventListener('click', function() {
            const quantity = parseInt(document.getElementById('quantity').value) || 1;
            addToCart(productId, quantity);
            if (modal) modal.classList.remove('active');
        });
    }
    
    const wishlistModalBtn = modalContent.querySelector('.add-to-wishlist-modal');
    if (wishlistModalBtn) {
        wishlistModalBtn.addEventListener('click', function() {
            toggleWishlist(productId);
        });
    }
    
    // Quantity controls
    const qtyMinus = modalContent.querySelector('.qty-minus');
    const qtyPlus = modalContent.querySelector('.qty-plus');
    const qtyInput = modalContent.querySelector('#quantity');
    
    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', () => {
            let value = parseInt(qtyInput.value);
            if (value > 1) {
                qtyInput.value = value - 1;
            }
        });
        
        qtyPlus.addEventListener('click', () => {
            let value = parseInt(qtyInput.value);
            if (value < product.stock) {
                qtyInput.value = value + 1;
            }
        });
    }
    
    // Variant selection
    const variantOptions = modalContent.querySelectorAll('.variant-option');
    variantOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update active state
            variantOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update price and image
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');
            const priceElement = modalContent.querySelector('.modal-price .current-price');
            const imgElement = document.getElementById('mainProductImage');
            
            if (price && priceElement) {
                priceElement.textContent = `$${parseFloat(price).toFixed(2)}`;
            }
            if (image && imgElement) {
                imgElement.src = image;
            }
        });
    });
    
    // Thumbnail click
    const thumbnails = modalContent.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const image = this.getAttribute('data-image');
            const imgElement = document.getElementById('mainProductImage');
            if (image && imgElement) {
                imgElement.src = image;
            }
        });
    });
}

// Quick view function
function showQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const quickViewHTML = `
        <div class="quick-view-modal">
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quick-view-info">
                <h3>${product.name}</h3>
                <div class="quick-view-price">$${product.price.toFixed(2)}</div>
                <button class="btn add-to-cart-quick" data-id="${product.id}">Add to Cart</button>
                <button class="btn btn-outline view-details-quick" data-id="${product.id}">View Details</button>
            </div>
        </div>
    `;
    
    // Create and show quick view modal
    const quickViewModal = document.createElement('div');
    quickViewModal.className = 'quick-view-overlay';
    quickViewModal.innerHTML = quickViewHTML;
    document.body.appendChild(quickViewModal);
    
    // Add event listeners
    setTimeout(() => {
        quickViewModal.classList.add('active');
        
        const addToCartBtn = quickViewModal.querySelector('.add-to-cart-quick');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                addToCart(productId);
                quickViewModal.remove();
            });
        }
        
        const viewDetailsBtn = quickViewModal.querySelector('.view-details-quick');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function() {
                quickViewModal.remove();
                showProductDetails(productId);
            });
        }
    }, 10);
    
    // Close on click outside
    quickViewModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            quickViewModal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Toggle wishlist
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('coverlyWishlist')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index === -1) {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        showNotification(`${product.name} added to wishlist!`);
    } else {
        wishlist.splice(index, 1);
        showNotification(`${product.name} removed from wishlist!`);
    }
    
    localStorage.setItem('coverlyWishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

// Update wishlist count
function updateWishlistCount() {
    const wishlistCountElements = document.querySelectorAll('.wishlist-count');
    const wishlist = JSON.parse(localStorage.getItem('coverlyWishlist')) || [];
    
    wishlistCountElements.forEach(element => {
        element.textContent = wishlist.length;
    });
}

// Load products based on page
function loadProducts(page = 'home') {
    let container;
    
    switch(page) {
        case 'home':
            container = document.getElementById('bestSellers');
            if (container) {
                container.innerHTML = '';
                const bestSellers = products.slice(0, 6);
                bestSellers.forEach(product => {
                    container.appendChild(createProductCard(product));
                });
            }
            break;
        case 'covers':
            container = document.getElementById('coversGrid');
            if (container) {
                container.innerHTML = '';
                const covers = products.filter(p => p.category === 'cover');
                covers.forEach(product => {
                    container.appendChild(createProductCard(product));
                });
            }
            break;
        case 'accessories':
            container = document.getElementById('accessoriesGrid');
            if (container) {
                container.innerHTML = '';
                const accessories = products.filter(p => p.category === 'accessory');
                accessories.forEach(product => {
                    container.appendChild(createProductCard(product));
                });
            }
            break;
    }
}

// Filter products
function filterProducts(criteria) {
    let filtered = [...products];
    
    if (criteria.category && criteria.category !== 'all') {
        filtered = filtered.filter(p => p.category === criteria.category);
    }
    
    if (criteria.minPrice) {
        filtered = filtered.filter(p => p.price >= criteria.minPrice);
    }
    
    if (criteria.maxPrice) {
        filtered = filtered.filter(p => p.price <= criteria.maxPrice);
    }
    
    if (criteria.rating) {
        filtered = filtered.filter(p => p.rating >= criteria.rating);
    }
    
    return filtered;
}

// Sort products
function sortProducts(productsArray, sortBy) {
    const sorted = [...productsArray];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
        case 'popular':
            return sorted.sort((a, b) => b.reviews - a.reviews);
        default:
            return sorted;
    }
}

// Initialize product functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check current page and load products
    if (document.getElementById('bestSellers')) {
        loadProducts('home');
    }
    if (document.getElementById('coversGrid')) {
        loadProducts('covers');
    }
    if (document.getElementById('accessoriesGrid')) {
        loadProducts('accessories');
    }
    
    // Update wishlist count
    updateWishlistCount();
});

// Make functions globally available
window.products = products;
window.saveProducts = saveProducts;
window.getNextProductId = getNextProductId;
window.loadProducts = loadProducts;
window.filterProducts = filterProducts;
window.sortProducts = sortProducts; 
