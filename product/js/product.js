document.addEventListener('DOMContentLoaded', () => {
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    // Add to cart functionality (same as before)
    const addToCartBtn = document.getElementById('addToCartBtn');
    const sizeSelect = document.getElementById('sizeSelect');
    const quantityInput = document.getElementById('quantityInput');

    addToCartBtn.addEventListener('click', () => {
        const selectedSize = sizeSelect.value;
        const quantity = parseInt(quantityInput.value, 10);

        if (!selectedSize) {
            showToast('Please select a size', 'warning');
            return;
        }

        if (quantity < 1) {
            showToast('Please enter a valid quantity', 'warning');
            return;
        }

        // Add to cart logic (replace with actual cart management)
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            size: selectedSize,
            quantity: quantity
        };

        // Simulating adding to cart
        console.log('Added to cart:', cartItem);
        showToast(`${quantity} x ${product.name} (Size: ${selectedSize}) added to cart!`, 'success');

        // Update cart count (replace with actual cart count management)
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = parseInt(cartCount.textContent) + quantity;
    });
});

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

    //Static Retriving Code
    // Function to get the ID parameter from the URL
    function getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id'));
    }

    // Fetch and display the product details based on ID
    async function loadProductDetails() {
        const productId = getProductIdFromURL();
        try {
            const response = await fetch('productdetails.json'); // Update with the correct path to products.json
            const products = await response.json();

            // Find the product with matching ID
            const product = products.find(p => p.id === productId);

            if (product) {
                // Display product details
                document.getElementById('productName').textContent = product.name;
                document.getElementById('productPrice').textContent = `MWK ${product.price.toLocaleString()}`;
                document.getElementById('productDescription').textContent = product.description;

                // Populate carousel images
                const carouselInner = document.querySelector('.carousel-inner');
                carouselInner.innerHTML = ''; // Clear existing items

                product.images.forEach((imageUrl, index) => {
                    const carouselItem = document.createElement('div');
                    carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;
                    carouselItem.innerHTML = `<img src="${imageUrl}" class="d-block w-100" alt="${product.name} Image ${index + 1}">`;
                    carouselInner.appendChild(carouselItem);
                });
            } else {
                // If no product is found with that ID
                document.getElementById('productName').textContent = 'Product Not Found';
                document.getElementById('productPrice').textContent = '';
                document.getElementById('productDescription').textContent = '';
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
            document.getElementById('productName').textContent = 'Error loading product data';
        }
    }

    // Run the function to load product details when the page loads
    loadProductDetails();
