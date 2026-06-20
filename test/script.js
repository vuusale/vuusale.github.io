/* script.js
   Small interactive behaviors:
   - mobile nav toggle
   - theme toggle (light/dark)
   - copy email to clipboard
   - prepare mailto from form inputs (client-side only)
   - set current year in footer
*/

(function () {
  // Elements
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  const themeToggle = document.getElementById('themeToggle');
  const copyEmailBtn = document.getElementById('copyEmail');
  const emailText = document.getElementById('emailText');
  const sendBtn = document.getElementById('sendBtn');
  const nameInput = document.getElementById('name');
  const msgInput = document.getElementById('msg');
  const clearForm = document.getElementById('clearForm');
  const yearEl = document.getElementById('year');

  // Initialize year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });

    // Close nav on link click (mobile)
    navList.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme toggle: toggles "light" class on body
  if (themeToggle) {
    // remember preference in localStorage
    const preferred = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    if (preferred === 'light') document.body.classList.add('light');

    themeToggle.addEventListener('click', function () {
      const isLight = document.body.classList.toggle('light');
      this.setAttribute('aria-pressed', String(isLight));
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // Copy email to clipboard
  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', async function () {
      const text = emailText.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        copyEmailBtn.textContent = 'Copied';
        setTimeout(() => (copyEmailBtn.textContent = 'Copy email'), 1600);
      } catch (err) {
        // Fallback: select and prompt (very old browsers)
        const input = document.createElement('textarea');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        try { document.execCommand('copy'); alert('Email copied to clipboard'); }
        catch (e) { alert('Copy failed — email: ' + text); }
        input.remove();
      }
    });
  }

  // Prepare mailto (client-side)
  if (sendBtn && nameInput && msgInput) {
    sendBtn.addEventListener('click', function (e) {
      const name = encodeURIComponent(nameInput.value.trim() || 'Anonymous');
      const body = encodeURIComponent(msgInput.value.trim() || '');
      const mailto = `mailto:${emailText.textContent.trim()}?subject=${name}%20via%20portfolio&body=${body}`;
      // Open user's mail client with mailto; we don't send anything from the site.
      window.location.href = mailto;
    });
  }

  if (clearForm && nameInput && msgInput) {
    clearForm.addEventListener('click', function () {
      nameInput.value = '';
      msgInput.value = '';
      nameInput.focus();
    });
  }

  // Smooth scroll for internal links
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

})();
