import UnitadeTabGenericBuilder from "@settings-factory/builder-generic";
import UnitadePlugin from "@main";
import UnitadeUnifiedTab from "@settings/tabs/tab-unified";

export default class UnitadeTabForced extends UnitadeUnifiedTab {
    override tabBuilder!: UnitadeTabGenericBuilder;
    override display(plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabGenericBuilder(this.tabContainer, plugin);
        this.tabSettings = [
        ];

        this.tabBuilder.updateDisplays();
    }
}

// forced_view: {
//     enable: false,
//         extensions: '',
//             mode: 'live-preview',
//                 advanced: {
//         enable: false,
//             groups: ''
//     }
// },
