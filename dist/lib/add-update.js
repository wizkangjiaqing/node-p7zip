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
const countRe = /Items to compress: (\d+)/;
function build(tag) {
    return (archive, files, switches) => __awaiter(this, void 0, void 0, function* () {
        const args = [tag].concat(switches || [], archive, files);
        const lines = yield binary_1.run(args);
        const match = lines.join('\n').match(countRe);
        return match ? parseInt(match[1], 10) : 0;
    });
}
exports.add = build('a');
exports.update = build('u');
//# sourceMappingURL=add-update.js.map