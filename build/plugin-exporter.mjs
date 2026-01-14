/* eslint-disable no-undef */
import fs from "fs";
import path from "path";
import { fileURLToPath, URL } from "url";
import dotenv from "dotenv";
import { parseCliArgs } from "./helpers.mjs";
import chalk from 'chalk';

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * @typedef {Object} PluginExporterOptions
 * @property {string} [buildPath] - Path to the build directory to export files from. Defaults to "<pluginDir>/../out" if not provided and no CLI override.
 * @property {string} [outPath] - Absolute destination directory to copy files into. Can be provided via options, CLI (--out) or environment variables OUT_PATH / OUT.
 * @property {string[]} [files] - List of filenames to export. If omitted, uses the DEFAULT_FILES ("manifest.json", "main.js", "styles.css") or the CLI --files argument */

const PLUGIN_NAME = "esbuild-plugin-exporter";
/**
 *
 * ESBuild plugin that copies a set of files from a build output directory into a specified absolute output directory after a build completes.
 * @param {PluginExporterOptions} [opts] - Plugin options.
 * @returns {import('esbuild').Plugin} An ESBuild plugin instance.
 */
export const esbuildPluginProjectExporter = (opts = {}) => {
    const DEFAULT_FILES = ["manifest.json", "main.js", "styles.css"];

    return {
        name: PLUGIN_NAME,
        setup(build) {
            build.onEnd(() => {
                try {
                    // eslint-disable-next-line no-undef
                    const cli = parseCliArgs(process.argv) ?? {};

                    try {
                        dotenv.config({
                            path: path.join(__dirname, ".env-build"),
                        });
                    } catch (e) {
                        // eslint-disable-next-line no-undef
                        console.warn(`${PLUGIN_NAME} No dotenv file found or invalid.`);
                    }

                    const inferredBuild = path.join(__dirname, "..", "out");
                    const absBuild = path.resolve(opts.buildPath ?? cli["build"] ?? inferredBuild);

                    let outPath = opts.outPath ?? cli["out"] ?? process.env.OUT_PATH ?? process.env.OUT;
                    if (!outPath) {
                        console.warn(chalk.yellow(`[${PLUGIN_NAME}] No output path was specified. Export process is skipped.`));
                        return;
                    }

                    if (!path.isAbsolute(outPath)) {
                        throw new Error(`Output path must be absolute: ${outPath}`);
                    }

                    const filesArg = cli["files"];
                    const files = opts.files ?? (typeof filesArg === "string" ? filesArg.split(",").map(s => s.trim()).filter(Boolean) : DEFAULT_FILES);

                    // Ensure destination exists (sync to avoid races with other plugins)
                    fs.mkdirSync(outPath, { recursive: true });

                    for (const fname of files) {
                        const src = path.join(absBuild, fname);
                        const dest = path.join(outPath, fname);

                        try {
                            fs.accessSync(src, fs.constants.R_OK);
                        } catch (err) {
                            // missing source file — skip but log
                            console.error(chalk.red(`[${PLUGIN_NAME}] Source missing, skipping: ${src}`));
                            continue;
                        }

                        try {
                            fs.copyFileSync(src, dest);
                        } catch (err) {
                            console.error(chalk.red(`[${PLUGIN_NAME}] Failed to copy ${src} -> ${dest}: ${err.message}`));
                        }
                    }
                } catch (err) {
                    console.error(chalk.red(`[${PLUGIN_NAME}]:`), err);
                }

                console.info(chalk.green(`[${PLUGIN_NAME}] Export completed.`))
            });
        },
    };
};

export default esbuildPluginProjectExporter;
