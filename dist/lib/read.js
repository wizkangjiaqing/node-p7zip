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
const properties = ['Path', 'Type', 'Physical Size', 'Headers Size', 'Method', 'Solid', 'Blocks'];
const boundary = /^-----------*[\s-]+$/;
function camelCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map((part, index) => (index ? part[0].toUpperCase() + part.substr(1) : part))
        .join('');
}
class Archive {
    constructor() {
        this.path = '';
        this.type = '';
        this.physicalSize = 0;
        this.headersSize = 0;
        this.method = '';
        this.solid = '';
        this.blocks = 0;
        this.directories = [];
        this.files = [];
    }
}
exports.Archive = Archive;
class Entry {
    constructor() {
        this.attr = '';
        this.date = null;
        this.name = '';
        this.size = 0;
        this.compressed = 0;
    }
}
exports.Entry = Entry;
function read(archive, switches) {
    return __awaiter(this, void 0, void 0, function* () {
        const args = ['l'].concat(switches || [], archive);
        const lines = yield binary_1.run(args);
        const info = new Archive();
        let listing = false;
        for (const line of lines) {
            if (boundary.exec(line)) {
                listing = !listing;
                if (listing) {
                    continue;
                }
            }
            if (listing) {
                const entry = new Entry();
                entry.date = new Date(line.substr(0, 19));
                entry.attr = line.substr(20, 5);
                entry.size = parseInt(line.substr(26, 12), 10) || 0;
                entry.compressed = parseInt(line.substr(39, 12), 10) || 0;
                entry.name = line.substr(53);
                if (entry.attr.indexOf('D') >= 0) {
                    info.directories.push(entry);
                }
                else {
                    info.files.push(entry);
                }
            }
            else {
                properties.some(property => {
                    if (line.startsWith(`${property} = `)) {
                        let value = line.substr(property.length + 3);
                        const key = camelCase(property);
                        if (['physicalSize', 'headersSize', 'blocks'].includes(key)) {
                            value = parseInt(value, 10);
                        }
                        info[key] = value;
                        return true;
                    }
                    return false;
                });
            }
        }
        return info;
    });
}
exports.read = read;
//# sourceMappingURL=read.js.map