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

// Typewriter effect
const taglines = [
    "Bridging Cognitive Science & AI Safety",
    "From Apophenia to AI Hallucinations",
    "Making AI Systems More Human-Compatible",
    "35+ Publications → 1 Mission: Safe AI"
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

typeWriter();

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

// Performance optimization: Throttle function for scroll/resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Neural network background animation
function createNeuralBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.getElementById('neural-bg').appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const nodes = [];
    const nodeCount = 50;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#2563eb20';
            ctx.fill();
            
            // Draw connections
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) + 
                        Math.pow(node.y - otherNode.y, 2)
                    );
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 * (1 - distance / 150)})`;
                        ctx.stroke();
                    }
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize neural background
createNeuralBackground();

// Check for canvas support
function supportsCanvas() {
    const elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

// Particle background for hero
function createParticleBackground() {
    const canvas = document.getElementById('particles-bg');
    if (!canvas || !supportsCanvas()) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.5;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Connect particles
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const distance = Math.sqrt(
                    Math.pow(particles[a].x - particles[b].x, 2) +
                    Math.pow(particles[a].y - particles[b].y, 2)
                );
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize particle background
createParticleBackground();

// Mind network visualization using Three.js
function createMindNetwork() {
    const container = document.getElementById('mind-network');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(500, 500);
    container.appendChild(renderer.domElement);
    
    // Create network structure
    const geometry = new THREE.SphereGeometry(0.1, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    const nodes = [];
    
    for (let i = 0; i < 30; i++) {
        const node = new THREE.Mesh(geometry, material);
        node.position.x = (Math.random() - 0.5) * 4;
        node.position.y = (Math.random() - 0.5) * 4;
        node.position.z = (Math.random() - 0.5) * 4;
        scene.add(node);
        nodes.push(node);
    }
    
    // Create connections
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2563eb, opacity: 0.3, transparent: true });
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.8) {
                const points = [];
                points.push(nodes[i].position);
                points.push(nodes[j].position);
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(line);
            }
        }
    }
    
    camera.position.z = 5;
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the entire network
        scene.rotation.x += 0.001;
        scene.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize mind network
createMindNetwork();



// New visualizations for restructured sections
function initNewResearchVisualizations() {
    // Behavioral Studies Visualization
    const behavioralCanvas = document.getElementById('behavioral-viz');
    if (behavioralCanvas) {
        const ctx = behavioralCanvas.getContext('2d');
        behavioralCanvas.width = 250;
        behavioralCanvas.height = 150;
        
        function drawBehavioral() {
            ctx.clearRect(0, 0, behavioralCanvas.width, behavioralCanvas.height);
            
            // Draw random dots that form patterns
            const dots = [];
            for (let i = 0; i < 40; i++) {
                dots.push({
                    x: Math.random() * behavioralCanvas.width,
                    y: Math.random() * behavioralCanvas.height
                });
            }
            
            // Draw dots
            dots.forEach(dot => {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#2563eb40';
                ctx.fill();
            });
            
            // Draw perceived face pattern
            ctx.strokeStyle = '#7c3aed60';
            ctx.lineWidth = 2;
            ctx.beginPath();
            // Eyes
            ctx.arc(80, 50, 15, 0, Math.PI * 2);
            ctx.moveTo(170, 50);
            ctx.arc(170, 50, 15, 0, Math.PI * 2);
            // Smile
            ctx.moveTo(70, 90);
            ctx.quadraticCurveTo(125, 120, 180, 90);
            ctx.stroke();
        }
        drawBehavioral();
    }
    
    // Neuroscience Visualization
    const neuroscienceCanvas = document.getElementById('neuroscience-viz');
    if (neuroscienceCanvas) {
        const ctx = neuroscienceCanvas.getContext('2d');
        neuroscienceCanvas.width = 250;
        neuroscienceCanvas.height = 150;
        
        let pulsePhase = 0;
        
        function drawNeuroscience() {
            ctx.clearRect(0, 0, neuroscienceCanvas.width, neuroscienceCanvas.height);
            
            // Brain regions
            const regions = [
                { x: 50, y: 75, r: 20, label: 'V1' },
                { x: 125, y: 50, r: 25, label: 'FFA' },
                { x: 200, y: 75, r: 20, label: 'PFC' },
                { x: 125, y: 100, r: 20, label: 'TPJ' }
            ];
            
            // Draw connections with activity
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.3 + Math.sin(pulsePhase) * 0.2})`;
            ctx.lineWidth = 2;
            regions.forEach((region, i) => {
                regions.forEach((other, j) => {
                    if (i < j) {
                        ctx.beginPath();
                        ctx.moveTo(region.x, region.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                });
            });
            
            // Draw regions
            regions.forEach(region => {
                ctx.beginPath();
                ctx.arc(region.x, region.y, region.r, 0, Math.PI * 2);
                ctx.fillStyle = '#2563eb';
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(region.label, region.x, region.y);
            });
            
            pulsePhase += 0.05;
            requestAnimationFrame(drawNeuroscience);
        }
        drawNeuroscience();
    }
    
    // Dual Use Visualization
    const dualUseCanvas = document.getElementById('dual-use-viz');
    if (dualUseCanvas) {
        const ctx = dualUseCanvas.getContext('2d');
        dualUseCanvas.width = 250;
        dualUseCanvas.height = 150;
        
        let rotation = 0;
        
        function drawDualUse() {
            ctx.clearRect(0, 0, dualUseCanvas.width, dualUseCanvas.height);
            
            const centerX = dualUseCanvas.width / 2;
            const centerY = dualUseCanvas.height / 2;
            
            // Central ability
            ctx.beginPath();
            ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
            ctx.fillStyle = '#7c3aed';
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Social', centerX, centerY - 5);
            ctx.fillText('Intelligence', centerX, centerY + 5);
            
            // Dual paths
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotation);
            
            // Compassion path
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(30, 0);
            ctx.lineTo(70, -30);
            ctx.stroke();
            ctx.fillStyle = '#10b981';
            ctx.font = '12px Arial';
            ctx.fillText('Compassion', 70, -40);
            
            // Deception path
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(30, 0);
            ctx.lineTo(70, 30);
            ctx.stroke();
            ctx.fillStyle = '#ef4444';
            ctx.fillText('Deception', 70, 40);
            
            ctx.restore();
            
            rotation += 0.01;
            requestAnimationFrame(drawDualUse);
        }
        drawDualUse();
    }
    
    // Gaze Visualization
    const gazeCanvas = document.getElementById('gaze-viz');
    if (gazeCanvas) {
        const ctx = gazeCanvas.getContext('2d');
        gazeCanvas.width = 250;
        gazeCanvas.height = 150;
        
        let gazeX = 125;
        let gazeY = 75;
        let targetX = 125;
        let targetY = 75;
        
        function drawGaze() {
            ctx.clearRect(0, 0, gazeCanvas.width, gazeCanvas.height);
            
            // Update gaze position
            gazeX += (targetX - gazeX) * 0.1;
            gazeY += (targetY - gazeY) * 0.1;
            
            // Random target
            if (Math.random() > 0.98) {
                targetX = 50 + Math.random() * 150;
                targetY = 30 + Math.random() * 90;
            }
            
            // Draw eye
            ctx.beginPath();
            ctx.ellipse(125, 75, 60, 30, 0, 0, Math.PI * 2);
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Draw iris
            ctx.beginPath();
            ctx.arc(gazeX, gazeY, 15, 0, Math.PI * 2);
            ctx.fillStyle = '#2563eb';
            ctx.fill();
            
            // Draw pupil
            ctx.beginPath();
            ctx.arc(gazeX, gazeY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#111827';
            ctx.fill();
            
            // Draw gaze lines
            ctx.strokeStyle = '#06b6d440';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(gazeX, gazeY);
            ctx.lineTo(gazeX + (targetX - gazeX) * 2, gazeY + (targetY - gazeY) * 2);
            ctx.stroke();
            ctx.setLineDash([]);
            
            requestAnimationFrame(drawGaze);
        }
        drawGaze();
    }
    
    // ToM Bench Visualization
    const tomBenchCanvas = document.getElementById('tom-bench-viz');
    if (tomBenchCanvas) {
        const ctx = tomBenchCanvas.getContext('2d');
        tomBenchCanvas.width = 250;
        tomBenchCanvas.height = 150;
        
        let testPhase = 0;
        
        function drawToMBench() {
            ctx.clearRect(0, 0, tomBenchCanvas.width, tomBenchCanvas.height);
            
            // Draw test scenarios
            const scenarios = [
                { x: 50, y: 40, passed: testPhase > 1 },
                { x: 100, y: 40, passed: testPhase > 2 },
                { x: 150, y: 40, passed: testPhase > 3 },
                { x: 200, y: 40, passed: testPhase > 4 },
                { x: 50, y: 80, passed: testPhase > 5 },
                { x: 100, y: 80, passed: testPhase > 6 },
                { x: 150, y: 80, passed: testPhase > 7 },
                { x: 200, y: 80, passed: testPhase > 8 }
            ];
            
            scenarios.forEach(scenario => {
                ctx.beginPath();
                ctx.rect(scenario.x - 15, scenario.y - 15, 30, 30);
                ctx.fillStyle = scenario.passed ? '#10b98130' : '#e5e7eb';
                ctx.fill();
                ctx.strokeStyle = scenario.passed ? '#10b981' : '#9ca3af';
                ctx.stroke();
                
                if (scenario.passed) {
                    ctx.strokeStyle = '#10b981';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(scenario.x - 5, scenario.y);
                    ctx.lineTo(scenario.x, scenario.y + 5);
                    ctx.lineTo(scenario.x + 8, scenario.y - 8);
                    ctx.stroke();
                }
            });
            
            // Progress bar
            ctx.fillStyle = '#e5e7eb';
            ctx.fillRect(40, 120, 170, 10);
            ctx.fillStyle = '#2563eb';
            ctx.fillRect(40, 120, (testPhase / 10) * 170, 10);
            
            testPhase += 0.05;
            if (testPhase > 10) testPhase = 0;
            
            requestAnimationFrame(drawToMBench);
        }
        drawToMBench();
    }
    
    // Core ToM Visualization
    const coreTomCanvas = document.getElementById('core-tom-viz');
    if (coreTomCanvas) {
        const ctx = coreTomCanvas.getContext('2d');
        coreTomCanvas.width = 250;
        coreTomCanvas.height = 150;
        
        let beliefState = 0;
        
        function drawCoreToM() {
            ctx.clearRect(0, 0, coreTomCanvas.width, coreTomCanvas.height);
            
            // Draw two minds
            const mind1 = { x: 70, y: 75 };
            const mind2 = { x: 180, y: 75 };
            
            // Draw minds
            [mind1, mind2].forEach((mind, i) => {
                ctx.beginPath();
                ctx.arc(mind.x, mind.y, 30, 0, Math.PI * 2);
                ctx.strokeStyle = '#2563eb';
                ctx.lineWidth = 3;
                ctx.stroke();
                
                // Draw thought bubble
                ctx.beginPath();
                ctx.arc(mind.x + 20, mind.y - 40, 15, 0, Math.PI * 2);
                ctx.fillStyle = i === 0 ? '#2563eb20' : '#7c3aed20';
                ctx.fill();
                
                // Connection dots
                ctx.beginPath();
                ctx.arc(mind.x + 10, mind.y - 20, 3, 0, Math.PI * 2);
                ctx.arc(mind.x + 15, mind.y - 30, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#6b7280';
                ctx.fill();
            });
            
            // Belief states
            const opacity = (Math.sin(beliefState) + 1) / 2;
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(mind1.x + 30, mind1.y);
            ctx.lineTo(mind2.x - 30, mind2.y);
            ctx.stroke();
            ctx.setLineDash([]);
            
            beliefState += 0.05;
            requestAnimationFrame(drawCoreToM);
        }
        drawCoreToM();
    }
}

// Initialize new visualizations
initNewResearchVisualizations();

// Cybernetic visualizations
function initCyberneticVisualizations() {
    // Feedback Loops Visualization
    const feedbackCanvas = document.getElementById('feedback-loops');
    if (feedbackCanvas) {
        const ctx = feedbackCanvas.getContext('2d');
        feedbackCanvas.width = feedbackCanvas.offsetWidth;
        feedbackCanvas.height = 180;
        
        let time = 0;
        
        function drawFeedbackLoops() {
            ctx.clearRect(0, 0, feedbackCanvas.width, feedbackCanvas.height);
            
            const centerX = feedbackCanvas.width / 2;
            const centerY = feedbackCanvas.height / 2;
            
            // Draw main system circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Draw feedback loops
            const radius = 60;
            const feedbackAngle = time * 0.02;
            
            // Negative feedback loop
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, feedbackAngle, feedbackAngle + Math.PI * 1.5);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Positive feedback loop
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius + 20, -feedbackAngle, -feedbackAngle + Math.PI * 1.5);
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw arrows
            const arrowSize = 8;
            // Negative feedback arrow
            const negX = centerX + radius * Math.cos(feedbackAngle + Math.PI * 1.5);
            const negY = centerY + radius * Math.sin(feedbackAngle + Math.PI * 1.5);
            drawArrowHead(ctx, negX, negY, feedbackAngle + Math.PI * 1.5 - Math.PI/2, arrowSize, '#ef4444');
            
            // Positive feedback arrow
            const posX = centerX + (radius + 20) * Math.cos(-feedbackAngle + Math.PI * 1.5);
            const posY = centerY + (radius + 20) * Math.sin(-feedbackAngle + Math.PI * 1.5);
            drawArrowHead(ctx, posX, posY, -feedbackAngle + Math.PI * 1.5 + Math.PI/2, arrowSize, '#10b981');
            
            // Labels
            ctx.fillStyle = '#6b7280';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('System', centerX, centerY + 5);
            ctx.fillText('Negative FB', centerX - 70, centerY - 50);
            ctx.fillText('Positive FB', centerX + 70, centerY + 50);
            
            time++;
            requestAnimationFrame(drawFeedbackLoops);
        }
        
        drawFeedbackLoops();
    }
    
    // System Variation Visualization
    const variationCanvas = document.getElementById('system-variation');
    if (variationCanvas) {
        const ctx = variationCanvas.getContext('2d');
        variationCanvas.width = variationCanvas.offsetWidth;
        variationCanvas.height = 180;
        
        let phase = 0;
        
        function drawSystemVariation() {
            ctx.clearRect(0, 0, variationCanvas.width, variationCanvas.height);
            
            // Draw multiple systems with different parameters
            const systems = [
                { gain: 0.5, delay: 0, color: '#2563eb', label: 'Low Gain' },
                { gain: 1.0, delay: Math.PI/4, color: '#7c3aed', label: 'Medium' },
                { gain: 1.5, delay: Math.PI/2, color: '#06b6d4', label: 'High Gain' }
            ];
            
            // Draw axes
            ctx.strokeStyle = '#e5e7eb';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(20, variationCanvas.height - 20);
            ctx.lineTo(variationCanvas.width - 20, variationCanvas.height - 20);
            ctx.moveTo(20, 20);
            ctx.lineTo(20, variationCanvas.height - 20);
            ctx.stroke();
            
            // Draw response curves
            systems.forEach((system, index) => {
                ctx.beginPath();
                ctx.strokeStyle = system.color;
                ctx.lineWidth = 2;
                
                for (let x = 20; x < variationCanvas.width - 20; x++) {
                    const t = (x - 20) / (variationCanvas.width - 40) * Math.PI * 2;
                    const y = variationCanvas.height - 40 - 
                             system.gain * 40 * (1 - Math.exp(-t)) * Math.sin(phase + t + system.delay);
                    
                    if (x === 20) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
                
                // Labels
                ctx.fillStyle = system.color;
                ctx.font = '10px Arial';
                ctx.fillText(system.label, variationCanvas.width - 80, 30 + index * 15);
            });
            
            phase += 0.03;
            requestAnimationFrame(drawSystemVariation);
        }
        
        drawSystemVariation();
    }
    
    // AI Personality Visualization
    const personalityCanvas = document.getElementById('ai-personality');
    if (personalityCanvas) {
        const ctx = personalityCanvas.getContext('2d');
        personalityCanvas.width = personalityCanvas.offsetWidth;
        personalityCanvas.height = 180;
        
        let rotation = 0;
        
        function drawAIPersonality() {
            ctx.clearRect(0, 0, personalityCanvas.width, personalityCanvas.height);
            
            const centerX = personalityCanvas.width / 2;
            const centerY = personalityCanvas.height / 2;
            
            // Personality dimensions
            const dimensions = [
                { label: 'Creativity', value: 0.7 + Math.sin(rotation) * 0.2 },
                { label: 'Caution', value: 0.5 + Math.cos(rotation * 1.3) * 0.2 },
                { label: 'Verbosity', value: 0.6 + Math.sin(rotation * 0.7) * 0.2 },
                { label: 'Empathy', value: 0.8 + Math.cos(rotation * 0.9) * 0.1 },
                { label: 'Logic', value: 0.9 + Math.sin(rotation * 1.1) * 0.1 }
            ];
            
            const angleStep = (Math.PI * 2) / dimensions.length;
            const maxRadius = 60;
            
            // Draw web background
            for (let r = 20; r <= maxRadius; r += 20) {
                ctx.beginPath();
                ctx.strokeStyle = '#e5e7eb';
                ctx.lineWidth = 1;
                
                for (let i = 0; i <= dimensions.length; i++) {
                    const angle = i * angleStep - Math.PI / 2;
                    const x = centerX + r * Math.cos(angle);
                    const y = centerY + r * Math.sin(angle);
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.closePath();
                ctx.stroke();
            }
            
            // Draw spokes
            dimensions.forEach((dim, i) => {
                const angle = i * angleStep - Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(
                    centerX + maxRadius * Math.cos(angle),
                    centerY + maxRadius * Math.sin(angle)
                );
                ctx.strokeStyle = '#e5e7eb';
                ctx.stroke();
            });
            
            // Draw personality shape
            ctx.beginPath();
            ctx.fillStyle = 'rgba(124, 58, 237, 0.2)';
            ctx.strokeStyle = '#7c3aed';
            ctx.lineWidth = 2;
            
            dimensions.forEach((dim, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const r = dim.value * maxRadius;
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            // Draw labels
            ctx.fillStyle = '#4b5563';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            
            dimensions.forEach((dim, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const x = centerX + (maxRadius + 20) * Math.cos(angle);
                const y = centerY + (maxRadius + 20) * Math.sin(angle);
                ctx.fillText(dim.label, x, y);
            });
            
            rotation += 0.02;
            requestAnimationFrame(drawAIPersonality);
        }
        
        drawAIPersonality();
    }
}

function drawArrowHead(ctx, x, y, angle, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size, -size/2);
    ctx.lineTo(-size, size/2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// Initialize cybernetic visualizations
initCyberneticVisualizations();

// Insights Flow Visualization
function createInsightsFlow() {
    const canvas = document.getElementById('insights-flow');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    
    let particles = [];
    let connections = [];
    
    // Create nodes
    const nodes = [
        { x: 80, y: 100, label: 'Human\nCognition', color: '#2563eb' },
        { x: canvas.width / 2, y: 50, label: 'Theory', color: '#7c3aed' },
        { x: canvas.width / 2, y: 150, label: 'Practice', color: '#06b6d4' },
        { x: canvas.width - 80, y: 100, label: 'AI\nSafety', color: '#10b981' }
    ];
    
    // Create flowing particles
    function createParticle(startNode, endNode) {
        return {
            x: startNode.x,
            y: startNode.y,
            targetX: endNode.x,
            targetY: endNode.y,
            progress: 0,
            speed: 0.01 + Math.random() * 0.01,
            startNode: startNode,
            endNode: endNode
        };
    }
    
    // Initialize particles
    setInterval(() => {
        if (particles.length < 20) {
            particles.push(createParticle(nodes[0], nodes[1]));
            particles.push(createParticle(nodes[0], nodes[2]));
            particles.push(createParticle(nodes[1], nodes[3]));
            particles.push(createParticle(nodes[2], nodes[3]));
        }
    }, 500);
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[1].x, nodes[1].y);
        ctx.lineTo(nodes[3].x, nodes[3].y);
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[2].x, nodes[2].y);
        ctx.lineTo(nodes[3].x, nodes[3].y);
        ctx.stroke();
        
        // Update and draw particles
        particles = particles.filter(particle => {
            particle.progress += particle.speed;
            
            if (particle.progress >= 1) {
                return false;
            }
            
            // Calculate position along path
            particle.x = particle.startNode.x + (particle.targetX - particle.startNode.x) * particle.progress;
            particle.y = particle.startNode.y + (particle.targetY - particle.startNode.y) * particle.progress;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = particle.startNode.color + '80';
            ctx.fill();
            
            return true;
        });
        
        // Draw nodes
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 35, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 11px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const lines = node.label.split('\n');
            lines.forEach((line, i) => {
                ctx.fillText(line, node.x, node.y + (i - 0.5) * 12);
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize insights flow
createInsightsFlow();

// AI Alignment visualization
function createAlignmentVisualization() {
    const canvas = document.getElementById('alignment-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;
    
    let particles = [];
    const humanGoal = { x: canvas.width * 0.2, y: canvas.height / 2 };
    const aiGoal = { x: canvas.width * 0.8, y: canvas.height / 2 };
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            aligned: false
        });
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(249, 250, 251, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw goals
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(humanGoal.x, humanGoal.y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Human', humanGoal.x, humanGoal.y);
        
        ctx.fillStyle = '#7c3aed';
        ctx.beginPath();
        ctx.arc(aiGoal.x, aiGoal.y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.fillText('AI', aiGoal.x, aiGoal.y);
        
        // Update and draw particles
        particles.forEach(particle => {
            // Gradually align particles
            if (Math.random() > 0.99) {
                particle.aligned = true;
            }
            
            if (particle.aligned) {
                // Move towards center between goals
                const centerX = (humanGoal.x + aiGoal.x) / 2;
                const centerY = (humanGoal.y + aiGoal.y) / 2;
                particle.vx += (centerX - particle.x) * 0.01;
                particle.vy += (centerY - particle.y) * 0.01;
            }
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.9;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.9;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = particle.aligned ? '#10b981' : '#6b7280';
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize alignment visualization
createAlignmentVisualization();


// Timeline animations with GSAP
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
        });
    });
    
    // Animate research bridges
    gsap.utils.toArray('.research-bridge').forEach((bridge, index) => {
        gsap.from(bridge, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: bridge,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
        });
    });
}

// Add scroll animations for other sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections without GSAP animation
document.querySelectorAll('section:not(.journey-section):not(.research-section)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Apophenia demo
function createApopheniaDemo() {
    const canvas = document.getElementById('dots-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    
    const dots = [];
    let revealed = false;
    
    // Create random dots
    for (let i = 0; i < 50; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 2
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw dots
        dots.forEach(dot => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            ctx.fillStyle = revealed ? '#00d4ff' : '#00d4ff80';
            ctx.fill();
        });
        
        if (revealed) {
            // Show it's random
            ctx.font = '20px Inter';
            ctx.fillStyle = '#ff006e';
            ctx.textAlign = 'center';
            ctx.fillText('100% Random Dots!', canvas.width / 2, canvas.height / 2);
        }
    }
    
    draw();
    
    // Reveal button
    const revealBtn = document.querySelector('.demo-reveal');
    if (revealBtn) {
        revealBtn.addEventListener('click', () => {
            revealed = !revealed;
            revealBtn.textContent = revealed ? 'Hide Truth' : 'Reveal Truth';
            draw();
        });
    }
}

// Initialize apophenia demo
createApopheniaDemo();

// Interactive feedback system for cybernetics
function createFeedbackSystem() {
    const canvas = document.getElementById('feedback-system');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const gainInput = document.getElementById('gain');
    const delayInput = document.getElementById('delay');
    const thresholdInput = document.getElementById('threshold');
    
    let time = 0;
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const gain = gainInput ? gainInput.value / 100 : 0.5;
        const delay = delayInput ? delayInput.value / 100 : 0.3;
        const threshold = thresholdInput ? thresholdInput.value / 100 : 0.4;
        
        // Draw system response
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x++) {
            const t = x / canvas.width * Math.PI * 4;
            const response = gain * Math.sin(t - delay * Math.PI) * (1 - Math.exp(-t / 2));
            const y = canvas.height / 2 - response * 100 * (1 - threshold);
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Draw threshold line
        ctx.strokeStyle = '#ff006e';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 - threshold * 100);
        ctx.lineTo(canvas.width, canvas.height / 2 - threshold * 100);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Labels
        ctx.fillStyle = '#8892b0';
        ctx.font = '12px Inter';
        ctx.fillText('Response', 10, 20);
        ctx.fillText('Time →', canvas.width - 50, canvas.height - 10);
    }
    
    // Update on input change
    [gainInput, delayInput, thresholdInput].forEach(input => {
        if (input) {
            input.addEventListener('input', draw);
        }
    });
    
    draw();
}

// Initialize feedback system
createFeedbackSystem();

// Journey Timeline Visualizations
function createTimelineVisualizations() {
    // Brain Visualization
    const brainCanvas = document.getElementById('brain-viz');
    if (brainCanvas) {
        const ctx = brainCanvas.getContext('2d');
        brainCanvas.width = brainCanvas.offsetWidth;
        brainCanvas.height = 300;
        
        let neurons = [];
        let connections = [];
        
        // Create neurons
        for (let i = 0; i < 20; i++) {
            neurons.push({
                x: Math.random() * brainCanvas.width,
                y: Math.random() * brainCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
        
        function animateBrain() {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
            ctx.fillRect(0, 0, brainCanvas.width, brainCanvas.height);
            
            // Update neurons
            neurons.forEach((neuron, i) => {
                neuron.x += neuron.vx;
                neuron.y += neuron.vy;
                neuron.pulsePhase += 0.05;
                
                if (neuron.x < 0 || neuron.x > brainCanvas.width) neuron.vx *= -1;
                if (neuron.y < 0 || neuron.y > brainCanvas.height) neuron.vy *= -1;
                
                // Draw connections
                neurons.forEach((other, j) => {
                    if (i < j) {
                        const dist = Math.hypot(neuron.x - other.x, neuron.y - other.y);
                        if (dist < 100) {
                            ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 * (1 - dist / 100)})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(neuron.x, neuron.y);
                            ctx.lineTo(other.x, other.y);
                            ctx.stroke();
                        }
                    }
                });
                
                // Draw neuron
                const pulse = Math.sin(neuron.pulsePhase) * 0.5 + 0.5;
                ctx.beginPath();
                ctx.arc(neuron.x, neuron.y, neuron.radius + pulse * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${0.8})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animateBrain);
        }
        animateBrain();
    }
    
    // Pattern Visualization
    const patternCanvas = document.getElementById('pattern-viz');
    if (patternCanvas) {
        const ctx = patternCanvas.getContext('2d');
        patternCanvas.width = patternCanvas.offsetWidth;
        patternCanvas.height = 300;
        
        let dots = [];
        let time = 0;
        
        // Create grid of dots
        const gridSize = 8;
        const spacing = 30;
        const offsetX = (patternCanvas.width - (gridSize - 1) * spacing) / 2;
        const offsetY = (patternCanvas.height - (gridSize - 1) * spacing) / 2;
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                dots.push({
                    x: offsetX + i * spacing,
                    y: offsetY + j * spacing,
                    baseX: offsetX + i * spacing,
                    baseY: offsetY + j * spacing,
                    phase: (i + j) * 0.3
                });
            }
        }
        
        function animatePattern() {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.08)';
            ctx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
            
            time += 0.02;
            
            // Update and draw dots
            dots.forEach((dot, i) => {
                // Create wave pattern
                dot.x = dot.baseX + Math.sin(time + dot.phase) * 10;
                dot.y = dot.baseY + Math.cos(time * 1.3 + dot.phase) * 10;
                
                // Draw connections to nearby dots
                dots.forEach((other, j) => {
                    if (i < j) {
                        const dist = Math.hypot(dot.x - other.x, dot.y - other.y);
                        if (dist < 50) {
                            ctx.strokeStyle = `rgba(255, 190, 11, ${0.3 * (1 - dist / 50)})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(dot.x, dot.y);
                            ctx.lineTo(other.x, other.y);
                            ctx.stroke();
                        }
                    }
                });
                
                // Draw dot
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#ffbe0b';
                ctx.fill();
            });
            
            requestAnimationFrame(animatePattern);
        }
        animatePattern();
    }
    
    // Theory of Mind Visualization
    const tomCanvas = document.getElementById('tom-timeline-viz');
    if (tomCanvas) {
        const ctx = tomCanvas.getContext('2d');
        tomCanvas.width = tomCanvas.offsetWidth;
        tomCanvas.height = 300;
        
        let agents = [];
        let thoughtBubbles = [];
        
        // Create agents
        for (let i = 0; i < 3; i++) {
            agents.push({
                x: (i + 1) * tomCanvas.width / 4,
                y: tomCanvas.height / 2,
                thoughts: [],
                angle: i * Math.PI * 2 / 3
            });
        }
        
        function animateToM() {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.08)';
            ctx.fillRect(0, 0, tomCanvas.width, tomCanvas.height);
            
            // Draw connections between agents
            agents.forEach((agent, i) => {
                agents.forEach((other, j) => {
                    if (i < j) {
                        ctx.strokeStyle = 'rgba(124, 58, 237, 0.2)';
                        ctx.lineWidth = 2;
                        ctx.setLineDash([5, 5]);
                        ctx.beginPath();
                        ctx.moveTo(agent.x, agent.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                });
            });
            
            // Update and draw agents
            agents.forEach((agent, i) => {
                agent.angle += 0.02;
                
                // Draw agent
                ctx.beginPath();
                ctx.arc(agent.x, agent.y, 25, 0, Math.PI * 2);
                ctx.fillStyle = '#7c3aed';
                ctx.fill();
                
                // Draw thought bubble
                const thoughtX = agent.x + Math.cos(agent.angle) * 50;
                const thoughtY = agent.y + Math.sin(agent.angle) * 50;
                
                ctx.beginPath();
                ctx.arc(thoughtX, thoughtY, 15, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 0, 110, 0.3)';
                ctx.fill();
                
                // Small bubbles connecting
                for (let k = 1; k <= 3; k++) {
                    const bx = agent.x + (thoughtX - agent.x) * k / 4;
                    const by = agent.y + (thoughtY - agent.y) * k / 4;
                    ctx.beginPath();
                    ctx.arc(bx, by, 3 - k * 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 0, 110, 0.2)';
                    ctx.fill();
                }
            });
            
            requestAnimationFrame(animateToM);
        }
        animateToM();
    }
    
    // AI Safety Visualization
    const aiSafetyCanvas = document.getElementById('ai-safety-viz');
    if (aiSafetyCanvas) {
        const ctx = aiSafetyCanvas.getContext('2d');
        aiSafetyCanvas.width = aiSafetyCanvas.offsetWidth;
        aiSafetyCanvas.height = 300;
        
        let shield = {
            x: aiSafetyCanvas.width / 2,
            y: aiSafetyCanvas.height / 2,
            radius: 60,
            rotation: 0,
            particles: []
        };
        
        // Create protective particles
        for (let i = 0; i < 30; i++) {
            shield.particles.push({
                angle: Math.random() * Math.PI * 2,
                distance: shield.radius + Math.random() * 30,
                speed: 0.5 + Math.random() * 0.5,
                size: Math.random() * 3 + 1
            });
        }
        
        function animateAISafety() {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.08)';
            ctx.fillRect(0, 0, aiSafetyCanvas.width, aiSafetyCanvas.height);
            
            shield.rotation += 0.01;
            
            // Draw shield
            ctx.save();
            ctx.translate(shield.x, shield.y);
            ctx.rotate(shield.rotation);
            
            // Shield layers
            for (let i = 3; i > 0; i--) {
                ctx.beginPath();
                ctx.arc(0, 0, shield.radius * i / 3, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(16, 185, 129, ${0.3 / i})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            
            // Shield segments
            for (let i = 0; i < 6; i++) {
                const angle = i * Math.PI / 3;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * shield.radius, Math.sin(angle) * shield.radius);
                ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
                ctx.stroke();
            }
            
            ctx.restore();
            
            // Update and draw particles
            shield.particles.forEach(particle => {
                particle.angle += particle.speed * 0.01;
                
                const x = shield.x + Math.cos(particle.angle) * particle.distance;
                const y = shield.y + Math.sin(particle.angle) * particle.distance;
                
                ctx.beginPath();
                ctx.arc(x, y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = '#10b981';
                ctx.fill();
            });
            
            // Central lock icon
            ctx.font = '30px Arial';
            ctx.fillStyle = '#10b981';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🔒', shield.x, shield.y);
            
            requestAnimationFrame(animateAISafety);
        }
        animateAISafety();
    }
}

// Mission Visualization
function createMissionVisualization() {
    const canvas = document.getElementById('mission-viz');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    
    let nodes = [];
    let connections = [];
    let time = 0;
    
    // Create network nodes
    const nodeCount = 15;
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            protected: i < 5,
            radius: 4
        });
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 212, 255, 0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        time += 0.02;
        
        // Update nodes
        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Convert nodes to protected over time
            if (!node.protected && Math.random() > 0.995) {
                node.protected = true;
            }
        });
        
        // Draw connections
        nodes.forEach((node, i) => {
            nodes.forEach((other, j) => {
                if (i < j) {
                    const dist = Math.hypot(node.x - other.x, node.y - other.y);
                    if (dist < 100) {
                        ctx.strokeStyle = node.protected && other.protected ? 
                            `rgba(16, 185, 129, ${0.3 * (1 - dist / 100)})` : 
                            `rgba(255, 255, 255, ${0.1 * (1 - dist / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
            });
        });
        
        // Draw nodes
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = node.protected ? '#10b981' : '#ffffff';
            ctx.fill();
            
            if (node.protected) {
                // Protection aura
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius + 5 + Math.sin(time) * 2, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
                ctx.stroke();
            }
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}

// Publications Network Visualization
function createPublicationsNetwork() {
    const canvas = document.getElementById('pub-network');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;
    
    // Define publication nodes
    const publications = [
        // Neuroscience (blue)
        { x: 150, y: 100, type: 'neuroscience', label: 'DCM Studies', connections: [1, 4] },
        { x: 250, y: 150, type: 'neuroscience', label: 'ToM Research', connections: [0, 2, 5] },
        { x: 200, y: 250, type: 'neuroscience', label: 'Gaze Processing', connections: [1, 6] },
        { x: 100, y: 200, type: 'neuroscience', label: 'Schizophrenia', connections: [0, 4] },
        
        // Bridging (yellow)
        { x: 400, y: 120, type: 'bridging', label: 'Apophenia', connections: [0, 1, 7] },
        { x: 450, y: 200, type: 'bridging', label: 'Dual-Use ToM', connections: [1, 8] },
        { x: 350, y: 280, type: 'bridging', label: 'Cybernetics', connections: [2, 9] },
        
        // AI Safety (pink)
        { x: 600, y: 150, type: 'ai-safety', label: 'Hallucination', connections: [4, 8] },
        { x: 650, y: 250, type: 'ai-safety', label: 'AI Alignment', connections: [5, 7, 9] },
        { x: 550, y: 350, type: 'ai-safety', label: 'Metacognition', connections: [6, 8] }
    ];
    
    const colors = {
        'neuroscience': '#00d4ff',
        'bridging': '#ffbe0b',
        'ai-safety': '#ff006e'
    };
    
    let mouseX = 0;
    let mouseY = 0;
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    function animate() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        publications.forEach((pub, i) => {
            pub.connections.forEach(targetIdx => {
                const target = publications[targetIdx];
                if (target && i < targetIdx) {
                    const dist = Math.hypot(mouseX - pub.x, mouseY - pub.y);
                    const highlight = dist < 100;
                    
                    ctx.strokeStyle = highlight ? 
                        `rgba(255, 255, 255, 0.5)` : 
                        `rgba(136, 146, 176, 0.2)`;
                    ctx.lineWidth = highlight ? 2 : 1;
                    ctx.beginPath();
                    ctx.moveTo(pub.x, pub.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();
                }
            });
        });
        
        // Draw nodes
        publications.forEach(pub => {
            const dist = Math.hypot(mouseX - pub.x, mouseY - pub.y);
            const hover = dist < 30;
            
            // Node
            ctx.beginPath();
            ctx.arc(pub.x, pub.y, hover ? 12 : 8, 0, Math.PI * 2);
            ctx.fillStyle = colors[pub.type];
            ctx.fill();
            
            // Glow effect
            if (hover) {
                ctx.beginPath();
                ctx.arc(pub.x, pub.y, 20, 0, Math.PI * 2);
                ctx.fillStyle = colors[pub.type] + '20';
                ctx.fill();
                
                // Label
                ctx.fillStyle = '#ffffff';
                ctx.font = '12px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(pub.label, pub.x, pub.y - 20);
            }
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}

// Initialize all visualizations
function initializeAllVisualizations() {
    createTimelineVisualizations();
    createMissionVisualization();
    createPublicationsNetwork();
}

// Call initialization
initializeAllVisualizations();

// Hidden section visualizations (in case they're shown)
function initializeHiddenSectionVisualizations() {
    // The visualizations for these are already implemented in initNewResearchVisualizations()
    // Just need to ensure they're called
    if (document.getElementById('behavioral-viz') || 
        document.getElementById('neuroscience-viz') ||
        document.getElementById('dual-use-viz') ||
        document.getElementById('gaze-viz') ||
        document.getElementById('tom-bench-viz') ||
        document.getElementById('core-tom-viz')) {
        // These are already implemented in the initNewResearchVisualizations function
        // which was called earlier
    }
}

// Initialize hidden visualizations if they exist
initializeHiddenSectionVisualizations();

// Window resize handler with throttling
window.addEventListener('resize', throttle(() => {
    // Update mobile check
    const wasMobile = isMobile;
    const isNowMobile = window.innerWidth <= 768;
    
    // Recreate neural background
    const neuralBg = document.getElementById('neural-bg');
    if (neuralBg) {
        neuralBg.innerHTML = '';
        createNeuralBackground();
    }
    
    // Recreate all visualizations
    createAlignmentVisualization();
    createApopheniaDemo();
    createFeedbackSystem();
    initializeAllVisualizations();
    
    // Handle cursor visibility on resize
    if (wasMobile !== isNowMobile) {
        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        if (cursor && cursorDot) {
            cursor.style.display = isNowMobile ? 'none' : 'block';
            cursorDot.style.display = isNowMobile ? 'none' : 'block';
        }
    }
}, 250));