// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and pricing cards
document.querySelectorAll('.feature-card, .pricing-card, .value-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Screenshot slideshow (if you add multiple screenshots)
const heroScreenshot = document.getElementById('heroScreenshot');
const screenshots = [
    './images/app-screenshot.png',
    './images/app-screenshot-2.png',
    './images/app-screenshot-3.png'
];

let currentScreenshot = 0;

function rotateScreenshots() {
    if (screenshots.length > 1) {
        currentScreenshot = (currentScreenshot + 1) % screenshots.length;
        heroScreenshot.style.opacity = '0.5';
        
        setTimeout(() => {
            heroScreenshot.src = screenshots[currentScreenshot];
            heroScreenshot.style.opacity = '1';
        }, 300);
    }
}

// Rotate screenshots every 5 seconds (optional)
// setInterval(rotateScreenshots, 5000);

// Add active state to nav on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Track CTA clicks (optional - add your analytics here)
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('CTA clicked:', btn.textContent);
        // Add your analytics tracking here
        // gtag('event', 'cta_click', { button_text: btn.textContent });
    });
});
