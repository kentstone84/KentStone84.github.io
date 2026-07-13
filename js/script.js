// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '72px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = '#f7f4ee';
      nav.style.padding = '24px 40px';
      nav.style.borderBottom = '1px solid rgba(38,36,33,0.12)';
    });
  }

  // Inquiry form handling
  const form = document.getElementById('inquiry-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');
  const thankYou = document.getElementById('thank-you');
  const STUDIO_EMAIL = 'architect@gsin.dev'; // TODO: replace with real inbox (used only for the fallback path)

  function mailtoFallback(data) {
    const summary = [
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Wedding Date: ${data.get('date') || ''}`,
      `Venue / Location: ${data.get('venue') || ''}`,
      `Estimated Guest Count: ${data.get('guests') || ''}`,
      `Investment Range: ${data.get('budget') || ''}`,
      `Details: ${data.get('message') || ''}`,
    ].join('\n');
    const subject = encodeURIComponent(`Wedding Inquiry — ${data.get('name') || 'New Client'}`);
    const body = encodeURIComponent(summary);
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
    if (status) {
      status.style.display = 'block';
      status.textContent = 'Opening your email client to send this inquiry — please hit send there to complete it.';
    }
  }

  if (form) {
    const isConfigured = !form.action.includes('YOUR_FORM_ID');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);

      // Not wired up to Formspree yet -> use the zero-setup mailto fallback
      // so the form is never broken while you finish the 2-step setup above.
      if (!isConfigured) {
        mailtoFallback(data);
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      status.style.display = 'none';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' },
        });

        if (response.ok) {
          form.style.display = 'none';
          thankYou.style.display = 'block';
          thankYou.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error('Formspree returned an error status');
        }
      } catch (err) {
        // Network/service error -> don't lose the inquiry, fall back to mailto
        status.style.display = 'block';
        status.textContent = 'Something went wrong sending that automatically — opening your email client instead so your inquiry still goes through.';
        mailtoFallback(data);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Inquiry';
      }
    });
  }

  // ---------- Legal page: release choice toggle ----------
  const releaseRadios = document.querySelectorAll('input[name="release_choice"]');
  const releaseSub = document.querySelector('.release-sub');
  if (releaseRadios.length && releaseSub) {
    releaseRadios.forEach((r) => {
      r.addEventListener('change', () => {
        releaseSub.classList.toggle('active', r.value === 'grant' && r.checked);
      });
    });
  }

  // ---------- Legal page: signature pad ----------
  const sigCanvas = document.getElementById('sig-pad');
  let hasSignature = false;
  let getSignatureBlob = null;

  if (sigCanvas) {
    const ctx = sigCanvas.getContext('2d');
    ctx.strokeStyle = '#262421';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    let drawing = false;
    const sigStatus = document.getElementById('sig-status');

    function sigPos(e) {
      const rect = sigCanvas.getBoundingClientRect();
      const scaleX = sigCanvas.width / rect.width;
      const scaleY = sigCanvas.height / rect.height;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
    }
    function sigStart(e) {
      drawing = true;
      hasSignature = true;
      if (sigStatus) sigStatus.textContent = 'Signature captured';
      const p = sigPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      e.preventDefault();
    }
    function sigMove(e) {
      if (!drawing) return;
      const p = sigPos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      e.preventDefault();
    }
    function sigEnd() { drawing = false; }

    sigCanvas.addEventListener('mousedown', sigStart);
    sigCanvas.addEventListener('mousemove', sigMove);
    window.addEventListener('mouseup', sigEnd);
    sigCanvas.addEventListener('touchstart', sigStart, { passive: false });
    sigCanvas.addEventListener('touchmove', sigMove, { passive: false });
    sigCanvas.addEventListener('touchend', sigEnd);

    document.getElementById('sig-clear')?.addEventListener('click', () => {
      ctx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
      hasSignature = false;
      if (sigStatus) sigStatus.textContent = 'Sign above using your mouse or finger';
    });

    getSignatureBlob = () => new Promise((resolve) => sigCanvas.toBlob(resolve, 'image/png'));
  }

  // ---------- Legal page: sign & submit form ----------
  const legalForm = document.getElementById('legal-form');
  const legalStatus = document.getElementById('legal-form-status');
  const legalSubmitBtn = document.getElementById('legal-submit-btn');
  const legalThankYou = document.getElementById('legal-thank-you');
  const LEGAL_STUDIO_EMAIL = 'architect@gsin.dev'; // TODO: replace with real inbox (used only for the fallback path)

  function legalMailtoFallback(data) {
    const releaseChoice = data.get('release_choice') === 'grant' ? 'GRANTED' : 'DECLINED (default)';
    const uses = data.getAll('release_use').join(', ') || 'none selected';
    const summary = [
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Wedding Date: ${data.get('wedding_date') || ''}`,
      `Image Release: ${releaseChoice}`,
      `Approved Uses: ${uses}`,
      `Restrictions: ${data.get('release_restrictions') || 'none'}`,
      `Agreed to Sections A, B, D: ${data.get('legal_agree') ? 'Yes' : 'No'}`,
      `Signature: drawn on-screen — this mailto fallback cannot attach the signature image. Set up Formspree on legal.html to capture signatures automatically, or ask the client to reply to this email with a screenshot of their signature.`,
    ].join('\n');
    const subject = encodeURIComponent(`Signed Legal Documents — ${data.get('name') || 'New Client'}`);
    const body = encodeURIComponent(summary);
    window.location.href = `mailto:${LEGAL_STUDIO_EMAIL}?subject=${subject}&body=${body}`;
    if (legalStatus) {
      legalStatus.style.display = 'block';
      legalStatus.textContent = 'Opening your email client to send this signed record — please hit send there to complete it.';
    }
  }

  if (legalForm) {
    const isLegalConfigured = !legalForm.action.includes('YOUR_LEGAL_FORM_ID');

    legalForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const agreeBox = document.getElementById('legal-agree');
      if (!hasSignature) {
        if (legalStatus) { legalStatus.style.display = 'block'; legalStatus.textContent = 'Please draw your signature above before submitting.'; }
        return;
      }
      if (agreeBox && !agreeBox.checked) {
        if (legalStatus) { legalStatus.style.display = 'block'; legalStatus.textContent = 'Please check the agreement box before submitting.'; }
        return;
      }

      const data = new FormData(legalForm);
      data.set('legal_agree', agreeBox && agreeBox.checked ? 'Yes' : 'No');

      if (!isLegalConfigured) {
        legalMailtoFallback(data);
        return;
      }

      legalSubmitBtn.disabled = true;
      legalSubmitBtn.textContent = 'Submitting...';
      if (legalStatus) legalStatus.style.display = 'none';

      try {
        if (getSignatureBlob) {
          const blob = await getSignatureBlob();
          if (blob) data.append('signature', blob, 'signature.png');
        }

        const response = await fetch(legalForm.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' },
        });

        if (response.ok) {
          legalForm.style.display = 'none';
          legalThankYou.style.display = 'block';
          legalThankYou.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error('Formspree returned an error status');
        }
      } catch (err) {
        if (legalStatus) {
          legalStatus.style.display = 'block';
          legalStatus.textContent = 'Something went wrong submitting that automatically — opening your email client instead so your signed record still goes through.';
        }
        legalMailtoFallback(data);
      } finally {
        legalSubmitBtn.disabled = false;
        legalSubmitBtn.textContent = 'Sign & Submit';
      }
    });
  }

  // ---------- Image lightbox (click to enlarge, view full uncropped image) ----------
  const galleryImages = document.querySelectorAll('.grid-item img, .two-col .img-block img');

  if (galleryImages.length) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <button class="lightbox-close" type="button" aria-label="Close">&times;</button>
      <img class="lightbox-img" src="" alt="">
    `;
    document.body.appendChild(overlay);

    const lightboxImg = overlay.querySelector('.lightbox-img');
    const closeBtn = overlay.querySelector('.lightbox-close');

    function disableCopy(el) {
      el.setAttribute('draggable', 'false');
      el.addEventListener('contextmenu', (e) => e.preventDefault());
      el.addEventListener('dragstart', (e) => e.preventDefault());
    }

    function openLightbox(img) {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || '';
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryImages.forEach((img) => {
      img.style.cursor = 'zoom-in';
      disableCopy(img);
      img.addEventListener('click', () => openLightbox(img));
    });

    disableCopy(lightboxImg);
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }
});
