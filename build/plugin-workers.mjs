import { parseCliArgs } from "./helpers.mjs";
import chalk from 'chalk';
import { console } from "node:inspector";

/**
 * @typedef {Object} MonacoWorkersOptions
 * @property {RegExp|string} [filter] - Match worker module filenames (RegExp or string pattern)
 */

/**
 * Worker loader plugin factory.
 * Accepts options and CLI override `--worker-filter`.
 * @param {MonacoWorkersOptions} [opts={}]
 */
export const esbuildPluginMonacoWorkers = (opts = {}) => {
    const DEFAULT_FILTER = /\.worker(\.[cm]?js)?$/;
    return {
        name: "esbuild-plugin-monaco-workers",
        setup(build) {
            // eslint-disable-next-line no-undef
            const cli = parseCliArgs(process.argv) ?? {};
            const rawFilter = opts.filter ?? cli["worker-filter"] ?? DEFAULT_FILTER;
            const filter = typeof rawFilter === "string" ? new RegExp(rawFilter) : rawFilter;

            build.onResolve({ filter }, (args) => ({ path: args.path, namespace: "worker" }));

            build.onLoad({ filter: /.*/, namespace: "worker" }, async (args) => ({
                contents: `export default function WorkerWrapper(options){ return new Worker(new URL(${JSON.stringify(
                    args.path
                )}, import.meta.url), options); }`,
                loader: "js",
            }));

            console.info(chalk.green(`[esbuild-plugin-monaco-workers] Worker filter reinstated: ${filter}`));
        },
    };
};

export default esbuildPluginMonacoWorkers;
