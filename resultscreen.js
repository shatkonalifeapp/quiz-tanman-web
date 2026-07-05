export function renderResultScreen(container, results) {
    const isAdvanced = results?.assignedTier === 'Tier_2_Hybrid';
    
    container.innerHTML = `
        <div class="card">
            <h1>Results: ${results?.quiz_total_score_percentage}%</h1>
            <p>You qualify for: ${isAdvanced ? 'Advanced Pathway' : 'Baseline'}</p>
            <button id="pay-btn" class="primary-btn">Pay & Activate</button>
        </div>
    `;

    document.getElementById('pay-btn').onclick = () => {
        // Razorpay Web integration[cite: 6]
        const options = {
            key: "rzp_test_T8MPNilunWsRlD",
            amount: isAdvanced ? 740000 : 240000,
            currency: "INR",
            name: "TANMAN App"
        };
        new window.Razorpay(options).open();
    };
}