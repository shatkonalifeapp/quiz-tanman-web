// Use CDN links for browser-native modular imports
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Removed the self-executing call so app.js controls the rendering
export function renderAuthScreen(container) {
    container.innerHTML = `
        <div class="card">
            <h1>Create Account</h1>
            <input type="email" id="email" placeholder="Email" class="input" />
            <input type="password" id="password" placeholder="Password" class="input" />
            
            <div class="terms">
                <input type="checkbox" id="termsCheck">
                <label for="termsCheck">I agree to the Terms</label>
            </div>

            <button id="signupBtn" class="primary-btn">Sign Up</button>
        </div>
    `;

    document.getElementById('signupBtn').onclick = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const agreed = document.getElementById('termsCheck').checked;

        if (!email || !password) return alert("Please fill in all fields.");
        if (!agreed) return alert("Please agree to terms.");

        try {
            const auth = getAuth();
            const db = getFirestore();
            const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
            
            await setDoc(doc(db, "users", cred.user.uid), {
                email: email.toLowerCase(),
                role: 'member',
                hasCompletedQuiz: false,
                createdAt: new Date().toISOString()
            });
            alert("Sign up successful!");
            // After success, Firebase auth state change will trigger the redirect in app.js
        } catch (err) {
            alert(err.message);
        }
    };
}