import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// UPDATED IMPORTS to match your uploaded file names
import { renderAuthScreen } from './SignUpScreen.js';
import { renderIntakeScreen } from './intakescreen.js';
import { renderQuestionsScreen } from './questionsscreen.js';
import { renderResultScreen } from './resultscreen.js';

// 1. Centralized screen controller
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
        console.error(`CRITICAL: Screen ID "${screenId}" not found.`);
    }
}

// 2. Authentication State Listener
onAuthStateChanged(auth, (user) => {
    console.log("Auth State:", user ? "User logged in" : "User logged out");
    
    if (user) {
        // If logged in, go to intake
        const container = document.getElementById('intake-screen');
        showScreen('intake-screen');
        renderIntakeScreen(container);
    } else {
        // If not logged in, go to signup
        const container = document.getElementById('auth-screen');
        showScreen('auth-screen');
        renderAuthScreen(container);
    }
});

// 3. Fallback: If no auth state change detected after a delay, 
// default to auth screen to prevent "black screen"
setTimeout(() => {
    const active = document.querySelector('.page.active');
    if (!active) {
        console.log("Defaulting to Auth Screen");
        showScreen('auth-screen');
        renderAuthScreen(document.getElementById('auth-screen'));
    }
}, 2000);