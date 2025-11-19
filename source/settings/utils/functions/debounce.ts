export function debounce<F extends (...args: any[]) => void>(
    fn: F,
    delay: number
): (...args: Parameters<F>) => void {
    let t: number | null = null;
    return (...args: Parameters<F>) => {
        if (t !== null) window.clearTimeout(t);
        t = window.setTimeout(() => {
            t = null;
            fn(...args);
        }, delay);
    };
}
