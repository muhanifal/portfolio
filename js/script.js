// Mobile Navigation Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Header Scroll Effect
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth Scrolling with Offset
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    
                    // Calculate offset with navbar height
                    const navbarHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Create Floating Elements
        const floatingContainer = document.getElementById('floatingElements');
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.width = `${Math.random() * 20 + 10}px`;
            element.style.height = element.style.width;
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            element.style.opacity = Math.random() * 0.2 + 0.1;
            element.style.animationDelay = `${Math.random() * 20}s`;
            element.style.animationDuration = `${Math.random() * 20 + 20}s`;
            floatingContainer.appendChild(element);
        }

        // Scroll Animations for Timeline and Cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px' // Perbaiki margin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease 0.2s'; // Tambah delay
            observer.observe(item);
        });

        // Observe certificate cards
        document.querySelectorAll('.certificate-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });

        // Staggered animations for skills cards
        document.querySelectorAll('.skill-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });

        // Contact chips tooltip effect
        document.querySelectorAll('.contact-chip').forEach(chip => {
            chip.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 15px 30px rgba(99, 102, 241, 0.2)';
            });
            
            chip.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = 'var(--shadow-hover)';
            });
        });

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
            // Check immediately for elements in viewport
            setTimeout(() => {
                document.querySelectorAll('.timeline-item, .certificate-card').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
                    
                    if (isInViewport) {
                        el.classList.add('visible');
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }
                });
            }, 500);
        });
