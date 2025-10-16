// Espera a que todo el contenido del DOM (la página) se cargue
document.addEventListener('DOMContentLoaded', function() {

    // Seleccionar elementos clave del DOM
    const magicButton = document.getElementById('magicButton');
    const magicText = document.getElementById('magicText');
    const backToTopButton = document.getElementById('backToTop');
    const serviceDetail = document.getElementById('serviceDetail');
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterFeedback = document.getElementById('newsletterFeedback');
    const showcaseButton = document.getElementById('openShowcase');
    const statNumbers = document.querySelectorAll('.stat-number');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const serviceButtons = document.querySelectorAll('.service-info-btn');
    const heroDynamic = document.getElementById('heroDynamic');
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const processDetail = document.getElementById('processDetail');
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const ctaButton = document.getElementById('ctaButton');
    const contactoSection = document.getElementById('contacto');
    const navbar = document.querySelector('.navbar');

    // Añadir un "escuchador de eventos" que se activa al hacer clic en el botón
    if (magicButton && magicText) {
        magicButton.addEventListener('click', function() {
            magicText.textContent = '¡Gracias por visitar mi página! 🎉';
            magicText.style.color = '#198754'; // Un verde bonito de Bootstrap
            magicText.classList.add('fw-semibold');
        });
    }

    // Rotación de frases en el encabezado hero
    if (heroDynamic && heroDynamic.dataset.phrases) {
        const phrases = heroDynamic.dataset.phrases.split('|').map(text => text.trim()).filter(Boolean);
        let phraseIndex = 0;

        if (phrases.length > 1) {
            setInterval(() => {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                heroDynamic.classList.add('is-changing');
                setTimeout(() => {
                    heroDynamic.textContent = phrases[phraseIndex];
                    heroDynamic.classList.remove('is-changing');
                }, 280);
            }, 3600);
        }
    }

    // Scroll suave para los enlaces del menú y botones con la clase scroll-link
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                event.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 64,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Botón para mostrar el modal de portafolio
    if (showcaseButton) {
        const showcaseModal = new bootstrap.Modal(document.getElementById('showcaseModal'));
        showcaseButton.addEventListener('click', () => {
            showcaseModal.show();
        });
    }

    // Mostrar detalle del servicio al hacer clic en los botones
    let serviceDetailTimer;
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (serviceDetail) {
                const title = button.dataset.title;
                const description = button.dataset.description;
                serviceDetail.innerHTML = `<strong>${title}:</strong> ${description}`;
                serviceDetail.classList.add('alert-success', 'is-active');
                serviceDetail.classList.remove('alert-primary');

                clearTimeout(serviceDetailTimer);
                serviceDetailTimer = setTimeout(() => {
                    serviceDetail.classList.remove('is-active');
                }, 420);
            }
        });
    });

    // Animaciones de revelado al hacer scroll
    if (revealElements.length) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.18,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach((element, index) => {
            element.style.transitionDelay = `${Math.min(index * 0.08, 0.32)}s`;
            revealObserver.observe(element);
        });
    }

    // Interacción con la línea de tiempo del proceso
    if (timelineSteps.length && processDetail) {
        const detailTitle = processDetail.querySelector('h4');
        const detailCopy = processDetail.querySelector('p');
        let processDetailTimer;

        const updateProcessDetail = (title, description) => {
            if (detailTitle) {
                detailTitle.textContent = title;
            }
            if (detailCopy) {
                detailCopy.textContent = description;
            }
            processDetail.classList.add('is-active');
            clearTimeout(processDetailTimer);
            processDetailTimer = setTimeout(() => {
                processDetail.classList.remove('is-active');
            }, 480);
        };

        timelineSteps.forEach(step => {
            step.addEventListener('click', () => {
                timelineSteps.forEach(item => item.classList.remove('active'));
                step.classList.add('active');
                const title = step.dataset.title;
                const description = step.dataset.description;
                if (title && description) {
                    updateProcessDetail(title, description);
                }
            });
        });

        const initialStep = document.querySelector('.timeline-step.active');
        if (initialStep && initialStep.dataset.title && initialStep.dataset.description) {
            updateProcessDetail(initialStep.dataset.title, initialStep.dataset.description);
        }
    }

    // Animar números estadísticos cuando entren en el viewport
    if (statNumbers.length) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const targetValue = parseInt(element.dataset.target, 10);
                    let current = 0;
                    const increment = Math.max(1, Math.ceil(targetValue / 60));
                    const counterInterval = setInterval(() => {
                        current += increment;
                        if (current >= targetValue) {
                            current = targetValue;
                            clearInterval(counterInterval);
                        }
                        element.textContent = current;
                    }, 20);
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.5
        });

        statNumbers.forEach(number => {
            counterObserver.observe(number);
        });
    }

    // Formulario de newsletter con validación simple
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', event => {
            event.preventDefault();
            const emailValue = newsletterEmail.value.trim();

            if (!emailValue || !emailValue.includes('@')) {
                newsletterFeedback.innerHTML = '<div class="alert alert-warning">Por favor, ingresa un correo válido.</div>';
                return;
            }

            newsletterFeedback.innerHTML = '<div class="alert alert-success">¡Gracias por suscribirte! Pronto recibirás noticias geniales.</div>';
            newsletterForm.reset();
        });
    }

    // Gestionar scroll: navbar y botón volver arriba
    const handleScrollEffects = () => {
        if (backToTopButton) {
            if (window.scrollY > 240) {
                backToTopButton.classList.remove('d-none');
            } else {
                backToTopButton.classList.add('d-none');
            }
        }

        if (navbar) {
            if (window.scrollY > 16) {
                navbar.classList.add('is-scrolled');
            } else {
                navbar.classList.remove('is-scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScrollEffects, { passive: true });
    handleScrollEffects();

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (ctaButton && contactoSection) {
        ctaButton.addEventListener('click', () => {
            window.scrollTo({
                top: contactoSection.offsetTop - 48,
                behavior: 'smooth'
            });
        });
    }
});