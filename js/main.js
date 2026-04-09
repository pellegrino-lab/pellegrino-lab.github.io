/* ============================================================
   Pellegrino Sensory Research Laboratory — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile Nav Toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* --- Active Nav Highlight --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Taste Tester Form (Google Apps Script) --- */
  const form = document.getElementById('tasterForm');
  if (form) {
    const msg = document.getElementById('formMessage');

    // Deployed Google Apps Script Web App URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_W4DXz_7jigQSIK07L9TvkusnazsUYH4PVkyEW1Bwu0DLYIj9ukM9_4BVnyzTBh4iCQ/exec';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('.form-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      const data = {
        firstName: form.firstName.value.trim(),
        lastName:  form.lastName.value.trim(),
        age:       form.age.value,
        gender:    form.gender.value,
        email:     form.email.value.trim(),
        dietary:   form.dietary.value.trim(),
      };

      fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then(function (res) { return res.json(); })
        .then(function () {
          msg.textContent = 'Thank you for signing up! We will be in touch when studies are available.';
          msg.className = 'form-message success';
          msg.style.display = 'block';
          form.reset();
        })
        .catch(function () {
          msg.textContent = 'Something went wrong. Please email us directly at sensory@ag.tamu.edu.';
          msg.className = 'form-message error';
          msg.style.display = 'block';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign Me Up';
        });
    });
  }
});
