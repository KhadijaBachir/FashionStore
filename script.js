// Fonctions globales
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Gestion du panier
let cart = [];

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

function addToCart(productId, productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    showAddToCartNotification(productName);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

function updateCartDisplay() {
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <p>Votre panier est vide</p>
            </div>
        `;
        cartTotalEl.textContent = 'Total: 0.00€';
        return;
    }
    
    let itemsHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">${item.price.toFixed(2)}€ x ${item.quantity}</p>
                    <span class="cart-item-remove" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i> Supprimer
                    </span>
                </div>
            </div>
        `;
    });
    
    cartItemsEl.innerHTML = itemsHTML;
    cartTotalEl.textContent = `Total: ${total.toFixed(2)}€`;
}

function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide!');
        return;
    }
    
    alert('Commande passée avec succès! Merci pour votre achat.');
    cart = [];
    updateCartCount();
    updateCartDisplay();
    toggleCart();
}

function showAddToCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification fade-in';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} ajouté au panier</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Affichage des produits
function displayProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid) return;
    
    const products = [
        {
            id: 1,
            name: "T-shirt Premium",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
            description: "T-shirt en coton bio de haute qualité"
        },
        {
            id: 2,
            name: "Jean Slim",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            description: "Jean slim stretch confortable"
        },
        {
            id: 6,
            name: "Chaussures de Sport",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
            description: "Chaussures running légères et respirantes"
        },
       
        {
            id: 4,
            name: "Veste en cuir",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            description: "Veste en cuir véritable"
        },
        {
            id: 6,
            name: "Doudoune longue hiver",
            price: 179.99,
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80",
            description: "Doudoune longue isolée pour grand froid"
        },
        {
            id: 7,
            name: "Manteau en cachemire",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
            description: "Manteau luxueux en cachemire pur"
        },
        {
            id: 7,
            name: "Sac à Dos Urbain",
            price: 45.50,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            description: "Sac spacieux avec compartiment pour ordinateur portable"
        },
        {
            id: 9,
            name: "Montre Fitness",
            price: 159.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
            description: "Montre intelligente avec suivi d'activité et notifications"
        },
        {
            id: 12,
            name: "Short Denim Destroy",
            price: 39.99,
            image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
            description: "Short déchiré style urbain, matière stretch"
        }
       
    ];
    
    let productsHTML = '';
    
    products.forEach(product => {
        productsHTML += `
            <div class="product-card" data-aos="fade-up">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">${product.price.toFixed(2)}€</p>
                    <p>${product.description}</p>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')" class="add-to-cart">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `;
    });
    
    productsGrid.innerHTML = productsHTML;
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    
    // Fermer le panier en cliquant à l'extérieur
    document.getElementById('cartModal').addEventListener('click', function(e) {
        if (e.target === this) {
            toggleCart();
        }
    });
});