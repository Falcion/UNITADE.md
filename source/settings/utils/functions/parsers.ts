import { BaseComponent } from "obsidian";
import { COMPONENTS_MAP } from "@settings/utils/consts/components";
import { NestedSetting } from "@settings/utils/types/nested_setting";
import { isType } from "@settings/utils/functions/typechecker";

export function parseRegex(raw: string): RegExp | null {
    try {
        const exp = raw.trim();
        const expFlags = exp.lastIndexOf('/');

        if (!exp.startsWith('/') || expFlags <= 0) return null;

        return new RegExp(
            exp.slice(1, expFlags),
            exp.slice(expFlags + 1)
        );
    } catch {
        return null;
    }
}

export function parsePattern(raw: string): Record<string, string[]> {
    return Object.fromEntries(
        raw.split(';').map(setting => {
            const [key, values] = setting.trim().split(':');
            return [key?.trim() ?? '', values?.split('>').map(v => v.trim()) ?? []];
        }).filter(([key]) => key)
    );
}

export function extractComponent(target: NestedSetting): HTMLElement | undefined {
    for (const { type, elementKey } of COMPONENTS_MAP) {
        if (isType<BaseComponent>(target, type.prototype)) {
            return (target as any)[elementKey];
        }
    }

    return undefined;
}

