// Evolving Neural/Cognitive Network Animation
// Bridges between organic brain patterns and geometric AI neural networks

class NeuralNetworkAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        // Animation parameters
        this.nodes = [];
        this.connections = [];
        this.particles = [];
        this.time = 0;
        this.morphFactor = 0; // 0 = organic brain, 1 = geometric AI
        this.morphDirection = 1;
        this.morphSpeed = 0.0002;
        
        // Colors matching the site theme - more subtle for better text readability
        this.colors = {
            primary: '#0f766e',
            accent: '#8b5cf6',
            light: 'rgba(255, 255, 255, 0.3)',
            dark: 'rgba(255, 255, 255, 0.05)'
        };
        
        // Initialize network
        this.initializeNodes();
        this.initializeConnections();
        
        // Event listeners
        window.addEventListener('resize', () => this.resize());
        
        // Start animation
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }
    
    initializeNodes() {
        const nodeCount = 30;
        
        for (let i = 0; i < nodeCount; i++) {
            // Create nodes with both organic and geometric positions
            const angle = (i / nodeCount) * Math.PI * 2;
            const layerIndex = Math.floor(i / 10);
            const nodeInLayer = i % 10;
            
            // Organic position (brain-like clusters)
            const cluster = Math.floor(i / 12);
            const clusterAngle = (cluster / 4) * Math.PI * 2;
            const clusterRadius = 150 + Math.random() * 100;
            const clusterX = this.centerX + Math.cos(clusterAngle) * clusterRadius;
            const clusterY = this.centerY + Math.sin(clusterAngle) * clusterRadius;
            
            const organicX = clusterX + (Math.random() - 0.5) * 120;
            const organicY = clusterY + (Math.random() - 0.5) * 120;
            
            // Geometric position (AI neural network layers)
            const layerSpacing = 200;
            const geometricX = this.centerX - 400 + layerIndex * layerSpacing;
            const geometricY = this.centerY - 200 + nodeInLayer * 50;
            
            this.nodes.push({
                id: i,
                organicX,
                organicY,
                geometricX,
                geometricY,
                x: organicX,
                y: organicY,
                vx: 0,
                vy: 0,
                radius: 3 + Math.random() * 2,
                pulsePhase: Math.random() * Math.PI * 2,
                activity: Math.random()
            });
        }
    }
    
    initializeConnections() {
        // Create organic connections (distance-based with some randomness)
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dist = this.getDistance(
                    this.nodes[i].organicX, 
                    this.nodes[i].organicY,
                    this.nodes[j].organicX,
                    this.nodes[j].organicY
                );
                
                // Organic connections - nearby nodes with some randomness
                if (dist < 150 && Math.random() < 0.3) {
                    this.connections.push({
                        from: i,
                        to: j,
                        strength: Math.random() * 0.5 + 0.5,
                        isOrganic: true
                    });
                }
                
                // Geometric connections - layer to layer
                const fromLayer = Math.floor(i / 10);
                const toLayer = Math.floor(j / 10);
                if (toLayer === fromLayer + 1 && Math.random() < 0.7) {
                    this.connections.push({
                        from: i,
                        to: j,
                        strength: Math.random() * 0.5 + 0.5,
                        isGeometric: true
                    });
                }
            }
        }
        
        // Add some long-range connections for organic network
        for (let i = 0; i < 10; i++) {
            const from = Math.floor(Math.random() * this.nodes.length);
            const to = Math.floor(Math.random() * this.nodes.length);
            if (from !== to) {
                this.connections.push({
                    from,
                    to,
                    strength: Math.random() * 0.3,
                    isOrganic: true,
                    longRange: true
                });
            }
        }
    }
    
    getDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
    
    updateMorph() {
        // Oscillate between organic and geometric
        this.morphFactor += this.morphDirection * this.morphSpeed;
        
        if (this.morphFactor >= 1) {
            this.morphFactor = 1;
            this.morphDirection = -1;
        } else if (this.morphFactor <= 0) {
            this.morphFactor = 0;
            this.morphDirection = 1;
        }
        
        // Update node positions based on morph factor
        this.nodes.forEach(node => {
            // Smooth interpolation between organic and geometric positions
            const targetX = node.organicX + (node.geometricX - node.organicX) * this.morphFactor;
            const targetY = node.organicY + (node.geometricY - node.organicY) * this.morphFactor;
            
            // Add some physics for smooth movement
            node.vx += (targetX - node.x) * 0.02;
            node.vy += (targetY - node.y) * 0.02;
            node.vx *= 0.95; // Damping
            node.vy *= 0.95;
            
            node.x += node.vx;
            node.y += node.vy;
            
            // Update activity
            node.activity = 0.3 + 0.7 * Math.sin(this.time * 0.001 + node.pulsePhase);
        });
    }
    
    createParticles() {
        // Create particles that flow along connections
        this.connections.forEach(conn => {
            if (Math.random() < 0.01) {
                const from = this.nodes[conn.from];
                const to = this.nodes[conn.to];
                
                this.particles.push({
                    x: from.x,
                    y: from.y,
                    targetX: to.x,
                    targetY: to.y,
                    progress: 0,
                    speed: 0.01 + Math.random() * 0.02,
                    size: 1 + Math.random() * 2,
                    opacity: 1
                });
            }
        });
    }
    
    updateParticles() {
        this.particles = this.particles.filter(particle => {
            particle.progress += particle.speed;
            
            if (particle.progress >= 1) {
                return false;
            }
            
            // Update position along path
            particle.x = particle.x + (particle.targetX - particle.x) * particle.speed * 3;
            particle.y = particle.y + (particle.targetY - particle.y) * particle.speed * 3;
            
            // Fade out
            particle.opacity = 1 - particle.progress;
            
            return true;
        });
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.connections.forEach(conn => {
            const from = this.nodes[conn.from];
            const to = this.nodes[conn.to];
            
            // Determine connection visibility based on morph state - reduced opacity
            let opacity = conn.strength * 0.15;
            if (conn.isOrganic && this.morphFactor < 0.7) {
                opacity *= (1 - this.morphFactor * 0.5);
            } else if (conn.isGeometric && this.morphFactor > 0.3) {
                opacity *= this.morphFactor;
            }
            
            // Draw connection
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            
            if (conn.isOrganic && !conn.longRange) {
                // Curved lines for organic connections
                const midX = (from.x + to.x) / 2 + (Math.random() - 0.5) * 20;
                const midY = (from.y + to.y) / 2 + (Math.random() - 0.5) * 20;
                this.ctx.quadraticCurveTo(midX, midY, to.x, to.y);
            } else {
                // Straight lines for geometric connections
                this.ctx.lineTo(to.x, to.y);
            }
            
            // Color based on activity
            const gradient = this.ctx.createLinearGradient(from.x, from.y, to.x, to.y);
            gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * from.activity * 0.5})`);
            gradient.addColorStop(1, `rgba(15, 118, 110, ${opacity * to.activity * 0.5})`);
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = conn.longRange ? 0.5 : 1;
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            const radius = node.radius * (1 + node.activity * 0.3);
            
            // Node glow
            const glowGradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, radius * 4
            );
            glowGradient.addColorStop(0, `rgba(139, 92, 246, ${node.activity * 0.1})`);
            glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
            
            this.ctx.fillStyle = glowGradient;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Node core - with reduced opacity
            const coreColor = this.morphFactor > 0.5 ? this.colors.accent : this.colors.primary;
            this.ctx.fillStyle = coreColor.replace(')', ', 0.3)').replace('rgb', 'rgba');
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.3})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        this.time++;
        
        // Update animation state
        this.updateMorph();
        this.createParticles();
        this.updateParticles();
        
        // Draw everything
        this.draw();
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NeuralNetworkAnimation('neural-network-canvas');
});