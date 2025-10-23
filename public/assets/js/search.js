// ==========================
// Global Search + Live Highlighter
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("globalSearch");

  function removeHighlights() {
    document.querySelectorAll("mark").forEach((mark) => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize(); // merge text nodes
    });
  }

  function highlightText(keyword) {
    if (!keyword.trim()) return;

    const body = document.querySelector("body");
    const regex = new RegExp(`(${keyword})`, "gi");
    const content = document.querySelector(".main-content") || body;

    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);
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

  // 🟡 Highlight live as the user types
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim();
    removeHighlights();
    if (keyword) highlightText(keyword);
  });
});
