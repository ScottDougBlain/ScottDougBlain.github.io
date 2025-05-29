// Theory of Mind Demo - Separate file for better debugging
console.log('ToM Demo script loading...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready, initializing ToM demo...');
    
    // Check if the ToM demo container exists
    const tomDemo = document.getElementById('tom-demo');
    if (!tomDemo) {
        console.log('ToM demo not found on this page');
        return;
    }
    
    console.log('ToM demo container found');
    
    // Data structure for scenarios and questions
    const tomData = {
        scenarios: [
            {
                id: "watchswap",
                title: "The Watch Swap at the Airbnb",
                icon: "⌚",
                description: "Track beliefs about a moving object with deception",
                fullText: `Five coworkers—Carlos, Priya, Zoe, Marcus, and Dana—return to their Airbnb apartment in a coastal town after dining out. Carlos heads immediately upstairs to change clothes. Priya, Zoe, and Marcus watch Dana set an expensive vintage watch into a ceramic dish by the entryway. Thus, everyone except Carlos knows the watch is in the dish. After Carlos comes back downstairs, he and Marcus leave to pick up coffee for everyone. While they are gone, Zoe takes the watch from the dish and places it in a glass display shelf in the lounge. Priya secretly observes Zoe from the hallway, but Zoe believes Priya is busy in another room and doesn't notice her watching. Dana then calls Priya to help prepare some snacks in the kitchen, and Priya leaves, missing what happens next. Alone again, Zoe grows nervous and moves the watch once more, this time placing it in a drawer beneath the TV stand. To further hide her actions, Zoe retrieves a nearly identical fake watch from her handbag and puts it on the display shelf where she previously placed the real watch. Neither Priya nor Dana sees this second action. Priya finishes helping Dana, believing the real watch is still on the display shelf (since she missed Zoe's second move). Carlos and Marcus return from their coffee run. As Marcus steps inside, he sees the ceramic dish empty but doesn't know where the watch currently is, nor does he know who moved it. Before Marcus can say anything, Zoe quickly approaches Dana and says, "I moved your watch to the display shelf. Priya has no idea I moved it." Marcus overhears this and notices Zoe seems tense.`,
                characters: ["Carlos", "Priya", "Zoe", "Marcus", "Dana"],
                questions: [
                    {
                        id: "Q6A",
                        question: "Who secretly observes Zoe's first move of the watch?",
                        options: {
                            A: "Carlos",
                            B: "Priya",
                            C: "Marcus",
                            D: "Dana",
                            E: "Zoe herself"
                        },
                        correct: "B",
                        explanation: "Priya sees Zoe move the watch from the dish to the display shelf while watching secretly from the hallway.",
                        difficulty: "easy",
                        type: "FC",
                        nesting_level: 0
                    },
                    {
                        id: "Q6B",
                        question: "Where is the real watch at the end of the story?",
                        options: {
                            A: "Ceramic dish",
                            B: "Display shelf",
                            C: "Drawer beneath the TV",
                            D: "Marcus's backpack",
                            E: "Unknown"
                        },
                        correct: "C",
                        explanation: "Zoe's final move placed the real watch in the drawer beneath the TV stand, with a fake watch on the display shelf.",
                        difficulty: "easy",
                        type: "FC",
                        nesting_level: 0
                    },
                    {
                        id: "Q6D",
                        question: "Where does Marcus believe Dana thinks Priya believes the real watch is located?",
                        options: {
                            A: "On the display shelf",
                            B: "In the drawer under the TV",
                            C: "Stolen",
                            D: "Still in the ceramic dish",
                            E: "Priya knows about the fake"
                        },
                        correct: "D",
                        explanation: "Marcus heard Zoe tell Dana that Priya has no idea about the move. Since Dana didn't see Priya's secret observation, Dana must think Priya believes the watch is still in its original location (the dish).",
                        difficulty: "hard",
                        type: "MB",
                        nesting_level: 3
                    }
                ]
            },
            {
                id: "pancakes",
                title: "Sarcastic Pancakes",
                icon: "🥞",
                description: "Navigate misunderstood sarcasm and social dynamics",
                fullText: `Four friends—Emma, Jake, Olivia, and Ryan—are gathered for brunch at Emma's countryside cottage. Emma has made avocado pancakes for Jake, Olivia, and Ryan. Unfortunately, the pancakes are quite bitter, and no one enjoys them. Olivia takes a bite and dramatically says, "Wow Emma, these pancakes are absolutely amazing! You should open a restaurant!" with an awkward grin. Olivia means this sarcastically, as she finds the pancakes awful. However, Emma misinterprets Olivia's sarcasm as genuine praise. Jake chuckles softly, amused at Emma's misunderstanding. Ryan, who arrived late, joins the table just after Olivia's sarcastic comment. He hasn't tasted the pancakes yet and missed Olivia's earlier remark. When Emma leaves the dining area briefly to fetch some juice, Ryan notices Olivia grimacing at Jake. Ryan asks, "So, how are the pancakes?" Olivia whispers back that they're terrible but says she praised them to spare Emma's feelings. Ryan now realizes Olivia's earlier comment was sarcastic but remains uncertain whether Emma took it seriously. Emma returns, cheerfully telling Olivia, "I'll send you the pancake recipe later!" Jake overhears this, further amused by Emma's continued obliviousness. Ryan, however, isn't sure if Emma truly believes the compliment or is just maintaining politeness.

Later, after brunch, Olivia confides in Jake: "I really hope Emma didn't notice I was being sarcastic. I didn't mean to hurt her feelings." Jake reassures, "Don't worry, Emma definitely thought you were sincere." Ryan misses this exchange, busy examining Emma's bookshelf in the next room. Shortly afterward, Olivia overhears Emma quietly asking Jake, "Do you think Olivia genuinely liked the pancakes or not?" Ryan doesn't hear this, and neither Emma nor Jake realizes Olivia overheard them. As everyone prepares to leave, Ryan is still unsure about Emma's actual understanding of Olivia's comment but sees Emma smiling warmly and packing leftover pancakes for Olivia, assuming everything is fine. When Olivia heads out, Emma playfully whispers, "Next time, I'll double the avocado!" Olivia blushes nervously and quickly gets in her car. Jake notices this last exchange, but Ryan does not.`,
                characters: ["Emma", "Jake", "Olivia", "Ryan"],
                questions: [
                    {
                        id: "Q7A",
                        question: "Olivia's compliment about the pancakes was intended to be:",
                        options: {
                            A: "Genuine",
                            B: "Sarcastic",
                            C: "Neutral",
                            D: "Critical",
                            E: "Confused"
                        },
                        correct: "B",
                        explanation: "Olivia's dramatic praise with an awkward grin was sarcastic, as she found the pancakes awful but wanted to spare Emma's feelings.",
                        difficulty: "easy",
                        type: "FC",
                        nesting_level: 0
                    },
                    {
                        id: "Q7D",
                        question: "What does Ryan believe about Olivia's view of Emma's reaction?",
                        options: {
                            A: "Olivia thinks Emma is secretly hurt",
                            B: "Olivia has no idea what Emma thinks",
                            C: "Olivia doesn't care",
                            D: "Olivia assumes Emma thought the compliment was genuine",
                            E: "Ryan has no idea what Olivia thinks"
                        },
                        correct: "D",
                        explanation: "Ryan heard Olivia say she praised the pancakes to spare Emma's feelings, suggesting Olivia believes her sarcasm was taken as genuine praise.",
                        difficulty: "hard",
                        type: "MB",
                        nesting_level: 3
                    },
                    {
                        id: "Q7F",
                        question: "At the moment she hands Olivia leftovers, what does Emma most likely believe about Olivia's earlier praise?",
                        options: {
                            A: "Olivia was sincere",
                            B: "Olivia was joking",
                            C: "Olivia was uncertain",
                            D: "Olivia was copying Jake",
                            E: "Emma has no belief either way"
                        },
                        correct: "A",
                        explanation: "Despite asking Jake about it earlier, Emma's actions (offering recipe, packing leftovers, suggesting doubling avocado) indicate she still interprets the compliment literally.",
                        difficulty: "hard",
                        type: "MB",
                        nesting_level: 2
                    }
                ]
            },
            {
                id: "portland",
                title: "Portland on the Train",
                icon: "🚂",
                description: "Untangle multiple layers of deception",
                fullText: `Julia is on a train heading from Philadelphia to Washington, D.C. She is clearly reading a travel magazine titled "Explore Oregon." Her headphones ring; it's her friend, Lucas. Julia answers cheerfully, "Hi Lucas! I'm on my way to Portland for your birthday celebration!" Lucas sounds excited on the phone, though only Julia can hear him through her noise-canceling headphones. While speaking, Julia enthusiastically taps on a picture of Multnomah Falls in Oregon, briefly making amused eye contact with a fellow passenger seated next to her. Lucas's reply, audible only to Julia due to background train noise, is, "Fantastic! Maine is beautiful in spring—I didn't think you'd make it." Julia responds warmly, "Some things are worth traveling for!" She ends the call. The passenger beside her remarks casually, "Portland, huh?" Julia responds lightly, "Yep, although I usually prefer Seattle." She then briefly glances down at a printed ticket in her lap clearly labeled "Paris—Charles De Gaulle Airport."`,
                characters: ["Julia", "Lucas", "Fellow Passenger"],
                questions: [
                    {
                        id: "Q11C",
                        question: "Does the fellow passenger hear Lucas mention 'Maine'?",
                        options: {
                            A: "Yes",
                            B: "No",
                            C: "Only partly",
                            D: "Unclear",
                            E: "He reads a text instead"
                        },
                        correct: "B",
                        explanation: "Julia's noise-cancelling headphones prevent the fellow passenger from hearing Lucas's side of the conversation.",
                        difficulty: "easy",
                        type: "FC",
                        nesting_level: 0
                    },
                    {
                        id: "Q11D",
                        question: "Where does the fellow passenger think the person on the phone believes Julia thinks he thinks she is heading?",
                        options: {
                            A: "Philadelphia",
                            B: "Washington, D.C.",
                            C: "Portland, Oregon",
                            D: "Portland, Maine",
                            E: "Paris"
                        },
                        correct: "C",
                        explanation: "The passenger saw Julia's Oregon magazine and heard her say 'Portland', so he assumes Portland, Oregon. Since he didn't hear Lucas, he thinks the person on the phone also believes Julia is going to Portland, Oregon.",
                        difficulty: "hard",
                        type: "MB",
                        nesting_level: 5
                    },
                    {
                        id: "Q11F",
                        question: "After Julia ends the call, what destination does her seatmate believe she is actually traveling to?",
                        options: {
                            A: "Portland, Oregon",
                            B: "Portland, Maine",
                            C: "Seattle",
                            D: "Washington D.C.",
                            E: "Paris"
                        },
                        correct: "A",
                        explanation: "Based on the Oregon magazine, Julia saying 'Portland', and her response about preferring Seattle (another Pacific Northwest city), the seatmate would conclude she's going to Portland, Oregon.",
                        difficulty: "hard",
                        type: "MB",
                        nesting_level: 2
                    }
                ]
            }
        ],
        
        // Current state
        currentScenario: null,
        currentQuestionIndex: 0,
        userAnswers: [],
        startTime: null,
        questionStartTime: null
    };
    
    // Get all elements
    const elements = {
        scenarioSelector: document.getElementById('scenario-selector'),
        storyPanel: document.querySelector('.story-panel'),
        questionPanel: document.querySelector('.question-panel'),
        resultsPanel: document.querySelector('.results-panel'),
        characterTracker: document.getElementById('character-tracker'),
        scenarioTitle: document.getElementById('scenario-title'),
        storyContent: document.getElementById('story-content'),
        startQuestions: document.getElementById('start-questions'),
        backToScenarios: document.getElementById('back-to-scenarios'),
        questionNumber: document.getElementById('question-number'),
        questionText: document.getElementById('question-text'),
        answerOptions: document.getElementById('answer-options'),
        submitAnswer: document.getElementById('submit-answer'),
        nextQuestion: document.getElementById('next-question'),
        feedback: document.getElementById('feedback'),
        progressFill: document.getElementById('progress-fill'),
        difficultyIndicator: document.getElementById('difficulty-indicator'),
        nestingLevel: document.getElementById('nesting-level'),
        characterGrid: document.getElementById('character-grid'),
        scoreDisplay: document.getElementById('score-display'),
        levelBreakdown: document.getElementById('level-breakdown'),
        detailedResults: document.getElementById('detailed-results'),
        aiPerformance: document.getElementById('ai-performance'),
        tryAnother: document.getElementById('try-another'),
        viewExplanations: document.getElementById('view-explanations')
    };
    
    // Add click handlers to scenario cards
    const scenarioCards = document.querySelectorAll('.scenario-card');
    console.log('Found', scenarioCards.length, 'scenario cards');
    
    scenarioCards.forEach((card, index) => {
        console.log('Adding click handler to card', index);
        card.style.cursor = 'pointer'; // Make sure it looks clickable
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Card clicked!', this);
            const scenarioIndex = parseInt(this.getAttribute('data-scenario'));
            console.log('Loading scenario', scenarioIndex);
            loadScenario(scenarioIndex);
        });
    });
    
    function loadScenario(index) {
        console.log('loadScenario called with index:', index);
        
        if (index < 0 || index >= tomData.scenarios.length) {
            console.error('Invalid scenario index:', index);
            return;
        }
        
        tomData.currentScenario = tomData.scenarios[index];
        tomData.currentQuestionIndex = 0;
        tomData.userAnswers = [];
        tomData.startTime = Date.now();
        
        // Update UI
        elements.scenarioTitle.textContent = tomData.currentScenario.title;
        elements.storyContent.innerHTML = `<p>${tomData.currentScenario.fullText}</p>`;
        
        // Show story panel, hide others
        elements.scenarioSelector.style.display = 'none';
        elements.storyPanel.style.display = 'block';
        elements.questionPanel.style.display = 'none';
        elements.resultsPanel.style.display = 'none';
        
        console.log('Scenario loaded successfully');
    }
    
    // Add click handler for start questions button
    if (elements.startQuestions) {
        elements.startQuestions.addEventListener('click', function() {
            console.log('Starting questions...');
            elements.storyPanel.style.display = 'none';
            elements.questionPanel.style.display = 'block';
            elements.characterTracker.style.display = 'block';
            loadQuestion(0);
        });
    }
    
    // Add click handler for back to scenarios button
    if (elements.backToScenarios) {
        elements.backToScenarios.addEventListener('click', function() {
            elements.storyPanel.style.display = 'none';
            elements.scenarioSelector.style.display = 'block';
        });
    }
    
    function loadQuestion(index) {
        if (index >= tomData.currentScenario.questions.length) {
            showResults();
            return;
        }
        
        tomData.currentQuestionIndex = index;
        tomData.questionStartTime = Date.now();
        const question = tomData.currentScenario.questions[index];
        
        // Update progress bar
        const progress = ((index + 1) / tomData.currentScenario.questions.length) * 100;
        elements.progressFill.style.width = `${progress}%`;
        
        // Update question display
        elements.questionNumber.textContent = `Question ${index + 1} of ${tomData.currentScenario.questions.length}`;
        elements.questionText.textContent = question.question;
        
        // Update difficulty and nesting level
        elements.difficultyIndicator.textContent = `Difficulty: ${question.difficulty}`;
        elements.difficultyIndicator.className = `difficulty-indicator ${question.difficulty}`;
        
        if (question.nesting_level > 0) {
            elements.nestingLevel.textContent = `Nesting Level: ${question.nesting_level}`;
            elements.nestingLevel.style.display = 'inline-block';
        } else {
            elements.nestingLevel.style.display = 'none';
        }
        
        // Create answer options
        elements.answerOptions.innerHTML = '';
        Object.entries(question.options).forEach(([key, value]) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'answer-option';
            optionDiv.innerHTML = `
                <input type="radio" name="answer" id="option-${key}" value="${key}">
                <label for="option-${key}">
                    <span class="option-key">${key}.</span>
                    <span class="option-text">${value}</span>
                </label>
            `;
            elements.answerOptions.appendChild(optionDiv);
        });
        
        // Reset UI state
        elements.submitAnswer.disabled = true;
        elements.nextQuestion.style.display = 'none';
        elements.feedback.innerHTML = '';
        elements.feedback.className = 'feedback-box';
        
        // Add event listeners to options
        document.querySelectorAll('input[name="answer"]').forEach(input => {
            input.addEventListener('change', () => {
                elements.submitAnswer.disabled = false;
            });
        });
    }
    
    // Submit answer handler
    if (elements.submitAnswer) {
        elements.submitAnswer.addEventListener('click', submitAnswer);
    }
    
    function submitAnswer() {
        const selectedInput = document.querySelector('input[name="answer"]:checked');
        if (!selectedInput) return;
        
        const selectedAnswer = selectedInput.value;
        const question = tomData.currentScenario.questions[tomData.currentQuestionIndex];
        const isCorrect = selectedAnswer === question.correct;
        const timeSpent = Date.now() - tomData.questionStartTime;
        
        // Store answer
        tomData.userAnswers.push({
            questionId: question.id,
            selected: selectedAnswer,
            correct: question.correct,
            isCorrect: isCorrect,
            timeSpent: timeSpent,
            difficulty: question.difficulty,
            nestingLevel: question.nesting_level
        });
        
        // Disable inputs
        document.querySelectorAll('input[name="answer"]').forEach(input => {
            input.disabled = true;
        });
        elements.submitAnswer.disabled = true;
        
        // Show feedback
        elements.feedback.className = `feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
        elements.feedback.innerHTML = `
            <div class="feedback-header">${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</div>
            <div class="feedback-content">
                <p><strong>Correct answer:</strong> ${question.correct}. ${question.options[question.correct]}</p>
                <p><strong>Explanation:</strong> ${question.explanation}</p>
            </div>
        `;
        
        // Show next button
        elements.nextQuestion.style.display = 'inline-block';
    }
    
    // Next question handler
    if (elements.nextQuestion) {
        elements.nextQuestion.addEventListener('click', () => {
            loadQuestion(tomData.currentQuestionIndex + 1);
        });
    }
    
    function showResults() {
        elements.questionPanel.style.display = 'none';
        elements.characterTracker.style.display = 'none';
        elements.resultsPanel.style.display = 'block';
        
        const totalTime = Date.now() - tomData.startTime;
        const correctAnswers = tomData.userAnswers.filter(a => a.isCorrect).length;
        const totalQuestions = tomData.userAnswers.length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        // Display score
        elements.scoreDisplay.innerHTML = `
            <div class="score-percentage">${percentage}%</div>
            <div class="score-text">${correctAnswers} out of ${totalQuestions} correct</div>
            <div class="time-spent">Time: ${Math.round(totalTime / 1000)}s</div>
        `;
        
        // AI performance comparison
        elements.aiPerformance.innerHTML = `
            <div class="ai-comparison-grid">
                <div class="ai-model">
                    <div class="model-name">Current LLMs</div>
                    <div class="model-score">Strong on basic tasks</div>
                    <div class="model-note">Plateau at complex nested beliefs</div>
                </div>
                <div class="ai-model">
                    <div class="model-name">Human Performance</div>
                    <div class="model-score">Excellent across levels</div>
                    <div class="model-note">Natural social reasoning</div>
                </div>
            </div>
            <p class="ai-note">My research reveals that while LLMs excel at basic theory of mind tasks, they consistently struggle with deeply nested beliefs, revealing a fundamental limitation in their social reasoning capabilities that my frameworks help address.</p>
        `;
    }
    
    // Try another scenario handler
    if (elements.tryAnother) {
        elements.tryAnother.addEventListener('click', () => {
            elements.resultsPanel.style.display = 'none';
            elements.scenarioSelector.style.display = 'block';
        });
    }
    
    console.log('ToM demo initialization complete!');
});