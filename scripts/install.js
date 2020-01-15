#!/usr/bin/env node
'use strict'

const fs = require('fs'); 
const {path7za} = require('7zip-bin');
 
(function chmodExecutable() {
    if (process.platform === 'win32') {
        return;
    }
    fs.chmodSync(path7za, 755);
})();