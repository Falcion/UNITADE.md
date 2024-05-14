/**
 * @class
 * Represents a logger utility for logging messages with different severity levels and colors.
 */
declare class LOCALE_LOGGER {
    /**
     * Logs an informational message.
     * @param {...any} data - The data to be logged.
     */
    static info(...data: any[]): void;

    /**
     * Logs a warning message.
     * @param {...any} data - The data to be logged.
     */
    static warn(...data: any[]): void;

    /**
     * Logs an error message.
     * @param {...any} data - The data to be logged.
     */
    static error(...data: any[]): void;

    /**
     * Logs a success message.
     * @param {...any} data - The data to be logged.
     */
    static success(...data: any[]): void;

    /**
     * Logs a message with custom color.
     * @param {(str: string) => string} color - The color function.
     * @param {...any} data - The data to be logged.
     */
    static raw(color: (str: string) => string, ...data: any[]): void;

    /**
     * Formats a message with custom color.
     * @param {(str: string) => string} color - The color function.
     * @param {string} message - The message to be formatted.
     * @returns {string} The formatted message.
     */
    static msg(color: (str: string) => string, message: string): string;
}

/**
 * @class
 * Represents a module for searching and updating files.
 */
declare class LOCALE_MODULE {
    /**
     * The root directory of the module.
     * @type {string}
     */
    ROOT_DIRECTORY: string;

    /**
     * Directories to be excluded from traversal.
     * @type {string[]}
     */
    private EXCLUDING_FOLDERS: string[];

    /**
     * Values to be excluded from file content search.
     * @type {string[]}
     */
    private EXCLUDING_VALUES: string[];

    /**
     * Updates the exclusion settings based on user input.
     * @param {string[]} entries - Entries to be added to the exclusion list.
     * @param {string} actions - User action (Y or N).
     */
    update(entries: string[], actions: string): void;

    /**
     * Searches for specified words in file contents.
     * @param {string} filepath - The path of the file to search.
     * @param {string[]} data - Words to search for.
     * @returns {Promise<void>} A promise representing the search operation.
     */
    search(filepath: string, data: string[]): Promise<void>;

    /**
     * Traverses directories and searches files for specified words.
     * @param {string} directory - The directory to start traversal from.
     * @returns {Promise<void>} A promise representing the traversal operation.
     */
    traverse(directory?: string): Promise<void>;
}

export { LOCALE_LOGGER, LOCALE_MODULE };
