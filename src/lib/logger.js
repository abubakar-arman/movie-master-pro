import pino from 'pino';

const isBrowser = typeof window !== 'undefined';

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
        : {
            // server-side output + pretty printing
            transport: { target: 'pino-pretty' },
        }),
});

export default logger;