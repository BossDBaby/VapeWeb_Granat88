// Simpan daftar pengguna sementara (gunakan database untuk aplikasi nyata)
let users = [];

// Signup form handler
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
    
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        try {
            const response = await fetch('signup.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (result.error) {
                alert(result.error);
            } else {
                alert(result.message);
                window.location.href = 'login.html';
            }
        } catch (error) {
            alert('Error signing up. Please try again later.');
        }
    });    
}
