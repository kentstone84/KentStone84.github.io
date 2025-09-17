/**
 * NeuroAccess Professional JavaScript
 * Main application script
 */

class NeuroAccessApp {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.scrollY = 0;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.initThreeJS();
        this.initScrollAnimations();
        this.initNavigation();
        this.initInteractions();
        this.initEventListeners();
        this.initVideoHandling();
        this.startAnimationLoop();
    }

    /**
     * Initialize Three.js background animation
     */
    initThreeJS() {
        try {
            const canvas = document.getElementById('bg-canvas');
            if (!canvas) return;

            // Scene setup
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(
                75, 
                window.innerWidth / window.innerHeight, 
                0.1, 
                1000
            );
            
            this.renderer = new THREE.WebGLRenderer({ 
                canvas: canvas, 
                alpha: true,
                antialias: window.devicePixelRatio < 2
            });
            
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Create particle system
            this.createParticleSystem();
            
            this.camera.position.z = 500;
            
            console.log('Three.js initialized successfully');
        } catch (error) {
            console.warn('Three.js initialization failed:', error);
        }
    }

    createParticleSystem() {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const sizes = [];

        const particleCount = window.innerWidth < 768 ? 800 : 1500;

        for (let i = 0; i < particleCount; i++) {
            // Positions
            positions.push(
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000
            );

            // Colors - professional palette
            const colorChoices = [
                new THREE.Color(0x0066ff), // Primary blue
                new THREE.Color(0x00ff88), // Success green
                new THREE.Color(0x00ccff), // Light blue
                new THREE.Color(0xffffff)  // White accent
            ];
            
            const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
            colors.push(color.r, color.g, color.b);
            
            // Sizes
            sizes.push(Math.random() * 3 + 0.5);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    /**
     * Animation loop
     */
    startAnimationLoop() {
        const animate = () => {
            requestAnimationFrame(animate);
            this.updateAnimation();
            this.render();
        };
        animate();
    }

    updateAnimation() {
        if (!this.particles) return;

        // Subtle rotation
        this.particles.rotation.x += 0.0005;
        this.particles.rotation.y += 0.001;

        // Mouse parallax effect
        const targetX = (this.mouseX / window.innerWidth - 0.5) * 0.0005;
        const targetY = (this.mouseY / window.innerHeight - 0.5) * 0.0005;

        this.camera.position.x += (targetX * 100 - this.camera.position.x) * 0.02;
        this.camera.position.y += (-targetY * 100 - this.camera.position.y) * 0.02;

        // Scroll-based movement
        if (this.particles) {
            this.particles.position.y = this.scrollY * 0.0002;
        }
    }

    render() {
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    /**
     * Initialize scroll-based animations
     */
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        const animatedElements = document.querySelectorAll(`
            .hero-text,
            .hero-visual,
            .section-header,
            .feature-card,
            .product-card,
            .testimonial-card,
            .feature-highlight
        `);

        animatedElements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    /**
     * Initialize navigation behavior
     */
    initNavigation() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar scroll behavior
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (navbar) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                
                // Add background when scrolled
                if (currentScrollY > 50) {
                    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                } else {
                    navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                }
            }
            
            lastScrollY = currentScrollY;
            this.scrollY = currentScrollY;
        });
    }

    /**
     * Initialize interactive elements
     */
    initInteractions() {
        // Button ripple effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', this.createRippleEffect);
        });

        // Card hover effects
        document.querySelectorAll('.product-card, .feature-card, .testimonial-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // CTA pulse effect
        const ctaButtons = document.querySelectorAll('.cta-section .btn-primary');
        ctaButtons.forEach(btn => {
            btn.style.animation = 'pulse 2s ease-in-out infinite';
        });
    }

    /**
     * Create ripple effect for buttons
     */
    createRippleEffect(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;

        // Ensure button has relative positioning
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * Initialize event listeners
     */
    initEventListeners() {
        // Mouse tracking for parallax
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Window resize handling
        window.addEventListener('resize', () => {
            if (this.camera && this.renderer) {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            }
        });

        // Performance optimization for mobile
        if (window.innerWidth < 768) {
            document.addEventListener('touchstart', () => {}, { passive: true });
        }
    }

    /**
     * Initialize video handling
     */
    initVideoHandling() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Lazy load videos
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        if (video.src) {
                            video.load();
                        }
                        observer.unobserve(video);
                    }
                });
            });
            
            observer.observe(video);

            // Handle video errors gracefully
            video.addEventListener('error', (e) => {
                console.warn('Video failed to load:', e);
                video.style.display = 'none';
                
                // Show fallback poster or message
                const fallback = document.createElement('div');
                fallback.className = 'video-fallback';
                fallback.innerHTML = `
                    <p>Video preview unavailable</p>
                    <p>Please contact us for a live demo</p>
                `;
                fallback.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 300px;
                    background: var(--bg-card);
                    border-radius: var(--radius-lg);
                    color: var(--text-muted);
                    text-align: center;
                `;
                
                video.parentNode.appendChild(fallback);
            });
        });
    }

    /**
     * Utility method for smooth scrolling to element
     */
    scrollToElement(elementId, offset = 80) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Form handling (if forms are added later)
     */
    initFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Add loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.textContent = 'Processing...';
                    submitBtn.disabled = true;
                }

                // Here you would typically send the form data to your backend
                console.log('Form submission:', new FormData(form));

                // Reset form after submission
                setTimeout(() => {
                    form.reset();
                    if (submitBtn) {
                        submitBtn.textContent = 'Submit';
                        submitBtn.disabled = false;
                    }
                }, 2000);
            });
        });
    }
}

// CSS Animations that need to be injected
const additionalStyles = `
@keyframes pulse {
    0%, 100% { 
        box-shadow: 0 0 20px rgba(0, 102, 255, 0.5);
        transform: scale(1);
    }
    50% { 
        box-shadow: 0 0 30px rgba(0, 102, 255, 0.8);
        transform: scale(1.02);
    }
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.video-fallback {
    border: 2px dashed rgba(255, 255, 255, 0.2);
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the application
const app = new NeuroAccessApp();

// Global utilities
window.NeuroAccess = {
    scrollTo: (elementId, offset) => app.scrollToElement(elementId, offset),
    version: '1.0.0'
};

// Debug mode for development
if (window.location.search.includes('debug=true')) {
    window.app = app;
    console.log('NeuroAccess Debug Mode Enabled');
}
