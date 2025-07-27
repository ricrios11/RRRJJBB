// time-inspector.js
document.addEventListener("DOMContentLoaded", () => {
  const hour = new Date().getHours();
  let mode = "";

  if (hour >= 5 && hour < 12) mode = "Morning";
  else if (hour >= 12 && hour < 17) mode = "Afternoon";
  else if (hour >= 17 && hour < 22) mode = "Evening";
  else mode = "Night";

  console.group("🧭 Time Awareness Inspector");
  console.log("🕰 Current Hour:", hour);
  console.log("🌅 Mode:", mode);
  console.log("🎯 Hero Text:", document.getElementById("hero")?.innerText.trim());
  console.log("🎨 Theme Class:", document.body.classList.contains("dark") ? "Dark" : "Light");
  console.log("🌈 Time Gradient:", document.body.getAttribute("data-time-gradient") || "Not Set");
  console.log("⏰ Body Time Class:", document.body.className.match(/time-\w+/)?.[0] || "Not Set");
  console.groupEnd();
});
