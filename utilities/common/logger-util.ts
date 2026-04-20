import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const logFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level.toUpperCase()} ${message}`;
});

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: 'logs/test-log-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d', // keep logs for 14 days
  level: 'info',
});

// Create Winston logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(), // pretty console logs
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      )
    }),
    dailyRotateFileTransport // rolling file logs
  ],
  exitOnError: false,
});

export default logger;
