import { describe, expect, test } from "@jest/globals";
import { CONVERTERS } from "@source/compat/versions/converters";
import { EXAMPLES } from "@tests-compat/utils/enum/examples";
import { loadCfg } from "@tests-compat/utils/payload";
import chalk from "chalk";

describe('Cross-version detection isolation:', () => {
    test('Each example file is matched by only one converter', () => {
        for (const example of EXAMPLES) {
            const data = loadCfg(example.file);
            const found = CONVERTERS.filter(converter => converter.detect(data));

            expect(found.length).toBe(1);
        }
    });

    /**
     * This is category of edge-cases not defined by default
     * array of examples, that's why we directly call the files and versions.
     */
    test('Does not match any ' + chalk.yellow('1.*') + ' payload against later-version converters', () => {
        const data = loadCfg('data-1.0.json');
        const later = CONVERTERS.filter(c => ['2.0', '2.1', '2.4', '3.2.*'].includes(c.version));

        for (const converter of later)
            expect(converter.detect(data)).toBe(false);
    });

    /**
     *! If there any new versions added, update for such tests are required
     *! to cover the isolation of detection between new and old versions.
     */
    test('Does not match any ' + chalk.yellow('3.2.*') + ' payload against earlier-version converters', () => {
        const data = loadCfg('data-3.2.json');
        const earlier = CONVERTERS.filter(c => ['1.*', '2.0', '2.1', '2.4'].includes(c.version));

        for (const converter of earlier)
            expect(converter.detect(data)).toBe(false);
    });

    describe('Reject reaction of payloads:', () => {
        test('Version-tag ' + chalk.yellow('2.*') + ' payload is rejected by ' + chalk.yellow('1.*') + ' converter', () => {
            const v2 = { grouped_extensions: 'md: txt;', extensions: 'txt' };
            const v1 = CONVERTERS.find(c => c.version === '1.*')!;

            expect(v1.detect(v2)).toBe(false);
        });

        test('Version-tag ' + chalk.yellow('3.*') + ' payload is rejected by ' + chalk.yellow('2.4') + ' converter', () => {
            const v30 = { barefiling: true, manifest_version: '3.0.0', extensions: 'txt' };
            const v24 = CONVERTERS.find(c => c.version === '2.4')!;

            expect(v24.detect(v30)).toBe(false);
        })
    });
});

describe('Converter detection edge cases:', () => {
    test('Detects an empty object as ' + chalk.yellow('1.*') + ' version', () => {
        expect(CONVERTERS.find(c => c.detect({}))?.version).toBe('1.*');
    });

    test('Detects payload with grouped_extensions and no debug_mode as ' + chalk.yellow('2.0') + ' version', () => {
        const data = { grouped_extensions: 'md: txt;', extensions: 'txt' };
        const detected = CONVERTERS.find(c => c.detect(data));
        expect(detected?.version).toBe('2.0');
    });

    test('Detects payload with debug mode and no barefiling as ' + chalk.yellow('2.1') + ' version', () => {
        const data = { debug_mode: false, extensions: 'txt' };
        const detected = CONVERTERS.find(c => c.detect(data));
        expect(detected?.version).toBe('2.1');
    });

    test('Detects payload with barefiling and no manifest version as ' + chalk.yellow('2.4') + ' version', () => {
        const data = { barefiling: true, extensions: 'txt', debug_mode: true };
        const detected = CONVERTERS.find(c => c.detect(data));
        expect(detected?.version).toBe('2.4');
    });

    test('Does not detect ' + chalk.yellow('2.0') + ' payload as ' + chalk.yellow('1.*') + ' version', () => {
        const data = loadCfg('data-2.0.json');
        expect(CONVERTERS.find(c => c.version === '1.*')!.detect(data)).toBe(false);
    });

    test('Does not detect ' + chalk.yellow('2.1') + ' payload as ' + chalk.yellow('2.0') + ' version', () => {
        const data = loadCfg('data-2.1.json');
        expect(CONVERTERS.find(c => c.version === '2.0')!.detect(data)).toBe(false);
    });

    test('Does not detect ' + chalk.yellow('2.4') + ' payload as ' + chalk.yellow('2.1') + ' version', () => {
        const data = loadCfg('data-2.4.json');
        expect(CONVERTERS.find(c => c.version === '2.1')!.detect(data)).toBe(false);
    });
});
