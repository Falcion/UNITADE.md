/*
 * MIT License
 *
 * Copyright (c) 2023-2024
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * Any code and/or API associated with OBSIDIAN behaves as stated in their distribution policy.
 */

export function gencase(input: string): string[] {
    const variations: string[] = [];

    function gen(current: string, index: number) {
        if (index === input.length) {
            variations.push(current);
            return;
        }

        const char = input[index];
        gen(current + char.toLowerCase(), index + 1);
        gen(current + char.toUpperCase(), index + 1);
    }

    gen('', 0);

    return variations;
}

export function parsegroup(input: string): { [key: string]: string[] } {
    const settings: { [key: string]: string[] } = {};

    const settings_parsed = input.split(';');

    for (const setting of settings_parsed) {
        const [key, values] = setting.trim().split(':').map(x => x.trimStart());

        if (values !== undefined) {
            const arr_values = values.split('>');

            settings[key.trim()] = arr_values;
        } else {
            settings[key.trim()] = [];
        }
    }

    return settings;
}

export function formatString(template: string, ...args: string[]): string {
    return template.replace(/{(\d+)}/g, (match, index) => {
        return typeof args[index] !== 'undefined' ? args[index] : match;
    });
}
