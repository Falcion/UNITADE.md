export function parseRegex(raw: string): RegExp | null {
    try {
        const exp = raw.trim();
        const expFlags = exp.lastIndexOf('/');

        if (!exp.startsWith('/') || expFlags <= 0) return null;

        return new RegExp(
            exp.slice(1, expFlags),
            exp.slice(expFlags + 1)
        );
    } catch {
        return null;
    }
}

export function parsePattern(raw: string): Record<string, string[]> {
    return Object.fromEntries(
        raw.split(';').map(setting => {
            const [key, values] = setting.trim().split(':');
            return [key?.trim() ?? '', values?.split('>').map(v => v.trim()) ?? []];
        }).filter(([key]) => key)
    );
}

