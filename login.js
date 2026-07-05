import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { showScreen } from './app.js';

export function renderLoginScreen(container) {
    container.innerHTML = `
        <div class="card">
            <h1>Login</h1>
            <input type="email" id="login-email" placeholder="Email" class="input" />
            <div class="password-wrapper">
                <input type="password" id="login-password" placeholder="Password" class="input" />
            </div>
            <button id="login-submit-btn" class="primary-btn">Login</button>
            <button id="forgot-pass-btn" class="secondary-btn">Forgot Password?</button>
        </div>
    `;

    // Handle Login
    document.getElementById('login-submit-btn').onclick = async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) return alert("Please fill all fields.");

        try {
            await signInWithEmailAndPassword(getAuth(), email.trim(), password);
            // On success, Firebase state listener in app.js will handle redirect
        } catch (err) {
            alert(err.message);
        }
    };

    // Handle Forgot Password
    document.getElementById('forgot-pass-btn').onclick = () => {
        alert("Redirecting to reset...");
    };
}