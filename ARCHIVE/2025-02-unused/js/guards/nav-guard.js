// nav-guard.js
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");

  if (!nav) {
    console.warn("❗ NAV GUARD: <nav> not found. Skipping injection.");
    return;
  }

  const links = nav.querySelectorAll("a");
  if (!links.length) {
    console.error("❌ NAV GUARD: No <a> links found. Possible overwrite or DOM corruption.");
  }

  // Optional: Add recovery nav if completely broken
  if (links.length < 2) {
    nav.innerHTML = `
      <a href="/">Home</a>
      <a href="#innovationLab">Lab</a>
    `;
    console.warn("⚠️ NAV RECOVERY: Minimal fallback nav injected.");
  }

  console.log("✅ NAV GUARD ACTIVE");
});
