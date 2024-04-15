import {
    TFile,
    TFolder,
    TAbstractFile,
} from "obsidian";

export function isTFile(file: TAbstractFile) {
    return (file instanceof TFile)
}

export function isTFolder(file: TAbstractFile) {
    return (file instanceof TFolder);
}
