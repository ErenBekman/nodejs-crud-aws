const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'auth-service' },
  transports: [
    new winston.transports.File({ filename: './logs/auth/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/auth/info.log', level: 'info' }),
    new winston.transports.File({ filename: './logs/auth/combined.log' }),
  ],
});

module.exports = logger;