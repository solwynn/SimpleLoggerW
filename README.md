# SimpleLogger
A simple, no-dependency logger for Node.js

## Why?
Why not?

## Features

* Easy to use
* No dependencies
* 5 warning levels
* Configurable 16-bit color support
* Reasonable defaults. Works perfectly without ever having to touch a configuration method.
* Optional file output

## Quickstart
```js
const Logger = new SimpleLogger('./test.log');
Logger.fatal('Fatal test!');
Logger.critical('Critical test!');
Logger.warning('Warning test!');
Logger.info('Info test!');
Logger.debug('Debug test!');
```

![](https://i.imgur.com/xm8MLQH.png)  
![](https://i.imgur.com/u3G6VwP.png)


## Methods
`new Logger(filePath = null, consoleOut = true)` The instance constructor. Takes an optional file log path and an optional console out bool. If file path is not null, the write out settings will append logs to the given file. If the consoleOut bool is false, logging methods will not print to stderr. 
`Logger.fatal(any)` Logs a fatal error.  
`Logger.critical(any)` Logs a critical error.  
`Logger.warning(any)` Logs a warning.  
`Logger.info(any)` Logs an info string  
`Logger.debug(any)` Logs a debug string.
`Logger.setAttributes(severity, attributes)` Takes a severity (from the `Logger.severity` enum) and an array of attributes (`Logger.colors.attributes`) and defines the attributes for the given severity.  
`Logger.setBackgroundColor(severity, color)` Takes a severity and a background color (`Logger.colors.background`) and modifies the background color for the given severity  . 
`Logger.setForegroundColor(severity, color)` Takes a severity and a foreground color (`Logger.colors.background`) and modifies the foreground color for the given severity.
`Logger.setPrefix(severity, prefix)` Takes a severity and a prefix string and modifies the prefix string for the given severity.  
  
Examples:
```js
const SmartLogger = require('@wisnoi/SmartLogger');
const Logger = new SmartLogger();

Logger.setForegroundColor(Logger.severity.fatal, Logger.colors.foreground.green);
Logger.fatal('test'); // Outputs a fatal error string with green text.
```
## Structures

Every instance of SimpleLogger comes with an object containing a list of foreground colors, background colors, and text attributes.  
This object is instantiated at Logger.colors.
 
```js
/**
 * ANSI 16-bit Color declarations
 */
this.colors = 
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
```  
Each instance also contains an enumerable container for severity levels:

```js
this.severity = {
    fatal: 0,
    critical: 1,
    warning: 2,
    info: 3,
    debug: 4,
}
```

You can use these as arguments in the instance configuration methods.