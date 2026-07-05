import { getFirestore, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { tanmanQuestionsTextMap, calculateTriageResults } from './scoringEngine.js';

const db = getFirestore();
const auth = getAuth();

export function renderQuestionsScreen(container, onComplete) {
    let state = {
        answers: {},
        currentIndex: 0,
        lang: 'en'
    };

    const questionKeys = Object.keys(tanmanQuestionsTextMap);

    const render = () => {
        const currentQKey = questionKeys[state.currentIndex];
        const currentQ = tanmanQuestionsTextMap[currentQKey];
        const options = getOptions(currentQ.scaleType, state.lang);

        container.innerHTML = `
            <div class="questions-container">
                <div class="header">
                    <span>Q ${state.currentIndex + 1} / ${questionKeys.length}</span>
                    <button id="lang-toggle">${state.lang.toUpperCase()}</button>
                </div>
                <div class="card">
                    <p>${currentQ.text}</p>
                </div>
                <div class="options">
                    ${options.map((opt, i) => `<button class="opt-btn" data-index="${i}">${opt}</button>`).join('')}
                </div>
                <button id="back-btn" ${state.currentIndex === 0 ? 'disabled' : ''}>← Back</button>
            </div>
        `;

        attachListeners();
    };

    const attachListeners = () => {
        container.querySelectorAll('.opt-btn').forEach(btn => {
            btn.onclick = (e) => {
                state.answers[questionKeys[state.currentIndex]] = parseInt(e.target.dataset.index);
                if (state.currentIndex < questionKeys.length - 1) {
                    state.currentIndex++;
                    render();
                } else {
                    saveResults();
                }
            };
        });

        document.getElementById('lang-toggle').onclick = () => {
            state.lang = state.lang === 'en' ? 'hi' : (state.lang === 'hi' ? 'as' : 'en');
            render();
        };
    };

    async function saveResults() {
        container.innerHTML = `<div class="loading">Analyzing somatic data...</div>`;
        try {
            const user = auth.currentUser;
            if (user) {
                const legacyTriage = calculateTriageResults(state.answers);
                await updateDoc(doc(db, "users", user.uid), {
                    ...legacyTriage,
                    quiz_answers: state.answers,
                    quiz_completed_at: serverTimestamp(),
                    hasCompletedQuiz: true
                });
                onComplete(legacyTriage);
            }
        } catch (e) {
            alert("Error saving results.");
        }
    }

    render();
}

function getOptions(type, lang) {
    const templates = { frequency: { en: ["Never", "Sometimes", "Often", "Always"], hi: ["कभी नहीं", "कभी-कभी", "अक्सर", "हमेशा"], as: ["কেতিয়াও নহয়", "কেতিয়াবা", "সঘনাই", "সদায়"] } };
    return templates[type]?.[lang] || templates.frequency[lang];
}