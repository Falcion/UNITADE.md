import { ISettings } from "@settings/defaults_interface";

export interface IVersionConverter {
    /** 
     * @description
     * Version identifier 
     */
    version: string;
    /**
     * @description
     * Detection function to identify if data matches this version
     * @param {any} data
     * Data to check
     * @returns {boolean} 
     * Whether the data matches this version
     */
    detect: (data: any) => boolean;
    /** 
     * @description
     * Conversion function to transform data to current settings format
     * @param {any} data
     * Data to convert
     * @returns {Partial<ISettings>} 
     * Converted data in current settings format
     */
    convert: (data: any) => Partial<ISettings>;
}

