/**
 * Tanman Intake Screen - Web Version
 * Optimized state machine for DOM manipulation
 */

const state = {
    viewState: 'hook',
    currentCardIndex: 0,
    redFlags: {},
};

const safetyQuestions = [
    { key: 'saddleNumbness', text: 'Sudden numbness or tingling in your groin or saddle area?' },
    { key: 'bowelBladder', text: 'Recent, unexplained loss of bowel or bladder control?' },
    { key: 'severeWeakness', text: 'Unexplained severe leg weakness or instability?' }
];

export function renderIntakeScreen(container) {
    const updateUI = () => {
        container.innerHTML = getTemplateForState();
        attachListeners();
    };

    const getTemplateForState = () => {
        switch (state.viewState) {
            case 'hook':
                return `
                    <div class="screen">
                        <h1>What’s your focus today?</h1>
                        <button class="option-btn" data-next="compatibilityCheck">Mobility & Pain Relief</button>
                    </div>
                `;
            case 'compatibilityCheck':
                // Check if we are done with all safety questions
                if (state.currentCardIndex >= safetyQuestions.length) {
                    state.viewState = 'mainIntake';
                    return getTemplateForState();
                }
                const q = safetyQuestions[state.currentCardIndex];
                return `
                    <div class="card">
                        <p>${q.text}</p>
                        <button class="choice-btn" data-val="true">Yes</button>
                        <button class="choice-btn" data-val="false">No</button>
                    </div>
                `;
            case 'mainIntake':
                return `
                    <div class="card">
                        <h1>Intake Complete</h1>
                        <p>Proceeding to your assessment...</p>
                        <button id="start-quiz-btn" class="primary-btn">Start Assessment</button>
                    </div>
                `;
            default:
                return `<div>Loading...</div>`;
        }
    };

    const attachListeners = () => {
        // Handle view navigation
        container.querySelectorAll('[data-next]').forEach(btn => {
            btn.onclick = () => {
                state.viewState = btn.dataset.next;
                updateUI();
            };
        });

        // Handle safety question choices
        container.querySelectorAll('.choice-btn').forEach(btn => {
            btn.onclick = (e) => {
                const val = e.target.dataset.val === 'true';
                const currentKey = safetyQuestions[state.currentCardIndex].key;
                state.redFlags[currentKey] = val;
                
                // Logic: If 'Yes' to a safety question, redirect to safety warning
                if (val) {
                    state.viewState = 'safetyRedirect';
                    updateUI();
                } else {
                    state.currentCardIndex++;
                    updateUI();
                }
            };
        });

        // Handle Final Intake Button
        const startBtn = document.getElementById('start-quiz-btn');
        if (startBtn) {
            startBtn.onclick = () => {
                // Trigger the flow to questions screen
                import('./app.js').then(module => module.showScreen('questions-screen'));
            };
        }
    };

    updateUI();
}