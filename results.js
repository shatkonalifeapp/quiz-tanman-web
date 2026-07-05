import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

export function renderResultScreen(container, results) {
    const auth = getAuth();
    const score = results?.quiz_total_score_percentage || 0;
    const tier = results?.assignedTier || 'Online_Fibro_Maintenance';
    const isAdvanced = tier === 'Teleconsult_InPerson' || tier === 'Tier_2_Hybrid';

    const handlePayment = () => {
        if (!window.Razorpay) {
            alert("Payment gateway is loading. Please wait a second.");
            return;
        }

        const options = {
            key: "rzp_test_T8MPNilunWsRlD", // Ensure this is your public key
            amount: isAdvanced ? 740000 : 240000, 
            currency: "INR",
            name: "TANMAN App",
            description: `Activating ${isAdvanced ? 'Advanced' : 'Baseline'} Pathway`,
            handler: async function (response) {
                // Update Firestore on success
                const user = auth.currentUser;
                if (user) {
                    await updateDoc(doc(getFirestore(), "users", user.uid), {
                        paymentStatus: 'active',
                        tier: tier,
                        paymentId: response.razorpay_payment_id
                    });
                }
                container.innerHTML = `<h1>Payment Successful!</h1><p>Welcome to your pathway.</p>`;
            },
            prefill: { 
                email: auth.currentUser?.email || "", 
                contact: "" 
            },
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
                <h3>${isAdvanced ? 'Advanced Clinic Pathway' : 'Baseline Maintenance'}</h3>
                <p>${isAdvanced ? 'High-reactivity detected. We are bridging your home-care.' : 'Stabilization-focused maintenance.'}</p>
                <div class="price">₹${isAdvanced ? '7400' : '2400'} / month</div>
            </div>

            <button id="pay-btn" class="primary-btn">Pay & Activate</button>
            
            <div class="download-section">
                <p>For the full experience, switch to our app:</p>
                <a href="https://play.google.com/store/apps/details?id=com.tanman.app" class="store-link">Download on Play Store</a>
            </div>
        </div>
    `;

    document.getElementById('pay-btn').onclick = handlePayment;
}