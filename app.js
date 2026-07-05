import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from "firebase/auth";
import { renderIntake } from './intake.js';
import { renderAuthScreen } from './auth.js'; 

export function showScreen(screenId) {
    const targetScreen = document.getElementById(screenId);

    // 1. Hide all sections EXCEPT the one we want to show
    document.querySelectorAll('section').forEach(s => {
        if (s.id !== screenId) {
            s.classList.remove('active');
            // Hide after transition (300ms)
            setTimeout(() => { s.style.display = 'none'; }, 300);
        }
    });

    // 2. Show target immediately
    targetScreen.style.display = 'block';
    
    // 3. Trigger fade-in
    setTimeout(() => {
        targetScreen.classList.add('active');
    }, 50);
}

// --- App Initialization ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        renderIntake();
        showScreen('intake-screen');
    } else {
        renderAuthScreen();
        showScreen('auth-screen');
    }
});  