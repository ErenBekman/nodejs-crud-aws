const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'book-service' },
  transports: [
    new winston.transports.File({ filename: './logs/book/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/book/info.log', level: 'info' }),
    new winston.transports.File({ filename: './logs/book/combined.log' }),
  ],
});

module.exports = logger;