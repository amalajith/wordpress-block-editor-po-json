"use strict";
/**
 * ======= Generate JED1.x compatible translations from po files =========
 *
 * @description
 * This node script will generate the translation json
 * in JED1.x format required by Wordpress Gutenberg Block Editor.
 *
 * @author Amal Ajith
 */
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePoJson = void 0;
var fs = require("fs");
var path = require("path");
var po2json = require("po2json");
var clc = require("cli-color");
var WordpressBlockEditorPoJsonGenerator = /** @class */ (function () {
    function WordpressBlockEditorPoJsonGenerator(config) {
        var _this = this;
        // domain: string = 'my-custom-domain';
        this.languagesFolder = "languages";
        this.poFileExt = '.po';
        this.wpJsHandleName = 'wp-js-handle';
        /**
         * Get the po file names from the languages folder
         * @param folderName
         */
        this.getPoFileNames = function (folderName) { return __awaiter(_this, void 0, void 0, function () {
            var files, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.promises.readdir(folderName)];
                    case 1:
                        files = _a.sent();
                        return [2 /*return*/, files.filter(function (file) { return path.extname(file) === _this.poFileExt; })];
                    case 2:
                        e_1 = _a.sent();
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Generate and save the jed json files
         * @param languageFolderAbsPath
         * @param poFileName
         */
        this.genAndSaveJedJsonFileFromPoFile = function (languageFolderAbsPath, poFileName) { return __awaiter(_this, void 0, void 0, function () {
            var poFileAbsPath, genJsonAsync, jsonDataString, _a, _b, poFileBaseName, jsonFileName, jsonFileAbsPath, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        poFileAbsPath = "".concat(languageFolderAbsPath, "/").concat(poFileName);
                        genJsonAsync = new Promise(function (resolve, reject) {
                            try {
                                po2json.parseFile(poFileAbsPath, { format: 'jed1.x' }, function async(err, jsonData) {
                                    resolve(jsonData);
                                });
                            }
                            catch (e) {
                                reject(e);
                            }
                        });
                        _b = (_a = JSON).stringify;
                        return [4 /*yield*/, genJsonAsync];
                    case 1:
                        jsonDataString = _b.apply(_a, [_c.sent()]);
                        if (!jsonDataString) return [3 /*break*/, 5];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        poFileBaseName = path.basename(poFileAbsPath, this.poFileExt);
                        jsonFileName = "".concat(poFileBaseName, "-").concat(this.wpJsHandleName, ".json");
                        jsonFileAbsPath = "".concat(languageFolderAbsPath, "/").concat(jsonFileName);
                        return [4 /*yield*/, fs.promises.writeFile(jsonFileAbsPath, jsonDataString)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, jsonFileName];
                    case 4:
                        e_2 = _c.sent();
                        throw e_2;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Run the methods to scan for po files and generator json files.
         */
        this.run = function () { return __awaiter(_this, void 0, void 0, function () {
            var poFileNames, genAndSaveJedFilesInParallel, generatedFileNames, e_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log(clc.blue("Language folder has been set as ".concat(this.languagesFolder)));
                        return [4 /*yield*/, this.getPoFileNames(this.languagesFolder)];
                    case 1:
                        poFileNames = _a.sent();
                        console.log(clc.blue('Following po files found'));
                        console.log(clc.green(JSON.stringify(poFileNames)));
                        console.log(clc.blue('Preparing for json file generation from po files'));
                        genAndSaveJedFilesInParallel = poFileNames.map(function (poFileName) {
                            return _this.genAndSaveJedJsonFileFromPoFile(_this.languagesFolder, poFileName);
                        });
                        console.log(clc.blue('Generating and saving jed json files'));
                        return [4 /*yield*/, Promise.all(genAndSaveJedFilesInParallel)];
                    case 2:
                        generatedFileNames = _a.sent();
                        console.log(clc.green('Successfully generated and saved the following jed json files'));
                        console.log(clc.green(JSON.stringify(generatedFileNames)));
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.log(clc.red('Unable to generate jed json file due to the following error'));
                        console.log(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        // if(config && config.domain) {
        //     this.domain = config.domain;
        // }
        if (config && config.languagesFolderLocation) {
            this.languagesFolder = config.languagesFolderLocation;
        }
        if (config && config.wordpressJsHandleName) {
            this.wpJsHandleName = config.wordpressJsHandleName;
        }
    }
    return WordpressBlockEditorPoJsonGenerator;
}());
/**
 * main function which begins the process.
 */
var generatePoJson = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var wpPoJsonGenerator;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wpPoJsonGenerator = new WordpressBlockEditorPoJsonGenerator(config);
                return [4 /*yield*/, wpPoJsonGenerator.run()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.generatePoJson = generatePoJson;
//# sourceMappingURL=index.js.map