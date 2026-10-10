
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      navMenu.classList.toggle("is-open", !isOpen);
    });
  }

  // Switch between page sections
  function showTab(tabName) {
    const targetPanel = document.querySelector(
      `[data-panel="${tabName}"]`
    );

    if (!targetPanel) {
      console.error(`No panel found for tab: ${tabName}`);
      return;
    }

    document.querySelectorAll("[data-panel]").forEach(panel => {
      panel.hidden = panel !== targetPanel;
    });

    document.querySelectorAll("[data-tab]").forEach(tab => {
      const isActive = tab.dataset.tab === tabName;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    // Close mobile menu after navigation
    if (menuToggle && navMenu) {
      menuToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Main navigation tabs
  document.querySelectorAll("[data-tab]").forEach(tab => {
    tab.addEventListener("click", () => showTab(tab.dataset.tab));
  });

  // All buttons that link to a section, including RSVP
  document.querySelectorAll("[data-tab-link]").forEach(button => {
    button.addEventListener("click", () => {
      showTab(button.dataset.tabLink);
    });
  });

  // Countdown to 26 June 2027
  const weddingDate = new Date("2027-06-26T16:00:00+02:00");

  function updateCountdown() {
    const remaining = weddingDate.getTime() - Date.now();

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const note = document.getElementById("countdown-note");

    if (remaining <= 0) {
      if (days) days.textContent = "0";
      if (hours) hours.textContent = "0";
      if (minutes) minutes.textContent = "0";
      if (note) note.textContent = "Dziś jest nasz wielki dzień!";
      return;
    }

    if (days) days.textContent = Math.floor(remaining / 86400000);
    if (hours) hours.textContent = Math.floor((remaining % 86400000) / 3600000);
    if (minutes) minutes.textContent = Math.floor((remaining % 3600000) / 60000);
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);

  // RSVP form: demo feedback only, does not send or save responses
  const rsvpForm = document.getElementById("rsvp-form");
  const formStatus = document.getElementById("form-status");

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!rsvpForm.reportValidity()) return;

      if (formStatus) {
        formStatus.textContent =
          "Dziękujemy! Formularz działa, ale odpowiedzi nie są jeszcze zapisywane. Skontaktujcie się z parą młodą, aby potwierdzić obecność.";
      }
    });
  }
});
