"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerBundlerPlugin = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-expect-error Compat
var pathman_1 = require("@oazmi/kitchensink/pathman");
var esbuild_extra_1 = require("esbuild-extra");
var defaultWorkerBundlerPluginSetupConfig = {
    filters: [/\.worker(\.[cm]?[jt][sx])?$/, /\?worker$/],
    withFilter: (function () { return true; }),
    namespaceFilter: (function () { return true; }),
    rename: (function (path) { return path.replace(/\?worker$/, ""); }),
    usePlugins: false,
    pluginName: "oazmi-worker-bundler",
};
/** given a long `path`, and given a set of `stems` (suffixes), check if any one of the stems suffixes match with the long `path`. */
var pathStemMatches = function (path, stems) {
    var e_1, _a;
    path = (0, pathman_1.pathToPosixPath)(path);
    var path_length = path.length;
    try {
        for (var stems_1 = __values(stems), stems_1_1 = stems_1.next(); !stems_1_1.done; stems_1_1 = stems_1.next()) {
            var stem = stems_1_1.value;
            var trimmed_stem = (0, pathman_1.trimDotSlashes)((0, pathman_1.pathToPosixPath)(stem))
                .replace(/^(\.\.\/)+/, "")
                .replace(/^(\/)+/, "");
            if (path_length === trimmed_stem.length && path === trimmed_stem) {
                return true;
            }
            if (path.endsWith("/" + trimmed_stem)) {
                return true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (stems_1_1 && !stems_1_1.done && (_a = stems_1.return)) _a.call(stems_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return false;
};
var workerBundlerPluginSetup = function (config) {
    var _a = __assign(__assign({}, defaultWorkerBundlerPluginSetupConfig), config), filters = _a.filters, withFilter = _a.withFilter, namespaceFilter = _a.namespaceFilter, rename = _a.rename, usePlugins = _a.usePlugins, selfPlugin = _a.selfPlugin, ALREADY_CAPTURED_BY_WORKER_RESOLVER = Symbol("[workerBundlerPluginSetup]: already captured by worker-filter resolver."), REQUIRES_ADDITIONAL_ASSETS_RESOLVER = Symbol("[workerBundlerPluginSetup]: this virtual asset needs a special resolver."), PLUGIN_DATA_ASSET_FILE_FIELD = Symbol("[workerBundlerPluginSetup]: a field for embedding a virtual asset file in the plugin data."), plugin_ns = "oazmi-worker", assets_plugin_ns = "oazmi-worker-assets", 
    // a global dictionary of additional virtual assets that need to be bundled. `keys = unique-id`, `value = the virtual file`
    assets_dict = new Map();
    var asset_id_counter = 0;
    return function (build) { return __awaiter(void 0, void 0, void 0, function () {
        var superBuild, _a, _b, initial_plugins, _c, initial_assetNames, initial_outdir, _d, initial_outfile, _0, rest_initial_options, plugins, outdir;
        return __generator(this, function (_e) {
            superBuild = (0, esbuild_extra_1.getBuildExtensions)(build, selfPlugin.name);
            _a = build.initialOptions, _b = _a.plugins, initial_plugins = _b === void 0 ? [] : _b, _c = _a.assetNames, initial_assetNames = _c === void 0 ? "[name]-[hash]" : _c, initial_outdir = _a.outdir, _d = _a.outfile, initial_outfile = _d === void 0 ? "./dist/output.js" : _d, _0 = _a.entryPoints, rest_initial_options = __rest(_a, ["plugins", "assetNames", "outdir", "outfile", "entryPoints"]);
            plugins = usePlugins
                ? initial_plugins.filter(function (initial_plugin) { return (initial_plugin !== selfPlugin); })
                : [];
            outdir = initial_outdir !== null && initial_outdir !== void 0 ? initial_outdir : ((0, pathman_1.parseFilepathInfo)(initial_outfile).dirpath);
            // NOTICE: the default value that we set for `initial_assetNames` is intentionally made so that it raises an error.
            //   this is because multi-asset bundle files will have their references break if there isn't a consistency between the internal build's and the user's top-level build config.
            //   moreover, the user cannot declare a `[hash]` on their asset's name at the top-level build, because that will lead to double hashing of the emitted resources,
            //   to see what I'm referring to, comment out the `throw Error` statement, and you'll see that additional assets will be labeled as `[name]-[hash]-[hash]`,
            //   however, the worker that bundled them will still refer to them as `[name]-[hash]` (i.e. broken reference).
            if (initial_assetNames.includes("[hash]")) {
                throw new Error("[workerBundlerPluginSetup] your \"assetNames\" build option cannot contain the \"[hash]\" label in it, because then the external build process will break the internal build result's original asset referencing. for starters, we recommend that you use \"[ext]/[name]\" instead.");
            }
            filters.forEach(function (filter) {
                build.onResolve({ filter: filter }, function (args) { return __awaiter(void 0, void 0, void 0, function () {
                    var path, _a, pluginData, rest_args, with_arg, namespace, renamed_path, _b, resolved_path, resolved_plugin_data;
                    var _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                path = args.path, _a = args.pluginData, pluginData = _a === void 0 ? {} : _a, rest_args = __rest(args, ["path", "pluginData"]), with_arg = rest_args.with, namespace = rest_args.namespace;
                                // see the note that follow, which explains why we terminate early if this symbol is discovered.
                                if (pluginData[ALREADY_CAPTURED_BY_WORKER_RESOLVER] || pluginData[REQUIRES_ADDITIONAL_ASSETS_RESOLVER]) {
                                    return [2 /*return*/, undefined];
                                }
                                if (!(withFilter(with_arg) && namespaceFilter(namespace))) {
                                    return [2 /*return*/, undefined];
                                }
                                renamed_path = rename(path);
                                return [4 /*yield*/, build.resolve(renamed_path, __assign(__assign({}, rest_args), { pluginData: __assign(__assign({}, pluginData), (_c = {}, _c[ALREADY_CAPTURED_BY_WORKER_RESOLVER] = true, _c)) }))];
                            case 1:
                                _b = (_e.sent()), resolved_path = _b.path, resolved_plugin_data = _b.pluginData;
                                // if the `resolved_path` is `undefined` or an empty string (thereby falsy),
                                // then we'll give up trying to process this file.
                                if (!resolved_path) {
                                    return [2 /*return*/, undefined];
                                }
                                return [2 /*return*/, {
                                        path: resolved_path,
                                        namespace: plugin_ns,
                                        pluginData: resolved_plugin_data
                                            ? resolved_plugin_data
                                            : __assign(__assign({}, pluginData), (_d = {}, _d[ALREADY_CAPTURED_BY_WORKER_RESOLVER] = false, _d))
                                    }];
                        }
                    });
                }); });
            });
            superBuild.onLoad({ filter: /.*/, namespace: plugin_ns }, function (args) { return __awaiter(void 0, void 0, void 0, function () {
                var path, pluginData, result, contents_1, allEntryPoints, entry_points_asset_ids, import_asset_ids, _a, _b, virtual_file, asset_id, is_entry_point, assets_importer_js_lines, default_export_asset_id, contents;
                var e_2, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            path = args.path, pluginData = args.pluginData;
                            return [4 /*yield*/, build.esbuild.build(__assign(__assign({}, rest_initial_options), { plugins: plugins, entryPoints: [path], outdir: outdir, 
                                    // overwriting the asset-names and entry-names, so that they reflect exactly what the user's top-level build-config has, in addition to the hash.
                                    // if this step is not performed, the links/references generated from this sub-build will not be correct when the user's top-level build moves around the resulting files.
                                    // thus, we must imitate the same exact same structure as the user's top-level config (excluding the hash).
                                    assetNames: initial_assetNames + "-[hash]", entryNames: initial_assetNames + "-[hash]", format: "esm", bundle: true, splitting: false, minify: true, write: false, metafile: true }))
                                // normally, after the bundling, you would only receive a single javascript file (that of the worker),
                                // and in such cases, just returning the contents of it with the "file" loader is enough (which is what we carry out below).
                            ];
                        case 1:
                            result = _e.sent();
                            // normally, after the bundling, you would only receive a single javascript file (that of the worker),
                            // and in such cases, just returning the contents of it with the "file" loader is enough (which is what we carry out below).
                            if (result.outputFiles.length === 0) {
                                throw new Error("[workerBundlerPluginSetup] no file was produced by the worker-bundler. very weird, indeed.");
                            }
                            if (result.outputFiles.length === 1) {
                                contents_1 = result.outputFiles.at(0).contents;
                                return [2 /*return*/, { contents: contents_1, loader: "file", pluginData: pluginData }];
                            }
                            allEntryPoints = __spreadArray([], __read((new Set(Object.entries(result.metafile.outputs)
                                .filter(function (_a) {
                                var _b = __read(_a, 2), relative_output_path = _b[0], meta = _b[1];
                                return meta.entryPoint ? true : false;
                            })
                                .map(function (_a) {
                                var _b = __read(_a, 2), relative_output_path = _b[0], meta = _b[1];
                                return relative_output_path;
                            })))), false);
                            if (allEntryPoints.length !== 1) {
                                console.warn("[workerBundlerPluginSetup] WARNING! there should have been exactly one single entry-point.\n\tnow we might incorrectly guess the js-worker file out of these options:", allEntryPoints);
                            }
                            entry_points_asset_ids = [], import_asset_ids = [];
                            try {
                                for (_a = __values(result.outputFiles), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    virtual_file = _b.value;
                                    asset_id = "".concat(asset_id_counter++), is_entry_point = pathStemMatches(virtual_file.path, allEntryPoints);
                                    if (is_entry_point) {
                                        entry_points_asset_ids.push(asset_id);
                                    }
                                    import_asset_ids.push(asset_id);
                                    assets_dict.set(asset_id, virtual_file);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            if (entry_points_asset_ids.length !== 1) {
                                console.warn("[workerBundlerPluginSetup] WARNING! expected to identify exactly one entry-point virtual asset file, but instead found these entry-point assets:", entry_points_asset_ids);
                            }
                            assets_importer_js_lines = [];
                            import_asset_ids.forEach(function (asset_id) {
                                // notice that we import the same asset twice: the first being a static import, while the second is a dynamic import.
                                // this is because static imports are susceptible to esbuild's tree-shaking, while dynamic imports are not.
                                // and we do NOT want to tree-shake off the assets (such as sourcemap) which are not actually imported/utilized by the user's original entry-points.
                                // in order to preserve all assets (even the unused ones), we must perform a dynamic import on them.
                                // so you may now wonder why do we perform a static import then? that's because it does not require a top-level await keyword, thus it would work on older browsers.
                                // moreover, it will make it clear to you which files would have been tree-shaken had the dynamic import not existed.
                                // but do note that dynamic imports generate very ugly "__commonJS" and "__toESM" function statements as a means for esbuild to polyfill at the top-level, polluting the user's entry-points.
                                assets_importer_js_lines.push("import asset_".concat(asset_id, " from \"").concat(asset_id, "\""));
                                assets_importer_js_lines.push("import(\"".concat(asset_id, "\")"));
                            });
                            assets_importer_js_lines.push("export { ".concat(entry_points_asset_ids.map(function (asset_id) { return ("asset_" + asset_id); }).join(", "), " }"));
                            default_export_asset_id = entry_points_asset_ids.at(0);
                            if (default_export_asset_id !== undefined) {
                                assets_importer_js_lines.push("export default asset_".concat(default_export_asset_id));
                            }
                            contents = assets_importer_js_lines.join("\n");
                            return [2 /*return*/, { contents: contents, loader: "js", pluginData: __assign(__assign({}, pluginData), (_d = {}, _d[REQUIRES_ADDITIONAL_ASSETS_RESOLVER] = true, _d)) }];
                    }
                });
            }); });
            superBuild.onResolve({ filter: /.*/, namespace: plugin_ns }, function (args) { return __awaiter(void 0, void 0, void 0, function () {
                var asset_id, _a, pluginData, asset_file, original_output_path;
                var _b;
                return __generator(this, function (_c) {
                    asset_id = args.path, _a = args.pluginData, pluginData = _a === void 0 ? {} : _a;
                    if (!pluginData[REQUIRES_ADDITIONAL_ASSETS_RESOLVER]) {
                        return [2 /*return*/, undefined];
                    }
                    asset_file = assets_dict.get(asset_id), original_output_path = asset_file.path;
                    // TODO: there is an issue with double hashing of the output-path.
                    //   how do I reliably remove the hashing text without enforcing a certain asset naming convention on the user's build initial config?
                    return [2 /*return*/, {
                            path: original_output_path,
                            namespace: assets_plugin_ns,
                            pluginData: __assign(__assign({}, pluginData), (_b = {}, _b[PLUGIN_DATA_ASSET_FILE_FIELD] = asset_file, _b)),
                        }];
                });
            }); });
            superBuild.onLoad({ filter: /.*/, namespace: assets_plugin_ns }, function (args) { return __awaiter(void 0, void 0, void 0, function () {
                var path, _a, pluginData, asset_file;
                return __generator(this, function (_b) {
                    path = args.path, _a = args.pluginData, pluginData = _a === void 0 ? {} : _a, asset_file = pluginData[PLUGIN_DATA_ASSET_FILE_FIELD];
                    if (!asset_file) {
                        throw new Error("[workerBundlerPluginSetup] expected to find a virtual file in the plugin data, but found none for the virtual asset with the path: \"".concat(path, "\""));
                    }
                    // there is no need to propagate the plugin data anymore, since this is a terminal point.
                    // TODO: consider only using the "file" loader for tree-shakable contents (such as the actual worker file),
                    //   and using the "copy" loader for all other assets that need to be copied irrespectively,
                    //   but their references to are not actually utilized (such as sourcemaps).
                    //   doing so would significantly reduce the polluting "__commonJS" and "__toESM" statemetns that end up in the user's original entry-point.
                    return [2 /*return*/, { contents: asset_file.contents, loader: "file" }];
                });
            }); });
            return [2 /*return*/];
        });
    }); };
};
var workerBundlerPlugin = function (config) {
    var _a;
    var self_plugin = {
        name: (_a = config === null || config === void 0 ? void 0 : config.pluginName) !== null && _a !== void 0 ? _a : defaultWorkerBundlerPluginSetupConfig.pluginName,
        setup: function () { },
    };
    var setup = workerBundlerPluginSetup(__assign(__assign({}, config), { selfPlugin: self_plugin }));
    self_plugin.setup = setup;
    return self_plugin;
};
exports.workerBundlerPlugin = workerBundlerPlugin;
