const winston = require('winston')
const tsFormat = () => (new Date()).toLocaleTimeString()
const logger = new(winston.Logger)({
    transports: [
        new(require('winston-daily-rotate-file'))({
            datePattern: 'YYYY-MM-DD',
            prepend: true,
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            filename: `${__dirname}/../logs/error-%DATE%.log`,
            timestamp: tsFormat,
            level: 'info',
        }),
    ],
})

module.exports = logger
