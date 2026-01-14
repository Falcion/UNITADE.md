import { BaseComponent, Setting } from "obsidian";

export type NestedSetting =
    Setting | BaseComponent | HTMLHeadingElement;
