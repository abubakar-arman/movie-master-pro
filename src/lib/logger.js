import pino from 'pino';

const isBrowser = typeof window !== 'undefined';
const isDev = process.env.NODE_ENV === 'development';

const logger = pino({
    level: process.env.NEXT_PUBLIC_LOG_LEVEL ?? 'info',
    ...(isBrowser
        ? {
            browser: {
                asObject: true,
                // optional: keep it simple and just log via console
                write: (obj) => console.log(obj),
            },
        }
        : isDev
            ? {
                // pretty printing only in local development
                transport: { target: 'pino-pretty' },
            }
            : {}),
});

export default logger;