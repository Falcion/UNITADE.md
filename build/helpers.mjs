export function parseCliArgs(argv) {
    const args = {};
    for (const arg of argv) {
        if (arg.startsWith("--")) {
            const eqIndex = arg.indexOf("=");
            if (eqIndex !== -1) {
                const key = arg.slice(2, eqIndex);
                const value = arg.slice(eqIndex + 1);
                args[key] = value;
            }
        }
    }
    return args;
}
