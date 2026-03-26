// ========== SCROLL REVEAL COM INTERSECTION OBSERVER ==========
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }
}

// ========== DELAY EM CASCATA PARA ITENS DE LISTA ==========
class CascadeDelay {
    constructor() {
        this.groups = document.querySelectorAll('.cascade-group');
        this.init();
    }

    init() {
        this.groups.forEach(group => {
            const items = group.children;
            Array.from(items).forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.08}s`;
            });
        });
    }
}

// ========== SMOOTH SCROLL PARA ÂNCORAS ==========
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar URL sem scroll brusco
                    history.pushState(null, null, targetId);
                }
            });
        });
    }
}

// ========== PARALLAX LEVE ==========
class Parallax {
    constructor() {
        this.elements = document.querySelectorAll('.parallax');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                this.elements.forEach(el => {
                    const speed = parseFloat(el.dataset.speed) || 0.2;
                    const rect = el.getBoundingClientRect();
                    const scrolled = window.pageYOffset;
                    const offset = rect.top + scrolled;
                    const distance = scrolled - offset;
                    const yPos = distance * speed;
                    
                    if (rect.bottom > 0 && rect.top < window.innerHeight) {
                        el.style.transform = `translateY(${yPos}px)`;
                    }
                });
            });
        });
    }
}

// ========== ATUALIZAR LINK ATIVO NO SCROLL ==========
class ActiveNavLink {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                let current = '';
                const scrollPosition = window.scrollY + 100;
                
                this.sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        current = section.getAttribute('id');
                    }
                });
                
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href').substring(1);
                    if (href === current) {
                        link.classList.add('active');
                    }
                });
            });
        });
    }
}

// ========== PRELOADER SUTIL (OPCIONAL) ==========
class Preloader {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }
}

// ========== INICIALIZAR TODOS OS MÓDULOS ==========
document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
    new CascadeDelay();
    new SmoothScroll();
    new Parallax();
    new ActiveNavLink();
    new Preloader();
});