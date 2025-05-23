/* eslint-disable @typescript-eslint/no-unused-vars */
import esbuild from "esbuild";
import { sassPlugin } from 'esbuild-sass-plugin'
import process from "process";
import builtins from "builtin-modules";
import glsl from "esbuild-plugin-glsl";
import fs from 'fs';
import path from 'node:path';

const banner =
    `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

let assigner = {
    name: 'assigner',
    setup(build) {
        build.onEnd(() => {
            const main = fs.readFileSync('main.css', 'utf8');
            const custom = fs.readFileSync('custom.css', 'utf8');

            const combined = main + '\n' + custom;

            fs.writeFileSync('out/styles.css', combined, 'utf8');
        });
    }
}

let manifest = {
    name: 'manifest',
    setup(build) {
        build.onEnd(() => {
            fs.writeFileSync('out/manifest.json', fs.readFileSync('manifest.json'), 'utf8');
        });
    }
}

// const workerPlugin = {
//     name: 'monaco-workers',
//     setup(build) {
//         build.onResolve({ filter: /\.worker\.js$/ }, async (args) => {
//             return {
//                 path: path.resolve(args.resolveDir, args.path),
//                 namespace: 'monaco-worker',
//             };
//         });

//         build.onLoad({ filter: /.*/, namespace: 'monaco-worker' }, async (args) => {
//             // Bundle worker code into a self-contained script
//             const result = await esbuild.build({
//                 entryPoints: [args.path],
//                 bundle: true,
//                 format: 'iife',
//                 write: false,
//                 target: 'es6',
//             });

//             const code = result.outputFiles[0].text;
//             return {
//                 contents: `export default ${JSON.stringify(code)};`,
//                 loader: 'js',
//             };
//         });
//     }
// };

let autotest = {
    name: 'autotest',
    setup(build) {
        build.onEnd(() => {
            const PUT_YOUR_PATH_HERE_IF_ENABLED = '';
            const ENABLED = false;

            if (ENABLED) {
                fs.copyFileSync('out/manifest.json', PUT_YOUR_PATH_HERE_IF_ENABLED);
                fs.copyFileSync('out/main.js', PUT_YOUR_PATH_HERE_IF_ENABLED);
                fs.copyFileSync('out/styles.css', PUT_YOUR_PATH_HERE_IF_ENABLED);
            }
        });
    }
}

const prod = (process.argv[2] === "production");

const context = await esbuild.context({
    banner: {
        js: banner,
    },
    entryPoints: [
        // main app entry point
        'source/main.ts'
    ],
    plugins: [
        sassPlugin(),
        glsl({
            minify: true,
        }),
        // workerPlugin,
        {
            name: 'worker-plugin',
            setup(build) {
                build.onResolve({ filter: /\.worker$/ }, args => {
                    return { path: args.path, namespace: 'worker' };
                });

                build.onLoad({ filter: /.*/, namespace: 'worker' }, async (args) => {
                    return {
                        contents: `export default function WorkerWrapper() { return new Worker(new URL("${args.path}", import.meta.url)) }`,
                        loader: 'js',
                    };
                });
            },
        },
        assigner,
        manifest,
        autotest
    ],
    bundle: true,
    external: [
        "obsidian",
        "electron",
        "@codemirror/autocomplete",
        "@codemirror/collab",
        "@codemirror/commands",
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/search",
        "@codemirror/state",
        "@codemirror/view",
        "@lezer/common",
        "@lezer/highlight",
        "@lezer/lr",
        ...builtins],
    format: "cjs",
    target: "es6",
    logLevel: "info",
    sourcemap: prod ? false : "inline",
    treeShaking: true,
    outfile: "out/main.js",
    loader: {
        '.ttf': 'base64',
    }
});

if (prod) {
    await context.rebuild();
    process.exit(0);
} else {
    await context.watch();
}
