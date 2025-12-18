document.addEventListener('DOMContentLoaded', () => {
    // --- Immersive Feature Slider ---
    const slides = document.querySelectorAll('.slide');
    const navItems = document.querySelectorAll('.nav-item');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        // Reset state
        slides.forEach(s => s.classList.remove('active'));
        navItems.forEach(n => n.classList.remove('active'));

        // Activate new state
        slides[index].classList.add('active');
        navItems[index].classList.add('active');
        currentSlide = index;
    }

    // Auto Play
    let autoPlay = setInterval(() => {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }, slideInterval);

    // Manual Click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            clearInterval(autoPlay); // Stop auto play on interaction
            showSlide(index);
            // Optional: Restart auto play after delay?? Let's keep it stopped for user focus
        });
    });

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // --- Hero Typing Effect ---
    const heroTextSpan = document.querySelector('.hero-title .highlight');
    if (heroTextSpan) {
        const text = heroTextSpan.innerText;
        heroTextSpan.innerText = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTextSpan.innerText += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        }
        setTimeout(typeWriter, 500);
    }
});
