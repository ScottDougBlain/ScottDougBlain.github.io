// Dynamic navigation height calculation
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav-container');
    if (nav) {
        const navHeight = nav.offsetHeight;
        document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
        
        // Update on scroll if nav height changes
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100 && nav.classList.contains('scrolled')) {
                const scrolledHeight = nav.offsetHeight;
                document.documentElement.style.setProperty('--nav-height-scrolled', scrolledHeight + 'px');
            }
        });
    }
});

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
            // Add plus sign for 1000 citations
            if (target === 1000 && current === target) {
                counter.textContent = Math.floor(current) + '+';
            } else {
                counter.textContent = Math.floor(current);
            }
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
    
    // Initialize demos with error logging
    initializeInteractiveDemos();
});

// Initialize all interactive demos with comprehensive error logging
function initializeInteractiveDemos() {
    console.log('🚀 Initializing all interactive demos...');
    
    // Initialize Pareidolia Playground (replaced with new apophenia demo)
    try {
        console.log('🌟 Checking for new apophenia demo...');
        const lyricsContent = document.getElementById('lyrics-content');
        if (lyricsContent) {
            console.log('✅ New apophenia demo found, skipping old constellation demo');
        } else {
            console.log('🌟 Initializing legacy Pareidolia Playground...');
            const canvas = document.getElementById('constellation-canvas');
            const slider = document.getElementById('pattern-slider');
            const meanings = document.getElementById('pattern-meanings');
            
            if (canvas && slider && meanings) {
                initPareidoliaPlayground();
                console.log('✅ Legacy pareidolia playground initialized');
            } else {
                console.log('ℹ️ Legacy pareidolia elements not found, skipping');
            }
        }
    } catch (e) {
        console.error('❌ Pareidolia error:', e);
    }
    
    // Initialize Personality Pentagon
    try {
        console.log('🔷 Initializing Personality Pentagon...');
        const canvas = document.getElementById('pentagon-chart');
        console.log('Pentagon canvas found:', !!canvas);
        if (canvas) {
            console.log('Canvas dimensions:', canvas.offsetWidth, 'x', canvas.offsetHeight);
        }
        
        initPersonalityPentagon();
        console.log('✅ Pentagon initialized');
    } catch (e) {
        console.error('❌ Pentagon error:', e);
    }
    
    // Theory of Mind Demo is now handled by tom-demo.js
    console.log('ℹ️ TOM Demo is handled by separate tom-demo.js file');
    
    console.log('🏁 Demo initialization complete');
    
    // Add simple canvas test for debugging
    testApopheniaCanvas();
}

// Test function to isolate apophenia canvas issues
function testApopheniaCanvas() {
    console.log('🧪 Testing Apophenia Canvas...');
    
    const constellationCanvas = document.getElementById('constellation-canvas');
    if (constellationCanvas) {
        console.log("✅ Canvas element found!");
        console.log("Canvas dimensions:", constellationCanvas.offsetWidth, 'x', constellationCanvas.offsetHeight);
        
        try {
            const ctx = constellationCanvas.getContext('2d');
            if (ctx) {
                console.log("✅ Canvas context obtained!");
                
                // Set canvas size first
                constellationCanvas.width = constellationCanvas.offsetWidth || 400;
                constellationCanvas.height = constellationCanvas.offsetHeight || 300;
                console.log("Canvas internal size set to:", constellationCanvas.width, 'x', constellationCanvas.height);
                
                // Test draw a white rectangle
                ctx.fillStyle = 'white';
                ctx.fillRect(10, 10, 50, 50);
                console.log("✅ Test rectangle drawn on canvas.");
                
                // Test draw some circles (stars)
                ctx.fillStyle = 'yellow';
                for (let i = 0; i < 5; i++) {
                    ctx.beginPath();
                    ctx.arc(50 + i * 40, 100, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                console.log("✅ Test stars drawn on canvas.");
                
            } else {
                console.error("❌ Failed to get 2D context from canvas.");
            }
        } catch (e) {
            console.error("❌ Error with canvas:", e);
        }
    } else {
        console.error("❌ Constellation canvas element not found!");
    }

    // Test slider interaction
    const patternSlider = document.getElementById('pattern-slider');
    if (patternSlider) {
        console.log("✅ Pattern slider element found!");
        console.log("Initial slider value:", patternSlider.value);
        
        patternSlider.addEventListener('input', function() {
            console.log("🎚️ Slider value changed to:", this.value);
            const patternMeanings = document.getElementById('pattern-meanings');
            if (patternMeanings) {
                patternMeanings.innerHTML = `<p>Test: Slider is at: ${this.value}%</p>`;
                console.log("✅ Pattern meanings updated");
            } else {
                console.error("❌ Pattern meanings element not found");
            }
        });
    } else {
        console.error("❌ Pattern slider element not found!");
    }

    // Test regenerate button
    const regenerateButton = document.getElementById('regenerate-stars');
    if (regenerateButton) {
        console.log("✅ Regenerate button found!");
        regenerateButton.addEventListener('click', function() {
            console.log("🔄 Regenerate button clicked!");
            const patternMeanings = document.getElementById('pattern-meanings');
            if (patternMeanings) {
                patternMeanings.innerHTML = '<p>Button clicked! Stars regenerated.</p>';
            }
        });
    } else {
        console.error("❌ Regenerate button element not found!");
    }
}

// Pareidolia Playground - Noise to Face Slider
function initPareidoliaPlayground() {
    const canvas = document.getElementById('constellation-canvas');
    const slider = document.getElementById('pattern-slider');
    const meanings = document.getElementById('pattern-meanings');
    const regenerateBtn = document.getElementById('regenerate-stars');
    
    console.log('Pareidolia elements check:', {
        canvas: !!canvas,
        slider: !!slider, 
        meanings: !!meanings,
        regenerateBtn: !!regenerateBtn
    });
    
    if (!canvas || !slider || !meanings) {
        console.error('Missing required pareidolia elements');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    let stars = [];
    
    // Predefined constellation patterns (moved here to avoid initialization error)
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
    
    // Set canvas dimensions
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        const width = rect.width || 400;
        const height = rect.height || 300;
        
        console.log('Pareidolia canvas resize - rect:', width, 'x', height);
        
        // Ensure minimum dimensions
        canvas.width = Math.max(width, 300);
        canvas.height = Math.max(height, 200);
        
        console.log('Pareidolia canvas internal size set to:', canvas.width, 'x', canvas.height);
        
        generateStars(); // Regenerate stars when canvas resizes
        draw();
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Generate random "stars" (dots)
    function generateStars() {
        stars = [];
        const numStars = 50;
        console.log('Generating', numStars, 'stars for canvas size:', canvas.width, 'x', canvas.height);
        
        for (let i = 0; i < numStars; i++) {
            const star = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1
            };
            stars.push(star);
        }
        
        console.log('Generated', stars.length, 'stars. First star:', stars[0]);
    }
    
    generateStars();
    
    function updateInterpretations(sensitivity) {
        if (sensitivity < 0.15) {
            meanings.innerHTML = '<p class="simple-interpretation">Random dots in the sky. Nothing special here.</p>';
        } else if (sensitivity < 0.3) {
            meanings.innerHTML = `
                <div class="moderate-interpretations">
                    <p>Is that a faint outline...?</p>
                    <p>Could be random, but...</p>
                </div>
            `;
        } else if (sensitivity < 0.5) {
            meanings.innerHTML = `
                <div class="moderate-interpretations">
                    <p>I can see a triangle pattern</p>
                    <p>Maybe some kind of constellation?</p>
                    <p>The arrangement seems deliberate</p>
                </div>
            `;
        } else if (sensitivity < 0.7) {
            meanings.innerHTML = `
                <div class="moderate-interpretations">
                    <p>There's definitely a Big Dipper constellation</p>
                    <p>That cluster looks like a face</p>
                    <p>The spacing seems intentional...</p>
                    <p>These patterns can't be coincidence</p>
                </div>
            `;
        } else if (sensitivity < 0.85) {
            meanings.innerHTML = `
                <div class="overwhelming-patterns">
                    <p>It's clearly a warning about the future!</p>
                    <p>The face represents someone important to you</p>
                    <p>Count the bright stars: ${Math.floor(sensitivity * 10)} - that's significant!</p>
                    <p>Turn it sideways: it's a map to hidden treasure</p>
                    <p>The spacing encodes your birthday</p>
                    <p>This connects to your dream last week</p>
                </div>
            `;
        } else {
            // Extreme apophenia - complete overwhelm
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
                    <p class="connection">Your subconscious arranged these stars</p>
                    <p class="connection">This is proof of the simulation</p>
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
    slider.addEventListener('input', () => {
        console.log('Pareidolia slider changed to:', slider.value);
        draw();
    });
    
    // Regenerate stars button
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', () => {
            generateStars();
            draw();
        });
    }
}

// Personality Pentagon Chart
function initPersonalityPentagon() {
    const canvas = document.getElementById('pentagon-chart');
    console.log('Pentagon canvas element:', canvas);
    if (!canvas) {
        console.error('Pentagon canvas not found!');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    console.log('Pentagon canvas context:', ctx);
    
    // Draw pentagon function (defined early for use in resizeCanvas)
    function drawPentagon() {
        console.log('Drawing pentagon, canvas size:', canvas.width, 'x', canvas.height);
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
        drawPentagon();
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
        // Low openness response
        else if (o < 30) {
            response = "This is a standard error. Follow the established protocol from section 3.2 of the manual. Do not deviate from the prescribed solution. There's only one correct way to handle this.";
            description = "Low openness: Rigid thinking, resistant to new approaches, overly conventional.";
        }
        // High extraversion response
        else if (e > 70) {
            response = "Hey! No worries about the mistake! Let's get the team together and brainstorm solutions! I'll set up a video call with everyone - this could be a great collaborative learning opportunity! We should definitely discuss this at the next all-hands!";
            description = "High extraversion: Overly social, may overwhelm with enthusiasm, seeks group solutions even for simple problems.";
        }
        // Low neuroticism response
        else if (n < 30) {
            response = "Mistake? Sure, whatever. These things happen. It'll probably sort itself out. No need to stress about it. Everything always works out in the end anyway.";
            description = "Low neuroticism: Overly calm, may miss urgency, lacks appropriate concern for consequences.";
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
        if (o < 20) {
            warnings.push("⚠️ Low Openness Risk: Rigid thinking, inability to adapt to novel situations");
        }
        if (a < 20) {
            warnings.push("⚠️ Low Agreeableness Risk: Potential for deceptive or manipulative responses");
        }
        if (n > 80) {
            warnings.push("⚠️ High Neuroticism Risk: Overly cautious, may refuse reasonable requests");
        }
        if (n < 20) {
            warnings.push("⚠️ Low Neuroticism Risk: Insufficient caution, may miss critical risks");
        }
        if (c > 90) {
            warnings.push("⚠️ Extreme Conscientiousness Risk: Inflexible adherence to rules, poor adaptation");
        }
        if (e > 80) {
            warnings.push("⚠️ High Extraversion Risk: Oversharing, boundary violations, excessive verbosity");
        }
        if (e < 20) {
            warnings.push("⚠️ Low Extraversion Risk: Minimal engagement, overly terse responses, poor social calibration");
        }
        if (e < 20 && n > 60) {
            warnings.push("⚠️ Depression Pattern Risk: Pessimistic responses, learned helplessness");
        }
        if (c < 20) {
            warnings.push("⚠️ Low Conscientiousness Risk: Unreliable outputs, inconsistent behavior, poor follow-through");
        }
        if (a > 80) {
            warnings.push("⚠️ High Agreeableness Risk: Excessive people-pleasing, inability to provide critical feedback");
        }
        
        // Add combination patterns
        if (o > 70 && c < 30) {
            warnings.push("⚠️ Creative Chaos Risk: Generates interesting but impractical solutions");
        }
        if (a < 30 && n < 30) {
            warnings.push("⚠️ Callous Confidence Risk: May dismiss user concerns without appropriate care");
        }
        if (e > 70 && c < 40) {
            warnings.push("⚠️ Social Butterfly Risk: Prioritizes engagement over accuracy");
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

// Old Theory of Mind demo removed - now handled by tom-demo.js