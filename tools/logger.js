"use strict"

var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'error-file',
            filename: 'logs/error.log',
            level: 'error'
        }),
        new (winston.transports.File)({
            name: 'warn-file',
            filename: 'logs/warn.log',
            level: 'warn'
        }),
        new (winston.transports.File)({
            name: 'info-file',
            filename: 'logs/info.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'debug-file',
            filename: 'logs/debug.log',
            level: 'debug'
        }),
        new (winston.transports.Console)({
            name: 'console',
            level: 'debug'
        })
    ]
});


module.exports = logger;

/*

{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
{ emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }


    logger.error("error");
    logger.warn('warn');
    logger.info('debug');
    logger.debug('debug');

*/