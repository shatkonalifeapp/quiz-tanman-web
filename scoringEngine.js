/**
 * Tanman App - Neuro-Somatic Triage & Matrix Scoring Engine
 * Updated: Optimized for Vanilla JS SPA integration
 */

export const calculateTriageResults = (answers) => {
  // 1. Calculate Somatic Sensitivity Index (SSI) -> q1 to q12
  let ssi = 0;
  for (let i = 1; i <= 12; i++) {
    ssi += parseInt(answers[`q${i}`] || 0);
  }

  // 2. Calculate Neuro-Somatic Load Index (NELI)
  const neliQuestions = [
    'q4', 'q5', 'q6', 'q8', 'q15',  
    'q21', 'q22', 'q23', 'q24',      
    'q25', 'q26', 'q27'               
  ];
  
  let neli = 0;
  neliQuestions.forEach((qKey) => {
    neli += parseInt(answers[qKey] || 0);
  });

  // 3. Tier Matrix Routing Logic
  let assignedTier = "Tier_1_Video";
  
  if (ssi >= 25 || neli >= 27) {
    assignedTier = "Tier_3_Physio";
  } else if (ssi >= 13 || neli >= 16) {
    assignedTier = "Tier_2_Hybrid";
  } else {
    assignedTier = "Tier_1_Video"; 
  }

  // Calculate percentage based on 36 questions (assuming max score per question is 3)
  const totalScore = Object.values(answers).reduce((acc, val) => acc + parseInt(val), 0);
  const maxScore = Object.keys(tanmanQuestionsTextMap).length * 3;
  const quiz_total_score_percentage = Math.round((totalScore / maxScore) * 100);

  return { ssi, neli, assignedTier, quiz_total_score_percentage };
};

export const tanmanQuestionsTextMap = {
  // === CHAPTER 1: CENTRAL REGULATION ===
  q1: { text: "Have you undergone multiple clinical imaging scans or blood panels, only to be told that your physical structures appear completely normal?", scaleType: "frequency" },
  q2: { text: "Does your pain regularly shift, migrate, or expand to completely different, unrelated quadrants of your body from day to day?", scaleType: "frequency" },
  q3: { text: "Do minor everyday pressures—like light touch, minor bumps, or tight clothing—cause a distinct physical pain or deep bruising sensation?", scaleType: "intensity" },
  q4: { text: "Do you find yourself anticipating or worrying about how your musculoskeletal system will behave, flare up, or react to basic physical exertion?", scaleType: "frequency" },
  q5: { text: "Do you experience an exaggerated or sudden physical shock, a full-body jolt, or an intense internal scare from minor unexpected stimuli?", scaleType: "intensity" },
  q6: { text: "Do you wake up feeling physically heavy, stiff, and unrefreshed, regardless of how many hours of sleep you get?", scaleType: "intensity" },

  // === CHAPTER 2: REGIONAL MYOFASCIAL TENSION SIGNATURES ===
  q7: { text: "Upon waking in the morning, do you experience a generalized, profound stiffness across multiple joints?", scaleType: "intensity" },
  q8: { text: "Do you notice 'brain fog,' momentary short-term memory lapses, or difficulty concentrating when your physical pain intensifies?", scaleType: "frequency" },
  q9: { text: "Do you suffer from severe abdominal bloating or unpredictable, reactive digestive issues alongside your musculoskeletal pain?", scaleType: "frequency" },
  q10: { text: "Do you have specific, hard, or rope-like bands in your muscles that feel highly tender to the touch?", scaleType: "intensity" },
  q11: { text: "When a highly tender muscle spot is pressed, does the pain consistently travel, radiate, or shoot to a completely different part of your body?", scaleType: "frequency" },
  q12: { text: "Is your primary physical discomfort localized to specific regional areas rather than being evenly spread across your entire body?", scaleType: "intensity" },

  // === CHAPTER 3-6: ADDITIONAL MARKERS (Condensed) ===
  q13: { text: "Do you experience unexplained twitching within a specific muscle group, localized night cramps, or a burning sensation in your extremities?", scaleType: "frequency" },
  q14: { text: "Do you regularly suffer from chronic tension headaches, neck strain, or severe jaw tightness/clenching alongside your primary muscle pain?", scaleType: "frequency" },
  q15: { text: "Do you experience a severe lack of physical energy and heavy morning lethargy that makes initiating movement feel physically monumental?", scaleType: "intensity" },
  q16: { text: "Do you spend more than six to seven hours a day locked in a stagnant, sedentary sitting position at a desk or keyboard?", scaleType: "frequency" },
  q17: { text: "Do you work in a highly repetitive, high-focus profession where it feels like your brain has forgotten how to voluntarily relax specific muscle groups?", scaleType: "frequency" },
  q18: { text: "Do you maintain exceptionally rigid, non-negotiable standards for your own performance, constantly feeling deep physical anxiety or muscle locking if things aren't perfect?", scaleType: "frequency" },
  q19: { text: "Is your daily lifestyle characterized by a lack of dietary protein combined with an absence of structured physical resistance exercise?", scaleType: "frequency" },
  q20: { text: "Do you feel your physical energy being heavily drained by a highly stressful, exhausting, or chaotic daily environment?", scaleType: "frequency" },
  q21: { text: "Do you find yourself in a constant state of hyper-alertness, chronic tension, or self-censorship around dominant individuals in your daily life?", scaleType: "frequency" },
  q22: { text: "Does experiencing a sudden emotional withdrawal or conflict with someone in your daily circle trigger an immediate physical state of panic or body locking?", scaleType: "frequency" },
  q23: { text: "When dealing with deep internal or physical stress, do you feel an isolating lack of an active, understanding physical or social support system?", scaleType: "frequency" },
  q24: { text: "Do you experience immediate, severe physical pain 'flare-ups' or total-body muscle locking following a sudden emotional shock or intense stress event?", scaleType: "frequency" },
  q25: { text: "Have you habitually learned to physically mask your suffering, holding your body stiffly to look strong and capable on the outside?", scaleType: "frequency" },
  q26: { text: "Do you find yourself deeply absorbing and physically taking on the tension, stress, or somatic burdens of those around you?", scaleType: "frequency" },
  q27: { text: "Has your body been stuck in an anxious, defensive 'survival mode' for so long that you find it physically impossible to drop your shoulders or experience true physical relaxation?", scaleType: "frequency" },
  q28: { text: "Have you spent significant time navigating relationships where you felt systematically diminished, constantly walking on eggshells to avoid emotional outbursts?", scaleType: "frequency" },
  q29: { text: "Is there a distinct history in your family line of chronic widespread physical exhaustion, unresolved deep tension, or severe nervous system fatigue?", scaleType: "frequency" },
  q30: { text: "Are you experiencing a profound drop in personal vitality, physical drive, or libido, which frequently tracks alongside chronic, system-wide nervous system exhaustion?", scaleType: "intensity" },
  q31: { text: "Do you experience persistent, uncomfortable muscle twitching or deep fascial throbbing that interferes with falling asleep at night?", scaleType: "frequency" },
  q32: { text: "Do you notice your breath becomes shallow, rapid, or completely held in your chest when managing normal, daily intellectual workloads?", scaleType: "frequency" },
  q33: { text: "Does your physical recovery time after mild daily tasks or light home errands take days rather than hours?", scaleType: "intensity" },
  q34: { text: "Do your muscles consistently feel cool or numb in certain regions, indicating local circulatory stagnation or high sympathetic constriction?", scaleType: "intensity" },
  q35: { text: "Do you experience an intensive intolerance to sudden environmental temperature shifts, causing your body to lock down or ache intensely?", scaleType: "intensity" },
  q36: { text: "Do you feel a profound baseline loss of physical restoration, where your body feels as though it is constantly running on empty?", scaleType: "intensity" }
};