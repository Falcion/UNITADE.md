export function getDeep(obj: any, path: string): any {
    if (!path) return undefined;
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

export function setDeep<T = any>(obj: T, path: string, value: any): T {
    const parts = path.split('.');
    let cursor = obj as any;
    for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (cursor[p] == null) {
            cursor[p] = {};
        }
        cursor = cursor[p];
    }
    cursor[parts[parts.length - 1]] = value;
    return obj;
}
