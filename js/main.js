document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');

    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animar el icono de hamburguesa
        const spans = menuBtn.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                menuBtn.click(); // Simular clic para cerrar y resetear icono
            }
        });
    });

    // Cambiar estilo del header al hacer scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 12, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 12, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Animación de aparición optimizada (Fade-in on scroll)
    const fadeElements = document.querySelectorAll('.service-card, .pricing-card, .about-text, .about-visual');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Gatillo un poco antes de que sea totalmente visible
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add('reveal'); // Aplicar clase base de CSS
        observer.observe(el);
    });

    // --- Animación Canvas Ciberseguridad ---
    const canvas = document.getElementById('cyberCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                // Tamaño un poco mayor para que parezcan los píxeles del escudo
                this.radius = Math.random() * 2 + 1;
                // Colores basados en el logo (rojo y gris oscuro/negro)
                this.isRed = Math.random() > 0.4;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }
            draw() {
                const color = this.isRed ? 'rgba(230, 29, 29, 0.8)' : 'rgba(150, 150, 150, 0.5)';
                ctx.fillStyle = color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = color;

                // Dibujar cuadrados (píxeles) en lugar de círculos, haciendo referencia al logo de WolkeSec
                const size = this.radius * 2;
                ctx.fillRect(this.x - this.radius, this.y - this.radius, size, size);

                ctx.shadowBlur = 0; // Reset para las líneas
            }
        }

        // Crear partículas
        const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Conectar partículas cercanas
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        // Las líneas con un tono gris claro/blanco para simular la red, dejando resaltar a los píxeles rojos y grises
                        ctx.strokeStyle = `rgba(180, 180, 180, ${0.15 - distance / 800})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
});
