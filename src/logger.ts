import { createLogger, format, transports } from "winston";
import * as path from "path";
import * as fs from "fs";

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const log_directory = path.join(__dirname, "logs");
const log_file_path = path.join(log_directory, "error.log");
const info_log_file_path = path.join(log_directory, "info.log");

// Create the 'logs' directory asynchronously
fs.promises.mkdir(log_directory, { recursive: true }).catch((err) => {
  console.error(`Error creating logs directory: ${err}`);
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: log_file_path, level: "error" }),
    new transports.File({ filename: info_log_file_path, level: "info" }),
  ],
});

export default logger;
