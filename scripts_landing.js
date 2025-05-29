// Minimal JS for landing page performance

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

// Animated counters - only on scroll into view
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

// Typewriter effect with CSS fallback
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

// Navbar scroll effect
const nav = document.querySelector('.nav-container');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Initialize on DOM ready
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
});

// Dropdown menu functionality
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        dropdown.querySelector('.dropdown-menu').style.display = 'block';
    });
    dropdown.addEventListener('mouseleave', () => {
        dropdown.querySelector('.dropdown-menu').style.display = 'none';
    });
});