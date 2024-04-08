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

import { spawnSync } from 'node:child_process';
import * as path from 'node:path';

const srcPath = path.resolve(__dirname, '..', '..', '..');
const patchExportFnPath = path.resolve(__dirname, 'export_all_patches.py');
const configPath = path.resolve(__dirname, '..', 'patches', 'config.json');

// Re-export all the patches to check if there were changes.
const proc = spawnSync('python3', [patchExportFnPath, configPath, '--dry-run'], {
  cwd: srcPath
});

// Fail if patch exporting returned 1, e.g dry run failed.
if (proc.status === 1) {
  console.log(proc.stderr.toString('utf8'));
  process.exit(1);
}
