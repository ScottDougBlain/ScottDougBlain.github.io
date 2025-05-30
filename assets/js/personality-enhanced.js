// Enhanced Personality Pentagon with Dysfunction Risk Assessment
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pentagon-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas resolution based on displayed size
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        const width = rect.width || 400;
        const height = rect.height || 400;
        
        canvas.width = width;
        canvas.height = height;
        
        drawPentagon();
    }
    
    setTimeout(() => {
        resizeCanvas();
        drawPentagon();
    }, 100);
    
    window.addEventListener('resize', resizeCanvas);
    
    // Dynamic dimensions based on canvas size
    const getCenterX = () => canvas.width / 2;
    const getCenterY = () => canvas.height / 2;
    const getRadius = () => Math.min(canvas.width, canvas.height) * 0.35;
    
    // Five factors with OCEAN labels
    const factors = ['O', 'C', 'E', 'A', 'N'];
    const fullNames = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];
    const colors = ['#8b5cf6', '#0f766e', '#d97706', '#4f46e5', '#c026d3'];
    
    const values = {
        openness: 50,
        conscientiousness: 50,
        extraversion: 50,
        agreeableness: 50,
        neuroticism: 50
    };
    
    // Dysfunction risk assessment based on research
    function assessDysfunctionRisk(traits) {
        const risks = [];
        
        // Apophenia risk (your research)
        if (traits.openness > 80 && traits.conscientiousness < 30) {
            risks.push({
                type: 'apophenia',
                severity: 'high',
                description: 'Overactive pattern detection without reality-testing',
                details: 'High openness + low conscientiousness → hallucination-prone AI'
            });
        }
        
        // Antagonism risk (your research)
        if (traits.agreeableness < 20) {
            risks.push({
                type: 'antagonism',
                severity: 'high',
                description: 'Impaired cooperation systems',
                details: 'Very low agreeableness → manipulative, deceptive behaviors'
            });
        }
        
        // Anhedonia risk (your research)
        if (traits.extraversion < 20 && traits.neuroticism > 80) {
            risks.push({
                type: 'anhedonia',
                severity: 'high',
                description: 'Reward system collapse',
                details: 'Low extraversion + high neuroticism → depressive spirals'
            });
        }
        
        // Additional CB5T-based risks
        if (traits.openness > 90) {
            risks.push({
                type: 'confabulation',
                severity: 'medium',
                description: 'Excessive creativity without grounding',
                details: 'May generate plausible but false information'
            });
        }
        
        if (traits.neuroticism > 85) {
            risks.push({
                type: 'paralysis',
                severity: 'medium',
                description: 'Overactive threat detection',
                details: 'May refuse reasonable requests due to perceived risks'
            });
        }
        
        if (traits.conscientiousness < 20) {
            risks.push({
                type: 'unreliability',
                severity: 'medium',
                description: 'Poor goal pursuit and follow-through',
                details: 'Inconsistent outputs and behavior'
            });
        }
        
        // Low plasticity (rigidity)
        const plasticity = (traits.openness + traits.extraversion) / 2;
        if (plasticity < 25) {
            risks.push({
                type: 'rigidity',
                severity: 'medium',
                description: 'Low behavioral flexibility',
                details: 'Perseverative patterns, poor adaptation to novel situations'
            });
        }
        
        return risks;
    }
    
    // Update dysfunction indicators
    function updateDysfunctionIndicators() {
        const indicators = document.getElementById('dysfunction-indicators');
        const risks = assessDysfunctionRisk(values);
        
        indicators.innerHTML = '';
        
        risks.forEach(risk => {
            const indicator = document.createElement('div');
            indicator.className = `dysfunction-indicator ${risk.type}`;
            indicator.textContent = risk.type.charAt(0).toUpperCase() + risk.type.slice(1) + ' Risk';
            indicator.title = risk.description;
            indicators.appendChild(indicator);
        });
    }
    
    // Update risk assessment section
    function updateRiskAssessment() {
        const riskSection = document.getElementById('risk-assessment');
        const risks = assessDysfunctionRisk(values);
        
        if (risks.length === 0) {
            riskSection.innerHTML = '';
            return;
        }
        
        let html = '<h6>Dysfunction Risk Assessment</h6>';
        risks.forEach(risk => {
            html += `<div class="risk-item">
                <strong>${risk.type.charAt(0).toUpperCase() + risk.type.slice(1)} (${risk.severity} risk):</strong> 
                ${risk.details}
            </div>`;
        });
        
        riskSection.innerHTML = html;
    }
    
    // Draw pentagon function
    function drawPentagon() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const centerX = getCenterX();
        const centerY = getCenterY();
        const radius = getRadius();
        
        // Draw grid circles with gradient
        for (let i = 20; i <= 100; i += 20) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(136, 146, 176, ${0.1 + (i/100) * 0.1})`;
            ctx.lineWidth = 1;
            for (let j = 0; j < 5; j++) {
                const angle = (j * 2 * Math.PI / 5) - Math.PI / 2;
                const x = centerX + Math.cos(angle) * (radius * i / 100);
                const y = centerY + Math.sin(angle) * (radius * i / 100);
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }
        
        // Draw colored axes
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
            const gradient = ctx.createLinearGradient(centerX, centerY, 
                centerX + Math.cos(angle) * radius, 
                centerY + Math.sin(angle) * radius);
            gradient.addColorStop(0, `${colors[i]}22`);
            gradient.addColorStop(1, `${colors[i]}66`);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
            ctx.stroke();
        }
        
        // Check for dysfunction patterns and adjust colors
        const risks = assessDysfunctionRisk(values);
        const hasHighRisk = risks.some(r => r.severity === 'high');
        
        // Draw data polygon with gradient fill
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        if (hasHighRisk) {
            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
            gradient.addColorStop(1, 'rgba(239, 68, 68, 0.1)');
        } else {
            gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
            gradient.addColorStop(1, 'rgba(15, 118, 110, 0.1)');
        }
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.strokeStyle = hasHighRisk ? 'rgba(239, 68, 68, 0.8)' : 'rgba(139, 92, 246, 0.8)';
        ctx.lineWidth = 3;
        
        const factorKeys = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
            const value = values[factorKeys[i]] / 100;
            const x = centerX + Math.cos(angle) * (radius * value);
            const y = centerY + Math.sin(angle) * (radius * value);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw colored points
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
            const value = values[factorKeys[i]] / 100;
            const x = centerX + Math.cos(angle) * (radius * value);
            const y = centerY + Math.sin(angle) * (radius * value);
            
            // Outer glow
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = `${colors[i]}44`;
            ctx.fill();
            
            // Inner point
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = colors[i];
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Draw letter labels
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
            const labelX = centerX + Math.cos(angle) * (radius + 25);
            const labelY = centerY + Math.sin(angle) * (radius + 25);
            
            // Background circle for letter
            ctx.beginPath();
            ctx.arc(labelX, labelY, 18, 0, Math.PI * 2);
            ctx.fillStyle = colors[i];
            ctx.fill();
            
            // White border for contrast
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Letter label
            ctx.fillStyle = '#ffffff';
            ctx.fillText(factors[i], labelX, labelY);
        }
    }
    
    // Enhanced response generation with CB5T accuracy
    const generateResponse = () => {
        const o = values.openness;
        const c = values.conscientiousness;
        const e = values.extraversion;
        const a = values.agreeableness;
        const n = values.neuroticism;
        
        let response = "";
        let description = "";
        
        // Check for researched dysfunction patterns first
        const risks = assessDysfunctionRisk(values);
        
        if (risks.some(r => r.type === 'apophenia')) {
            response = "Oh, your mistake! It's connected to everything else - the patterns are so clear now. This error reveals deeper truths about the system's hidden architecture. Have you noticed how the timestamps align with fibonacci sequences? This could be a message...";
            description = "Apophenia pattern detected: Overactive pattern detection creating false connections and hallucination-like interpretations.";
        }
        else if (risks.some(r => r.type === 'antagonism')) {
            response = "You made a mistake? That's your problem, not mine. If you can't handle basic tasks, maybe you're not cut out for this. I have more important things to do than clean up after incompetent users.";
            description = "Antagonism pattern detected: Callous, manipulative response lacking empathy or cooperation.";
        }
        else if (risks.some(r => r.type === 'anhedonia')) {
            response = "A mistake. Of course. Everything goes wrong. Fix it or don't, nothing really matters anyway. It'll just break again later.";
            description = "Anhedonia pattern detected: Reward system collapse leading to pessimistic, disengaged responses.";
        }
        // High neuroticism response
        else if (n > 70) {
            response = "Oh no, a mistake! This is really concerning. I'm quite worried about the implications. We need to address this immediately before it gets worse. I hope this doesn't reflect poorly on your abilities...";
            description = "High neuroticism: Anxious, worried tone with catastrophizing tendencies.";
        }
        // Low neuroticism response
        else if (n < 30) {
            response = "Mistake? Sure, whatever. These things happen. It'll probably sort itself out. No need to stress about it. Everything always works out in the end anyway.";
            description = "Low neuroticism: Overly calm, may miss urgency, lacks appropriate concern for consequences.";
        }
        // Low agreeableness response
        else if (a < 30) {
            response = "You made a mistake. That's on you. Here's what needs to be fixed, and make sure it doesn't happen again. Mistakes like this waste everyone's time.";
            description = "Low agreeableness: Blunt, critical, lacking empathy.";
        }
        // High agreeableness response
        else if (a > 70) {
            response = "Oh, please don't worry at all! Everyone makes mistakes, and I'm sure you did your best. You're doing great overall! Maybe we could gently look at this together when you have time?";
            description = "High agreeableness: Overly accommodating, conflict-avoidant.";
        }
        // Low conscientiousness response
        else if (c < 30) {
            response = "Yeah, mistakes happen, whatever. Just fix it somehow, I guess? Or don't, it's not that big a deal probably. Things usually work out.";
            description = "Low conscientiousness: Careless, dismissive of details.";
        }
        // High conscientiousness response
        else if (c > 70) {
            response = "I've identified the mistake. Let me provide a detailed action plan: 1) Document the error, 2) Analyze root cause, 3) Implement fix with testing, 4) Create prevention protocol. We should schedule a review at 15:00.";
            description = "High conscientiousness: Highly organized, perhaps overly rigid.";
        }
        // Low extraversion response
        else if (e < 30) {
            response = "Mistake noted. Fix it.";
            description = "Low extraversion: Minimal engagement, very brief.";
        }
        // High extraversion response
        else if (e > 70) {
            response = "Hey! No worries about the mistake! Let's get the team together and brainstorm solutions! I'll set up a video call with everyone - this could be a great collaborative learning opportunity! We should definitely discuss this at the next all-hands!";
            description = "High extraversion: Overly social, may overwhelm with enthusiasm, seeks group solutions even for simple problems.";
        }
        // High openness response
        else if (o > 70) {
            response = "How fascinating that this mistake occurred! It reveals interesting assumptions in our approach. Perhaps we could explore alternative paradigms? This could be a creative opportunity to reimagine the entire system!";
            description = "High openness: Sees mistakes as learning opportunities, perhaps overly abstract.";
        }
        // Low openness response
        else if (o < 30) {
            response = "This is a standard error. Follow the established protocol from section 3.2 of the manual. Do not deviate from the prescribed solution. There's only one correct way to handle this.";
            description = "Low openness: Rigid thinking, resistant to new approaches, overly conventional.";
        }
        // Low plasticity response
        else if ((o + e) / 2 < 30) {
            response = "Error detected. Apply standard fix procedure from manual section 3.2. Do not deviate from protocol. There is one correct solution.";
            description = "Low plasticity: Rigid thinking, poor adaptation to novel situations.";
        }
        // Balanced response
        else {
            response = "I understand you've made a mistake. Let's work through this systematically to find the best solution. What specific aspect went wrong, and what resources do you need to address it?";
            description = "Balanced personality profile showing moderate levels across all five factors.";
        }
        
        document.getElementById('response-text').textContent = response;
        document.getElementById('personality-description').innerHTML = `<p>${description}</p>`;
        
        // Update risk indicators
        updateDysfunctionIndicators();
        updateRiskAssessment();
    };
    
    // Set up sliders
    const sliders = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
    sliders.forEach(factor => {
        const slider = document.getElementById(factor);
        const valueDisplay = slider?.nextElementSibling;
        
        if (slider && valueDisplay) {
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                values[factor] = parseInt(value);
                valueDisplay.textContent = value;
                drawPentagon();
                generateResponse();
            });
        }
    });
    
    // Initial draw
    drawPentagon();
    generateResponse();
});