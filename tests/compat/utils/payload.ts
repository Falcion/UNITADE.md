import * as fs from 'node:fs';
import * as path from 'node:path';

export function loadCfg(filename: string): any {
    const filePath = path.join(__dirname, 'examples', filename);
    const fileData = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(fileData);
}

export function loadCfgParsed(filename: string): any {
    const filePath = path.join(__dirname, 'examples/parsed', `${filename}-parsed.json`);
    const fileData = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(fileData);
}

