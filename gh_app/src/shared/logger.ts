// logger.ts
type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private format(level: LogLevel, message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    let log = `[${timestamp}] [${this.context}] [${level.toUpperCase()}] ${message}`;
    if (meta) {
      log += ` | ${JSON.stringify(meta)}`;
    }
    return log;
  }

  info(message: string, meta?: any) {
    console.log(this.format("info", message, meta));
  }

  warn(message: string, meta?: any) {
    console.warn(this.format("warn", message, meta));
  }

  error(message: string, meta?: any) {
    console.error(this.format("error", message, meta));
  }

  debug(message: string, meta?: any) {
    if (process.env.DEBUG) {
      console.log(this.format("debug", message, meta));
    }
  }
}

export const createLogger = (context: string) => new Logger(context);
