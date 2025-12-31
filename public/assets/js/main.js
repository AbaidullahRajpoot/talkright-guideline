// ------------------------- Loader Spinner
console.log("Fading out loader...");
setTimeout(() => {
  document.querySelectorAll(".loader, .loader-mask").forEach((el) => {
    el.style.transition = "opacity 0.5s";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 500);
  });
}, 1000);

// ------------------------- Theme Toggle
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "light";
      setTheme(current === "light" ? "dark" : "light");
    });
  }
});

// ------------------------- Dark/Light Mode (body-based)
// document.addEventListener("DOMContentLoaded", () => {
//   const themeButton = document.getElementById("theme-button");
//   const iconTheme = "ri-sun-fill";

//   // Get the stored theme, or default to light
//   const selectedTheme = localStorage.getItem("selected-theme") || "light";
//   const selectedIcon = localStorage.getItem("selected-icon");

//   // Apply the saved theme
//   document.documentElement.setAttribute("data-theme", selectedTheme);
//   themeButton.classList.toggle(
//     iconTheme,
//     selectedIcon === "ri-moon-clear-fill"
//   );

//   // Toggle theme on click
//   themeButton?.addEventListener("click", () => {
//     const currentTheme =
//       document.documentElement.getAttribute("data-theme") === "dark"
//         ? "light"
//         : "dark";

//     document.documentElement.setAttribute("data-theme", currentTheme);
//     themeButton.classList.toggle(iconTheme);
//     localStorage.setItem("selected-theme", currentTheme);
//     localStorage.setItem(
//       "selected-icon",
//       themeButton.classList.contains(iconTheme)
//         ? "ri-moon-clear-fill"
//         : "ri-sun-fill"
//     );
//   });
// });

// ------------------------- Sidebar Dropdown
document.addEventListener("click", (e) => {
  if (e.target.closest(".gx-sb-item > a")) {
    e.preventDefault();
    const link = e.target.closest(".gx-sb-item > a");
    const dropdown = link.nextElementSibling;
    const arrow = link.querySelector(".drop-arrow");

    document.querySelectorAll(".gx-sb-item .dropdown-data").forEach((d) => {
      if (d !== dropdown) d.style.display = "none";
    });
    document.querySelectorAll(".gx-sb-item .drop-arrow").forEach((a) => {
      if (a !== arrow) a.classList.remove("rotate");
    });

    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
    arrow?.classList.toggle("rotate");
  }
});

// ------------------------- Responsive Topic Sidebar
document.addEventListener("click", (e) => {
  if (e.target.matches(".header__toggle")) {
    const topic = document.querySelector(".gx-topic");
    const overlay = document.querySelector(".gx-side-overlay");
    topic?.classList.toggle("gx-open-topic");

    if (topic?.classList.contains("gx-open-topic")) {
      overlay?.classList.add("show");
      overlay?.setAttribute("style", "display:block;opacity:1;");
    } else {
      overlay?.setAttribute("style", "display:none;");
    }
  }

  if (e.target.matches(".gx-side-overlay")) {
    document.querySelector(".gx-topic")?.classList.remove("gx-open-topic");
    e.target.setAttribute("style", "display:none;");
  }
});

// ------------------------- Full Screen Card
document.addEventListener("click", (e) => {
  if (e.target.closest(".gx-full-card")) {
    const btn = e.target.closest(".gx-full-card");
    const headerTools = btn.closest(".header-tools");
    const cardWrapper = btn.closest(".gx-card")?.parentElement;

    btn.style.display = "none";
    const closeBtn = document.createElement("a");
    closeBtn.href = "javascript:void(0)";
    closeBtn.className = "m-l-10 gx-full-card-close";
    closeBtn.innerHTML = '<i class="ri-close-fill"></i>';
    headerTools.appendChild(closeBtn);

    cardWrapper.classList.add("gx-full-screen");
    setTimeout(() => cardWrapper.classList.add("active"), 10);

    const overlay = document.createElement("div");
    overlay.className = "gx-card-overlay show";
    cardWrapper.parentElement.appendChild(overlay);
  }

  if (
    e.target.closest(".gx-card-overlay") ||
    e.target.closest(".gx-full-card-close")
  ) {
    document
      .querySelectorAll(".gx-full-card-close")
      .forEach((el) => el.remove());
    document
      .querySelectorAll(".gx-full-card")
      .forEach((el) => (el.style.display = ""));
    document.querySelectorAll(".gx-card").forEach((card) => {
      const wrapper = card.parentElement;
      wrapper.classList.remove("active");
      setTimeout(() => wrapper.classList.remove("gx-full-screen"), 300);
    });
    document.querySelectorAll(".gx-card-overlay").forEach((ov) => ov.remove());
  }
});

// ------------------------- File Structure Dropdowns (gx-struct-drop levels)
function handleStructDropdown(selector, subClass) {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(selector);
    if (!btn) return;

    const subMenu = btn.parentElement.querySelector(subClass);
    if (!subMenu) return;

    const arrow = btn.querySelector(".gx-arrow");
    const isOpen = subMenu.classList.contains("show");

    // 🔒 Close ONLY sibling <li> accordions
    const parentLi = btn.closest("li");

    parentLi.parentElement
      .querySelectorAll(":scope > li > " + subClass + ".show")
      .forEach((menu) => {
        if (menu === subMenu) return;

        menu.style.opacity = "0";
        menu.style.transform = "translateY(-20px)";
        menu.style.maxHeight = "0";
        menu.classList.remove("show");

        const openArrow = menu.parentElement.querySelector(".gx-arrow");
        if (openArrow) openArrow.classList.remove("rotate");
      });

    // Toggle current
    if (!isOpen) {
      setTimeout(() => {
        subMenu.classList.add("show");
        subMenu.style.opacity = "1";
        subMenu.style.transform = "translateY(0)";
        subMenu.style.maxHeight = subMenu.scrollHeight + "px";

        if (arrow) arrow.classList.add("rotate");
      }, 10);
    } else {
      subMenu.classList.remove("show");
      subMenu.style.maxHeight = "0";
      if (arrow) arrow.classList.remove("rotate");
    }
  });
}

handleStructDropdown(".gx-struct-drop", ".gx-sub");
handleStructDropdown(".gx-struct-drop-under", ".gx-sub-under");
handleStructDropdown(".gx-struct-drop-back", ".gx-sub-under-under");

// ------------------------- Navbar Link Redirect
document.addEventListener("click", (e) => {
  const link = e.target.closest(".navbar-link");
  if (link) {
    e.preventDefault();
    const targetUrl = link.getAttribute("href");
    console.log("Redirecting to:", targetUrl);
    window.location.href = targetUrl;
  }
});
