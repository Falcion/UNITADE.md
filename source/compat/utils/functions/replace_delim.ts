export default function replaceDelimiter(value: any, oldDelim: string, newDelim: string): string | undefined {
    if (value === undefined || value === null)
        return undefined;

    const str = String(value);

    if (str.trim() === '')
        return '';

    return str.replaceAll(oldDelim, newDelim);
}

