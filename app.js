import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { renderAuthScreen } from './signup.js';
import { renderIntakeScreen } from './intake.js';
import { renderQuestionsScreen } from './questions.js';
import { renderResultScreen } from './results.js';

export function showScreen(screenId) {
    const screens = document.querySelectorAll('.page');
    screens.forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active');
    });

    const target = document.getElementById(screenId);
    if (target) {
        target.style.display = 'flex'; // Consistent with your CSS
        target.classList.add('active');
    } else {
        console.error(`CRITICAL: Screen ID "${screenId}" not found in index.html`);
    }
}

onAuthStateChanged(auth, (user) => {
    console.log("Auth State Changed. User:", user ? "Logged In" : "Logged Out");
    if (user) {
        showScreen('intake-screen');
        renderIntakeScreen(document.getElementById('intake-screen'));
    } else {
        showScreen('auth-screen');
        renderAuthScreen(document.getElementById('auth-screen'));
    }
});