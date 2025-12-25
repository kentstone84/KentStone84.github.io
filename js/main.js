/**
 * TMC Website - Main JavaScript
 * Animations, interactions, and dynamic features
 */

// ============================================
// Navbar Scroll Effect
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileToggle = document.querySelector('.mobile-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        this.textContent = navbarMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking a link
    const menuLinks = document.querySelectorAll('.navbar-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
            mobileToggle.textContent = '☰';
        });
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Reveal Animation
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with scroll-reveal class
document.querySelectorAll('.scroll-reveal').forEach(element => {
    observer.observe(element);
});

// ============================================
// Typing Effect for Hero
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect if element exists
const heroSubtitle = document.querySelector('.hero .subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    window.addEventListener('load', function() {
        setTimeout(() => typeWriter(heroSubtitle, originalText, 30), 500);
    });
}

// ============================================
// Counter Animation for Benchmarks
// ============================================
function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const target = parseInt(entry.target.dataset.target);
            const suffix = entry.target.dataset.suffix || '';
            animateCounter(entry.target, target, suffix);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

// ============================================
// Particles Background Effect
// ============================================
class ParticlesBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fill();
        });

        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particles if canvas exists
window.addEventListener('load', function() {
    new ParticlesBackground('particles-canvas');
});

// ============================================
// Copy Code to Clipboard
// ============================================
document.querySelectorAll('.code-example').forEach(block => {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.className = 'copy-btn';
    button.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 0.5rem 1rem;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.9rem;
        opacity: 0;
        transition: opacity 0.3s;
    `;

    block.style.position = 'relative';
    block.appendChild(button);

    block.addEventListener('mouseenter', () => button.style.opacity = '1');
    block.addEventListener('mouseleave', () => button.style.opacity = '0');

    button.addEventListener('click', function() {
        const code = block.textContent.replace('Copy', '').trim();
        navigator.clipboard.writeText(code).then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => button.textContent = 'Copy', 2000);
        });
    });
});

// ============================================
// Form Validation (if contact form exists)
// ============================================
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success';
        successMsg.innerHTML = '<strong>✓ Success!</strong> Your message has been sent.';
        this.insertAdjacentElement('afterend', successMsg);
        
        // Reset form
        this.reset();
        
        // Remove message after 5 seconds
        setTimeout(() => successMsg.remove(), 5000);
    });
}

// ============================================
// Pricing Calculator (if exists)
// ============================================
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('click', function() {
        pricingCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// ============================================
// Dynamic Year in Footer
// ============================================
const yearElement = document.querySelector('#current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ============================================
// Performance Monitoring
// ============================================
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }, 0);
    });
}

// ============================================
// Lazy Load Images
// ============================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// Console Easter Egg
// ============================================
console.log('%c🚀 TMC - Temporal Memory Crystallization', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cInterested in our technology? Email: kent.stone@gmail.com', 'font-size: 14px; color: #764ba2;');
console.log('%cO(log n) retrieval. No batch limits. Infinite scale.', 'font-size: 12px; color: #666;');
