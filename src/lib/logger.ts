import pino, { Logger } from "pino";

const logger: Logger = pino({
  level: process.env.PINO_LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  redact: ["password", "token", "secret"],
});

export default logger;
