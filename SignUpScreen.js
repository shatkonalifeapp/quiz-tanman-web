import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

export function renderAuthScreen(container) {
    container.innerHTML = `
        <div class="card">
            <h1>Create Account</h1>
            <input type="email" id="email" placeholder="Email" class="input" />
            <input type="password" id="password" placeholder="Password" class="input" />
            <button id="signupBtn" class="primary-btn">Sign Up</button>
        </div>
    `;

    document.getElementById('signupBtn').onclick = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            const auth = getAuth();
            const db = getFirestore();
            const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
            await setDoc(doc(db, "users", cred.user.uid), {
                email: email.toLowerCase(),
                hasCompletedQuiz: false
            });
        } catch (err) { alert(err.message); }
    };
}