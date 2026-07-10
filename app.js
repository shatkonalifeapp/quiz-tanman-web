import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { renderSignUpScreen } from './SignUpScreen.js';
import { renderIntakeScreen } from './intakescreen.js';
import { renderQuestionsScreen } from './questionsscreen.js';
import { renderResultScreen } from './resultscreen.js';

export function showScreen(screenId) {
    const screens = document.querySelectorAll('.page');
    screens.forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active');
    });

    const target = document.getElementById(screenId);
    if (target) {
        target.style.display = 'flex';
        target.classList.add('active');
    } else {
        console.error(`Screen ID "${screenId}" not found.`);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        showScreen('intake-screen');
        renderIntakeScreen(document.getElementById('intake-screen'));
    } else {
        // MATCHED: Now using the exact ID from your HTML
        showScreen('SignUp-Screen');
        renderSignUpScreen(document.getElementById('SignUp-Screen'));
    }
});