import { NestedSetting } from "@settings/utils/types/nested_setting";
import UnitadeTabGenericBuilder from "@settings-factory/builder-generic";
import { IUnitadeTab } from "@settings/tabs/tab";
import UnitadePlugin from "@main";


export default class UnitadeTabStatus implements IUnitadeTab {
    tabContainer!: HTMLElement;
    tabBuilder!: UnitadeTabGenericBuilder;
    tabSettings!: NestedSetting[];

    constructor(containerEl: HTMLElement) {
        this.tabContainer = containerEl.createEl('div', {
            cls: 'unitade-settings-tab-container'
        });
    }

    display(plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabGenericBuilder(this.tabContainer, plugin);
        this.tabSettings = [
        ];

        this.tabBuilder.updateDisplays();
    }

    addEventListener(type: keyof HTMLElementEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions): void {
        this.tabContainer.addEventListener(type, listener, options);
    }
}

// externals: {
//     compat: false,
//         safe: true,
//             safe_case: true,
//                 silencing: true
// },
