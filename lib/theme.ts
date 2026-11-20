export function toggleTheme() {
  const root = document.documentElement;
  const dark = root.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
}
