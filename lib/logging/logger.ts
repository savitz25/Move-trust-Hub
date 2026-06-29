type LogLevel = 'info' | 'warn' | 'error';

type LogContext = Record<string, unknown>;

function emit(level: LogLevel, event: string, context?: LogContext) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    event,
    service: 'move-trust-hub',
    ...context,
  };

  const line = JSON.stringify(payload);

  if (level === 'error') {
    console.error(line);
  } else if (level === 'warn') {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info: (event: string, context?: LogContext) => emit('info', event, context),
  warn: (event: string, context?: LogContext) => emit('warn', event, context),
  error: (event: string, context?: LogContext) => emit('error', event, context),
};