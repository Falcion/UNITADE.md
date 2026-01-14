export type HeaderLevel = keyof HTMLElementTagNameMap;

export const HEADER_LEVELS: Record<string, HeaderLevel> = {
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    H4: 'h4',
    H5: 'h5',
    H6: 'h6'
}
