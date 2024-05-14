/*
 * Script was made by: @electron
 * Will not be refactored or touched, for more information, see their
 * GitHub page:
 * https://github.com/electron/electron
 *
 * Electron.js repository is licensed and distributed under
 * MIT License.
 *
 * Copyright (c) Electron contributors
 * Copyright (c) 2013-2020 GitHub Inc.
 */

const asar = require('@electron/asar');
const crypto = require('node:crypto');
const fs = require('node:fs');

const archive = process.argv[2];
const hashFile = process.argv[3];

const { headerString } = asar.getRawHeader(archive);
fs.writeFileSync(hashFile, crypto.createHash('SHA256').update(headerString).digest('hex'));
