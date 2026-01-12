import fs from "fs";
import path from "path";
import { fileURLToPath, URL } from "url";
import { parseCliArgs } from "./helpers.mjs";
import { console } from "node:inspector";
import chalk from 'chalk';

const { promises: fsp } = fs;
const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * @typedef {Object} CssMergerOptions
 * @property {string} [base] - Base directory where source CSS files live (defaults to parent of this file)
 * @property {string} [outDir] - Output directory for the merged CSS (defaults to <base>/out)
 * @property {string[]} [files] - Ordered list of CSS filenames to merge (defaults to ["main.css","custom.css"])
 * @property {string} [outFile] - Output filename for the merged CSS (defaults to "styles.css")
 */

/**
 * ESBuild plugin that merges several CSS files (in order) into a single stylesheet.
 * Accepts options and also reads overrides from CLI args.
 *
 * @param {CssMergerOptions} [opts={}]
 */
export const esbuildPluginCssMerger = (opts = {}) => {
    const DEFAULT_FILES = ["main.css", "custom.css"];
    return {
        name: "esbuild-plugin-css-merger",
        setup(build) {
            build.onEnd(async () => {
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
                            ? filesArg.split(",").map((s) => s.trim()).filter(Boolean)
                            : DEFAULT_FILES);

                    const outFile = opts.outFile ?? cli["css-out-file"] ?? "styles.css";

                    // read all files in parallel; missing files become empty strings
                    const reads = files.map((fname) =>
                        fsp.readFile(path.join(base, fname), "utf8").catch(() => "")
                    );

                    const contents = await Promise.all(reads);

                    await fsp.mkdir(outDir, { recursive: true });

                    const merged = contents.filter(Boolean).join("\n");
                    await fsp.writeFile(path.join(outDir, outFile), merged, "utf8");

                    console.info(chalk.green("[esbuild-plugin-css-merger] CSS merge completed."));
                } catch (err) {
                    // minimal runtime visibility
                    console.error(chalk.red("[esbuild-plugin-css-merger]:"), err);
                }
            });
        },
    };
};

export default esbuildPluginCssMerger;
