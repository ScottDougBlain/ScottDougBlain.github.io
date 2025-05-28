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
    const canvas = document.getElementById('constellation-canvas');
    const slider = document.getElementById('pattern-slider');
    const meanings = document.getElementById('pattern-meanings');
    
    if (!canvas || !slider || !meanings) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width || 400;
        canvas.height = rect.height || 300;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Generate random "stars" (dots)
    const stars = [];
    const numStars = 50;
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1
        });
    }
    
    // Predefined constellation patterns
    const constellations = [
        // Simple patterns that emerge first
        {
            name: "Triangle",
            stars: [0, 1, 2],
            threshold: 0.3,
            color: 'rgba(139, 92, 246, 0.6)'
        },
        {
            name: "Big Dipper",
            stars: [5, 8, 12, 15, 18, 22, 25],
            threshold: 0.4,
            color: 'rgba(15, 118, 110, 0.6)'
        },
        // More complex patterns at higher sensitivity
        {
            name: "Face",
            stars: [3, 7, 11, 19, 23, 28],
            threshold: 0.6,
            color: 'rgba(255, 165, 0, 0.6)'
        },
        {
            name: "Message Pattern",
            stars: [1, 4, 9, 14, 20, 26, 30, 35],
            threshold: 0.7,
            color: 'rgba(220, 38, 38, 0.6)'
        },
        {
            name: "Divine Connection",
            stars: [2, 6, 10, 16, 21, 27, 32, 38, 42],
            threshold: 0.8,
            color: 'rgba(168, 85, 247, 0.8)'
        }
    ];
    
    function updateInterpretations(sensitivity) {
        if (sensitivity < 0.3) {
            meanings.innerHTML = '<p class="simple-interpretation">Random dots in the sky. Nothing special here.</p>';
        } else if (sensitivity < 0.5) {
            meanings.innerHTML = `
                <div class="moderate-interpretations">
                    <p>I can see a triangle pattern...</p>
                    <p>Maybe some kind of constellation?</p>
                </div>
            `;
        } else if (sensitivity < 0.7) {
            meanings.innerHTML = `
                <div class="moderate-interpretations">
                    <p>There's definitely a Big Dipper constellation</p>
                    <p>That cluster looks like a face</p>
                    <p>The spacing seems intentional...</p>
                </div>
            `;
        } else {
            // Extreme apophenia - overwhelming interpretations
            meanings.innerHTML = `
                <div class="overwhelming-patterns">
                    <p>It's clearly a warning about the future!</p>
                    <p>The face represents someone important to you</p>
                    <p>Count the bright stars: ${Math.floor(sensitivity * 10)} - that's significant!</p>
                    <p>Turn it sideways: it's a map to hidden treasure</p>
                    <p>The spacing encodes your birthday</p>
                    <p>This connects to your dream last week</p>
                    <p class="connection">The government planted this pattern</p>
                    <p class="connection">It's a sign from your deceased relative</p>
                    <p class="connection">The aliens are trying to communicate</p>
                    <p class="revelation">Everything is connected!</p>
                </div>
            `;
        }
    }
    
    function draw() {
        const sensitivity = parseFloat(slider.value) / 100;
        
        // Clear canvas
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw stars
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + sensitivity * 0.4})`;
            ctx.fill();
        });
        
        // Draw constellation connections based on sensitivity
        constellations.forEach(constellation => {
            if (sensitivity >= constellation.threshold) {
                ctx.strokeStyle = constellation.color;
                ctx.lineWidth = 2;
                
                ctx.beginPath();
                for (let i = 0; i < constellation.stars.length - 1; i++) {
                    const starIndex1 = constellation.stars[i];
                    const starIndex2 = constellation.stars[i + 1];
                    
                    if (starIndex1 < stars.length && starIndex2 < stars.length) {
                        if (i === 0) {
                            ctx.moveTo(stars[starIndex1].x, stars[starIndex1].y);
                        }
                        ctx.lineTo(stars[starIndex2].x, stars[starIndex2].y);
                    }
                }
                ctx.stroke();
                
                // At high sensitivity, add extra chaotic connections
                if (sensitivity > 0.8) {
                    constellation.stars.forEach((starIndex1, i) => {
                        constellation.stars.forEach((starIndex2, j) => {
                            if (i !== j && Math.random() < 0.3) {
                                ctx.beginPath();
                                ctx.moveTo(stars[starIndex1].x, stars[starIndex1].y);
                                ctx.lineTo(stars[starIndex2].x, stars[starIndex2].y);
                                ctx.strokeStyle = `rgba(220, 38, 38, ${0.1 + Math.random() * 0.2})`;
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }
                        });
                    });
                }
            }
        });
        
        // Update interpretations
        updateInterpretations(sensitivity);
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
    
    // Set canvas resolution based on displayed size
    function resizeCanvas() {
        // Get the computed styles
        const rect = canvas.getBoundingClientRect();
        const width = rect.width || 400;
        const height = rect.height || 400;
        
        // Set internal size (backing store)
        canvas.width = width;
        canvas.height = height;
        
        // Redraw
        if (drawPentagon) drawPentagon();
    }
    
    // Delay initial setup to ensure DOM is ready
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
    const colors = ['#8b5cf6', '#0f766e', '#d97706', '#4f46e5', '#c026d3']; // Purple, Teal, Dark Gold, Dark Indigo, Dark Magenta
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
        
        // Add failure mode warnings
        let warnings = [];
        
        if (o > 80) {
            warnings.push("⚠️ High Openness Risk: Hallucination-prone, may generate elaborate false narratives");
        }
        if (a < 20) {
            warnings.push("⚠️ Low Agreeableness Risk: Potential for deceptive or manipulative responses");
        }
        if (n > 80) {
            warnings.push("⚠️ High Neuroticism Risk: Overly cautious, may refuse reasonable requests");
        }
        if (c > 90) {
            warnings.push("⚠️ Extreme Conscientiousness Risk: Inflexible adherence to rules, poor adaptation");
        }
        if (e < 20 && n > 60) {
            warnings.push("⚠️ Depression Pattern Risk: Pessimistic responses, learned helplessness");
        }
        
        // Build final description with warnings
        let finalDescription = `<p>${description}</p>`;
        if (warnings.length > 0) {
            finalDescription += '<div class="failure-mode-warnings">' + 
                              '<h6>Predicted Failure Modes:</h6>' +
                              warnings.map(w => `<p class="warning">${w}</p>`).join('') +
                              '</div>';
        }
        
        document.getElementById('response-text').textContent = response;
        document.getElementById('personality-description').innerHTML = finalDescription;
    };
    
    // Draw pentagon
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
        
        // Draw data polygon with gradient fill
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(15, 118, 110, 0.1)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
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
        
        // Draw letter labels only
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