/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-expect-error Compat
import { parseFilepathInfo, pathToPosixPath, trimDotSlashes } from "@oazmi/kitchensink/pathman"
import type esbuild from "esbuild"
import { getBuildExtensions } from "esbuild-extra"


export interface WorkerBundlerPluginSetupConfig {
    /** the path-name filters which should be used for capturing worker scripts.
     * 
     * @defaultValue `[/\.worker(\.[cm]?[jt][sx])?$/, /\?worker$/]` (captures ".worker" js/ts files, and paths ending with the "?worker" suffix)
    */
    filters: RegExp[]

    /** in addition to the path-name filters, you can inspect the `"with"` import attributes of the incoming resource,
     * to decide if it should be processed by this plugin.
     * 
     * @defaultValue `() => true` (no filteration occurs, and all resources pass though)
    */
    withFilter: (with_attributes: Record<string, string>) => boolean

    /** add an additional filter which ensures that only desired `namespace`s are processed.
     * esbuild's default namespaces are `""` and `"file"`.
     * 
     * @defaultValue `() => true` (no filteration occurs, and resources from all `namespace`s pass though)
    */
    namespaceFilter: (namespace: string) => boolean

    /** rename the path string of the incoming resource.
     * this could be useful for stripping away suffixes, such as the conventional `"?worker"` suffix used by some popular bundlers.
     * 
     * @defaultValue `(path) => path.replace(/\?worker$/, "")` (strips away any "?worker" suffix)
    */
    rename: (path: string) => string

    /** use existing plugins in the child build-process.
     * the plugins are acquired via `build.initialOptions`.
     * 
     * this could be useful if your worker scripts perform imports which esbuild cannot natively resolve,
     * such as `http://`, `jsr:`, and `npm:` imports (these are typically understood by newer runtimes like deno and bun).
     * 
     * however, do note that the `workerBundlerPlugin` itself will be stripped out of the list of plugins,
     * since that will lead to an endless recursion of build processes.
     * 
     * @defaultValue `false`
    */
    usePlugins: boolean

    /** specify the name of the worker bundling plugin. its value really doesn't matter in most cases.
     * 
     * @defaultValue `"oazmi-worker-bundler"`
    */
    pluginName: string

    /** **internal use only:** this is a self-reference to the generated `workerBundlerPlugin` object,
     * so that it can be filtered out of the list of plugins, when {@link usePlugins} is enabled.
     * 
     * this value is required, but I've left it as optional since it cannot be statically defined in `defaultWorkerBundlerPluginSetupConfig`.
    */
    selfPlugin?: esbuild.Plugin
}

const defaultWorkerBundlerPluginSetupConfig: WorkerBundlerPluginSetupConfig = {
    filters: [/\.worker(\.[cm]?[jt][sx])?$/, /\?worker$/],
    withFilter: (() => true),
    namespaceFilter: (() => true),
    rename: ((path) => path.replace(/\?worker$/, "")),
    usePlugins: false,
    pluginName: "oazmi-worker-bundler",
}

/** turn optional properties `P` of interface `T` into required */
type Require<T, P extends keyof T> = Omit<T, P> & Required<Pick<T, P>>

/** given a long `path`, and given a set of `stems` (suffixes), check if any one of the stems suffixes match with the long `path`. */
const pathStemMatches = (path: string, stems: Array<string>): boolean => {
    path = pathToPosixPath(path)
    const path_length = path.length
    for (const stem of stems) {
        const trimmed_stem = trimDotSlashes(pathToPosixPath(stem))
            .replace(/^(\.\.\/)+/, "")
            .replace(/^(\/)+/, "")
        if (path_length === trimmed_stem.length && path === trimmed_stem) { return true }
        if (path.endsWith("/" + trimmed_stem)) { return true }
    }
    return false
}

const workerBundlerPluginSetup = (config: Require<Partial<WorkerBundlerPluginSetupConfig>, "selfPlugin">) => {
    const
        { filters, withFilter, namespaceFilter, rename, usePlugins, selfPlugin } = { ...defaultWorkerBundlerPluginSetupConfig, ...config },
        ALREADY_CAPTURED_BY_WORKER_RESOLVER = Symbol("[workerBundlerPluginSetup]: already captured by worker-filter resolver."),
        REQUIRES_ADDITIONAL_ASSETS_RESOLVER = Symbol("[workerBundlerPluginSetup]: this virtual asset needs a special resolver."),
        PLUGIN_DATA_ASSET_FILE_FIELD = Symbol("[workerBundlerPluginSetup]: a field for embedding a virtual asset file in the plugin data."),
        plugin_ns = "oazmi-worker",
        assets_plugin_ns = "oazmi-worker-assets",
        // a global dictionary of additional virtual assets that need to be bundled. `keys = unique-id`, `value = the virtual file`
        assets_dict = new Map<string, esbuild.OutputFile>()

    let asset_id_counter = 0

    return async (build: esbuild.PluginBuild): Promise<void> => {
        const superBuild = getBuildExtensions(build, selfPlugin.name)

        const {
            plugins: initial_plugins = [],
            assetNames: initial_assetNames = "[name]-[hash]", // the default value will intentionally throw an error. see the notice below.
            outdir: initial_outdir,
            outfile: initial_outfile = "./dist/output.js", // this is just a fallback value in case both `outdir` and `outfile` were not defined.
            entryPoints: _0,
            ...rest_initial_options
        } = build.initialOptions

        const plugins = usePlugins
            ? initial_plugins.filter((initial_plugin) => (initial_plugin !== selfPlugin))
            : []

        // compute the `outdir` for the results of the sub-build, depending on whether the user had originally used "outdir" or "outfile".
        const outdir = initial_outdir ?? (parseFilepathInfo(initial_outfile).dirpath)

        // NOTICE: the default value that we set for `initial_assetNames` is intentionally made so that it raises an error.
        //   this is because multi-asset bundle files will have their references break if there isn't a consistency between the internal build's and the user's top-level build config.
        //   moreover, the user cannot declare a `[hash]` on their asset's name at the top-level build, because that will lead to double hashing of the emitted resources,
        //   to see what I'm referring to, comment out the `throw Error` statement, and you'll see that additional assets will be labeled as `[name]-[hash]-[hash]`,
        //   however, the worker that bundled them will still refer to them as `[name]-[hash]` (i.e. broken reference).
        if (initial_assetNames.includes("[hash]")) { throw new Error(`[workerBundlerPluginSetup] your "assetNames" build option cannot contain the "[hash]" label in it, because then the external build process will break the internal build result's original asset referencing. for starters, we recommend that you use "[ext]/[name]" instead.`) }

        filters.forEach((filter) => {
            build.onResolve({ filter }, async (args): Promise<esbuild.OnResolveResult | undefined> => {
                const
                    { path, pluginData = {}, ...rest_args } = args,
                    { with: with_arg, namespace } = rest_args
                // see the note that follow, which explains why we terminate early if this symbol is discovered.
                if (pluginData[ALREADY_CAPTURED_BY_WORKER_RESOLVER] || pluginData[REQUIRES_ADDITIONAL_ASSETS_RESOLVER]) { return undefined }
                if (!(withFilter(with_arg) && namespaceFilter(namespace))) { return undefined }
                const renamed_path = rename(path)

                // now, we let esbuild and its other plugins take care of the full path resolution.
                // but since we don't want this resolver to re-process this resource (causing an infinite recursion),
                // we have inserted a the `ALREADY_CAPTURED` symbol into the plugin data to terminate processing it again.
                const { path: resolved_path, pluginData: resolved_plugin_data } = (await build.resolve(renamed_path, {
                    ...rest_args,
                    pluginData: { ...pluginData, [ALREADY_CAPTURED_BY_WORKER_RESOLVER]: true },
                }))
                // if the `resolved_path` is `undefined` or an empty string (thereby falsy),
                // then we'll give up trying to process this file.
                if (!resolved_path) { return undefined }

                return {
                    path: resolved_path,
                    namespace: plugin_ns,
                    pluginData: resolved_plugin_data
                        ? resolved_plugin_data
                        : { ...pluginData, [ALREADY_CAPTURED_BY_WORKER_RESOLVER]: false }
                }
            })
        })

        superBuild.onLoad({ filter: /.*/, namespace: plugin_ns }, async (args): Promise<esbuild.OnLoadResult> => {
            const { path, pluginData } = args
            // here, we bundle the captured worker separately, as a single file,
            // then, with the "file" loader, we inform esbuild to swap out the import-statement in the dependent(s) of this worker,
            // with a variable pertaining to the relative path to the bundled worker file.
            const result = await build.esbuild.build({
                ...rest_initial_options,
                plugins: plugins,
                entryPoints: [path],
                outdir: outdir,
                // overwriting the asset-names and entry-names, so that they reflect exactly what the user's top-level build-config has, in addition to the hash.
                // if this step is not performed, the links/references generated from this sub-build will not be correct when the user's top-level build moves around the resulting files.
                // thus, we must imitate the same exact same structure as the user's top-level config (excluding the hash).
                assetNames: initial_assetNames + "-[hash]",
                entryNames: initial_assetNames + "-[hash]",
                format: "esm",
                bundle: true,
                splitting: false,
                minify: true,
                write: false,
                metafile: true,
            })

            // normally, after the bundling, you would only receive a single javascript file (that of the worker),
            // and in such cases, just returning the contents of it with the "file" loader is enough (which is what we carry out below).
            if (result.outputFiles.length === 0) { throw new Error("[workerBundlerPluginSetup] no file was produced by the worker-bundler. very weird, indeed.") }
            if (result.outputFiles.length === 1) {
                const contents = result.outputFiles.at(0)!.contents
                return { contents, loader: "file", pluginData }
            }

            // however, when the `sourcemap` option is enabled, or if there is a plugin that also emits additional files,
            // then we'd need to include them in our bundle as well.
            // to do that, first we will need to identify the actual original entry-point file that got transformed.
            // after that, we'll:
            // - collect the list of all additional files which were generated.
            // - assign each a globally-unique-id that is recognizable by a custom virtual assets resolver of ours.
            // - create a new virtual javascript file that imports all of the virtual file resources,
            //   and exports the main worker file (which too will be virtual) as the default export.

            const allEntryPoints = [...(new Set(
                Object.entries(result.metafile.outputs)
                    .filter(([relative_output_path, meta]) => meta.entryPoint ? true : false)
                    .map(([relative_output_path, meta]) => relative_output_path)
            ))]
            if (allEntryPoints.length !== 1) { console.warn("[workerBundlerPluginSetup] WARNING! there should have been exactly one single entry-point.\n\tnow we might incorrectly guess the js-worker file out of these options:", allEntryPoints) }

            const
                entry_points_asset_ids: string[] = [],
                import_asset_ids: string[] = []
            for (const virtual_file of result.outputFiles) {
                const
                    asset_id = `${asset_id_counter++}`,
                    is_entry_point = pathStemMatches(virtual_file.path, allEntryPoints)
                if (is_entry_point) { entry_points_asset_ids.push(asset_id) }
                import_asset_ids.push(asset_id)
                assets_dict.set(asset_id, virtual_file)
            }
            if (entry_points_asset_ids.length !== 1) { console.warn("[workerBundlerPluginSetup] WARNING! expected to identify exactly one entry-point virtual asset file, but instead found these entry-point assets:", entry_points_asset_ids) }

            const assets_importer_js_lines = []
            import_asset_ids.forEach((asset_id) => {
                // notice that we import the same asset twice: the first being a static import, while the second is a dynamic import.
                // this is because static imports are susceptible to esbuild's tree-shaking, while dynamic imports are not.
                // and we do NOT want to tree-shake off the assets (such as sourcemap) which are not actually imported/utilized by the user's original entry-points.
                // in order to preserve all assets (even the unused ones), we must perform a dynamic import on them.
                // so you may now wonder why do we perform a static import then? that's because it does not require a top-level await keyword, thus it would work on older browsers.
                // moreover, it will make it clear to you which files would have been tree-shaken had the dynamic import not existed.
                // but do note that dynamic imports generate very ugly "__commonJS" and "__toESM" function statements as a means for esbuild to polyfill at the top-level, polluting the user's entry-points.
                assets_importer_js_lines.push(`import asset_${asset_id} from "${asset_id}"`)
                assets_importer_js_lines.push(`import("${asset_id}")`)
            })
            assets_importer_js_lines.push(`export { ${entry_points_asset_ids.map((asset_id) => ("asset_" + asset_id)).join(", ")} }`)
            const default_export_asset_id = entry_points_asset_ids.at(0)
            if (default_export_asset_id !== undefined) { assets_importer_js_lines.push(`export default asset_${default_export_asset_id}`) }

            const contents = assets_importer_js_lines.join("\n")
            return { contents, loader: "js", pluginData: { ...pluginData, [REQUIRES_ADDITIONAL_ASSETS_RESOLVER]: true } }
        })

        superBuild.onResolve({ filter: /.*/, namespace: plugin_ns }, async (args): Promise<esbuild.OnResolveResult | undefined> => {
            const { path: asset_id, pluginData = {} } = args
            if (!pluginData[REQUIRES_ADDITIONAL_ASSETS_RESOLVER]) { return undefined }
            const
                asset_file = assets_dict.get(asset_id)!,
                original_output_path = asset_file.path
            // TODO: there is an issue with double hashing of the output-path.
            //   how do I reliably remove the hashing text without enforcing a certain asset naming convention on the user's build initial config?
            return {
                path: original_output_path,
                namespace: assets_plugin_ns,
                pluginData: { ...pluginData, [PLUGIN_DATA_ASSET_FILE_FIELD]: asset_file },
            }
        })

        superBuild.onLoad({ filter: /.*/, namespace: assets_plugin_ns }, async (args): Promise<esbuild.OnLoadResult> => {
            const
                { path, pluginData = {} } = args,
                asset_file = pluginData[PLUGIN_DATA_ASSET_FILE_FIELD] as (esbuild.OutputFile | undefined)
            if (!asset_file) { throw new Error(`[workerBundlerPluginSetup] expected to find a virtual file in the plugin data, but found none for the virtual asset with the path: "${path}"`) }
            // there is no need to propagate the plugin data anymore, since this is a terminal point.
            // TODO: consider only using the "file" loader for tree-shakable contents (such as the actual worker file),
            //   and using the "copy" loader for all other assets that need to be copied irrespectively,
            //   but their references to are not actually utilized (such as sourcemaps).
            //   doing so would significantly reduce the polluting "__commonJS" and "__toESM" statemetns that end up in the user's original entry-point.
            return { contents: asset_file.contents, loader: "file" }
        })
    }
}

export const workerBundlerPlugin = (config?: Partial<WorkerBundlerPluginSetupConfig>): esbuild.Plugin => {
    const self_plugin: esbuild.Plugin = {
        name: config?.pluginName ?? defaultWorkerBundlerPluginSetupConfig.pluginName,
        setup: () => { },
    }
    const setup = workerBundlerPluginSetup({ ...config, selfPlugin: self_plugin })
    self_plugin.setup = setup
    return self_plugin
}

