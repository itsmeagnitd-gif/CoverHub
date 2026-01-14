// Product Data
const products = [
    {
        id: 1,
        name: "Leather Phone Case",
        description: "Premium genuine leather case with card slots and RFID protection.",
        price: 24.99,
        originalPrice: 35.99,
        discount: 30,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "cover",
        features: ["Genuine leather", "Card slots", "RFID protection", "Shockproof", "Compatible with wireless charging"]
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
        features: ["Military-grade protection", "Crystal clear", "Scratch-resistant", "Anti-yellowing", "Easy installation"]
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
        features: ["Anti-slip grip", "Soft silicone", "Raised edges", "Scratch-resistant", "Multiple colors"]
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
        features: ["15W fast charging", "LED indicator", "Anti-slip surface", "Universal compatibility", "Overheat protection"]
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
        features: ["Active noise cancellation", "30-hour battery", "Bluetooth 5.3", "IPX7 waterproof", "Touch controls"]
    },
    {
        id: 6,
        name: "Multi-Port Charging Hub",
        description: "65W charging hub with 4 USB-C ports and 2 USB-A ports.",
        price: 39.99,
        originalPrice: 59.99,
        discount: 33,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "accessory",
        features: ["65W total output", "4 USB-C ports", "2 USB-A ports", "Compact design", "Overcharge protection"]
    },
    {
        id: 7,
        name: "Car Phone Holder",
        description: "Adjustable car phone holder with strong suction cup and one-hand operation.",
        price: 14.99,
        originalPrice: 22.99,
        discount: 35,
        image: "https://images.unsplash.com/photo-1602030638410-6f5d870c5dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "accessory",
        features: ["Strong suction cup", "360° rotation", "One-hand operation", "Universal compatibility", "Vent/dashboard mount"]
    },
    {
        id: 8,
        name: "Tempered Glass Screen Protector",
        description: "9H hardness tempered glass with oleophobic coating and easy installation kit.",
        price: 9.99,
        originalPrice: 14.99,
        discount: 33,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "accessory",
        features: ["9H hardness", "Oleophobic coating", "Bubble-free installation", "Crystal clear", "Scratch-resistant"]
    },
    {
        id: 9,
        name: "Magnetic Phone Ring Holder",
        description: "360° rotatable magnetic ring holder with strong adhesive and multiple colors.",
        price: 7.99,
        originalPrice: 12.99,
        discount: 38,
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "accessory",
        features: ["360° rotation", "Strong adhesive", "Multiple colors", "Easy to install", "Magnetic attachment"]
    },
    {
        id: 10,
        name: "Waterproof Pouch",
        description: "Universal waterproof phone pouch for swimming, beach, and outdoor activities.",
        price: 12.99,
        originalPrice: 19.99,
        discount: 35,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "accessory",
        features: ["IPX8 waterproof", "Touchscreen compatible", "Adjustable neck strap", "Universal size", "Beach & pool safe"]
    }
];

// Function to create a product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    card.innerHTML = `
        ${product.discount ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-overlay">
                <a href="#" class="view-details" data-id="${product.id}">View Details</a>
            </div>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                <div>
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
            </div>
            <button class="add-to-cart" data-id="${product.id}">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
    
    // Add event listener for Add to Cart button
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const productId = parseInt(this.getAttribute('data-id'));
        addToCart(productId);
    });
    
    // Add event listener for View Details button
    const viewDetailsBtn = card.querySelector('.view-details');
    viewDetailsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = parseInt(this.getAttribute('data-id'));
        showProductDetails(productId);
    });
    
    return card;
}

// Function to show product details in modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="modal-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-info">
            <h2>${product.name}</h2>
            <div class="modal-price">
                $${product.price.toFixed(2)}
                ${product.originalPrice ? `<span style="text-decoration: line-through; color: #999; font-size: 1.2rem; margin-left: 10px;">$${product.originalPrice.toFixed(2)}</span>` : ''}
                ${product.discount ? `<span style="background-color: var(--primary); color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.9rem; margin-left: 10px;">${product.discount}% OFF</span>` : ''}
            </div>
            <p class="modal-description">${product.description}</p>
            
            <div class="modal-features">
                <h3>Features</h3>
                <ul>
                    ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-primary add-to-cart-modal" data-id="${product.id}" style="flex: 2;">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" id="closeModalBtn">
                    Continue Shopping
                </button>
            </div>
        </div>
    `;
    
    // Open modal
    const modal = document.getElementById('productModal');
    modal.classList.add('active');
    
    // Add event listener for Add to Cart in modal
    const addToCartModalBtn = modalContent.querySelector('.add-to-cart-modal');
    addToCartModalBtn.addEventListener('click', function() {
        addToCart(productId);
        modal.classList.remove('active');
    });
    
    // Add event listener for close modal button
    const closeModalBtn = modalContent.querySelector('#closeModalBtn');
    closeModalBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
}

// Function to load best sellers on home page
function loadBestSellers() {
    const bestSellersGrid = document.getElementById('bestSellers');
    if (!bestSellersGrid) return;
    
    // Get first 6 products as best sellers
    const bestSellers = products.slice(0, 6);
    
    bestSellers.forEach(product => {
        const productCard = createProductCard(product);
        bestSellersGrid.appendChild(productCard);
    });
}

// Initialize product functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load best sellers on home page
    loadBestSellers();
    
    // Add event listener for close modal button
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            const modal = document.getElementById('productModal');
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    const modalOverlay = document.getElementById('productModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
    
    // Update cart count on all pages
    updateCartCount();
});
