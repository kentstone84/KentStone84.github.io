/**
 * BFT Fibra Óptica - Advanced JavaScript
 * Performance Optimized with Modern Features
 * SEO Enhanced with Analytics Integration
 */

// ===== Performance Optimization =====
class PerformanceOptimizer {
    constructor() {
      this.init();
    }
  
    init() {
      this.setupLazyLoading();
      this.setupImageOptimization();
      this.setupPreloading();
      this.setupServiceWorker();
    }
  
    // Lazy Loading Implementation
    setupLazyLoading() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.remove('lazy-load');
              img.classList.add('loaded');
              imageObserver.unobserve(img);
            }
          });
        });
  
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    }
  
    // Image Optimization
    setupImageOptimization() {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    }
  
    // Preload Critical Resources
    setupPreloading() {
      const criticalImages = [
        'assets/images/Mesa de trabajo 1.png',
        'assets/images/3x5 equipo ax50.png'
      ];
  
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    }
  
    // Service Worker Registration
    setupServiceWorker() {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    }
  }
  
  // ===== SEO and Analytics Manager =====
  class SEOManager {
    constructor() {
      this.init();
    }
  
    init() {
      this.setupStructuredData();
      this.setupMetaUpdates();
      this.trackUserBehavior();
      this.setupSocialSharing();
    }
  
    // Dynamic Structured Data
    setupStructuredData() {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": []
      };
  
      const sections = ['home', 'services', 'plans', 'coverage', 'contact'];
      sections.forEach((section, index) => {
        breadcrumbData.itemListElement.push({
          "@type": "ListItem",
          "position": index + 1,
          "name": section.charAt(0).toUpperCase() + section.slice(1),
          "item": `${window.location.origin}#${section}`
        });
      });
  
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(script);
    }
  
    // Dynamic Meta Updates
    setupMetaUpdates() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            this.updateMetaForSection(entry.target.id);
          }
        });
      }, { threshold: 0.5 });
  
      document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
      });
    }
  
    updateMetaForSection(sectionId) {
      const metaData = {
        home: {
          title: "BFT Fibra Óptica Lima - Internet Alta Velocidad 400 Mbps",
          description: "Internet fibra óptica en Lima. Planes desde S/79, velocidad 400 Mbps, WiFi 6 incluido. Instalación gratis."
        },
        plans: {
          title: "Planes Internet Fibra Óptica Lima - Desde S/79 | BFT",
          description: "Planes internet fibra óptica Lima: 400 Mbps S/89, Plan Anual S/79. Router WiFi 6 incluido. Compara precios."
        },
        coverage: {
          title: "Cobertura Fibra Óptica Lima - Miraflores, San Isidro | BFT",
          description: "Cobertura fibra óptica en Miraflores, San Isidro, Surco, La Molina. Verifica disponibilidad en tu distrito."
        }
      };
  
      if (metaData[sectionId]) {
        document.title = metaData[sectionId].title;
        document.querySelector('meta[name="description"]').content = metaData[sectionId].description;
      }
    }
  
    // User Behavior Tracking
    trackUserBehavior() {
      // Scroll depth tracking
      let maxScroll = 0;
      window.addEventListener('scroll', this.debounce(() => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          if (maxScroll % 25 === 0) {
            this.trackEvent('scroll_depth', { percent: maxScroll });
          }
        }
      }, 100));
  
      // Plan interaction tracking
      document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('click', (e) => {
          const planName = card.querySelector('h3').textContent;
          this.trackEvent('plan_click', { plan: planName });
        });
      });
  
      // CTA tracking
      document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', (e) => {
          const buttonText = button.textContent.trim();
          this.trackEvent('cta_click', { button: buttonText });
        });
      });
    }
  
    // Social Sharing
    setupSocialSharing() {
      const shareButtons = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=El mejor internet de fibra óptica en Lima`,
        whatsapp: `https://wa.me/?text=Mira este excelente servicio de internet: ${encodeURIComponent(window.location.href)}`
      };
  
      Object.entries(shareButtons).forEach(([platform, url]) => {
        const button = document.querySelector(`[data-share="${platform}"]`);
        if (button) {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(url, '_blank', 'width=600,height=400');
            this.trackEvent('social_share', { platform });
          });
        }
      });
    }
  
    trackEvent(eventName, parameters = {}) {
      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
      }
  
      // Facebook Pixel
      if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
      }
  
      // Custom analytics
      console.log(`Event: ${eventName}`, parameters);
    }
  
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  }
  
  // ===== UI Enhancements =====
  class UIManager {
    constructor() {
      this.init();
    }
  
    init() {
      this.setupNavigation();
      this.setupForms();
      this.setupAnimations();
      this.setupWhatsAppFloat();
      this.setupProgressBar();
      this.setupTooltips();
    }
  
    // Enhanced Navigation
    setupNavigation() {
      const nav = document.querySelector('nav');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
  
      // Mobile menu toggle
      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
          mobileMenu.classList.toggle('hidden');
          const isOpen = !mobileMenu.classList.contains('hidden');
          mobileMenuButton.setAttribute('aria-expanded', isOpen);
          
          // Animate menu icon
          const icon = mobileMenuButton.querySelector('i');
          if (icon) {
            icon.setAttribute('data-feather', isOpen ? 'x' : 'menu');
            feather.replace();
          }
        });
      }
  
      // Smooth scrolling for nav links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
  
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
              mobileMenu.classList.add('hidden');
              mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
          }
        });
      });
  
      // Active nav highlighting
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const navLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            if (navLink) {
              navLink.classList.add('active');
            }
          }
        });
      }, { threshold: 0.6 });
  
      document.querySelectorAll('section[id]').forEach(section => {
        navObserver.observe(section);
      });
  
      // Navbar background on scroll
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          nav.classList.add('bg-opacity-95', 'backdrop-blur-md');
        } else {
          nav.classList.remove('bg-opacity-95', 'backdrop-blur-md');
        }
      });
    }
  
    // Form Enhancements
    setupForms() {
      const forms = document.querySelectorAll('form');
      
      forms.forEach(form => {
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.addEventListener('blur', () => this.validateField(input));
          input.addEventListener('input', () => this.clearErrors(input));
        });
  
        // Form submission
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (this.validateForm(form)) {
            this.submitForm(form);
          }
        });
      });
    }
  
    validateField(field) {
      const value = field.value.trim();
      let isValid = true;
      let message = '';
  
      // Remove existing error
      this.clearErrors(field);
  
      // Validation rules
      switch (field.type) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isValid = emailRegex.test(value);
          message = 'Ingrese un email válido';
          break;
        case 'tel':
          const phoneRegex = /^(\+51|51)?[9][0-9]{8}$/;
          isValid = phoneRegex.test(value.replace(/\s/g, ''));
          message = 'Ingrese un número de teléfono válido';
          break;
        default:
          isValid = value.length >= 2;
          message = 'Este campo es requerido';
      }
  
      if (!isValid && value !== '') {
        this.showError(field, message);
      }
  
      return isValid;
    }
  
    validateForm(form) {
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
  
      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });
  
      return isValid;
    }
  
    showError(field, message) {
      field.classList.add('error-state');
      
      let errorElement = field.parentNode.querySelector('.error-message');
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message text-red-500 text-sm mt-1';
        field.parentNode.appendChild(errorElement);
      }
      
      errorElement.textContent = message;
    }
  
    clearErrors(field) {
      field.classList.remove('error-state');
      const errorElement = field.parentNode.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
    }
  
    async submitForm(form) {
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // Loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
      submitButton.classList.add('loading');
  
      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate API call (replace with real endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success handling
        this.showNotification('¡Mensaje enviado con éxito! Nos contactaremos pronto.', 'success');
        form.reset();
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            'form_name': 'contact_form'
          });
        }
        
      } catch (error) {
        this.showNotification('Error al enviar el mensaje. Inténtelo nuevamente.', 'error');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.classList.remove('loading');
      }
    }
  
    // Animations
    setupAnimations() {
      // Initialize AOS
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
      });
  
      // Counter animations
      this.setupCounters();
      
      // Parallax effects
      this.setupParallax();
    }
  
    setupCounters() {
      const counters = document.querySelectorAll('[data-counter]');
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      });
  
      counters.forEach(counter => counterObserver.observe(counter));
    }
  
    animateCounter(element) {
      const target = parseInt(element.getAttribute('data-counter'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
  
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current).toLocaleString();
        }
      }, 16);
    }
  
    setupParallax() {
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
          element.style.transform = `translateY(${rate}px)`;
        });
      });
    }
  
    // WhatsApp Float Button
    setupWhatsAppFloat() {
      const whatsappFloat = document.createElement('a');
      whatsappFloat.href = 'https://wa.me/51987654321?text=Hola, me interesa información sobre los planes de internet de fibra óptica';
      whatsappFloat.className = 'whatsapp-float';
      whatsappFloat.target = '_blank';
      whatsappFloat.innerHTML = '<i data-feather="message-circle"></i>';
      whatsappFloat.setAttribute('aria-label', 'Contactar por WhatsApp');
      
      document.body.appendChild(whatsappFloat);
      feather.replace();
  
      // Track WhatsApp clicks
      whatsappFloat.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'whatsapp_click', {
            'event_category': 'engagement',
            'event_label': 'floating_button'
          });
        }
      });
    }
  
    // Progress Bar
    setupProgressBar() {
      const progressBar = document.createElement('div');
      progressBar.className = 'fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300';
      progressBar.style.width = '0%';
      document.body.appendChild(progressBar);
  
      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      });
    }
  
      // Tooltips
  setupTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach(element => {
      let tooltipEl;

      const show = () => {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-50 absolute transition-opacity duration-200 opacity-0';
        tooltipEl.textContent = element.getAttribute('data-tooltip');
        document.body.appendChild(tooltipEl);

        const rect = element.getBoundingClientRect();
        tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 6 + window.scrollY}px`;
        tooltipEl.style.left = `${rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2 + window.scrollX}px`;

        requestAnimationFrame(() => tooltipEl.style.opacity = '1');
      };

      const hide = () => {
        if (tooltipEl) {
          tooltipEl.style.opacity = '0';
          tooltipEl.addEventListener('transitionend', () => tooltipEl?.remove(), { once: true });
          tooltipEl = null;
        }
      };

      element.addEventListener('mouseenter', show);
      element.addEventListener('mouseleave', hide);
      element.addEventListener('focus', show);
      element.addEventListener('blur', hide);
    });
  }
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
  new PerformanceOptimizer();
  new SEOManager();
  new UIManager();
});