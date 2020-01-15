"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const _7zip_bin_1 = require("7zip-bin");
function run(args) {
    return new Promise((resolve, reject) => {
        const cmd = child_process_1.spawn(_7zip_bin_1.path7za, args);
        let out = '';
        cmd.stdout.on('data', lines => {
            out += lines.toString();
        });
        cmd.on('close', code => {
            if (code) {
                reject(new Error(`Command exit with code ${code}`));
            }
            else {
                resolve(out.replace(/\r/g, '').split(/\n/));
            }
        });
    });
}
exports.run = run;
//# sourceMappingURL=binary.js.map