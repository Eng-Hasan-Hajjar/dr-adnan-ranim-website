/* ============================================
   MAIN JAVASCRIPT FILE
   Dental Clinic - Dr. Adnan & Dr. Raneem
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // CONFIGURATION
    // ==========================================
    // أرقام الواتساب
    const WHATSAPP_RANEEM = '963954158703';   // د. رنيم مصري
    const WHATSAPP_ADNAN = '963954158674';    // د. محمد عدنان أبو بكر
    const WHATSAPP_DEFAULT = '963954158703';  // الرقم الافتراضي (د. رنيم)
    // ==========================================
    // PRELOADER
    // ==========================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });

    // Fallback: hide preloader after 3 seconds max
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        // Header background
        if (scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveNavLink();
    });

    // Back to top click
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // MOBILE MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ==========================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString('ar-EG');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString('ar-EG');
                }
            };

            updateCounter();
        });
    }

    // ==========================================
    // HERO PARTICLES
    // ==========================================
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: rgba(212, 168, 83, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }

        // Add particle animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% { transform: translateY(0) translateX(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}100px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // BOOKING MODAL
    // ==========================================
    const bookingModal = document.getElementById('bookingModal');
    const openBookingBtns = [
        document.getElementById('openBookingModal'),
        document.getElementById('heroBookBtn'),
        ...document.querySelectorAll('.service-book-btn')
    ];
    const closeBookingBtn = document.getElementById('closeBookingModal');

    openBookingBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function () {
                bookingModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    closeBookingBtn.addEventListener('click', closeBookingModal);
    bookingModal.addEventListener('click', function (e) {
        if (e.target === bookingModal) closeBookingModal();
    });

    function closeBookingModal() {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ==========================================
    // BOOKING FORM → WHATSAPP
    // ==========================================
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('bookName').value.trim();
        const phone = document.getElementById('bookPhone').value.trim();
        const service = document.getElementById('bookService').value;
        const doctor = document.getElementById('bookDoctor').value;
        const date = document.getElementById('bookDate').value;
        const time = document.getElementById('bookTime').value;
        const notes = document.getElementById('bookNotes').value.trim();

        if (!name || !phone || !service || !date) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        const message = `🦷 *حجز موعد جديد - عيادة د. عدنان & د. رنيم*
                                ━━━━━━━━━━━━━━━━━━
                                👤 *الاسم:* ${name}
                                📱 *الهاتف:* ${phone}
                                🏥 *الخدمة:* ${service}
                                👨‍⚕️ *الطبيب:* ${doctor}
                                📅 *التاريخ:* ${date}
                                🕐 *الوقت:* ${time}
                                📝 *ملاحظات:* ${notes || 'لا توجد'}
                                ━━━━━━━━━━━━━━━━━━
                                أرغب بحجز موعد، شكراً لكم 🙏`;

        encodedMessage = encodeURIComponent(message);
        // اختيار رقم الواتساب حسب الطبيب
        let whatsappNum = WHATSAPP_RANEEM; // الافتراضي
        if (doctor === 'د. عدنان أبو بكر') {
            whatsappNum = WHATSAPP_ADNAN;
        } else if (doctor === 'د. رنيم مصري') {
            whatsappNum = WHATSAPP_RANEEM;
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNum}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
        closeBookingModal();
        bookingForm.reset();
    });

    // ==========================================
    // CONTACT FORM → WHATSAPP
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const messageText = document.getElementById('contactMessage').value.trim();

        if (!name || !phone || !messageText) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        const message = `📩 *رسالة جديدة من الموقع*
                    ━━━━━━━━━━━━━━━━━━
                    👤 *الاسم:* ${name}
                    📱 *الهاتف:* ${phone}
                    📧 *البريد:* ${email || 'غير محدد'}
                    💬 *الرسالة:*
                    ${messageText}
                    ━━━━━━━━━━━━━━━━━━`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
        contactForm.reset();
    });

    // ==========================================
    // SET MINIMUM DATE FOR BOOKING
    // ==========================================
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // ==========================================
    // GALLERY FILTER
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Add fadeInUp animation
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(fadeStyle);

    // ==========================================
    // LIGHTBOX
    // ==========================================
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.getElementById('closeLightbox');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentLightboxIndex = 0;
    let visibleGalleryItems = [];

    function updateVisibleItems() {
        visibleGalleryItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            updateVisibleItems();
            currentLightboxIndex = visibleGalleryItems.indexOf(this);
            openLightbox();
        });
    });

    function openLightbox() {
        const item = visibleGalleryItems[currentLightboxIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay span');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.textContent : '';
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox.addEventListener('click', closeLightboxModal);
    lightboxModal.addEventListener('click', function (e) {
        if (e.target === lightboxModal) closeLightboxModal();
    });

    function closeLightboxModal() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
        openLightbox();
    });

    lightboxNext.addEventListener('click', function (e) {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex + 1) % visibleGalleryItems.length;
        openLightbox();
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function (e) {
        if (!lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightboxModal();
        if (e.key === 'ArrowRight') lightboxPrev.click();
        if (e.key === 'ArrowLeft') lightboxNext.click();
    });

    // ==========================================
    // TESTIMONIALS SLIDER
    // ==========================================
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('sliderDots');
    const testimonialCards = track ? track.querySelectorAll('.testimonial-card') : [];
    let currentSlide = 0;
    let autoSlideInterval;

    if (track && testimonialCards.length > 0) {
        // Create dots
        testimonialCards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            currentSlide = index;
            // RTL: use positive translateX
            track.style.transform = `translateX(${currentSlide * 100}%)`;
            updateDots();
        }

        function updateDots() {
            dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            goToSlide(currentSlide);
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
            goToSlide(currentSlide);
            resetAutoSlide();
        });

        // Auto slide
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % testimonialCards.length;
                goToSlide(currentSlide);
            }, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();

        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left (RTL: next)
                    currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
                } else {
                    // Swipe right (RTL: prev)
                    currentSlide = (currentSlide + 1) % testimonialCards.length;
                }
                goToSlide(currentSlide);
                resetAutoSlide();
            }
        }, { passive: true });
    }

    // ==========================================
    // ESCAPE KEY CLOSES MODALS
    // ==========================================
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeBookingModal();
        }
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // FORM VALIDATION VISUAL FEEDBACK
    // ==========================================
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        input.addEventListener('blur', function () {
            if (this.required && !this.value.trim()) {
                this.style.borderColor = 'var(--danger)';
            } else {
                this.style.borderColor = 'var(--gray-100)';
            }
        });

        input.addEventListener('focus', function () {
            this.style.borderColor = 'var(--secondary)';
        });
    });

    // ==========================================
    // CONSOLE GREETING
    // ==========================================
    console.log('%c🦷 عيادة د. عدنان أبو بكر & د. رنيم مصري', 'font-size: 20px; font-weight: bold; color: #0B3D6B;');
    console.log('%cطب وتجميل الأسنان - حلب', 'font-size: 14px; color: #1A8F8F;');

});