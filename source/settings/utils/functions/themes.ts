export function getThemeObsidian(): string {
    return document.body.classList.contains("theme-dark") === true ? "dark" : "light";
}
