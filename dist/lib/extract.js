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
Object.defineProperty(exports, "__esModule", { value: true });
const binary_1 = require("./binary");
function extract(archive, destination, full = true, fileFilter, switches) {
    return __awaiter(this, void 0, void 0, function* () {
        let args = [full ? 'x' : 'e'];
        if (destination) {
            args.push(`-o${destination}`);
        }
        if (switches) {
            args = args.concat(switches);
        }
        if (args.indexOf('-aoa') < 0 && args.indexOf('-aos') < 0 && args.indexOf('-aou') < 0 && args.indexOf('-aot') < 0) {
            args.push('-aoa');
        }
        args.push(archive);
        if (fileFilter) {
            args = args.concat(fileFilter);
        }
        yield binary_1.run(args);
    });
}
exports.extract = extract;
//# sourceMappingURL=extract.js.map