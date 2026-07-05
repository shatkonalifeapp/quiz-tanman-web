import { tanmanQuestionsTextMap } from './scoringEngine.js'; // Ensure path is correct[cite: 5]

export function renderQuestionsScreen(container) {
    let currentIndex = 0;
    const questionKeys = Object.keys(tanmanQuestionsTextMap);

    const render = () => {
        const q = tanmanQuestionsTextMap[questionKeys[currentIndex]];
        container.innerHTML = `
            <div class="card">
                <p>${q.text}</p>
                <button class="opt-btn" data-val="0">Never</button>
                <button class="opt-btn" data-val="1">Always</button>
            </div>
        `;
    };
    render();
}