export function changeLang(lang: { currentKey: string }) {
  localStorage.setItem("lang", lang.currentKey);
}
export function getLang() {
  return localStorage.getItem("lang") || "";
}
