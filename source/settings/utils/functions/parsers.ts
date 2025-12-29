export function parsePattern(raw: string): Record<string, string[]> {
    return Object.fromEntries(
        raw.split(';').map(setting => {
            const [key, values] = setting.trim().split(':');
            return [key?.trim() ?? '', values?.split('>').map(v => v.trim()) ?? []];
        }).filter(([key]) => key)
    );
}

