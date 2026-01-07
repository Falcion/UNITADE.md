export function getDeep(obj: any, path: string): any {
    if (!path) return undefined;
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

export function setDeep<T = any>(obj: T, path: string, value: any): T {
    const parts = path.split('.');
    let cursor = obj as any;
    for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!Object.prototype.hasOwnProperty.call(cursor, p) || typeof cursor[p] !== 'object')
            cursor[p] = Object.create(null);
        cursor = cursor[p];
    }
    if (!Object.prototype.hasOwnProperty.call(cursor, parts[parts.length - 1]) || typeof cursor[parts[parts.length - 1]] !== 'object')
        cursor[parts[parts.length - 1]] = value;

    return obj;
}
