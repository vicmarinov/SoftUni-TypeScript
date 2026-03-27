enum LoggingLevel {
    Info = 'Info',
    Error = 'Error',
    Warning = 'Warning',
    Debug = 'Debug',
};

enum LoggingFormat {
    Standard = '[%level][%date] %text',
    Minimal = '*%level* %text'
};

interface CachingLogger<T extends LoggingLevel, V extends LoggingFormat> {
    cachedLogs: Map<T, string[]>;
    log (logLevel: T, message: string): void;
    getFormat (): V;
}

class Logger<L extends LoggingLevel, F extends LoggingFormat> implements CachingLogger<L, F> {
    public cachedLogs: Map<L, string[]> = new Map<L, string[]>();
    private loggingFormat: F;

    constructor (loggingFormat: F) {
        this.loggingFormat = loggingFormat;
    }

    public log (logLevel: L, message: string): void {
        if (!this.cachedLogs.has(logLevel)) {
            this.cachedLogs.set(logLevel, []);
        }
        
        const logRecord: string = this.loggingFormat
            .replaceAll('%level', logLevel)
            .replaceAll('%date', new Date().toISOString())
            .replaceAll('%text', message);

        this.cachedLogs
            .get(logLevel)!
            .push(logRecord);
        
        console.log(logRecord);
    }

    public getFormat (): F {
        return this.loggingFormat;
    }
}

console.log('\nTest 1:');
console.log('========================================================');

const logger1 = new Logger<LoggingLevel, LoggingFormat>(LoggingFormat.Standard);

logger1.log(LoggingLevel.Info, 'This is an info message.');
logger1.log(LoggingLevel.Info, 'Another message.');
logger1.log(LoggingLevel.Error, 'Something went wrong.');
logger1.log(LoggingLevel.Warning, 'Be careful with the type assertions.');
logger1.log(LoggingLevel.Debug, 'Running the debugger.');

console.log('-----------');

console.log(
    [...logger1.cachedLogs.entries()]
        .map(x => x[1].join('\n'))
        .join('\n')
);

console.log('\nTest 2:');
console.log('========================================================');

const logger2 = new Logger<LoggingLevel, LoggingFormat>(LoggingFormat.Minimal);

logger2.log(LoggingLevel.Info, 'Just a simple message.');
logger2.log(LoggingLevel.Error, 'A Problem happened.');

console.log('-----------');

console.log(logger2.getFormat());
console.log(
    [...logger2.cachedLogs.entries()]
        .map(x => x[1].join('\n'))
        .join('\n')
);

// The following should produce TS errors:

// console.log('\nTest 3:');
// console.log('========================================================');

// const logger3 = new Logger<LoggingLevel, LoggingFormat>('%text');

// const wrongLogger = new Logger<string, LoggingLevel>();

// logger3.log('%s', 'Running the debugger.');
// logger3.log({ format: 'Test %s' }, 'Running the debugger.');