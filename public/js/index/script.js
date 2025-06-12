document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const elements = {
        sampleText: document.getElementById('sample-text'),
        userInput: document.getElementById('user-input'),
        timer: document.getElementById('time'),
        wpm: document.getElementById('wpm'),
        accuracy: document.getElementById('accuracy'),
        points: document.getElementById('points'),
        restartBtn: document.getElementById('restart-btn'),
        resultsContainer: document.getElementById('results-container'),
        finalName: document.getElementById('final-name'),
        finalWpm: document.getElementById('final-wpm'),
        finalAccuracy: document.getElementById('final-accuracy'),
        finalChars: document.getElementById('final-chars'),
        finalErrors: document.getElementById('final-errors'),
        finalPoints: document.getElementById('final-points')
    };

    // Game state
    const state = {
        timer: null,
        timeLeft: 60,
        isTestRunning: false,
        startTime: null,
        totalTyped: 0,
        correctChars: 0,
        errors: 0,
        currentText: '',
        points: 0
    };

    // Difficulty passages
    const passages = {
        Easy: [
            "The sun is shining brightly in the sky. The clouds are white and fluffy. Birds are singing in the trees. Children run around the park laughing. Some kids play on the swings. Others slide down the slide.",
            "My cat is small and furry. She has black and white spots. Her name is Bella. Bella loves to sleep all day. She curls up on the sofa. Sometimes she stretches and yawns. In the morning she meows for food.",
            "I like to walk in the evening. The sun is setting. The sky turns pink and orange. The air feels cool and fresh. I see people walking their dogs. Some ride bicycles. Others jog past me. The trees sway in the wind.",
            "Rain falls softly on the roof. The sound is peaceful. I sit by the window and watch. Puddles form on the street. A child jumps in one and laughs. Cars drive slowly with their lights on. People carry umbrellas.",
            "The beach is full of people today. The waves crash on the shore. Kids build sandcastles near the water. A boy digs a deep hole. His sister fills it with shells. Seagulls fly overhead looking for food.",
            "I wake up early in the morning. The house is quiet. I go to the kitchen and make toast. The bread turns golden in the toaster. I spread butter on it. It melts quickly. I pour myself a glass of orange juice.",
            "The street is full of noise and movement. Cars honk as they drive past. People hurry to cross the road. A bus stops to pick up passengers. A cyclist rings his bell to warn others."
        ],
        Medium: [
            "Perched atop a jagged cliff, the abandoned lighthouse stood as a relic of the past. Its once-gleaming white paint had faded to a dull gray, and the glass panes of the lantern room were shattered.",
            "Inside, the air smelled of salt and mildew. A ledger lay open on a wooden desk, its pages yellowed with age. Faded ink recorded the names of ships that had passed decades ago—some never reaching their destination.",
            "Climbing to the top, I gazed through the broken windows. The sea stretched endlessly, waves crashing violently against the rocks below.",
            "In a dimly lit workshop, gears turned with rhythmic precision. Master Heinrich, a stooped old man with spectacles perched on his nose, adjusted a tiny screw in his latest creation.",
            "'Every tick holds a secret,' he murmured, polishing the brass casing. His apprentice, Elias, leaned closer, fascinated. 'But what makes this one special?'",
            "Heinrich's eyes gleamed. 'This watch doesn't merely tell time. It captures it.' He pressed a hidden latch, and the gears whirred faster. The room grew unnaturally still; even the dust motes froze midair. ",
            "'Time is a river,' Heinrich explained, 'and this—' he tapped the watch—'is a dam.' The implications were terrifying. What if time stopped forever? Elias's heart pounded. Some secrets, he realized, were better left unwound."
        ],
        Hard: [
            "The quintessence of human cogitation lies in its ineluctable propensity to obfuscate the verisimilitude of reality; for what is 'truth,' if not a malleable construct, perennially distroted by the vagaries of perception?",
            "Oh, how tempest-wrought are the vicissitudes of chronos! The inexorible tide of moments, fleeting and ephemeral, undermines our tenuous grasp upon eternitie; we flounder, like marionettes upon a capricious stage,",
            "Language, that mercurial beast, doth befuddle even the most erudite among us; its lexicon is a kaleidoscopic menagerie of homonyms, neologisms, and archaisms, each vying for dominion over meaning.",
            "Man's insatiable proclivity for acquisition—be it wealth, power, or amorous conquest—belies a profound existential ennui; for what is desire, if not the siren's call, luring us toward chimerical fulfillment?",
            "Within the subterranean recesses of the psyche lurk primordial fears, vestigial remnants of an atavistic past; the id, that unruly beast, thrashes against the superego's tyrannical restraints! Dreams—those phantasmagoric tableaux—teem with symbolism, yet their esoteric meanings elude even the most perspicacious interpreters! Verily, the mind is a labyrinth, inextricable and unfathomable!",
            "Hubristic mortals, in their vainglorious pursuits, strive to transcend their ephemeral nature—building monoliths, penning tomes, waging wars—yet time, that implacable leveller, reduces all to detritus! The Pyramids, once testaments to imperial might, now stand as mute witnesses to inevitable decay! Ah, the futility of striving against entropy!",
            "Destiny, that sibylline enchantress, weaves her tapestry with caprice, bestowing fortune upon the unworthy and calamity upon the virtuous! The Fates, those inexorable weird-sisters, snip the threads of life with impunity; alas, mortals are but pawns in their cosmick game! Wretched is he who presumes to divine their inscrutable designs!"
        ],
        Expert: [
            "Morthen quila zarphex junteroi kelvisha. Drekkon vallamir phesquind jolteran, frithex banduvo inquarnis zullido. Gonnax thavri lupinque shalvero mentrix. Pasquador tifrelvink druzhar eplintho — yerrivax drandonu shomech fenquiri. Nexorin jalbathra krendor felmina troshath vulpena. Jiralash venmorix zaquith delnor vahqueti. Bramoldu shartivex renquala tovisha meldorin plazneth.",
            "Thunara voketil xarmiquen! Elswendro barthivan go'shantore lukavind torquilex. Dirthmon klivarez juntramo vexlirth shuronda. Wersthalin jompedril smarvenith dulcaro xethivan! Voshendak narnivex bralunther, oxmelthand tyranak shevalde! Jorquis aldozarn belmurith kanzali ferqueth yondire.",
            "Luntrava—za'veltor quimashu? Bronthavik zemron halvek, jarniquol veshtrak po'quilend troparax. Vendrosk ultherin shapholin grunvik? Chaldermor avquinth zehrali spejorith mephandun. Zyrnash druvalthek onqualdo... xexendil!",
            "Grivental vosk'ahr lunebrix qo'tari meshandu. Plaxidor kevrin shual'tek norriva delquas hirzume kanti. Borlun zaithek moriwal fenquiss dajaru pendak — fralvin zequara marnak optheris. Jollivex tundro farlighi ve'morrak, senvaki qarnido lun'shal ophenirex blurn. Qwekta florinthi boldurex shamvirto! Gherdon mixeral trovun liskat vinquara teloren. Krixalar vendalor mok'tunira quorlax vendure, trishak ponlevin somarak fexilun.",
            "Varnesto jullimar kent'quari ophrellin marvutoz fenkrith. Dermano salquif jarnetik veplora sunmir. Ovankri delsharra qweeklun merzalo torkenvay plirrox. Pandoneth kravixul, borquint rashenlir awenith marulo. Scraventin knallor visperdun qarlix derovand — untar vesquix larnedoth?",
            "Yonvalti, jorven kraxilis? Nundrek op'shural faymoren vikalot serpli, zhomventi glarnuk teloria! Drespira anduvak norlish entoprel vehmirex. Blixkando shemtilor exvanda? Darlitho venporach lunzivar morquinth jarnalith?",
            "Draventhil carmivo, swenthora likzural. Korvalen triquarze mophti relvenax dulshorik. Tanquilos venarith snorvulda, prexiven flurlida wenquash. Holkrandem vifarnus gilatrox, nerpathul scilvenoq tavoth. Evrenzor mistiklen dorqenthas jovilath! Frandior quixma turling va'solmeth brenquon."
        ]
    };

    elements.sampleText.style.userSelect = 'none';

    elements.userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && state.isTestRunning) {
            e.preventDefault();
            // Optional: Play a sound or show visual feedback
            console.log('Backspace is disabled during the test!');
        }
    });

    // Initialize the test
    function initTest() {
        // Get random passage based on difficulty
        const difficulty = localStorage.getItem('difficultyLevel');
        state.currentText = passages[difficulty][Math.floor(Math.random() * passages[difficulty].length)];
        
        // Reset all visual elements
        displayText(state.currentText);
        elements.userInput.value = ''; // Clear any typed text
        elements.userInput.disabled = false; // Enable input
        elements.userInput.focus(); // Focus on input field
        
        // Hide results container
        elements.resultsContainer.classList.add('hidden');
        
        // Reset game state
        resetGameState();
    }


    function preventWordBreaks(text) {
        return text.replace(/ /g, '\u00A0');
    }

    function displayText(text) {
        elements.sampleText.innerHTML = '';
        
        const protectedText = preventWordBreaks(text);
        
        protectedText.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === '\u00A0' ? ' ' : char;
            if (index === 0) span.classList.add('current');
            elements.sampleText.appendChild(span);
        });
    }

    function resetGameState() {
        // Clear any existing timer
        if (state.timer) {
            clearInterval(state.timer);
            state.timer = null;
        }
        
        // Reset all state variables
        state.timeLeft = 60;
        state.isTestRunning = false;
        state.startTime = null;
        state.totalTyped = 0;
        state.correctChars = 0;
        state.errors = 0;
        state.points = 0;
        
        // Reset displayed stats
        elements.timer.textContent = state.timeLeft;
        elements.wpm.textContent = '0';
        elements.accuracy.textContent = '0';
        elements.points.textContent = '0';
    }

    // Event listener for restart button
    elements.restartBtn.addEventListener('click', initTest);

    function startTest() {
        if (state.isTestRunning) return;
        state.isTestRunning = true;
        state.startTime = Date.now();
        
        state.timer = setInterval(() => {
            state.timeLeft--;
            elements.timer.textContent = state.timeLeft;
            
            if (state.timeLeft <= 0) {
                endTest();
            }
        }, 1000);
    }

    function updateDisplay() {
        const input = elements.userInput.value;
        const spans = elements.sampleText.querySelectorAll('span');
        
        spans.forEach(span => span.className = '');
        
        let allCorrect = true;
        for (let i = 0; i < input.length; i++) {
            if (i >= spans.length) break;
            
            if (input[i] === state.currentText[i]) {
                spans[i].classList.add('correct');
            } else {
                spans[i].classList.add('incorrect');
                allCorrect = false;
            }
        }
        
        if (input.length < spans.length) {
            spans[input.length].classList.add('current');
        }
        
        if (allCorrect && input.length === state.currentText.length) {
            endTest();
        }
    }

    function calculatePoints({ wpm, accuracy, characters, errors, completionPercentage }) {
    
        const MAX_POINTS = 1000;
        
        // Weights (adjusted for passage-based typing)
        const WPM_WEIGHT = 0.5;          
        const ACCURACY_WEIGHT = 0.3;     
        const COMPLETION_WEIGHT = 0.2;   
        
        // Since WPM = total words in passage (if fully typed in 60 sec)
        const maxPossibleWPM = 50; 
        
        const speedScore = (wpm / maxPossibleWPM) * WPM_WEIGHT * MAX_POINTS;
        
        // Accuracy (very forgiving, 80%+ gets full points)
        const accuracyScore = (accuracy >= 80)
            ? ACCURACY_WEIGHT * MAX_POINTS
            : (accuracy / 80) * ACCURACY_WEIGHT * MAX_POINTS;
        
        // Completion (all-or-nothing for short passages)
        const completionScore = (completionPercentage === 100)
            ? COMPLETION_WEIGHT * MAX_POINTS
            : 0;
        
        const errorPenalty = (errors > 3)
            ? Math.min((errors - 3) * 10, 100) // Max 100 pt penalty
            : 0;
        
        const totalScore = speedScore + accuracyScore + completionScore - errorPenalty;
        return Math.min(MAX_POINTS, Math.round(totalScore));
    }

    function updateStats() {
        const input = elements.userInput.value;
        state.totalTyped = input.length;
        state.correctChars = 0;
        
        for (let i = 0; i < input.length && i < state.currentText.length; i++) {
            if (input[i] === state.currentText[i]) state.correctChars++;
        }
        
        state.errors = state.totalTyped - state.correctChars;
        const timeElapsed = (60 - state.timeLeft) || 1;
        const wpm = Math.round((state.correctChars / 5) / (timeElapsed / 60));
        const accuracy = state.totalTyped > 0 ? Math.round((state.correctChars / state.totalTyped) * 100) : 0;
        const completionPercentage = Math.round((input.length / state.currentText.length) * 100);
        
        state.points = calculatePoints({
            wpm: wpm,
            accuracy: accuracy,
            characters: state.currentText.length,
            errors: state.errors,
            completionPercentage: completionPercentage,
            timeTaken: timeElapsed
        });
        
        elements.wpm.textContent = wpm;
        elements.accuracy.textContent = accuracy;
        elements.points.textContent = state.points;
    }

    function endTest() {
        clearInterval(state.timer);
        state.isTestRunning = false;
        elements.userInput.disabled = true;

        const name = localStorage.getItem('playerName');
        const timeElapsed = 60 - state.timeLeft;
        const finalWpm = Math.round((state.correctChars / 5) / (timeElapsed / 60));
        const finalAccuracy = state.totalTyped > 0 ? Math.round((state.correctChars / state.totalTyped) * 100) : 0;
        const completionPercentage = Math.round((elements.userInput.value.length / state.currentText.length) * 100);
        
        // Calculate final points with all metrics
        const finalPoints = calculatePoints({
            wpm: finalWpm,
            accuracy: finalAccuracy,
            characters: state.currentText.length,
            errors: state.errors,
            completionPercentage: completionPercentage,
            timeTaken: timeElapsed
        });

        elements.finalName.textContent = name;
        elements.finalWpm.textContent = finalWpm;
        elements.finalAccuracy.textContent = finalAccuracy;
        elements.finalChars.textContent = state.totalTyped;
        elements.finalErrors.textContent = state.errors;
        elements.finalPoints.textContent = finalPoints;
        
        elements.resultsContainer.classList.remove('hidden');
    }

    // Event listeners
    elements.userInput.addEventListener('input', () => {
        if (!state.isTestRunning && state.currentText) startTest();
        updateDisplay();
        updateStats();
    });

    elements.restartBtn.addEventListener('click', initTest);

    // Initialize the test
    initTest();
});