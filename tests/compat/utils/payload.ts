import * as fs from 'node:fs';
import * as path from 'node:path';
import { PluginManifest } from '@tests-compat/utils/types/manifest';

export function loadCfg(filename: string): any {
    const filePath = path.join(__dirname, '..', 'examples', filename);
    const fileData = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(fileData);
}

export function loadCfgParsed(filename: string): any {
    const filePath = path.join(__dirname, '..', 'examples/parsed', `${filename.replace('.json', '-parsed.json')}`);
    const fileData = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(fileData);
}

export function loadManifest(): PluginManifest {
    const manifestPath = path.join(__dirname, '../../..', 'manifest.json');
    const manifestData = fs.readFileSync(manifestPath, 'utf-8');

    return JSON.parse(manifestData) as PluginManifest;
}
