// Simple form validation and gamification progress simulation

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const progressBar = document.getElementById('progress');
    const message = document.getElementById('message');

    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginSection = document.getElementById('loginSection');
    const signupSection = document.getElementById('signupSection');
    const forgotPasswordLink = document.getElementById('forgotPassword');

    let progressPercent = 0;

    function updateProgress() {
        progressPercent += 20;
        if (progressPercent > 100) progressPercent = 100;
        progressBar.style.width = progressPercent + '%';

        if (progressPercent === 100) {
            message.textContent = "🎉 Congratulations! You've reached your wellness milestone!";
        } else {
            message.textContent = `🧠 Progress: ${progressPercent}% towards your next mental health activity reward!`;
        }
    }

    // Tab switching logic
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginSection.classList.remove('hidden');
        signupSection.classList.add('hidden');
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupSection.classList.remove('hidden');
        loginSection.classList.add('hidden');
    });

    // Forgot password logic
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = prompt('Enter your email address to reset password:');
        if (email) {
            const users = JSON.parse(localStorage.getItem('mindCareUsers')) || [];
            const user = users.find(u => u.email === email);
            if (user) {
                alert('Password reset link sent to your email. (Simulated)');
            } else {
                alert('No account found with that email.');
            }
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        if (username === '' || password === '') {
            alert('Please fill in both username and password.');
            return;
        }

        // Check against stored users
        const users = JSON.parse(localStorage.getItem('mindCareUsers')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            alert('Login successful! Welcome back to MindCare.');
            updateProgress();
            // Redirect to chatbot page
            window.location.href = 'chatbot.html';
        } else {
            alert('Invalid username or password.');
        }

        // Clear form fields
        loginForm.reset();
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = signupForm.username.value.trim();
        const email = signupForm.email.value.trim();
        const password = signupForm.password.value.trim();
        const confirmPassword = signupForm.confirmPassword.value.trim();

        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Check if username already exists
        const users = JSON.parse(localStorage.getItem('mindCareUsers')) || [];
        if (users.find(u => u.username === username)) {
            alert('Username already exists. Please choose a different one.');
            return;
        }

        // Save new user
        users.push({ username, email, password });
        localStorage.setItem('mindCareUsers', JSON.stringify(users));

        alert('Account created successfully! You can now log in.');

        // Switch to login tab after signup
        loginTab.click();

        // Clear form fields
        signupForm.reset();
    });
});
