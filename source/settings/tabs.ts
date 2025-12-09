/*
 * Code was inspired from:
 * https://github.com/PKM-er/obsidian-editing-toolbar/
 * 
 * License of the origin:
 * Mozilla Public License Version 2.0
 */

export interface ISettingsTab {
    id: string,
    name: string,
    icon: string,
}

export const SETTINGS_TABS: ISettingsTab[] = [
    {
        id: 'tab-generic',
        name: 'Generic',
        icon: 'cog',
    },
    {
        id: 'tab-advanced',
        name: 'Advanced',
        icon: 'layout-list',
    },
    {
        id: 'tab-code-editor',
        name: 'Code editor',
        icon: 'code',
    },
    {
        id: 'tab-externals',
        name: 'Externals',
        icon: 'square-arrow-out-up-right',
    },
    {
        id: 'tab-status',
        name: 'Status bar',
        icon: 'info',
    },
    {
        id: 'tab-forced',
        name: 'Forcing views',
        icon: 'eye',
    },
    {
        id: 'tab-developer',
        name: 'Developer options',
        icon: 'bug',
    }
]
