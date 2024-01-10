"use strict";
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
exports.__esModule = true;
var fs = require("fs-extra");
var path = require("path");
var dotenv = require("dotenv");
var readline = require("readline");
var ROOT_DIRECTORY = __dirname;
var EXCLUDING_DIRECTORIES = ['node_modules', 'venv', '.git', 'out'];
var TARGET_VALUES = ['FALCION', 'PATTERNU', 'PATTERNUGIT'];
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var rl, search_data, traverse_dir, write_manifest, packageJSON, manifestAsJSON, checkingRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                search_data = function (path, search_data) { return __awaiter(void 0, void 0, void 0, function () {
                    var content, i, line, _i, search_data_1, searching_string;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fs.readFile(path, 'utf-8')];
                            case 1:
                                content = (_a.sent()).split('\n');
                                for (i = 0; i < content.length; i++) {
                                    line = content[i].toUpperCase();
                                    for (_i = 0, search_data_1 = search_data; _i < search_data_1.length; _i++) {
                                        searching_string = search_data_1[_i];
                                        if (line.includes(searching_string))
                                            console.log("Found \"".concat(searching_string, "\" in L#").concat(i++, " of \"").concat(path, "\""));
                                    }
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                traverse_dir = function (dirpath) { return __awaiter(void 0, void 0, void 0, function () {
                    var files, _i, files_1, file, fpath, fstat, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 10, , 11]);
                                return [4 /*yield*/, fs.readdir(dirpath)];
                            case 1:
                                files = _a.sent();
                                _i = 0, files_1 = files;
                                _a.label = 2;
                            case 2:
                                if (!(_i < files_1.length)) return [3 /*break*/, 9];
                                file = files_1[_i];
                                fpath = path.join(dirpath, file);
                                return [4 /*yield*/, fs.stat(fpath)];
                            case 3:
                                fstat = _a.sent();
                                if (!fstat.isDirectory()) return [3 /*break*/, 6];
                                if (!!EXCLUDING_DIRECTORIES.includes(file)) return [3 /*break*/, 5];
                                return [4 /*yield*/, traverse_dir(fpath)];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5: return [3 /*break*/, 8];
                            case 6:
                                if (!fstat.isFile()) return [3 /*break*/, 8];
                                return [4 /*yield*/, search_data(fpath, TARGET_VALUES)];
                            case 7:
                                _a.sent();
                                _a.label = 8;
                            case 8:
                                _i++;
                                return [3 /*break*/, 2];
                            case 9: return [3 /*break*/, 11];
                            case 10:
                                err_1 = _a.sent();
                                console.error("Error reading directory ".concat(dirpath, ": ").concat(err_1));
                                return [3 /*break*/, 11];
                            case 11: return [2 /*return*/];
                        }
                    });
                }); };
                write_manifest = function (packageJSON) { return __awaiter(void 0, void 0, void 0, function () {
                    var manifestJSON;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                manifestJSON = {
                                    id: packageJSON.name,
                                    name: "".concat(packageJSON.name[0].toUpperCase()).concat(packageJSON.name.slice(1, packageJSON.name.length)),
                                    description: packageJSON.description,
                                    author: packageJSON.author,
                                    license: packageJSON.license,
                                    version: packageJSON.version,
                                    authorUrl: '-'
                                };
                                return [4 /*yield*/, fs.writeFile('manifest.json', JSON.stringify(manifestJSON, null, 4))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, fs.pathExists(ROOT_DIRECTORY + '/.env')];
            case 1:
                if (!!(_a.sent())) return [3 /*break*/, 4];
                return [4 /*yield*/, fs.createFile('.env')];
            case 2:
                _a.sent();
                return [4 /*yield*/, fs.writeFile('.env', 'EXAMPLE_API_KEY=')];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                dotenv.config({
                    path: './.env',
                    encoding: 'utf-8'
                });
                packageJSON = JSON.parse(fs.readFileSync('package.json', { encoding: 'utf-8' }));
                return [4 /*yield*/, fs.pathExists(ROOT_DIRECTORY + '/manifest.json')];
            case 5:
                if (!!(_a.sent())) return [3 /*break*/, 8];
                return [4 /*yield*/, fs.createFile('manifest.json')];
            case 6:
                _a.sent();
                return [4 /*yield*/, write_manifest(packageJSON)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                manifestAsJSON = JSON.parse(fs.readFileSync('manifest.json', { encoding: 'utf-8' }));
                checkingRes = packageJSON.id === manifestAsJSON.id && packageJSON.name === manifestAsJSON.name
                    && packageJSON.description === manifestAsJSON.description && packageJSON.author === manifestAsJSON.author
                    && packageJSON.license === manifestAsJSON.license && packageJSON.version === manifestAsJSON.version;
                if (!checkingRes)
                    console.error('There is desync in Manifest JSON and Package JSON! Causing override to manifest.json, but backuping at manifest-copy.json');
                return [4 /*yield*/, fs.copyFile('manifest.json', 'manifest-backup.json')];
            case 9:
                _a.sent();
                return [4 /*yield*/, write_manifest(packageJSON)];
            case 10:
                _a.sent();
                rl.question('Do you want to change the finding signature for the script? (y/n): ', function (answ1) {
                    if (answ1 == 'y')
                        rl.question('What words you need to find? (separated by comma): ', function (answ2) {
                            var res = answ2.split(',');
                            res.forEach(function (element) {
                                if (res[0] == ' ')
                                    res[0] = res[0].slice(1);
                            });
                            TARGET_VALUES = res;
                            traverse_dir(ROOT_DIRECTORY);
                            rl.close();
                        });
                    else {
                        traverse_dir(ROOT_DIRECTORY);
                        rl.close();
                    }
                });
                return [2 /*return*/];
        }
    });
}); })();
