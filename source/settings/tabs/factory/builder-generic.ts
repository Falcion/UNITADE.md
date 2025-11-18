import UnitadePlugin from '../../../main';
import { IUnitadeTabBuilder } from './builder';

export default class UnitadeTabGenericBuilder implements IUnitadeTabBuilder {
    defaults?: {
        color: string;
        borderColor: string;
        borderWidth: string;
    } = undefined;

    private _plugin!: UnitadePlugin;
    private _containerEl!: HTMLElement;

    constructor(containerEl: HTMLElement, plugin: UnitadePlugin) {
        this._plugin = plugin;
        this._containerEl = containerEl;
    }

    updateState(): void {
        throw new Error('Method not implemented.');
    }
    updateErrors(): void {
        throw new Error('Method not implemented.');
    }
    updateDisplays(): void {
        throw new Error('Method not implemented.');
    }

}
