// Espera a que todo el contenido del DOM (la página) se cargue
document.addEventListener('DOMContentLoaded', function() {

    // Seleccionar el botón y el párrafo por su ID
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

    // Añadir un "escuchador de eventos" que se activa al hacer clic en el botón
    magicButton.addEventListener('click', function() {
        
        // Cambiar el texto del párrafo
        magicText.textContent = '¡Gracias por visitar mi página! 🎉';

        // Opcional: Cambiar también el color del texto
        magicText.style.color = '#198754'; // Un verde bonito de Bootstrap
    });

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
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const title = button.dataset.title;
            const description = button.dataset.description;
            serviceDetail.innerHTML = `<strong>${title}:</strong> ${description}`;
            serviceDetail.classList.add('alert-success');
            serviceDetail.classList.remove('alert-primary');
        });
    });

    // Animar números estadísticos cuando entren en el viewport
    const animateCounters = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseInt(element.dataset.target, 10);
                let current = 0;
                const increment = Math.ceil(targetValue / 60);
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
    };

    const observer = new IntersectionObserver(animateCounters, {
        threshold: 0.5
    });

    statNumbers.forEach(number => {
        observer.observe(number);
    });

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

    // Botón para volver arriba visible al hacer scroll
    const toggleBackToTopButton = () => {
        if (window.scrollY > 240) {
            backToTopButton.classList.remove('d-none');
        } else {
            backToTopButton.classList.add('d-none');
        }
    };

    window.addEventListener('scroll', toggleBackToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});