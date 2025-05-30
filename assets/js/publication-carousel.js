// Publication Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('publication-track');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-pub');
    const nextBtn = document.getElementById('next-pub');
    const cards = document.querySelectorAll('.publication-card');
    
    if (!track || !dots.length) {
        console.log('Publication carousel not found on this page');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = dots.length;
    
    // Auto-rotation settings
    let autoRotateInterval;
    const autoRotateDelay = 6000; // 6 seconds
    
    function updateCarousel() {
        // Move track
        const translateX = -currentSlide * (100 / totalSlides);
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update card active states
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    // Start auto-rotation
    function startAutoRotate() {
        autoRotateInterval = setInterval(nextSlide, autoRotateDelay);
    }
    
    // Stop auto-rotation
    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoRotate();
            nextSlide();
            setTimeout(startAutoRotate, 10000); // Restart after 10s
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoRotate();
            prevSlide();
            setTimeout(startAutoRotate, 10000); // Restart after 10s
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoRotate();
            goToSlide(index);
            setTimeout(startAutoRotate, 10000); // Restart after 10s
        });
    });
    
    // Pause auto-rotation on hover
    const carousel = document.querySelector('.publication-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoRotate);
        carousel.addEventListener('mouseleave', startAutoRotate);
    }
    
    // Initialize
    updateCarousel();
    startAutoRotate();
    
    // Add swipe support for mobile
    let startX = null;
    
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            if (!startX) return;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                stopAutoRotate();
                if (diff > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
                setTimeout(startAutoRotate, 10000);
            }
            
            startX = null;
        }, { passive: true });
    }
});