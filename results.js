// result.js
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export function renderResultScreen(container, results) {
    const score = results?.quiz_total_score_percentage || 0;
    const tier = results?.assignedTier || 'Online_Fibro_Maintenance';

    const handlePayment = () => {
        const isAdvanced = tier === 'Teleconsult_InPerson' || tier === 'Tier_2_Hybrid';
        
        const options = {
            key: "rzp_test_T8MPNilunWsRlD", // Ensure this is your public key
            amount: isAdvanced ? 740000 : 240000, 
            currency: "INR",
            name: "TANMAN App",
            description: `Activating ${isAdvanced ? 'Advanced' : 'Baseline'} Pathway`,
            handler: function (response) {
                alert("Payment Successful! Your pathway is unlocked.");
                // Redirect or update UI
            },
            prefill: { email: "user@example.com", contact: "9999999999" },
            theme: { color: "#D4AF37" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    container.innerHTML = `
        <div class="result-container">
            <div class="score-circle">${score}%</div>
            <h1>Somatic Baseline Set</h1>
            <p>Your neuro-somatic markers have been analyzed.</p>
            
            <div class="tier-card">
                <h3>${tier === 'Tier_2_Hybrid' ? 'Advanced Clinic Pathway' : 'Baseline Maintenance'}</h3>
                <p>High-reactivity detected. We are bridging your home-care.</p>
                <div class="price">${isAdvanced ? '₹7400' : '₹2400'} / month</div>
            </div>

            <button id="pay-btn" class="primary-btn">Pay & Activate</button>
            
            <div class="download-section">
                <p>For the full experience, switch to our app:</p>
                <a href="https://play.google.com/store/apps/..." class="store-link">Download on Play Store</a>
            </div>
        </div>
    `;

    document.getElementById('pay-btn').onclick = handlePayment;
}