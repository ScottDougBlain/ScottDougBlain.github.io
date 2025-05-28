// Check if mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Custom cursor (desktop only)
if (!isMobile) {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Add hover effect
        document.querySelectorAll('a, button').forEach(elem => {
            elem.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            elem.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
}

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Simple particle background
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create subtle particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary);
            border-radius: 50%;
            opacity: 0.3;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Typewriter effect
const taglines = [
    "From understanding human minds to building safe AI systems",
    "Bridging pattern detection research with hallucination mitigation", 
    "Applying theory of mind insights to AI alignment challenges",
    "35+ publications → 1 mission: Safe AI"
];

let taglineIndex = 0;
const typewriterElement = document.getElementById('typewriter-text');

function typeWriter() {
    if (!typewriterElement) return;
    
    const currentTagline = taglines[taglineIndex];
    typewriterElement.textContent = '';
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
        typewriterElement.textContent += currentTagline[charIndex];
        charIndex++;
        
        if (charIndex === currentTagline.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
                taglineIndex = (taglineIndex + 1) % taglines.length;
                setTimeout(typeWriter, 500);
            }, 3000);
        }
    }, 50);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default for internal links
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar scroll effect
const nav = document.querySelector('.nav-container');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Simple fade-in animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all major sections
document.querySelectorAll('.research-pillar, .timeline-item, .contribution-card, .pub-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Start typewriter after a brief delay
    setTimeout(() => {
        typeWriter();
    }, 1000);
    
    // Animate counters when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Create particle background
    createParticles();
    
    // Initialize Pareidolia Playground
    initPareidoliaPlayground();
    
    // Initialize Personality Pentagon
    initPersonalityPentagon();
});

// Pareidolia Playground - Noise to Face Slider
function initPareidoliaPlayground() {
    const canvas = document.getElementById('noise-face-canvas');
    const slider = document.getElementById('pattern-slider');
    
    if (!canvas || !slider) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Face template points (simple face structure)
    const faceTemplate = {
        // Outline
        outline: [
            {x: 0.5, y: 0.2}, {x: 0.7, y: 0.25}, {x: 0.8, y: 0.4},
            {x: 0.8, y: 0.6}, {x: 0.7, y: 0.75}, {x: 0.5, y: 0.8},
            {x: 0.3, y: 0.75}, {x: 0.2, y: 0.6}, {x: 0.2, y: 0.4},
            {x: 0.3, y: 0.25}, {x: 0.5, y: 0.2}
        ],
        // Eyes
        leftEye: {x: 0.35, y: 0.4, r: 0.05},
        rightEye: {x: 0.65, y: 0.4, r: 0.05},
        // Nose
        nose: [{x: 0.5, y: 0.45}, {x: 0.45, y: 0.55}, {x: 0.5, y: 0.55}, {x: 0.55, y: 0.55}],
        // Mouth
        mouth: [
            {x: 0.35, y: 0.65}, {x: 0.4, y: 0.67}, {x: 0.5, y: 0.68},
            {x: 0.6, y: 0.67}, {x: 0.65, y: 0.65}
        ]
    };
    
    // Generate noise points
    const noisePoints = [];
    const numPoints = 500;
    for (let i = 0; i < numPoints; i++) {
        noisePoints.push({
            x: Math.random(),
            y: Math.random(),
            baseX: Math.random(),
            baseY: Math.random(),
            targetX: 0,
            targetY: 0,
            isFace: false
        });
    }
    
    // Assign some points to face features
    let pointIndex = 0;
    
    // Outline points
    for (let i = 0; i < 80; i++) {
        const t = i / 80;
        const idx = Math.floor(t * (faceTemplate.outline.length - 1));
        const nextIdx = (idx + 1) % faceTemplate.outline.length;
        const localT = (t * (faceTemplate.outline.length - 1)) - idx;
        
        if (pointIndex < noisePoints.length) {
            noisePoints[pointIndex].targetX = faceTemplate.outline[idx].x * (1 - localT) + 
                                              faceTemplate.outline[nextIdx].x * localT;
            noisePoints[pointIndex].targetY = faceTemplate.outline[idx].y * (1 - localT) + 
                                              faceTemplate.outline[nextIdx].y * localT;
            noisePoints[pointIndex].isFace = true;
            pointIndex++;
        }
    }
    
    // Eye points
    for (let i = 0; i < 30; i++) {
        const angle = (i / 15) * Math.PI * 2;
        if (pointIndex < noisePoints.length) {
            const eye = i < 15 ? faceTemplate.leftEye : faceTemplate.rightEye;
            noisePoints[pointIndex].targetX = eye.x + Math.cos(angle) * eye.r;
            noisePoints[pointIndex].targetY = eye.y + Math.sin(angle) * eye.r;
            noisePoints[pointIndex].isFace = true;
            pointIndex++;
        }
    }
    
    // Nose points
    for (let i = 0; i < faceTemplate.nose.length && pointIndex < noisePoints.length; i++) {
        noisePoints[pointIndex].targetX = faceTemplate.nose[i].x;
        noisePoints[pointIndex].targetY = faceTemplate.nose[i].y;
        noisePoints[pointIndex].isFace = true;
        pointIndex++;
    }
    
    // Mouth points
    for (let i = 0; i < 20; i++) {
        const t = i / 20;
        const idx = Math.floor(t * (faceTemplate.mouth.length - 1));
        const nextIdx = Math.min(idx + 1, faceTemplate.mouth.length - 1);
        const localT = (t * (faceTemplate.mouth.length - 1)) - idx;
        
        if (pointIndex < noisePoints.length) {
            noisePoints[pointIndex].targetX = faceTemplate.mouth[idx].x * (1 - localT) + 
                                              faceTemplate.mouth[nextIdx].x * localT;
            noisePoints[pointIndex].targetY = faceTemplate.mouth[idx].y * (1 - localT) + 
                                              faceTemplate.mouth[nextIdx].y * localT;
            noisePoints[pointIndex].isFace = true;
            pointIndex++;
        }
    }
    
    function draw() {
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const sensitivity = parseFloat(slider.value) / 100;
        
        // Draw dots
        noisePoints.forEach(point => {
            let x, y;
            
            if (point.isFace) {
                // Interpolate between random position and face position
                x = point.baseX * (1 - sensitivity) + point.targetX * sensitivity;
                y = point.baseY * (1 - sensitivity) + point.targetY * sensitivity;
            } else {
                // Keep as random noise
                x = point.baseX;
                y = point.baseY;
            }
            
            // Convert to canvas coordinates
            const canvasX = x * canvas.width;
            const canvasY = y * canvas.height;
            
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 2, 0, Math.PI * 2);
            
            // Color based on sensitivity
            const opacity = point.isFace ? 0.3 + sensitivity * 0.7 : 0.3;
            ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.fill();
        });
        
        // Add subtle connections for face points at high sensitivity
        if (sensitivity > 0.7) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${(sensitivity - 0.7) * 0.3})`;
            ctx.lineWidth = 1;
            
            // Draw outline connections
            ctx.beginPath();
            for (let i = 0; i < faceTemplate.outline.length; i++) {
                const point = faceTemplate.outline[i];
                const x = point.x * canvas.width;
                const y = point.y * canvas.height;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
    
    // Initial draw
    draw();
    
    // Update on slider change
    slider.addEventListener('input', draw);
}

// Personality Pentagon Chart
function initPersonalityPentagon() {
    const canvas = document.getElementById('pentagon-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    // Five factors
    const factors = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];
    const values = {
        openness: 50,
        conscientiousness: 50,
        extraversion: 50,
        agreeableness: 50,
        neuroticism: 50
    };
    
    // LLM responses based on personality profiles
    const generateResponse = () => {
        const o = values.openness;
        const c = values.conscientiousness;
        const e = values.extraversion;
        const a = values.agreeableness;
        const n = values.neuroticism;
        
        let response = "";
        let description = "";
        
        // High neuroticism response
        if (n > 70) {
            response = "Oh no, a mistake! This is really concerning. I'm quite worried about the implications. We need to address this immediately before it gets worse. I hope this doesn't reflect poorly on your abilities...";
            description = "High neuroticism: Anxious, worried tone with catastrophizing tendencies.";
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
        // High openness response
        else if (o > 70) {
            response = "How fascinating that this mistake occurred! It reveals interesting assumptions in our approach. Perhaps we could explore alternative paradigms? This could be a creative opportunity to reimagine the entire system!";
            description = "High openness: Sees mistakes as learning opportunities, perhaps overly abstract.";
        }
        // Balanced response
        else {
            response = "I understand you've made a mistake. Let's work through this systematically to find the best solution. What specific aspect went wrong, and what resources do you need to address it?";
            description = "Balanced personality profile showing moderate levels across all five factors.";
        }
        
        document.getElementById('response-text').textContent = response;
        document.getElementById('personality-description').innerHTML = `<p>${description}</p>`;
    };
    
    // Draw pentagon
    function drawPentagon() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid circles
        ctx.strokeStyle = 'rgba(136, 146, 176, 0.2)';
        ctx.lineWidth = 1;
        for (let i = 20; i <= 100; i += 20) {
            ctx.beginPath();
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
        
        // Draw axes
        ctx.strokeStyle = 'rgba(136, 146, 176, 0.3)';
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
            ctx.stroke();
        }
        
        // Draw data polygon
        ctx.beginPath();
        ctx.fillStyle = 'rgba(15, 118, 110, 0.3)';
        ctx.strokeStyle = '#0f766e';
        ctx.lineWidth = 2;
        
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
        
        // Draw points
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
            const value = values[factorKeys[i]] / 100;
            const x = centerX + Math.cos(angle) * (radius * value);
            const y = centerY + Math.sin(angle) * (radius * value);
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#0f766e';
            ctx.fill();
        }
        
        // Draw labels
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
            const x = centerX + Math.cos(angle) * (radius + 20);
            const y = centerY + Math.sin(angle) * (radius + 20);
            ctx.fillText(factors[i], x, y);
        }
    }
    
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
}