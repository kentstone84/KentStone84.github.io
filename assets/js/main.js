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
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target, e.target.getAttribute('data-tooltip'));
      });
      
      element.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }

  showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute bg-gray-900 text-white text-sm px-2 py-1 rounded z-50 pointer-events-none';
    tooltip.textContent = text;
    tooltip.id = 'tooltip';
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
  }

  hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  // Notifications
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transform transition-all duration-300 translate-x-full`;
    
    const colors = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
      warning: 'bg-yellow-500 text-black'
    };
    
    notification.classList.add(...colors[type].split(' '));
    notification.innerHTML = `
      <div class="flex items-center">
        <div class="flex-1">${message}</div>
        <button class="ml-2 hover:opacity-70" onclick="this.parentElement.parentElement.remove()">
          <i data-feather="x" class="w-5 h-5"></i>
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    feather.replace();
    
    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
}

// ===== Advanced Features =====
class AdvancedFeatures {
  constructor() {
    this.init();
  }

  init() {
    this.setupPWA();
    this.setupOfflineSupport();
    this.setupPushNotifications();
    this.setupGeolocation();
    this.setupSpeedTest();
    this.setupChatbot();
  }

  // PWA Features
  setupPWA() {
    // Check if app is installed
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      this.showInstallPrompt();
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pwa_install');
      }
    });
  }

  showInstallPrompt() {
    const installBanner = document.createElement('div');
    installBanner.className = 'fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 md:left-auto md:right-4 md:max-w-sm';
    installBanner.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <h4 class="font-bold">Instalar App BFT</h4>
          <p class="text-sm opacity-90">Accede más rápido desde tu dispositivo</p>
        </div>
        <div class="ml-4">
          <button id="install-btn" class="bg-white text-blue-600 px-3 py-1 rounded font-bold text-sm">
            Instalar
          </button>
          <button id="dismiss-btn" class="ml-2 opacity-70 hover:opacity-100">
            <i data-feather="x" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(installBanner);
    feather.replace();
    
    document.getElementById('install-btn').addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted PWA install');
        }
        deferredPrompt = null;
        installBanner.remove();
      }
    });
    
    document.getElementById('dismiss-btn').addEventListener('click', () => {
      installBanner.remove();
    });
  }

  // Offline Support
  setupOfflineSupport() {
    window.addEventListener('online', () => {
      this.showNetworkStatus('Conexión restaurada', 'success');
    });

    window.addEventListener('offline', () => {
      this.showNetworkStatus('Sin conexión a internet', 'warning');
    });
  }

  showNetworkStatus(message, type) {
    const status = document.createElement('div');
    status.className = `fixed top-0 left-0 right-0 p-2 text-center text-white z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-yellow-500 text-black'
    }`;
    status.textContent = message;
    
    document.body.appendChild(status);
    
    setTimeout(() => {
      status.remove();
    }, 3000);
  }

  // Push Notifications (requires backend)
  setupPushNotifications() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      // Request permission on user interaction
      document.addEventListener('click', () => {
        if (Notification.permission === 'default') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              console.log('Notifications enabled');
            }
          });
        }
      }, { once: true });
    }
  }

  // Geolocation for Coverage Check
  setupGeolocation() {
    const coverageButton = document.querySelector('[data-coverage-check]');
    if (coverageButton) {
      coverageButton.addEventListener('click', () => {
        this.checkCoverage();
      });
    }
  }

  checkCoverage() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.getCoverageInfo(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          this.showManualCoverageForm();
        }
      );
    } else {
      this.showManualCoverageForm();
    }
  }

  getCoverageInfo(lat, lng) {
    // Simulate coverage check (replace with real API)
    const coverage = this.calculateCoverage(lat, lng);
    
    const modal = this.createModal('Verificación de Cobertura', `
      <div class="text-center">
        <div class="mb-4">
          <div class="w-20 h-20 mx-auto rounded-full ${coverage.available ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center">
            <i data-feather="${coverage.available ? 'check' : 'x'}" class="w-10 h-10 text-white"></i>
          </div>
        </div>
        <h3 class="text-xl font-bold mb-2">${coverage.message}</h3>
        <p class="text-gray-600 mb-4">${coverage.details}</p>
        ${coverage.available ? 
          '<button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" onclick="document.querySelector(\'#contact\').scrollIntoView({behavior: \'smooth\'})">Contratar Ahora</button>' :
          '<button class="bg-gray-600 text-white px-6 py-2 rounded-lg">Próximamente</button>'
        }
      </div>
    `);
    
    feather.replace();
  }

  calculateCoverage(lat, lng) {
    // Lima coverage areas (simplified)
    const coverageAreas = [
      { name: 'Miraflores', bounds: { minLat: -12.130, maxLat: -12.110, minLng: -77.040, maxLng: -77.020 } },
      { name: 'San Isidro', bounds: { minLat: -12.110, maxLat: -12.090, minLng: -77.050, maxLng: -77.030 } },
      { name: 'Surco', bounds: { minLat: -12.120, maxLat: -12.080, minLng: -77.010, maxLng: -76.980 } }
    ];

    const inCoverage = coverageAreas.some(area => 
      lat >= area.bounds.minLat && lat <= area.bounds.maxLat &&
      lng >= area.bounds.minLng && lng <= area.bounds.maxLng
    );

    return {
      available: inCoverage,
      message: inCoverage ? '¡Tenemos cobertura!' : 'Aún no llegamos',
      details: inCoverage ? 
        'Podemos instalar nuestro servicio en tu ubicación.' :
        'Estamos expandiendo nuestra red. Te notificaremos cuando llegemos.'
    };
  }

  showManualCoverageForm() {
    const modal = this.createModal('Verificar Cobertura', `
      <form id="coverage-form">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Distrito</label>
          <select class="w-full px-4 py-2 border rounded-lg" required>
            <option value="">Selecciona tu distrito</option>
            <option value="miraflores">Miraflores</option>
            <option value="san-isidro">San Isidro</option>
            <option value="surco">Surco</option>
            <option value="la-molina">La Molina</option>
            <option value="otros">Otros</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Dirección</label>
          <input type="text" class="w-full px-4 py-2 border rounded-lg" placeholder="Ingresa tu dirección" required>
        </div>
        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full">
          Verificar Cobertura
        </button>
      </form>
    `);
  }

  // Internet Speed Test
  setupSpeedTest() {
    const speedTestButton = document.querySelector('[data-speed-test]');
    if (speedTestButton) {
      speedTestButton.addEventListener('click', () => {
        this.runSpeedTest();
      });
    }
  }

  async runSpeedTest() {
    const modal = this.createModal('Test de Velocidad', `
      <div class="text-center">
        <div class="mb-6">
          <div class="text-4xl font-bold text-blue-600 mb-2" id="speed-result">--</div>
          <div class="text-gray-600">Mbps</div>
        </div>
        <div class="mb-4">
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" id="speed-progress" style="width: 0%"></div>
          </div>
        </div>
        <div class="text-gray-600" id="speed-status">Iniciando test...</div>
        <button class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" onclick="this.closest('.modal-overlay').remove()">
          Cerrar
        </button>
      </div>
    `);

    // Simulate speed test
    const progressBar = modal.querySelector('#speed-progress');
    const statusText = modal.querySelector('#speed-status');
    const speedResult = modal.querySelector('#speed-result');

    const phases = [
      { message: 'Conectando al servidor...', duration: 1000, progress: 20 },
      { message: 'Midiendo velocidad de descarga...', duration: 3000, progress: 70 },
      { message: 'Midiendo velocidad de subida...', duration: 2000, progress: 90 },
      { message: 'Calculando resultados...', duration: 1000, progress: 100 }
    ];

    let currentProgress = 0;
    
    for (const phase of phases) {
      statusText.textContent = phase.message;
      
      const startTime = Date.now();
      const startProgress = currentProgress;
      const targetProgress = phase.progress;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / phase.duration, 1);
        currentProgress = startProgress + (targetProgress - startProgress) * progress;
        
        progressBar.style.width = currentProgress + '%';
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
      await new Promise(resolve => setTimeout(resolve, phase.duration));
    }

    // Show final result
    const simulatedSpeed = Math.floor(Math.random() * 100) + 50; // 50-150 Mbps
    speedResult.textContent = simulatedSpeed;
    statusText.textContent = 'Test completado';
    
    // Suggest upgrade if speed is low
    if (simulatedSpeed < 100) {
      setTimeout(() => {
        statusText.innerHTML = `
          Tu velocidad actual es ${simulatedSpeed} Mbps.<br>
          <a href="#plans" class="text-blue-600 hover:underline">¡Mejora a 400 Mbps con BFT!</a>
        `;
      }, 2000);
    }
  }

  // Simple Chatbot
  setupChatbot() {
    const chatButton = document.createElement('button');
    chatButton.className = 'fixed bottom-20 right-20 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-40';
    chatButton.innerHTML = '<i data-feather="message-square" class="w-6 h-6"></i>';
    chatButton.setAttribute('aria-label', 'Abrir chat');
    
    document.body.appendChild(chatButton);
    feather.replace();
    
    chatButton.addEventListener('click', () => {
      this.openChatbot();
    });
  }

  openChatbot() {
    const chatModal = this.createModal('Asistente Virtual BFT', `
      <div class="h-96 flex flex-col">
        <div class="flex-1 overflow-y-auto p-4 bg-gray-50 rounded" id="chat-messages">
          <div class="mb-2 p-2 bg-blue-100 rounded-lg max-w-xs">
            <div class="text-sm text-gray-600">BFT Bot</div>
            <div>¡Hola! ¿En qué puedo ayudarte?</div>
          </div>
        </div>
        <div class="mt-4 flex">
          <input type="text" id="chat-input" class="flex-1 px-4 py-2 border rounded-l-lg" placeholder="Escribe tu pregunta...">
          <button id="chat-send" class="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
            <i data-feather="send" class="w-5 h-5"></i>
          </button>
        </div>
        <div class="mt-2 flex flex-wrap gap-2">
          <button class="chat-quick-btn bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300" data-message="¿Cuáles son sus planes?">
            Planes disponibles
          </button>
          <button class="chat-quick-btn bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300" data-message="¿Tienen cobertura en mi zona?">
            Cobertura
          </button>
          <button class="chat-quick-btn bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300" data-message="¿Cuánto cuesta la instalación?">
            Instalación
          </button>
        </div>
      </div>
    `, 'max-w-md');
    
    feather.replace();
    
    const chatInput = chatModal.querySelector('#chat-input');
    const chatSend = chatModal.querySelector('#chat-send');
    const chatMessages = chatModal.querySelector('#chat-messages');
    const quickButtons = chatModal.querySelectorAll('.chat-quick-btn');
    
    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (message) {
        this.addChatMessage(chatMessages, message, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
          const response = this.getChatbotResponse(message);
          this.addChatMessage(chatMessages, response, 'bot');
        }, 1000);
      }
    };
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    quickButtons.forEach(button => {
      button.addEventListener('click', () => {
        chatInput.value = button.getAttribute('data-message');
        sendMessage();
      });
    });
  }

  addChatMessage(container, message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-2 p-2 rounded-lg max-w-xs ${
      sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-blue-100'
    }`;
    
    if (sender === 'bot') {
      messageDiv.innerHTML = `
        <div class="text-sm text-gray-600">BFT Bot</div>
        <div>${message}</div>
      `;
    } else {
      messageDiv.textContent = message;
    }
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
  }

  getChatbotResponse(message) {
    const responses = {
      'planes': 'Tenemos 3 planes principales:\n• Plan 400 Mbps: S/89\n• Plan Anual: S/79\n• Plan + Seguridad: S/149\n\n¿Te interesa alguno en particular?',
      'cobertura': 'Tenemos cobertura en Miraflores, San Isidro, Surco y La Molina. ¿En qué distrito te encuentras?',
      'instalacion': 'La instalación es completamente GRATUITA en todos nuestros planes. Nuestro técnico va a tu domicilio sin costo adicional.',
      'precio': 'Nuestros precios van desde S/79 (Plan Anual) hasta S/149 (Plan con Seguridad). ¿Qué velocidad necesitas?',
      'velocidad': 'Ofrecemos velocidades de hasta 400 Mbps con tecnología de fibra óptica. ¿Para cuántas personas sería el servicio?',
      'soporte': 'Brindamos soporte técnico 24/7 por WhatsApp, teléfono y chat. Siempre hablas con una persona real.',
      'default': 'Gracias por tu consulta. Para una atención más personalizada, te recomiendo contactarnos por WhatsApp o llamarnos al (01) 123-4567.'
    };
    
    const key = Object.keys(responses).find(k => 
      message.toLowerCase().includes(k) || 
      message.toLowerCase().includes(k.slice(0, -1))
    );
    
    return responses[key] || responses.default;
  }

  // Modal Creator
  createModal(title, content, maxWidth = 'max-w-lg') {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    modalOverlay.innerHTML = `
      <div class="bg-white rounded-lg ${maxWidth} w-full max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-xl font-bold">${title}</h2>
          <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.modal-overlay').remove()">
            <i data-feather="x" class="w-6 h-6"></i>
          </button>
        </div>
        <div class="p-4">
          ${content}
        </div>
      </div>
    `;
    
    document.body.appendChild(modalOverlay);
    feather.replace();
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.remove();
      }
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        modalOverlay.remove();
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
    
    return modalOverlay;
  }
}

// ===== Initialize Everything =====
class BFTApp {
  constructor() {
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeModules());
    } else {
      this.initializeModules();
    }
  }

  initializeModules() {
    console.log('🚀 Initializing BFT App...');
    
    // Initialize all modules
    this.performanceOptimizer = new PerformanceOptimizer();
    this.seoManager = new SEOManager();
    this.uiManager = new UIManager();
    this.advancedFeatures = new AdvancedFeatures();
    
    // Initialize external libraries
    this.initializeExternalLibraries();
    
    // Setup error handling
    this.setupErrorHandling();
    
    console.log('✅ BFT App initialized successfully!');
  }

  initializeExternalLibraries() {
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }

  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      
      // Log to analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
          'description': e.error.toString(),
          'fatal': false
        });
      }
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
    });
  }
}

// Start the application
const bftApp = new BFTApp();