// TYPE DEFINITIONS FOR SimpleLoggerW
// DEFINITIONS BY: wisnoi <https://github.com/wisnoi>
declare class SimpleLoggerW {
    constructor(filepath?: string, consoleOut?: boolean);

    filePath: string | null;
    colors: {};

    severity: {};

    severityInfo: Map<number, object>;
    
    _formatOutputString(input: string, severity: number, isFile: boolean): string;
    _setMaxPrefixLen(): void;
    _out(input: string, severity: number): void;

    /**
     * Set a new attribute set (bold, underline, blink) for a specified severity level
     * @param {number} severity - Enum value for the chosen severity
     * @param {Array} attributes - New attributes to display 
     */
    setAttributes(severity: number, attributes: string[]): void;

    /**
     * Set a new background color for a specified severity level
     * @param {number} severity - Enum value for the chosen severity
     * @param {string} color - New color to display 
     */
    setBackgroundColor(severity: number, color: string): void;

    /**
     * Set a new foreground color for a specified severity level
     * @param {number} severity - Enum value for the chosen severity
     * @param {string} color - New color to display 
     */
    setForegroundColor(severity: number, color: string): void;

    /**
     * Set a custom prefix for a specified severity level
     * @param {number} severity - Enum value for the chosen severity
     * @param {string} prefix - New prefix to store 
     */
    setPrefix(severity: number, color: string): void;
    
    /**
     * Logs a fatal error
     * @param {string} input - Text input to log
     */
    fatal(input: string): void;

    /**
     * Logs a critical error
     * @param {string} input - Text input to log
     */
    critical(input: string): void;

    /**
     * Logs a warning
     * @param {string} input - Text input to log
     */
    warning(input: string): void;

    /**
     * Logs an info string
     * @param {string} input - Text input to log
     */
    info(input: string): void;

    /**
     * Logs a debug string
     * @param {string} input - Text input to log
     */
    debug(input: string): void;

}

export = SimpleLoggerW;