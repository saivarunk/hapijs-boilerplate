const winston = require('winston');
const path = require('path');

const options = {
  file: {
    filename: path.join(process.cwd(), 'logs', 'app.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new (winston.transports.Console)(),
  ],
});

module.exports = logger;
