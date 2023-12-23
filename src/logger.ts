// logger.ts

import { createLogger, format, transports } from "winston";
import * as path from "path";
import * as fs from "fs";

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logDirectory = path.join(__dirname, "logs");
const logFilePath = path.join(logDirectory, "error.log");
const infoLogFilePath = path.join(logDirectory, "info.log");

// Create the 'logs' directory asynchronously
fs.promises.mkdir(logDirectory, { recursive: true }).catch((err) => {
  console.error(`Error creating logs directory: ${err}`);
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logFilePath, level: "error" }),
    new transports.File({ filename: infoLogFilePath, level: "info" }),
  ],
});

export default logger;
