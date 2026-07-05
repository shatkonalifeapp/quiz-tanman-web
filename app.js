import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { renderAuthScreen } from './signup.js';
import { renderIntakeScreen } from './intake.js';
import { renderQuestionsScreen } from './questions.js';
import { renderResultScreen } from './results.js';

export function showScreen(screenId) {
    document.querySelectorAll('.page').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        renderIntakeScreen(document.getElementById('intake-screen'));
        showScreen('intake-screen');
    } else {
        renderAuthScreen(document.getElementById('auth-screen'));
        showScreen('auth-screen');
    }
});