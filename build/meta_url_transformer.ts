/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-expect-error Compat
import type { MaybePromise } from "@oazmi/kitchensink"
import type esbuild from "esbuild"
import { getBuildExtensions, type OnTransformArgs, type OnTransformResult } from "esbuild-extra"

export interface MetaUrlTransformResult {
    /** specify the string to replace your `matched_substring` (inside of {@link MetaUrlTransformerPluginSetup.transform}) with. */
    replace: string

    /** specify a string that should be prepended to the beginning of your code.
     * this could be things like import statements.
    */
    prepend?: string

    /** specify a string that should be appended to the end of your code.
     * this could be things like export statements.
    */
    append?: string
}

export interface MetaUrlTransformerPluginSetup {
    /** the path-name filters which should be used for capturing scripts that need have their `new URL(...)` statements transformed.
     * do note that only the resources that have been loaded with one of esbuild's `["ts", "tsx", "js", "jsx"]` loaders will be processed.
     * 
     * TODO: apparently, the filter option in `esbuild-extra` does not filter in conjunction to the `loaders` option.
     *   it accepts any thing that either satisfies the `filter` OR the `loaders` (as opposed to `filter` AND the `loaders`)
     * 
     * @defaultValue `undefined` (captures all loaded js/jsx/ts/ts files) // TODO: it should ideally be `[RegExp(.*)]`
    */
    filters: (RegExp | undefined)[] | undefined

    /** add an additional filter which ensures that only desired `namespace`s are processed.
     * esbuild's default namespaces are `""` and `"file"`.
     * 
     * @defaultValue `() => true` (no filteration occurs, and resources from all `namespace`s pass though)
    */
    namespaceFilter: (namespace: string) => boolean

    /** this is the `new URL("...", import.meta.url)` pattern which will be captured.
     * each captured substring within your loaded code will then be passed to the {@link transform} function,
     * so that it can be parsed to generate a description of the changes to make in the code,
     * based on the {@link MetaUrlTransformResult} interface.
     * 
     * > [!important]
     * > your regex MUST have the global flag enabled, because we internally use the `String.replaceAll` method for the transformation.
     * 
     * here are some common url patterns which you might wish to use:
     * - `/new\s+URL\s*\(\s*(?<quote>["'])(?<importPath>.*?)\k<quote>,\s*import\.meta\.url\s*\)/g`
     *   > captures `new URL("importPath", import.meta.url)` with the named capture group `importPath` containing your import path name.
     * - `/new\s+Worker\s*\(new\s+URL\s*\(\s*(?<quote>["'])(?<importPath>.*?)\k<quote>,\s*import\.meta\.url\s*\)\s*\)/g`
     *   > captures `new Worker(new URL("importPath", import.meta.url))` with the named capture group `importPath` containing your import path name.
     * - `/import\.meta\.resolve\s*\(\s*(?<quote>["'])(?<importPath>.*?)\k<quote>\s*\)/g`
     *   > captures `import.meta.resolve("importPath")` with the named capture group `importPath` containing your import path name.
     * 
     * @defaultValue `/new\s+URL\s*\(\s*(?<quote>["'])(?<importPath>.*?)\k<quote>,\s*import\.meta\.url\s*\)/g` (captures `new URL("importPath", import.meta.url)`)
    */
    pattern: RegExp

    /** this function should transform matched {@link pattern}s to the {@link MetaUrlTransformResult} description interface,
     * which dictates what to {@link MetaUrlTransformResult.replace | replace} your {@link matched_substring} with,
     * and what to {@link MetaUrlTransformResult.prepend | prepend} at the beginning of your code,
     * and what to {@link MetaUrlTransformResult.append | append} at the end of your code.
     * 
     * the first and second input parameters of this function reflect the input parameters of `String.replaceAll`, which is why it is not nicely typed.
     * 
     * @param matched_substring the substring that was matched by your regex {@link pattern}.
     * @param regex_args the regex-match arguments, containing things like numbered capture-groups, named captured-groups, and etc...
     * @param index specifies the match number within a given file. (i.e. `index = 0` for the first match, `index = 1` for the second, and so on)
     * 
     * @defaultValue {@link defaultTransform}
    */
    transform: (matched_substring: string, regex_args: any[], index: number) => MetaUrlTransformResult

    /** specify the name of the worker bundling plugin. its value really doesn't matter in most cases.
     * 
     * @defaultValue `"oazmi-worker-bundler"`
    */
    pluginName: string
}

const defaultTransform: MetaUrlTransformerPluginSetup["transform"] = (matched_substring: string, regex_args: any[], index: number): MetaUrlTransformResult => {
    const
        //@ts-expect-error Import plugin
        [named_groups, _full_string, _offset, ..._unused_groups] = regex_args.toReversed(),
        path_name = named_groups.importPath as string,
        var_name = `__IMPORT_META_URL_${index}`
    return {
        prepend: `import ${var_name} from "${path_name}"`,
        replace: var_name,
    }
}

const defaultMetaUrlTransformerPluginSetup: MetaUrlTransformerPluginSetup = {
    filters: [undefined],
    namespaceFilter: (() => true),
    pattern: /new\s+URL\s*\(\s*(?<quote>["'])(?<importPath>.*?)\k<quote>,\s*import\.meta\.url\s*\)/g,
    pluginName: "oazmi-meta-url-resolver",
    transform: defaultTransform,
}

const metaUrlTransformerPluginSetup = (config?: Partial<MetaUrlTransformerPluginSetup>) => {
    const { filters = [undefined], namespaceFilter, pattern, pluginName, transform } = { ...defaultMetaUrlTransformerPluginSetup, ...config }

    const onTransformFn = (args: OnTransformArgs): MaybePromise<OnTransformResult | undefined> => {
        const { loader, code, namespace } = args
        if (!namespaceFilter(namespace)) { return }
        if (!code.match(pattern)) { return }

        let index = 0
        const
            append_statements: string[] = [],
            prepend_statements: string[] = []
        const modified_code = code.replaceAll(pattern, (matched_substring, ...regex_args): string => {
            const { replace, append, prepend } = transform(matched_substring, regex_args, index++)
            if (append) { append_statements.push(append) }
            if (prepend) { prepend_statements.push(prepend) }
            return replace
        })
        if (append_statements.length > 0) { append_statements.push("") }
        if (prepend_statements.length > 0) { prepend_statements.push("") }
        return {
            loader: loader,
            code: prepend_statements.join("\n") + modified_code + append_statements.join("\n"),
        }
    }

    return async (build: esbuild.PluginBuild) => {
        const
            superBuild = getBuildExtensions(build, pluginName),
            acceptedLoaders = ["ts", "tsx", "js", "jsx"] as esbuild.Loader[]
        filters.forEach((filter) => {
            superBuild.onTransform({ filter: filter, loaders: acceptedLoaders }, onTransformFn)
        })
    }
}

export const metaUrlTransformerPlugin = (config?: Partial<MetaUrlTransformerPluginSetup>) => {
    return {
        name: config?.pluginName ?? defaultMetaUrlTransformerPluginSetup.pluginName,
        setup: metaUrlTransformerPluginSetup(config),
    }
}

