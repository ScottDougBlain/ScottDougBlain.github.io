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
    console.log('Creating timeline visualizations...');
    
    // Helper function to get canvas dimensions
    function getCanvasDimensions(canvas) {
        const rect = canvas.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(canvas);
        const width = rect.width || parseInt(computedStyle.width) || 400;
        const height = rect.height || parseInt(computedStyle.height) || 300;
        return { width: Math.max(width, 100), height: Math.max(height, 100) };
    }
    
    // Brain Visualization
    const brainCanvas = document.getElementById('brain-viz');
    if (brainCanvas) {
        const ctx = brainCanvas.getContext('2d');
        const dims = getCanvasDimensions(brainCanvas);
        brainCanvas.width = dims.width;
        brainCanvas.height = dims.height;
        console.log('Brain canvas dimensions:', dims);
        
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
        const dims = getCanvasDimensions(patternCanvas);
        patternCanvas.width = dims.width;
        patternCanvas.height = dims.height;
        console.log('Pattern canvas dimensions:', dims);
        
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
        const dims = getCanvasDimensions(tomCanvas);
        tomCanvas.width = dims.width;
        tomCanvas.height = dims.height;
        console.log('ToM canvas dimensions:', dims);
        
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
        const dims = getCanvasDimensions(aiSafetyCanvas);
        aiSafetyCanvas.width = dims.width;
        aiSafetyCanvas.height = dims.height;
        console.log('AI Safety canvas dimensions:', dims);
        
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
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || parseInt(window.getComputedStyle(canvas).width) || 400;
    const height = rect.height || parseInt(window.getComputedStyle(canvas).height) || 200;
    canvas.width = Math.max(width, 100);
    canvas.height = Math.max(height, 100);
    console.log('Mission canvas dimensions:', canvas.width, canvas.height);
    
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
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || parseInt(window.getComputedStyle(canvas).width) || 600;
    const height = rect.height || parseInt(window.getComputedStyle(canvas).height) || 400;
    canvas.width = Math.max(width, 100);
    canvas.height = Math.max(height, 100);
    console.log('Publications canvas dimensions:', canvas.width, canvas.height);
    
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
    console.log('Initializing all visualizations...');
    
    // Add delay to ensure DOM layout is complete
    requestAnimationFrame(() => {
        setTimeout(() => {
            createTimelineVisualizations();
            createMissionVisualization();
            createPublicationsNetwork();
        }, 200);
    });
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllVisualizations);
} else {
    initializeAllVisualizations();
}

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

// Theory of Mind Demo Implementation (moved to tom-demo.js)
function initializeToMDemo() {
    // This function has been moved to tom-demo.js for better debugging
    return;
    
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
    
    // DOM elements - look within the ToM demo container
    const tomDemoContainer = document.getElementById('tom-demo');
    const elements = {
        scenarioSelector: document.getElementById('scenario-selector'),
        storyPanel: tomDemoContainer ? tomDemoContainer.querySelector('.story-panel') : null,
        questionPanel: tomDemoContainer ? tomDemoContainer.querySelector('.question-panel') : null,
        resultsPanel: tomDemoContainer ? tomDemoContainer.querySelector('.results-panel') : null,
        characterTracker: document.getElementById('character-tracker'),
        
        // Story elements
        scenarioTitle: document.getElementById('scenario-title'),
        storyContent: document.getElementById('story-content'),
        startQuestions: document.getElementById('start-questions'),
        backToScenarios: document.getElementById('back-to-scenarios'),
        
        // Question elements
        questionNumber: document.getElementById('question-number'),
        questionText: document.getElementById('question-text'),
        answerOptions: document.getElementById('answer-options'),
        submitAnswer: document.getElementById('submit-answer'),
        nextQuestion: document.getElementById('next-question'),
        feedback: document.getElementById('feedback'),
        progressFill: document.getElementById('progress-fill'),
        difficultyIndicator: document.getElementById('difficulty-indicator'),
        nestingLevel: document.getElementById('nesting-level'),
        
        // Character tracker
        characterGrid: document.getElementById('character-grid'),
        
        // Results elements
        scoreDisplay: document.getElementById('score-display'),
        levelBreakdown: document.getElementById('level-breakdown'),
        detailedResults: document.getElementById('detailed-results'),
        aiPerformance: document.getElementById('ai-performance'),
        tryAnother: document.getElementById('try-another'),
        viewExplanations: document.getElementById('view-explanations')
    };
    
    // Check if elements were found
    if (!elements.scenarioSelector) {
        console.error('ToM demo elements not found. Make sure the HTML structure is correct.');
        return;
    }
    
    // Initialize scenario cards
    const scenarioCards = document.querySelectorAll('.scenario-card');
    console.log('Found scenario cards:', scenarioCards.length);
    
    if (scenarioCards.length === 0) {
        console.error('No scenario cards found. Check HTML structure.');
        return;
    }
    
    scenarioCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Scenario card clicked:', this);
            const scenarioIndex = parseInt(this.dataset.scenario);
            console.log('Loading scenario index:', scenarioIndex);
            loadScenario(scenarioIndex);
        });
    });
    
    function loadScenario(index) {
        console.log('loadScenario called with index:', index);
        console.log('Elements:', elements);
        
        if (!elements.scenarioSelector || !elements.storyPanel) {
            console.error('Required elements not found');
            return;
        }
        
        tomData.currentScenario = tomData.scenarios[index];
        tomData.currentQuestionIndex = 0;
        tomData.userAnswers = [];
        tomData.startTime = Date.now();
        
        // Update UI
        if (elements.scenarioTitle) {
            elements.scenarioTitle.textContent = tomData.currentScenario.title;
        }
        if (elements.storyContent) {
            elements.storyContent.innerHTML = `<p>${tomData.currentScenario.fullText}</p>`;
        }
        
        // Show story panel, hide others
        elements.scenarioSelector.style.display = 'none';
        elements.storyPanel.style.display = 'block';
        elements.questionPanel.style.display = 'none';
        elements.resultsPanel.style.display = 'none';
        
        // Initialize character tracker
        initializeCharacterTracker();
    }
    
    function initializeCharacterTracker() {
        if (!tomData.currentScenario.characters) return;
        
        elements.characterGrid.innerHTML = '';
        tomData.currentScenario.characters.forEach(character => {
            const charDiv = document.createElement('div');
            charDiv.className = 'character-item';
            charDiv.innerHTML = `
                <div class="character-name">${character}</div>
                <div class="character-beliefs" id="beliefs-${character.toLowerCase()}"></div>
            `;
            elements.characterGrid.appendChild(charDiv);
        });
    }
    
    function startQuestions() {
        elements.storyPanel.style.display = 'none';
        elements.questionPanel.style.display = 'block';
        elements.characterTracker.style.display = 'block';
        loadQuestion(0);
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
        
        // Update character beliefs visualization if applicable
        updateCharacterBeliefs(question);
    }
    
    function updateCharacterBeliefs(question) {
        // This would update the character belief tracker based on the question
        // For now, this is a placeholder - could show belief chains
    }
    
    function nextQuestion() {
        loadQuestion(tomData.currentQuestionIndex + 1);
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
        
        // Break down by difficulty/nesting level
        const byDifficulty = {
            easy: { correct: 0, total: 0 },
            medium: { correct: 0, total: 0 },
            hard: { correct: 0, total: 0 }
        };
        
        const byNestingLevel = {};
        
        tomData.userAnswers.forEach(answer => {
            byDifficulty[answer.difficulty].total++;
            if (answer.isCorrect) byDifficulty[answer.difficulty].correct++;
            
            if (answer.nestingLevel > 0) {
                if (!byNestingLevel[answer.nestingLevel]) {
                    byNestingLevel[answer.nestingLevel] = { correct: 0, total: 0 };
                }
                byNestingLevel[answer.nestingLevel].total++;
                if (answer.isCorrect) byNestingLevel[answer.nestingLevel].correct++;
            }
        });
        
        // Display breakdowns
        let breakdownHTML = '<h6>Performance by Difficulty</h6><div class="breakdown-grid">';
        Object.entries(byDifficulty).forEach(([level, stats]) => {
            if (stats.total > 0) {
                const pct = Math.round((stats.correct / stats.total) * 100);
                breakdownHTML += `
                    <div class="breakdown-item">
                        <span class="breakdown-label">${level.charAt(0).toUpperCase() + level.slice(1)}</span>
                        <span class="breakdown-score">${stats.correct}/${stats.total} (${pct}%)</span>
                    </div>
                `;
            }
        });
        breakdownHTML += '</div>';
        
        if (Object.keys(byNestingLevel).length > 0) {
            breakdownHTML += '<h6>Performance by Nesting Level</h6><div class="breakdown-grid">';
            Object.entries(byNestingLevel).forEach(([level, stats]) => {
                const pct = Math.round((stats.correct / stats.total) * 100);
                breakdownHTML += `
                    <div class="breakdown-item">
                        <span class="breakdown-label">Level ${level}</span>
                        <span class="breakdown-score">${stats.correct}/${stats.total} (${pct}%)</span>
                    </div>
                `;
            });
            breakdownHTML += '</div>';
        }
        
        elements.levelBreakdown.innerHTML = breakdownHTML;
        
        // AI performance comparison
        elements.aiPerformance.innerHTML = `
            <div class="ai-comparison-grid">
                <div class="ai-model">
                    <div class="model-name">GPT-4</div>
                    <div class="model-score">~85% on Level 3</div>
                    <div class="model-note">Struggles with Level 4+</div>
                </div>
                <div class="ai-model">
                    <div class="model-name">Claude 3</div>
                    <div class="model-score">~80% on Level 3</div>
                    <div class="model-note">Similar plateau pattern</div>
                </div>
                <div class="ai-model">
                    <div class="model-name">Human Average</div>
                    <div class="model-score">~95% on Level 3</div>
                    <div class="model-note">~70% on Level 5</div>
                </div>
            </div>
            <p class="ai-note">My research shows that while LLMs excel at basic theory of mind tasks, they consistently struggle with deeply nested beliefs (Level 4+), revealing a fundamental limitation in their social reasoning capabilities.</p>
        `;
    }
    
    // Event listeners
    if (elements.startQuestions) {
        elements.startQuestions.addEventListener('click', startQuestions);
    }
    
    if (elements.backToScenarios) {
        elements.backToScenarios.addEventListener('click', () => {
            elements.storyPanel.style.display = 'none';
            elements.scenarioSelector.style.display = 'block';
        });
    }
    
    if (elements.submitAnswer) {
        elements.submitAnswer.addEventListener('click', submitAnswer);
    }
    
    if (elements.nextQuestion) {
        elements.nextQuestion.addEventListener('click', nextQuestion);
    }
    
    if (elements.tryAnother) {
        elements.tryAnother.addEventListener('click', () => {
            elements.resultsPanel.style.display = 'none';
            elements.scenarioSelector.style.display = 'block';
        });
    }
    
    if (elements.viewExplanations) {
        elements.viewExplanations.addEventListener('click', () => {
            // Toggle detailed explanations view
            const detailedDiv = elements.detailedResults;
            if (detailedDiv.innerHTML === '') {
                let html = '<h6>All Questions & Explanations</h6>';
                tomData.currentScenario.questions.forEach((q, i) => {
                    const answer = tomData.userAnswers[i];
                    html += `
                        <div class="detailed-question ${answer.isCorrect ? 'correct' : 'incorrect'}">
                            <h7>Q${i + 1}: ${q.question}</h7>
                            <p><strong>Your answer:</strong> ${answer.selected}. ${q.options[answer.selected]}</p>
                            <p><strong>Correct answer:</strong> ${q.correct}. ${q.options[q.correct]}</p>
                            <p><strong>Explanation:</strong> ${q.explanation}</p>
                        </div>
                    `;
                });
                detailedDiv.innerHTML = html;
                elements.viewExplanations.textContent = 'Hide Explanations';
            } else {
                detailedDiv.innerHTML = '';
                elements.viewExplanations.textContent = 'View All Explanations';
            }
        });
    }
}

// Make initializeToMDemo globally accessible
window.initializeToMDemo = initializeToMDemo;

// Initialize ToM demo when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeToMDemo();
    });
} else {
    // Add a small delay to ensure all elements are properly rendered
    setTimeout(() => {
        initializeToMDemo();
    }, 100);
}

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