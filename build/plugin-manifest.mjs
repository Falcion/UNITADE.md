import fs from "fs";
import path from "path";
import { parseCliArgs } from "./helpers.mjs";
import chalk from 'chalk';
import { console } from "node:inspector";

const { promises: fsp } = fs;

/**
 * @typedef {Object} PluginOptions
 * @property {string} [source] - Source manifest file path
 * @property {string} [targetDir] - Destination directory path
 * @property {"move" | "copy"} [mode] - Modes "copy" (default) or "move" the manifest file
 */

/**
 * ESBuild plugin to export a manifest file (move or copy).
 * Accepts options and also reads overrides from CLI args.
 * @param {PluginOptions} [opts]
 */
export const esbuildPluginManifestCopy = (opts = {}) => {
    const VALID_MODES = new Set(["move", "copy"]);
    return {
        name: "esbuild-plugin-manifest-copy",
        setup(build) {
            build.onEnd(async () => {
                // eslint-disable-next-line no-undef
                const cli = parseCliArgs(process.argv) ?? {};
                const source = opts.source ?? cli["manifest"];
                const targetDir = opts.targetDir ?? cli["manifest-path"];
                const mode = /** @type {"move"|"copy"} */ (opts.mode ?? "copy");

                if (!source || !targetDir) return;
                if (!VALID_MODES.has(mode)) {
                    console.error(chalk.red(`[esbuild-plugin-manifest-copy] Unknown mode "${mode}". Use "move" or "copy" modes.`));
                }

                const absSource = path.resolve(source);
                const absTargetDir = path.resolve(targetDir);
                const targetFile = path.join(absTargetDir, path.basename(source));

                try {
                    await fsp.access(absSource, fs.constants.R_OK);
                } catch (err) {
                    console.error(chalk.red(`[esbuild-plugin-manifest-copy] Source file does not exist: ${absSource}`));
                }

                await fsp.mkdir(absTargetDir, { recursive: true });

                if (mode === "copy") {
                    await fsp.copyFile(absSource, targetFile);
                    return;
                }

                // move: try atomic rename, fallback to copy+unlink
                try {
                    await fsp.rename(absSource, targetFile);

                    console.info(chalk.green(`[esbuild-plugin-manifest-copy] Manifest ${mode}d to ${targetFile}`));
                } catch (err) {
                    await fsp.copyFile(absSource, targetFile);
                    await fsp.unlink(absSource);
                    // eslint-disable-next-line no-undef
                    console.error(chalk.red('[esbuild-plugin-manifest-copy]'), err);
                }
            });
        },
    };
};

export default esbuildPluginManifestCopy;
