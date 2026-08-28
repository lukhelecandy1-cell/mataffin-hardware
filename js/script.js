// Mattafin Hardware — shared behaviour across pages

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile nav toggle ----
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ---- Materials category filter (Materials page only) ----
  var chips = document.querySelectorAll('.chip[data-category]');
  var sections = document.querySelectorAll('[data-category-section]');
  if (chips.length && sections.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var category = chip.getAttribute('data-category');
        sections.forEach(function (section) {
          var match = category === 'all' || section.getAttribute('data-category-section') === category;
          section.style.display = match ? '' : 'none';
        });
      });
    });
  }

  // ---- Contact form validation ----
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name');
      var contact = form.querySelector('#contact');
      var message = form.querySelector('#message');
      var status = form.querySelector('.form-status');

      if (!name.value.trim() || !contact.value.trim() || !message.value.trim()) {
        status.textContent = 'Please fill in your name, a way to reach you, and your message.';
        status.className = 'form-status error';
        return;
      }

      // No backend: this is where a form service (e.g. Formspree) endpoint
      // would receive the POST, or a mailto: fallback would open.
      status.textContent = 'Thanks — your enquiry has been noted. We will get back to you soon.';
      status.className = 'form-status success';
      form.reset();
    });
  }
});