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

/**
 * A generator function that returns all possible combinations of lower and upper case letters 
 * for a given input string.
 * 
 * @generator
 * @param {string} input - The input string for which to generate case combinations.
 * @yields {string} - The next case combination of the input string.
 * 
 * @example
 * const generator = gencase("ab");
 * console.log(generator.next().value); // "ab"
 * console.log(generator.next().value); // "aB"
 * console.log(generator.next().value); // "Ab"
 * console.log(generator.next().value); // "AB"
 */
export function* gencase(input: string): Generator<string> {
    function* gen(current: string, index: number): Generator<string> {
        if (index === input.length) {
            yield current;
            return;
        }

        const char = input[index];
        yield* gen(current + char.toLowerCase(), index + 1);
        yield* gen(current + char.toUpperCase(), index + 1);
    }

    yield* gen('', 0);
}

/**
 * Parses an input string into a key-value group structure, where each group is separated by a semicolon (`;`)
 * and keys are separated from values by a colon (`:`). Values can be further split by the `>` character.
 * 
 * @param {string} input - The input string to parse into key-value groups.
 * @returns {{ [key: string]: string[] }} - An object where each key has an array of values.
 * 
 * @example
 * const result = parsegroup("group1:val1>val2;group2:val3");
 * console.log(result); 
 * // {
 * //   group1: ['val1', 'val2'],
 * //   group2: ['val3']
 * // }
 */
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

/**
 * Formats a string by replacing placeholders in the form `{index}` with corresponding values 
 * from the `args` array.
 * 
 * @param {string} template - The string template containing placeholders (e.g., `{0}`, `{1}`).
 * @param {...string} args - The values to replace the placeholders in the template.
 * @returns {string} - The formatted string with placeholders replaced by corresponding values.
 * 
 * @example
 * const result = formatString("Hello, {0} {1}!", "John", "Doe");
 * console.log(result); // "Hello, John Doe!"
 */
export function formatString(template: string, ...args: string[]): string {
    return template.replace(/{(\d+)}/g, (match, index) => {
        return typeof args[index] !== 'undefined' ? args[index] : match;
    });
}
