"use client";

import React, { useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [theme, setTheme] = React.useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("selected-theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme); // ✅ ensures correct logo on refresh
  }, []);

  useEffect(() => {
    const searchInput = document.getElementById("globalSearch");
    if (!searchInput) return;

    function removeHighlights() {
      document.querySelectorAll("mark").forEach((mark) => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize(); // merge text nodes
      });
    }

    function highlightText(keyword) {
      if (!keyword.trim()) return;

      const content = document.querySelector(".main-content") || document.body;
      const regex = new RegExp(`(${keyword})`, "gi");

      const walker = document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const tag = node.parentNode.tagName?.toLowerCase();
            if (["script", "style", "textarea", "input"].includes(tag)) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        },
        false
      );

      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);

      textNodes.forEach((node) => {
        const text = node.nodeValue;
        if (regex.test(text)) {
          const temp = document.createElement("span");
          temp.innerHTML = text.replace(regex, "<mark>$1</mark>");
          node.parentNode.replaceChild(temp, node);
        }
      });
    }

    const handleInput = () => {
      const keyword = searchInput.value.trim();
      removeHighlights();
      if (keyword) highlightText(keyword);
    };

    searchInput.addEventListener("input", handleInput);

    return () => {
      searchInput.removeEventListener("input", handleInput);
    };
  }, []);
  useEffect(() => {
    const themeButton = document.getElementById("theme-button");
    const iconTheme = "ri-sun-fill";

    // 🔹 Get stored theme or default to light
    const selectedTheme = localStorage.getItem("selected-theme") || "light";
    const selectedIcon = localStorage.getItem("selected-icon");

    // 🔹 Apply saved theme on mount
    document.documentElement.setAttribute("data-theme", selectedTheme);

    if (selectedIcon === "ri-moon-clear-fill") {
      themeButton?.classList.add(iconTheme);
    }

    // 🔹 Click handler
    const handleThemeToggle = () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";

      setTheme(currentTheme); // ✅ only set current theme here

      document.documentElement.setAttribute("data-theme", currentTheme);
      themeButton?.classList.toggle(iconTheme);

      localStorage.setItem("selected-theme", currentTheme);
      localStorage.setItem(
        "selected-icon",
        themeButton?.classList.contains(iconTheme)
          ? "ri-moon-clear-fill"
          : "ri-sun-fill"
      );
    };

    // 🔹 Add listener
    themeButton?.addEventListener("click", handleThemeToggle);

    // 🔹 Cleanup on unmount
    return () => themeButton?.removeEventListener("click", handleThemeToggle);
  }, []);

  return (
    <div className="header " id="header">
      <div className="container-fluid">
        <div className="header-items">
          <div className="hedaer-left">
            <Link href="/" className="logo-header">
              <img
                src={
                  theme === "dark"
                    ? "/assets/image/header/logo-darkmode.png"
                    : "/assets/image/header/logo.png"
                }
                alt="Logo"
                style={{ height: "70px", width: "100%" }}
                className="mb-3 ms-2 logo"
              />
            </Link>
            <div className="form-doct">
              <input type="search" id="globalSearch" placeholder="Search..." />
              <a
                href="javascript:void(0)"
                className="search-btn"
                id="searchBtn"
              >
                <i className="ri-search-line"></i>
              </a>
            </div>
          </div>
          <div className="hedaer-right">
            <div className="toggle-menu-doct">
              <button className="header__toggle" id="header-toggle">
                <i className="ri-menu-line"></i>
              </button>
            </div>

            <div className="link-nav">
              <button id="theme-toggle">
                {" "}
                <i
                  className="ri-moon-clear-fill sidebar__link sidebar__theme"
                  id="theme-button"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
