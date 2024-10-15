/*
 * MIT License
 *
 * Copyright (c) 2023-2024
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * Any code and/or API associated with OBSIDIAN behaves as stated in their distribution policy.
 */

import {
    TFile,
    TFolder,
    TAbstractFile,
} from "obsidian";

/**
 * Determines whether the provided file is an instance of `TFile` from the Obsidian API.
 * 
 * @param {TAbstractFile} file - The file to check, which can be either a `TFile`, `TFolder`, or other `TAbstractFile` type.
 * @returns {boolean} - Returns `true` if the file is an instance of `TFile`, otherwise `false`.
 * 
 * @example
 * const isFile = isTFile(someFile);
 * console.log(isFile); // true if someFile is a TFile, false otherwise
 */
export function isTFile(file: TAbstractFile): boolean {
    return (file instanceof TFile);
}

/**
 * Determines whether the provided file is an instance of `TFolder` from the Obsidian API.
 * 
 * @param {TAbstractFile} file - The file to check, which can be either a `TFile`, `TFolder`, or other `TAbstractFile` type.
 * @returns {boolean} - Returns `true` if the file is an instance of `TFolder`, otherwise `false`.
 * 
 * @example
 * const isFolder = isTFolder(someFile);
 * console.log(isFolder); // true if someFile is a TFolder, false otherwise
 */
export function isTFolder(file: TAbstractFile): boolean {
    return (file instanceof TFolder);
}
