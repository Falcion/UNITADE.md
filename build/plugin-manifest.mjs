import fs from "fs";
import path from "path";
import { parseCliArgs } from "./helpers.mjs";
import chalk from 'chalk';

/**
 * @typedef {Object} PluginOptions
 * @property {string} [source] - Source manifest file path
 * @property {string} [targetDir] - Destination directory path
 * @property {"move" | "copy"} [mode] - Modes "copy" (default) or "move" the manifest file
 */

const PLUGIN_NAME = "esbuild-plugin-manifest-copy";

/**
 * ESBuild plugin to export a manifest file (move or copy).
 * Accepts options and also reads overrides from CLI args.
 * @param {PluginOptions} [opts]
 */
export const esbuildPluginManifestCopy = (opts = {}) => {
    const VALID_MODES = new Set(["move", "copy"]);
    return {
        name: PLUGIN_NAME,
        setup(build) {
            build.onEnd(() => {
                try {
                    // eslint-disable-next-line no-undef
                    const cli = parseCliArgs(process.argv) ?? {};
                    const source = opts.source ?? cli["manifest"];
                    const targetDir = opts.targetDir ?? cli["manifest-path"];
                    const mode = /** @type {"move"|"copy"} */ (opts.mode ?? "copy");

                    if (!source || !targetDir) return;
                    if (!VALID_MODES.has(mode)) {
                        // eslint-disable-next-line no-undef
                        console.error(chalk.red(`[${PLUGIN_NAME}] Unknown mode "${mode}". Use "move" or "copy" modes.`));
                        return;
                    }

                    const absSource = path.resolve(source);
                    const absTargetDir = path.resolve(targetDir);
                    const targetFile = path.join(absTargetDir, path.basename(source));

                    try {
                        fs.accessSync(absSource, fs.constants.R_OK);
                    } catch (err) {
                        // eslint-disable-next-line no-undef
                        console.error(chalk.red(`[${PLUGIN_NAME}] Source file does not exist: ${absSource}`));
                        return;
                    }

                    fs.mkdirSync(absTargetDir, { recursive: true });

                    if (mode === "copy") {
                        fs.copyFileSync(absSource, targetFile);
                        // eslint-disable-next-line no-undef
                        console.info(chalk.green(`[${PLUGIN_NAME}] Manifest copied to ${targetFile}`));
                        return;
                    }

                    // move: try atomic rename, fallback to copy+unlink
                    try {
                        fs.renameSync(absSource, targetFile);
                    } catch (err) {
                        fs.copyFileSync(absSource, targetFile);
                        fs.unlinkSync(absSource);
                        // eslint-disable-next-line no-undef
                        console.error(chalk.red(`[${PLUGIN_NAME}]`), err);
                    }

                    // eslint-disable-next-line no-undef
                    console.info(chalk.green(`[${PLUGIN_NAME}] Manifest moved to ${targetFile}`));
                } catch (err) {
                    // eslint-disable-next-line no-undef
                    console.error(chalk.red(`[${PLUGIN_NAME}]:`), err);
                }
            });
        },
    };
};

export default esbuildPluginManifestCopy;
