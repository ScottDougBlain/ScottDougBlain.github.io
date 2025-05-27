// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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

// Research card visualizations
function initResearchVisualizations() {
    // Apophenia visualization - random dots forming patterns
    const apopheniaCanvas = document.getElementById('apophenia-viz');
    if (apopheniaCanvas) {
        const ctx = apopheniaCanvas.getContext('2d');
        apopheniaCanvas.width = 250;
        apopheniaCanvas.height = 150;
        
        function drawApophenia() {
            ctx.clearRect(0, 0, apopheniaCanvas.width, apopheniaCanvas.height);
            
            // Draw random dots
            for (let i = 0; i < 50; i++) {
                ctx.beginPath();
                ctx.arc(
                    Math.random() * apopheniaCanvas.width,
                    Math.random() * apopheniaCanvas.height,
                    2,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = '#2563eb40';
                ctx.fill();
            }
            
            // Draw perceived pattern
            ctx.beginPath();
            ctx.moveTo(50, 50);
            ctx.lineTo(150, 50);
            ctx.lineTo(150, 100);
            ctx.lineTo(50, 100);
            ctx.closePath();
            ctx.strokeStyle = '#7c3aed60';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        drawApophenia();
        setInterval(drawApophenia, 3000);
    }
    
    // Social cognition visualization - connected minds
    const socialCanvas = document.getElementById('social-viz');
    if (socialCanvas) {
        const ctx = socialCanvas.getContext('2d');
        socialCanvas.width = 250;
        socialCanvas.height = 150;
        
        function drawSocialCognition() {
            ctx.clearRect(0, 0, socialCanvas.width, socialCanvas.height);
            
            // Draw minds
            const minds = [
                { x: 50, y: 75 },
                { x: 125, y: 50 },
                { x: 125, y: 100 },
                { x: 200, y: 75 }
            ];
            
            // Draw connections
            ctx.strokeStyle = '#06b6d440';
            ctx.lineWidth = 2;
            minds.forEach((mind, i) => {
                minds.forEach((otherMind, j) => {
                    if (i < j) {
                        ctx.beginPath();
                        ctx.moveTo(mind.x, mind.y);
                        ctx.lineTo(otherMind.x, otherMind.y);
                        ctx.stroke();
                    }
                });
            });
            
            // Draw mind nodes
            minds.forEach(mind => {
                ctx.beginPath();
                ctx.arc(mind.x, mind.y, 15, 0, Math.PI * 2);
                ctx.fillStyle = '#2563eb';
                ctx.fill();
            });
        }
        
        drawSocialCognition();
    }
    
    // Hallucination mitigation visualization
    const hallucinationCanvas = document.getElementById('hallucination-viz');
    if (hallucinationCanvas) {
        const ctx = hallucinationCanvas.getContext('2d');
        hallucinationCanvas.width = 250;
        hallucinationCanvas.height = 150;
        
        let phase = 0;
        
        function drawHallucination() {
            ctx.clearRect(0, 0, hallucinationCanvas.width, hallucinationCanvas.height);
            
            // Draw waveform
            ctx.beginPath();
            for (let x = 0; x < hallucinationCanvas.width; x++) {
                const y = 75 + Math.sin((x + phase) * 0.05) * 30 * Math.exp(-x / 200);
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.strokeStyle = '#ef444460';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Draw corrected waveform
            ctx.beginPath();
            ctx.moveTo(0, 75);
            ctx.lineTo(250, 75);
            ctx.strokeStyle = '#10b98160';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            phase += 2;
        }
        
        setInterval(drawHallucination, 50);
    }
    
    // DCM visualization
    const dcmCanvas = document.getElementById('dcm-viz');
    if (dcmCanvas) {
        const ctx = dcmCanvas.getContext('2d');
        dcmCanvas.width = 250;
        dcmCanvas.height = 150;
        
        function drawDCM() {
            ctx.clearRect(0, 0, dcmCanvas.width, dcmCanvas.height);
            
            // Draw brain regions
            const regions = [
                { x: 50, y: 50, label: 'A' },
                { x: 125, y: 30, label: 'B' },
                { x: 200, y: 50, label: 'C' },
                { x: 125, y: 100, label: 'D' }
            ];
            
            // Draw directional connections
            ctx.strokeStyle = '#2563eb40';
            ctx.lineWidth = 2;
            
            // A -> B
            drawArrow(ctx, regions[0].x, regions[0].y, regions[1].x, regions[1].y);
            // B -> C
            drawArrow(ctx, regions[1].x, regions[1].y, regions[2].x, regions[2].y);
            // B -> D
            drawArrow(ctx, regions[1].x, regions[1].y, regions[3].x, regions[3].y);
            // D -> A
            drawArrow(ctx, regions[3].x, regions[3].y, regions[0].x, regions[0].y);
            
            // Draw nodes
            regions.forEach(region => {
                ctx.beginPath();
                ctx.arc(region.x, region.y, 20, 0, Math.PI * 2);
                ctx.fillStyle = '#7c3aed';
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(region.label, region.x, region.y);
            });
        }
        
        function drawArrow(ctx, x1, y1, x2, y2) {
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            
            ctx.save();
            ctx.translate(x1, y1);
            ctx.rotate(angle);
            
            ctx.beginPath();
            ctx.moveTo(20, 0);
            ctx.lineTo(length - 20, 0);
            ctx.stroke();
            
            // Arrowhead
            ctx.beginPath();
            ctx.moveTo(length - 25, -5);
            ctx.lineTo(length - 20, 0);
            ctx.lineTo(length - 25, 5);
            ctx.stroke();
            
            ctx.restore();
        }
        
        drawDCM();
    }
}

// Initialize research visualizations
initResearchVisualizations();

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

// Modal functionality
const modal = document.getElementById('research-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.getElementsByClassName('close')[0];

function openResearchModal(theme) {
    const content = {
        apophenia: `
            <h2>Apophenia & Pattern Recognition in AI Systems</h2>
            <p>Apophenia—the tendency to perceive meaningful patterns in random or meaningless data—offers crucial insights for AI safety research.</p>
            <h3>Key Research Questions:</h3>
            <ul>
                <li>How do large language models develop spurious correlations during training?</li>
                <li>Can we distinguish between genuine pattern recognition and false positives in AI systems?</li>
                <li>What role does apophenia play in AI hallucinations and confabulations?</li>
            </ul>
            <h3>Applications to AI Safety:</h3>
            <ul>
                <li>Developing robust evaluation metrics for pattern recognition</li>
                <li>Creating adversarial training methods to reduce false pattern detection</li>
                <li>Understanding the balance between creativity and accuracy in AI outputs</li>
            </ul>
        `,
        social: `
            <h2>Social Cognition & Theory of Mind in AI</h2>
            <p>Understanding how AI systems model human mental states is crucial for alignment and safety.</p>
            <h3>Research Contributions:</h3>
            <ul>
                <li>Empirical studies on Theory of Mind in clinical populations</li>
                <li>Neural mechanisms of perspective-taking and belief attribution</li>
                <li>Social cognitive deficits and their computational models</li>
            </ul>
            <h3>AI Safety Applications:</h3>
            <ul>
                <li>Developing AI systems that accurately model human intentions</li>
                <li>Creating benchmarks for social understanding in AI</li>
                <li>Ensuring AI systems can predict and respect human values</li>
            </ul>
        `,
        hallucination: `
            <h2>Hallucination Mitigation Strategies</h2>
            <p>Drawing from neuroscience research on perceptual distortions to improve AI reliability.</p>
            <h3>Neuroscience Insights:</h3>
            <ul>
                <li>Predictive coding and its role in false perceptions</li>
                <li>Top-down vs. bottom-up processing imbalances</li>
                <li>Reality monitoring mechanisms in the brain</li>
            </ul>
            <h3>AI Implementation:</h3>
            <ul>
                <li>Uncertainty quantification in language models</li>
                <li>Source attribution and citation mechanisms</li>
                <li>Adversarial training against confabulation</li>
            </ul>
        `,
        dcm: `
            <h2>Dynamic Causal Modeling for AI Interpretability</h2>
            <p>Applying neuroscience methods to understand information flow in AI systems.</p>
            <h3>DCM Principles:</h3>
            <ul>
                <li>Modeling directional influences between system components</li>
                <li>Inferring hidden states and their interactions</li>
                <li>Understanding emergent behaviors from connectivity patterns</li>
            </ul>
            <h3>AI Safety Applications:</h3>
            <ul>
                <li>Mechanistic interpretability of neural networks</li>
                <li>Identifying critical pathways for decision-making</li>
                <li>Predicting system behavior under novel conditions</li>
            </ul>
        `
    };
    
    modalBody.innerHTML = content[theme] || '<p>Content not available</p>';
    modal.style.display = 'block';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Add scroll animations
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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Window resize handler
window.addEventListener('resize', () => {
    // Recreate neural background
    const neuralBg = document.getElementById('neural-bg');
    neuralBg.innerHTML = '';
    createNeuralBackground();
    
    // Recreate alignment visualization
    createAlignmentVisualization();
});