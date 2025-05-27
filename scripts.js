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