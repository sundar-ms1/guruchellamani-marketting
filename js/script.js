// ==========================================================================
// GURUCHELLAMANI MARKETING — site interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Footer year ----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile menu toggle ----
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu after a nav link is tapped (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Smooth scroll for in-page anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerOffset = 76;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  // ---- Contact / enquiry form ----
  var form = document.getElementById('enquiryForm');
  var successBox = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      successBox.classList.remove('show');

      var nameInput = document.getElementById('name');
      var phoneInput = document.getElementById('phone');
      var messageInput = document.getElementById('message');

      var nameField = document.getElementById('field-name');
      var phoneField = document.getElementById('field-phone');
      var messageField = document.getElementById('field-message');

      var isValid = true;

      // Name validation
      if (!nameInput.value.trim()) {
        nameField.classList.add('invalid');
        isValid = false;
      } else {
        nameField.classList.remove('invalid');
      }

      // Phone validation - Indian 10-digit mobile, allows leading 0/+91
      var phoneDigits = phoneInput.value.replace(/\D/g, '');
      var phoneValid = /^([0-9]{10}|91[0-9]{10}|0[0-9]{10})$/.test(phoneDigits);
      if (!phoneValid) {
        phoneField.classList.add('invalid');
        isValid = false;
      } else {
        phoneField.classList.remove('invalid');
      }

      // Message validation
      if (!messageInput.value.trim()) {
        messageField.classList.add('invalid');
        isValid = false;
      } else {
        messageField.classList.remove('invalid');
      }

      if (!isValid) {
        var firstInvalid = form.querySelector('.invalid input, .invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Build WhatsApp message from the form fields
      var waMessage =
        'Hello Guruchellamani Marketing, I would like to enquire about LAZZA Ice Cream wholesale orders.\n\n' +
        'Name: ' + nameInput.value.trim() + '\n' +
        'Phone: ' + phoneInput.value.trim() + '\n' +
        'Message: ' + messageInput.value.trim();

      var waUrl = 'https://wa.me/919865511449?text=' + encodeURIComponent(waMessage);

      successBox.classList.add('show');
      successBox.setAttribute('tabindex', '-1');
      successBox.focus();

      // Open WhatsApp with the pre-filled enquiry
      window.open(waUrl, '_blank', 'noopener');

      form.reset();
    });
  }

});
