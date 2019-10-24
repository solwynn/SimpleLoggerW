const fs = require('fs');
const os = require('os');

/**
 * ANSI 16-bit Color declarations
 */
const colors = 
{
    default: "\x1b[0m",

    attributes: {
        bold: "\x1b[1m",
        underline: "\x1b[4m",
        blink: "\x1b[5m",
    },

    foreground: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        default: "\x1b[39m",
        lgrey: "\x1b[90m",
        lred: "\x1b[91m",
        lgreen: "\x1b[92m",
        lyellow: "\x1b[93m",
        lblue: "\x1b[94m",
        lmagenta: "\x1b[95m",
        lcyan: "\x1b[96m",
        lwhite: "\x1b[97m",
    },

    background: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        default: "\x1b[49m",
        lgrey: "\x1b[100m",
        lred: "\x1b[101m",
        lgreen: "\x1b[102m",
        lyellow: "\x1b[103m",
        lblue: "\x1b[104m",
        lmagenta: "\x1b[105m",
        lcyan: "\x1b[106m",
        lwhite: "\x1b[107m",
    },
}

class SimpleLoggerW {
    constructor(filePath = null, consoleOut = true) {
        this.filePath = filePath;
        
        this.colors = colors;

        this.severity = {
            fatal: 0,
            critical: 1,
            warning: 2,
            info: 3,
            debug: 4,
        }

        this.severityInfo = new Map();

        this.severityInfo.set(0, {
            attributes: [],
            backgroundColor: "",
            foregroundColor: this.colors.foreground.lmagenta,
            prefix: "FATAL",
        });

        this.severityInfo.set(1, {
            attributes: [],
            backgroundColor: "",
            foregroundColor: this.colors.foreground.lred,
            prefix: "CRITICAL",
        });

        this.severityInfo.set(2, {
            attributes: [],
            backgroundColor: "",
            foregroundColor: this.colors.foreground.lyellow,
            prefix: "WARNING",
        });

        this.severityInfo.set(3, {
            attributes: [],
            backgroundColor: "",
            foregroundColor: this.colors.foreground.lblue,
            prefix: "INFO",
        });

        this.severityInfo.set(4, {
            attributes: [],
            backgroundColor: "",
            foregroundColor: this.colors.foreground.lgreen,
            prefix: "DEBUG",
        });


        this._setMaxPrefixLen();

        this.consoleOut = consoleOut;
    }

    // Helper methods
    
    _formatOutputString(input, severity, isFile) {
        const instSev = this.severityInfo.get(severity);
        const padding = this.maxPrefixLen - instSev.prefix.length;
        const now = new Date().toISOString();
        const newlinePad = instSev.prefix.length + (padding + 6) + now.length;

        let str = '';

        // Prettify newlines!

        input = input.replace(/(\r\n|\r|\n)/g, (match) => match + (' ').repeat(newlinePad));

        // Don't add ANSI encoding characters
        // for file append operations
        if (!isFile) {
            str += instSev.attributes.join('');
            str += instSev.backgroundColor;
            str += instSev.foregroundColor;
        }

        // Severity/Timestamp

        str += '['
        str += instSev.prefix;
        str += (' ').repeat(padding + 1);
        str += '- ';
        str += now
        str += '] ';

        // Input

        str += input;

        if (!isFile) {
            str += this.colors.default;
            str += os.EOL;
        }

        if (isFile) {
            str += os.EOL;
        }

        return str;
    }

    _setMaxPrefixLen() {
        let maxPrefixLen = this.maxPrefixLen || 0;

        this.severityInfo.forEach((severity) => {
            if (severity.prefix.length > maxPrefixLen) maxPrefixLen = severity.prefix.length;
        });

        this.maxPrefixLen = maxPrefixLen;
        
    }

    _out(input, severity) {
        if (this.consoleOut) {
            process.stderr.write(this._formatOutputString(input, severity, false));
        }

        if (this.filePath) {
            fs.appendFileSync(this.filePath, this._formatOutputString(input, severity, true));
        }
    }

    // Property setter methods

    /**
     * Set a new attribute set (bold, underline, blink) for a specified severity level
     * @param {number} severity - Enum value for the chosen severity
     * @param {Array} attributes - New attributes to display 
     * @returns {void}
     */
    setAttributes(severity, attributes) {
        const instSev = this.severityInfo.get(severity);

        instSev.attributes = attributes;

        this.severityInfo.set(severity, instSev);
    }
    
    /**
     * Set a new background color for a specified severity level
     * @param {number} severity - Enum value for the chosen severity
     * @param {string} color - New color to display 
     * @returns {void}
     */
    setBackgroundColor(severity, color) {
        const instSev = this.severityInfo.get(severity);

        instSev.backgroundColor = color;

        this.severityInfo.set(severity, instSev);
    }

    /**
     * Set a new foreground color for a specified severity level
     * @param {number} severity - Enum value for the chosen severity
     * @param {string} color - New color to display 
     * @returns {void}
     */
    setForegroundColor(severity, color) {
        const instSev = this.severityInfo.get(severity);

        instSev.foregroundColor = color;

        this.severityInfo.set(severity, instSev);
    }

    /**
     * Set a custom prefix for a specified severity level
     * @param {number} severity - Enum value for the chosen severity
     * @param {string} prefix - New prefix to store 
     * @returns {void}
     */
    setPrefix(severity, prefix) {
        const instSev = this.severityInfo.get(severity);

        instSev.prefix = prefix;

        this.severityInfo.set(severity, instSev);
        this._setMaxPrefixLen();
    }

    // Outward facing logging methods

    /**
     * Logs a fatal error
     * @param {*} input - The error input to log
     * @returns {void}
     */
    fatal(input) {
        this._out(input, this.severity.fatal);
    }
    
    /**
     * Logs a critical error
     * @param {*} input - The error input to log
     * @returns {void}
     */
    critical(input) {
        this._out(input, this.severity.critical);
    }

    /**
     * Logs a warning
     * @param {*} input - The warning input to log
     * @returns {void}
     */
    warning(input) {
        this._out(input, this.severity.warning);
    }

    /**
     * Logs specified information
     * @param {*} input - The input to log
     * @returns {void}
     */
    info(input) {
        this._out(input, this.severity.info);
    }

    /**
     * Logs a debug string
     * @param {*} input - The debug input to log
     * @returns {void}
     */
    debug(input) {
        this._out(input, this.severity.debug);
    }
}

module.exports = SimpleLoggerW;

const t = new SimpleLoggerW();