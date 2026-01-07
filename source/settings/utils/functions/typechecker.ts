/**
 * Runtime type guard that checks whether given value matches the shape of other and
 * optionally whether a named function exists on value.
 *
 * @param {unknown} value
 * An object instance of the value to test, any type
 * @param {unknown} other
 * Prototype object or class constructor that defines the desired shape
 * @param {string} fnName
 * Optional name of a function that must exist on tested value
 * @returns 
 * Boolean narrowing value to the desired type when true
 * @example
 * Assume you have array of base components and want to call some function ("setValue") on only those
 * that are toggle components. Use the type guard as follows:
 * 
 * ```ts
 * for (const component of components) {
 *  if (isType<BaseComponent, ToggleComponent>(component, ToggleComponent.prototype, 'setValue')) {
 *    component.setValue(state);
 *  }
 * }
 * ```
 */
export function isType<T = unknown, U = unknown>(
    value: unknown,
    other: U | (new (...args: unknown[]) => U) | Partial<U>,
    fnName?: keyof U | string
): value is T {
    if (value == null) return false;

    const kind = typeof value;
    if (kind !== 'object' && kind !== 'function') return false;

    /** Determine shape source: constructor prototype (class) or provided object */
    const shape = typeof other === 'function' ? (other as any).prototype : other as any;

    if (shape && typeof shape === 'object') {
        for (const key of Object.keys(shape)) {
            if (!(key in (value as any))) return false;
        }
    }

    if (fnName) {
        const prop = (value as any)[fnName as any];
        if (typeof prop !== 'function') return false;
    }

    return true;
}
