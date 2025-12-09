import { TabFactory } from "@settings/utils/types/tab_factory"

export const SETTINGS_TABS_FACTORIES: Record<string, TabFactory> = {
    'tab-generic': () => import('@settings/tabs/tab-generic'),
    // 'tab-advanced': () => import('@settings/tabs/tab-advanced'),
    // 'tab-code-editor': () => import('@settings/tabs/tab-code-editor'),
    // 'tab-externals': () => import('@settings/tabs/tab-externals'),
    // 'tab-status': () => import('@settings/tabs/tab-status'),
    // 'tab-forced': () => import('@settings/tabs/tab-forced'),
    // 'tab-developer': () => import('@settings/tabs/tab-developer'),
}
