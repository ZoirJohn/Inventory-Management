export function changeTheme() {
  const root = document.getElementById("root");

  if (!root) return;
  const isDark = localStorage.getItem("theme") === "dark";
  const nextTheme = isDark ? "light" : "dark";

  localStorage.setItem("theme", nextTheme);
  root.classList.toggle("dark", nextTheme === "dark");
}
