export function changeLang(lang: { currentKey: string }) {
	localStorage.setItem("lang", lang.currentKey);
	// console.log(lang.currentKey);
}
export function getLang() {
	return localStorage.getItem("lang") || "";
}
