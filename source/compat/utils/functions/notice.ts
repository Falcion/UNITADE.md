import { Notice } from "obsidian";

export default function makeNotice(message: string | DocumentFragment, duration?: number): void {
    new Notice(message, duration);
}
