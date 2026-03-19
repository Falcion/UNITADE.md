import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

import { CONVERTERS } from '@source/compat/versions/converters';
import { DEFAULT_SETTINGS } from '@source/settings/defaults';
import { loadManifest } from '@tests/compat/utils/payload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
    DIR_EXAMPLE: path.join(__dirname, '../compat/examples'),
    DIR_PARSING: path.join(__dirname, '../compat/examples/parsed'),
    EXAMPLES: [
        'data-1.0.json',
        'data-2.0.json',
        'data-2.1.json',
        'data-2.4.json',
        'data-3.2.json'
    ],
    error: 0,
    success: 0,
};

if (!fs.existsSync(CONFIG.DIR_EXAMPLE)) {
    fs.mkdirSync(CONFIG.DIR_EXAMPLE, { recursive: false });

    console.error(chalk.red(
        '[-] Examples directory is non-existent. ' +
        'Please add example files before running this script.'));
}

if (!fs.existsSync(CONFIG.DIR_PARSING)) {
    fs.mkdirSync(CONFIG.DIR_PARSING, { recursive: false });

    console.warn(chalk.yellow('[!] Parsed examples directory is non-existent. Creating one.'));
}

console.info(chalk.cyan('[' + ' '.repeat(CONFIG.EXAMPLES.length) + '] Starting generation...'));

CONFIG.EXAMPLES.forEach(filename => {
    const progress = CONFIG.EXAMPLES.indexOf(filename) + 1;

    console.info('[' +
        chalk.blue('='.repeat(progress)) +
        chalk.gray(' '.repeat(CONFIG.EXAMPLES.length - progress)) +
        '] ' + chalk.dim(`Processing #${progress}: ${filename}`));


    try {
        const inputPath = path.join(CONFIG.DIR_EXAMPLE, filename);
        const outputFile = filename.replace('.json', '-parsed.json');
        const outputPath = path.join(CONFIG.DIR_PARSING, outputFile);

        const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

        const converter = CONVERTERS.find(c => c.detect(data));

        if (!converter) {
            console.error(chalk.red(`[-] No converter found for:`));
            console.error(chalk.red.dim(` *  ${inputPath}`));

            CONFIG.error++;

            return;
        } else
            console.info(chalk.blue(`[*] Detected version:`), chalk.yellow(converter.version));

        const converted = converter.convert(data);

        const merged = {
            ...DEFAULT_SETTINGS,
            ...converted,
        };

        fs.writeFileSync(outputPath, JSON.stringify(merged, undefined, '\t'));

        console.info(chalk.green('[+] Successfully generated parsed example for:'));
        console.info(chalk.green.dim(` *  ${outputPath}`));
        console.log();

        CONFIG.success++;
    } catch (error) {
        console.error(chalk.red(`[-] Failed to generate parsed example:`));
        console.error(chalk.red.dim(` *  ${error instanceof Error && error.stack
            ? error.stack
            : String(error)}`));
        console.log();

        CONFIG.error++;
    }
});

console.log(
    '\n' +
    chalk.bold('Summary: ') +
    chalk.gray('[') +
    chalk.green('+'.repeat(CONFIG.success)) +
    chalk.red('-'.repeat(CONFIG.error)) +
    chalk.gray('] ') +
    chalk.green(`${CONFIG.success} succeeded`) +
    chalk.gray(' / ') +
    (CONFIG.error > 0 ? chalk.red(`${CONFIG.error} failed`) : chalk.gray(`${CONFIG.error} failed`)) +
    '\n'
);

if (CONFIG.success > CONFIG.error) {
    const reportPath = path.join(CONFIG.DIR_EXAMPLE, 'REPORT.md');
    const reportData = `
    THIS IS AN AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
    FOR ANY CHANGES TO THIS FILE, PLEASE EDIT AND RE-RUN THE EXAMPLES GENERATION SCRIPT.

    # Compat examples generation report

    Date of successful generation: ${new Date().toISOString()}
    Last of concluded project version: ${loadManifest().version}

    ## Summary

    - Total processed: ${CONFIG.EXAMPLES.length}
    - Success: ${CONFIG.success}
    - Errors: ${CONFIG.error}

    ## Notes

    - If you see this report, it means that more examples were successfully generated than failed.
    - If you made any changes to the default settings or converters, please make sure to re-run this script to update the snapshots for migration tests.
    `.split("\n").map(s => s.trim()).join("\n");

    fs.writeFileSync(reportPath, reportData, { encoding: 'utf-8' });

    console.info(chalk.cyan(`[?] Report generated.`));
    console.info(chalk.cyan.dim(` *  ${reportPath}`))
    console.log();

    process.exit(0);
} else {
    process.exit(1);
}
