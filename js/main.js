document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Add scroll listener for header shadow/style modifications
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // =============================================
    // HERO CAROUSEL
    // =============================================
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let autoPlayInterval;

        function goToSlide(index) {
            // Remove active from current
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            // Update index
            currentSlide = (index + slides.length) % slides.length;
            
            // Add active to new
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Auto-play every 10 seconds
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 10000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Arrow buttons
        if (nextBtn) nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });

        // Indicator dots
        indicators.forEach((dot) => {
            dot.addEventListener('click', () => {
                stopAutoPlay();
                goToSlide(parseInt(dot.dataset.slide));
                startAutoPlay();
            });
        });

        // Pause on hover
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
        }

        // Start auto-play
        startAutoPlay();
    }

    // =============================================
    // MODAL DE RECURSOS
    // =============================================
    const recursosBtn = document.getElementById('recursos-btn');
    const recursosModal = document.getElementById('recursos-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (recursosBtn && recursosModal) {
        function openModal() {
            recursosModal.style.display = 'flex';
            // Force reflow to ensure the transition triggers
            recursosModal.offsetHeight;
            recursosModal.classList.add('active');
            document.body.classList.add('modal-open');
        }

        function closeModal() {
            recursosModal.classList.remove('active');
            document.body.classList.remove('modal-open');
            // Wait for transition to end before setting display: none
            setTimeout(() => {
                if (!recursosModal.classList.contains('active')) {
                    recursosModal.style.display = 'none';
                }
            }, 300); // 300ms matches --transition-speed
        }

        recursosBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });

        // Botón Recursos del menú móvil
        const mobileRecursosBtn = document.getElementById('mobile-recursos-btn');
        if (mobileRecursosBtn) {
            mobileRecursosBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Cerrar el menú móvil si está abierto
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                }
                openModal();
            });
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        // Close on clicking overlay background
        recursosModal.addEventListener('click', (e) => {
            if (e.target === recursosModal) {
                closeModal();
            }
        });

        // Close on Esc key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && recursosModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
