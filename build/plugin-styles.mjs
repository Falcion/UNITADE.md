import fs from "fs";
import path from "path";
import { fileURLToPath, URL } from "url";
import { parseCliArgs } from "./helpers.mjs";
import chalk from 'chalk';

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * @typedef {Object} CssMergerOptions
 * @property {string} [base] - Base directory where source CSS files live (defaults to parent of this file)
 * @property {string} [outDir] - Output directory for the merged CSS (defaults to <base>/out)
 * @property {string[]} [files] - Ordered list of CSS filenames to merge (defaults to ["main.css","custom.css"])
 * @property {string} [outFile] - Output filename for the merged CSS (defaults to "styles.css")
 */

const PLUGIN_NAME = "esbuild-plugin-css-merger";

/**
 * ESBuild plugin that merges several CSS files (in order) into a single stylesheet.
 * Accepts options and also reads overrides from CLI args.
 *
 * @param {CssMergerOptions} [opts={}]
 */
export const esbuildPluginCssMerger = (opts = {}) => {
    const DEFAULT_FILES = ["main.css", "custom.css"];
    return {
        name: PLUGIN_NAME,
        setup(build) {
            build.onEnd(() => {
                try {
                    // eslint-disable-next-line no-undef
                    const cli = parseCliArgs(process.argv) ?? {};

                    const base = path.resolve(
                        opts.base ?? cli["css-base"] ?? path.join(__dirname, "..")
                    );
                    const outDir = path.resolve(
                        opts.outDir ?? cli["css-out"] ?? path.join(base, "out")
                    );

                    const filesArg = cli["css-files"];
                    const files =
                        opts.files ??
                        (typeof filesArg === "string"
                            ? filesArg.split(",").map((s) => {
                                const trimmed = s.trim();
                                return trimmed.endsWith('.css') ? trimmed : `${trimmed}.css`;
                            }).filter(Boolean)
                            : DEFAULT_FILES);

                    const outFile = opts.outFile ?? cli["css-out-file"] ?? "styles.css";

                    // read all files synchronously; missing files become empty strings
                    const contents = files.map((fname) => {
                        try {
                            return fs.readFileSync(path.join(base, fname), "utf8");
                        } catch {
                            return "";
                        }
                    });

                    fs.mkdirSync(outDir, { recursive: true });

                    const merged = contents.filter(Boolean).join("\n");
                    fs.writeFileSync(path.join(outDir, outFile), merged, "utf8");

                    // eslint-disable-next-line no-undef
                    console.info(chalk.green(`[${PLUGIN_NAME}] CSS merge completed.`));
                } catch (err) {
                    // eslint-disable-next-line no-undef
                    console.error(chalk.red(`[${PLUGIN_NAME}]:`), err);
                }
            });
        },
    };
};

export default esbuildPluginCssMerger;
