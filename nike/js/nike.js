
document.addEventListener('DOMContentLoaded', function() {
    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    var fadeElems = document.querySelectorAll('.fade-in-up');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(function(elem) {
        observer.observe(elem);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Handle nested dropdowns
    document.querySelectorAll('.dropdown-submenu > a').forEach(function(element) {
        element.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                e.stopPropagation();
                if (this.nextElementSibling.style.display === 'block') {
                    this.nextElementSibling.style.display = 'none';
                } else {
                    this.nextElementSibling.style.display = 'block';
                }
            }
        });
    });
});

    document.addEventListener('DOMContentLoaded', function() {
        var navbar = document.querySelector('.navbar');
        var navbarCollapse = document.querySelector('.navbar-collapse');
        var dropdowns = document.querySelectorAll('.dropdown, .dropdown-submenu');

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.padding = '10px 0';
            } else {
                navbar.style.padding = '20px 0';
            }
        });

        // Handle mobile menu toggles
        if (window.innerWidth <= 991) {
            dropdowns.forEach(function(dropdown) {
                dropdown.querySelector('.dropdown-toggle').addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.parentNode.classList.toggle('show');
                    var submenu = this.nextElementSibling;
                    if (submenu) {
                        submenu.classList.toggle('show');
                    }
                });
            });
        }

        // Handle side menu for mobile
        document.querySelector('.navbar-toggler').addEventListener('click', function() {
            // Toggle the visibility of the navbar collapse on button click
            navbarCollapse.classList.toggle('show');
        });

        // Close side menu when clicking outside
        document.addEventListener('click', function(event) {
            var isClickInside = navbar.contains(event.target);
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                // Close all open dropdowns and submenus
                document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
                    menu.classList.remove('show');
                });
                document.querySelectorAll('.dropdown.show, .dropdown-submenu.show').forEach(function(dropdown) {
                    dropdown.classList.remove('show');
                });
            }
        });
    });
    
    
// Fetch Code
let products = [];
let cart = [];

async function loadProducts() {
    try {
        const response = await fetch('../product/productdetails.json');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function displayProducts(productsToShow) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    // Assuming productsToShow contains all products from the JSON file
    const nikeProducts = productsToShow.filter(product => product.category === "nike");

    nikeProducts.forEach(product => {
        const productCard = `
            <div class="col-md-4 col-lg-3 mb-4">
                <div class="card product-card h-100">
                    <a href="../product/product.html?id=${product.id}" class="activeLink">
                        <img src="${product.images[0]}" class="card-img-top product-image" alt="${product.name}">
                    </a>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">MWK ${product.price.toLocaleString()}</p>
                        <button class="btn btn-primary mt-auto add-to-cart" data-id="${product.id}">Add to Cart</button><br>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Handle "Buy Now" button clicks
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', event => {
            const productId = parseInt(event.target.getAttribute('data-id'));
            window.location.href = `../../checkout/checkoutpage.html?productId=${productId}`;
        });
    });

    
}



// Initialize the product display on page load
document.addEventListener('DOMContentLoaded', loadProducts);


function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (product) {
        cart.push(product);
        updateCartCount();
        showToast(`${product.name} added to cart!`);
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.length;
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '';
        return;
    }

    cart.forEach(item => {
        const cartItem = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${item.name}</span>
                <span>MWK ${item.price.toLocaleString()}</span>
                <button class="btn btn-sm btn-danger remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItems.innerHTML += cartItem;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Total: MWK ${total.toLocaleString()}`;

    // Add event listeners to "Remove" buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function removeFromCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const removedProduct = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCart();
    if (removedProduct) {
        showToast(`${removedProduct.name} removed from cart!`);
    }
}

function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">SneakerVault</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);

    const searchInput = document.getElementById('searchInput');
    const subCategoryFilter = document.getElementById('subCategoryFilter');
    const sortSelect = document.getElementById('sortSelect');
    const cartIcon = document.getElementById('cartIcon');
    const checkoutBtn = document.getElementById('checkoutBtn');

    searchInput.addEventListener('input', filterProducts);
    subCategoryFilter.addEventListener('change', filterProducts);
    sortSelect.addEventListener('change', filterProducts);

    cartIcon.addEventListener('click', (event) => {
        event.preventDefault();
        displayCart();
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        cartModal.show();
    });

    checkoutBtn.addEventListener('click', () => {
        alert('Checkout functionality not implemented in this demo.');
    });
});

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const subCategory = document.getElementById('subCategoryFilter').value;
    const sortBy = document.getElementById('sortSelect').value;

    let filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) &&
        (subCategory === '' || product.subcategory === subCategory)
    );

    if (sortBy === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    displayProducts(filteredProducts);
}

