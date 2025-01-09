// Produk dengan foto, slogan, spesifikasi, dan ulasan awal
const products = [
    {
        id: 1,
        name: "POD G88",
        price: "IDR 220.000",
        image: "images/pod_g88.png",
        slogan: "Compact. Powerful. Reliable.",
        specs: "Battery: 800mAh, Capacity: 2ml, Output: 15W",
        reviews: [
            { username: "user1", rating: 5, review: "Amazing product! Highly recommend." },
            { username: "user2", rating: 4, review: "Very good, but could be cheaper." }
        ]
    },
    {
        id: 2,
        name: "Ambatu MOD",
        price: "IDR 650.000",
        image: "images/ambatu_mod.png",
        slogan: "For the Pros, By the Pros.",
        specs: "Battery: Dual 18650, Wattage: 200W, Chipset: AmbatuPro",
        reviews: [
            { username: "user3", rating: 4, review: "Solid performance and design." }
        ]
    },
    {
        id: 3,
        name: "Rusdi AIO",
        price: "IDR 1.420.000",
        image: "images/rusdi_aio.png",
        slogan: "All-in-One Performance.",
        specs: "Battery: 3000mAh, Tank: 4ml, Coil: Mesh Technology",
        reviews: []
    }
];

// Muat produk secara dinamis ke halaman
const productList = document.getElementById('product-list');
if (productList) {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p><strong>${product.slogan}</strong></p>
            <p>${product.specs}</p>
            <p>Price: ${product.price}</p>
            <div class="reviews">
                <h4>Reviews:</h4>
                <div id="review-list-${product.id}">
                    ${product.reviews.map(r => `
                        <p><strong>${r.username}:</strong> ${'⭐'.repeat(r.rating)}<br>${r.review}</p>
                    `).join('')}
                </div>
                <form class="review-form" data-product-id="${product.id}">
                    <label for="rating-${product.id}">Rating:</label>
                    <select id="rating-${product.id}" required>
                        <option value="1">1 ⭐</option>
                        <option value="2">2 ⭐</option>
                        <option value="3">3 ⭐</option>
                        <option value="4">4 ⭐</option>
                        <option value="5">5 ⭐</option>
                    </select>
                    <textarea id="review-${product.id}" placeholder="Write your review here" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        `;
        productList.appendChild(productDiv);
    });

    // Tambahkan event listener untuk semua formulir ulasan
    document.querySelectorAll('.review-form').forEach(form => {
        // Submit review to backend
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const productId = form.getAttribute('data-product-id');
    const rating = document.getElementById(`rating-${productId}`).value;
    const review = document.getElementById(`review-${productId}`).value;
    const username = localStorage.getItem('username'); // Replace with actual logged-in user

    try {
        const response = await fetch('save_review.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, username, rating, review })
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
        } else {
            alert(result.message);
            // Update UI dynamically
            const reviewList = document.getElementById(`review-list-${productId}`);
            reviewList.innerHTML += `<p><strong>${username}:</strong> ${'⭐'.repeat(rating)}<br>${review}</p>`;
            form.reset();
        }
    } catch (error) {
        alert('Error saving review. Please try again later.');
    }
});

    });
    
}

// Fungsi untuk memuat ulasan dari database
const loadReviews = async (productId) => {
    try {
        const response = await fetch(`get_reviews.php?product_id=${productId}`);
        const result = await response.json();
        if (result.error) {
            console.error(result.error);
        } else {
            const reviewList = document.getElementById(`review-list-${productId}`);
            reviewList.innerHTML = result.reviews.map(r => `
                <p><strong>${r.username}:</strong> ${'⭐'.repeat(r.rating)}<br>${r.review}</p>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
};

// Memuat ulasan untuk semua produk
products.forEach(product => {
    loadReviews(product.id);
});


// Login form handler
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        try {
            const response = await fetch('login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (result.error) {
                alert(result.error);
            } else {
                alert(result.message);
                localStorage.setItem('username', username);
                window.location.href = 'index.html'; // Redirect ke halaman utama
            }
        } catch (error) {
            alert('Error logging in. Please try again later.');
        }
    });
}

// Cek status login
const checkLoginStatus = () => {
    const username = localStorage.getItem('username');
    const nav = document.querySelector('nav ul');

    if (username) {
        nav.innerHTML = `
            <li><a href="#about">About</a></li>
            <li><a href="#story">Story</a></li>
            <li><a href="#products">Products</a></li>
            <li><button style="border: none; background: none; font-family: Arial, sans-serif; font-weight: bold; color: #ee0a74; cursor: pointer; padding: 0; margin: 0; font-size: 16px; transition: all 0.3s ease;" 
        onmouseover="this.style.color='#10c0ec';" 
        onmouseout="this.style.color='#ee0a74'; this.style.fontSize='16px';" id="logout-button">Logout</button></li>
        `;

        // Tambahkan event listener untuk tombol logout
        document.getElementById('logout-button').addEventListener('click', () => {
            localStorage.removeItem('username');
            alert('Logged out successfully.');
            location.reload();
        });
    }
};

// Panggil fungsi cek status login
checkLoginStatus();
