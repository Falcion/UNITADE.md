import { loadCfg, loadCfgParsed, loadManifest } from '@tests-compat/utils/payload';
import { CONVERTERS } from '@source/compat/versions/converters';
import { expect, describe, test } from '@jest/globals';
import { DEFAULT_SETTINGS } from '@source/settings/defaults';
import { EXAMPLES } from '@tests-compat/utils/enum/examples';
import chalk from "chalk";

/**
 *! If any changes to default settings or a converter were made, re-run
 *! script compat-gen to update the expected results for the migration tests.
 * 
 * @description
 * Check how converters detect the version of the payload, and whether the migration process
 * would correctly understand what version of settings it is migrating.
 */
describe('Compatibility converters testing:', () => {
    test('Detects expected converters for EVERY payload', () => {
        for (const example of EXAMPLES) {
            const data = loadCfg(example.file);

            const detected = CONVERTERS.find(converter => converter.detect(data));

            expect(detected).toBeDefined();
            expect(detected?.version).toBe(example.version);
        }
    });

    for (const example of EXAMPLES) {
        test('Converter for version ' + chalk.yellow(example.version) + ' correctly detects payload', () => {
            const data = loadCfg(example.file);

            const detected = CONVERTERS.find(converter => converter.detect(data));

            expect(detected).toBeDefined();
            expect(detected?.version).toBe(example.version);
        });
    }
});

/**
 *! If any changes to default settings or a converter were made, re-run
 *! script compat-gen to update the expected results for the migration tests.
 *
 * @description
 * Migration pipeline script test, checks by equality to pre-generated
 * snapshots of migrated settings from examples directory.
 */
describe('Migration process testing:', () => {
    for (const example of EXAMPLES) {
        test('Migration process for version ' + chalk.yellow(example.version) + ' correctly migrates payload to latest version', () => {
            const data = loadCfg(example.file);
            const dataParsed = loadCfgParsed(example.file);

            const manifest = loadManifest();

            expect(manifest).toBeDefined();

            const converter = CONVERTERS.find(converter => converter.detect(data));

            expect(converter).toBeDefined();
            expect(converter?.version).toBe(example?.version);

            const migrated = converter?.convert(data);
            const combined = {
                ...DEFAULT_SETTINGS,
                ...migrated,
            };

            expect(migrated).toBeDefined();
            expect(combined).toBeDefined();
            expect(combined).toEqual(dataParsed);
        });
    }
});

/**
 *! If any changes to default settings or a converter were made, re-run
 *! script compat-gen to update the expected results for the migration tests.
 */
describe('Convertion of outputfields testing:', () => {
    for (const example of EXAMPLES) {
        describe(`Convertion for version ${example.version} payloads:`, () => {
            const data: any = loadCfg(example.file);
            const dataParsed: any = CONVERTERS.find(c => c.detect(data))?.convert(data);

            expect(data).toBeDefined();
            expect(dataParsed).toBeDefined();

            switch (example.version) {
                case '1.*':
                    test('Replaces comma delimiter in default extensions', () => {
                        expect(dataParsed.default.extensions).toBe('txt>js>data');
                    });

                    test('Maps ' + chalk.gray.dim('["is_dynamic_on"]') + ' option to ' + chalk.gray.dim('["is_onload"]') + ' field', () => {
                        expect(dataParsed.is_onload).toBe(true);
                    });

                    test('Outputs empty ' + chalk.gray.dim('["forced_extensions"]') + ' option when converter reads wrong field name from payload', () => {
                        /** intentional snapshot */
                        expect(dataParsed.forced_extensions).toBe('');
                    });

                    test('Falls back to default mobile extensions when no ' + chalk.gray.dim('["mobile_settings"]') + ' in payload', () => {
                        expect(dataParsed.mobile.extensions).toBe('txt');
                    });
                    break;
                case '2.0':
                    test('Replaces semicolon delimiter in default extensions', () => {
                        expect(dataParsed.default.extensions).toBe('txt> cfg> data>');
                    });

                    test('Replaces semicolon delimiter in grouped patterns', () => {
                        expect(dataParsed.grouped.patterns).toBe('md: json,meta>');
                    });

                    test('Preserves mobile extensions value', () => {
                        expect(dataParsed.mobile.extensions).toBe('txt');
                    });
                    break;
                case '2.1':
                    test('Replaces semicolon delimiter in default extensions', () => {
                        expect(dataParsed.default.extensions).toBe('txt> cfg> data> ini');
                    });

                    test('Replaces semicolon delimiter in ignore extensions', () => {
                        expect(dataParsed.ignore.extensions).toBe('logs>data>');
                    });

                    test('Leaves ignore masks unchanged when no semicolons present', () => {
                        expect(dataParsed.ignore.masks).toBe('file_\\d{3}');
                    });
                    test('Replaces semicolon delimiter in grouped patterns', () => {
                        expect(dataParsed.grouped.patterns).toBe('codeview: js,py>md:txt>');
                    });
                    break;
                case '2.4':
                    test('Maps barefiling boolean to output', () => {
                        expect(dataParsed.barefiling).toBe(true);
                    });

                    test('Replaces semicolon delimiter in default extensions', () => {
                        expect(dataParsed.default.extensions).toBe('txt> cfg> data> ini>markdown>mdown>');
                    });

                    test('Replaces comma delimiter in grouped patterns (2.4 uses comma, not semicolon)', () => {
                        expect(dataParsed.grouped.patterns).toBe('codeview: js>py;md:txt;');
                    });

                    test('Replaces semicolon delimiter in mobile extensions', () => {
                        expect(dataParsed.mobile.extensions).toBe('txt> cfg>');
                    });
                    break;
                case '3.2.*':
                    test('Mapping code editor settings "enable" to new naming', () => {
                        expect(dataParsed.code_editor.enable).toBe(true);
                    });

                    test('Mapping compatibility module to new option "compat" as externals', () => {
                        expect(dataParsed.externals.compat).toBe(true);
                    });

                    test('Mapping safe mode to new option "safe" ' + chalk.gray.dim('["externals.safe"]') + ' as externals', () => {
                        expect(dataParsed.externals.safe).toBe(true);
                    });

                    test('Mapping debug mode to new option "debug" as developer', () => {
                        expect(dataParsed.developer.debug).toBe(false);
                    });

                    test('Mapping status bar enabled to new option "enable" ' + chalk.gray.dim('["status_bar.enable"]') + ' within status bar category', () => {
                        expect(dataParsed.status_bar.enable).toBe(true);
                    });

                    test('Mapping "ignore" option to it\'s own category and new field', () => {
                        expect(dataParsed.ignore.enable).toBe(false);
                    });

                    test('Mapping "grouped" option to it\'s own category and new field', () => {
                        expect(dataParsed.grouped.enable).toBe(true);
                    });

                    test('Mapping code editor settings "extensions" ' + chalk.gray.dim('["code_editor.extensions"]') + ' to new naming', () => {
                        expect(dataParsed.code_editor.extensions).toBe('py>rb>rs');
                    });
                    break;
            }
        });
    }
});
