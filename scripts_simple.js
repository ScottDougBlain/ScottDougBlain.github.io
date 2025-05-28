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