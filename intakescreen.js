export function renderIntakeScreen(container) {
    let viewState = 'hook';
    
    const update = () => {
        if (viewState === 'hook') {
            container.innerHTML = `
                <div class="card">
                    <h1>What’s your focus today?</h1>
                    <button id="nextBtn" class="primary-btn">Start Assessment</button>
                </div>
            `;
            document.getElementById('nextBtn').onclick = () => { 
                viewState = 'intake'; 
                update(); 
            };
        } else {
            container.innerHTML = `
                <div class="card">
                    <h1>Intake Complete</h1>
                    <button id="startBtn" class="primary-btn">Start Assessment</button>
                </div>
            `;
            document.getElementById('startBtn').onclick = () => {
                // Logic to transition to questionsscreen.js
            };
        }
    };
    update();
}