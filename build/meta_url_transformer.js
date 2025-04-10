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
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaUrlTransformerPlugin = void 0;
var esbuild_extra_1 = require("esbuild-extra");
var defaultTransform = function (matched_substring, regex_args, index) {
    var 
    //@ts-expect-error Import plugin
    _a = __read(regex_args.toReversed()), named_groups = _a[0], _full_string = _a[1], _offset = _a[2], _unused_groups = _a.slice(3), path_name = named_groups.importPath, var_name = "__IMPORT_META_URL_".concat(index);
    return {
        prepend: "import ".concat(var_name, " from \"").concat(path_name, "\""),
        replace: var_name,
    };
};
var defaultMetaUrlTransformerPluginSetup = {
    filters: [undefined],
    namespaceFilter: (function () { return true; }),
    pattern: /new\s+URL\s*\(\s*(?<quote>["'])(?<importPath>.*?)\k<quote>,\s*import\.meta\.url\s*\)/g,
    pluginName: "oazmi-meta-url-resolver",
    transform: defaultTransform,
};
var metaUrlTransformerPluginSetup = function (config) {
    var _a = __assign(__assign({}, defaultMetaUrlTransformerPluginSetup), config), _b = _a.filters, filters = _b === void 0 ? [undefined] : _b, namespaceFilter = _a.namespaceFilter, pattern = _a.pattern, pluginName = _a.pluginName, transform = _a.transform;
    var onTransformFn = function (args) {
        var loader = args.loader, code = args.code, namespace = args.namespace;
        if (!namespaceFilter(namespace)) {
            return;
        }
        if (!code.match(pattern)) {
            return;
        }
        var index = 0;
        var append_statements = [], prepend_statements = [];
        var modified_code = code.replaceAll(pattern, function (matched_substring) {
            var regex_args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                regex_args[_i - 1] = arguments[_i];
            }
            var _a = transform(matched_substring, regex_args, index++), replace = _a.replace, append = _a.append, prepend = _a.prepend;
            if (append) {
                append_statements.push(append);
            }
            if (prepend) {
                prepend_statements.push(prepend);
            }
            return replace;
        });
        if (append_statements.length > 0) {
            append_statements.push("");
        }
        if (prepend_statements.length > 0) {
            prepend_statements.push("");
        }
        return {
            loader: loader,
            code: prepend_statements.join("\n") + modified_code + append_statements.join("\n"),
        };
    };
    return function (build) { return __awaiter(void 0, void 0, void 0, function () {
        var superBuild, acceptedLoaders;
        return __generator(this, function (_a) {
            superBuild = (0, esbuild_extra_1.getBuildExtensions)(build, pluginName), acceptedLoaders = ["ts", "tsx", "js", "jsx"];
            filters.forEach(function (filter) {
                superBuild.onTransform({ filter: filter, loaders: acceptedLoaders }, onTransformFn);
            });
            return [2 /*return*/];
        });
    }); };
};
var metaUrlTransformerPlugin = function (config) {
    var _a;
    return {
        name: (_a = config === null || config === void 0 ? void 0 : config.pluginName) !== null && _a !== void 0 ? _a : defaultMetaUrlTransformerPluginSetup.pluginName,
        setup: metaUrlTransformerPluginSetup(config),
    };
};
exports.metaUrlTransformerPlugin = metaUrlTransformerPlugin;
