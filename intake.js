/**
 * Tanman Intake Screen - Web Version
 * Translates React Native state logic to DOM manipulation
 */

// State Object to mirror your React useState
const state = {
    viewState: 'hook',
    step: 0,
    carouselIndex: 0,
    currentCardIndex: 0,
    redFlags: {},
    name: '',
    sex: '',
    ageGroup: ''
};

const safetyQuestions = [
    { key: 'saddleNumbness', text: 'Sudden numbness or tingling in your groin or saddle area?' },
    { key: 'bowelBladder', text: 'Recent, unexplained loss of bowel or bladder control?' },
    // ... add remaining questions here
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
                        <button class="option-btn" data-next="preCheckGate">Mobility & Pain Relief</button>
                    </div>
                `;
            case 'compatibilityCheck':
                const q = safetyQuestions[state.currentCardIndex];
                return `
                    <div class="card">
                        <p>${q.text}</p>
                        <button class="choice-btn" data-val="true">Yes</button>
                        <button class="choice-btn" data-val="false">No</button>
                    </div>
                `;
            // Add cases for 'safetyRedirect', 'carousel', 'intake', etc.
            default:
                return `<div>Loading...</div>`;
        }
    };

    const attachListeners = () => {
        // Handle button clicks to update state and trigger re-render
        container.querySelectorAll('[data-next]').forEach(btn => {
            btn.onclick = () => {
                state.viewState = btn.dataset.next;
                updateUI();
            };
        });

        container.querySelectorAll('.choice-btn').forEach(btn => {
            btn.onclick = (e) => {
                const val = e.target.dataset.val === 'true';
                state.redFlags[safetyQuestions[state.currentCardIndex].key] = val;
                state.currentCardIndex++;
                updateUI();
            };
        });
    };

    updateUI();
}