export type NestedKey<T> = {
    [K in keyof T & string]: T[K] extends object
    ? `${K}.${NestedKey<T[K]>}`
    : K;
}[keyof T & string];
