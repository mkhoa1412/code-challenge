import winston, { format, transports } from 'winston';
import { consoleFormat } from "winston-console-format";
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from '@/config';

const LOG_NS = '99t';

const nsFormat = winston.format(info => {
    const { ns, message, ...restInfo } = info as any;
    const time = new Date();
    return {
        message: ns ? `${time.toISOString()} ${ns}: ${message}` : message,
        ...restInfo,
    }
});

const createConsoleTransport = () => new transports.Console({
    format: format.combine(
        nsFormat(),
        format.colorize({
            all: true,
            colors: {
                verbose: 'grey',
                debug: 'grey',
                info: 'brightGreen',
                warn: 'yellow',
                error: 'bgRed',
            }
        }),
        format.padLevels({
            levels: {
                verbose: 6,
                debug: 6,
                info: 6,
                warn: 6,
                error: 6,
            }
        }),
        consoleFormat({
            showMeta: true,
            inspectOptions: {
                depth: Infinity,
                colors: true,
                maxArrayLength: Infinity,
                breakLength: 120,
                compact: Infinity,
            },
        })
    ),
});

const _transports = [] as any[];
const isProd = env.NODE_ENV == 'prod';
if(!isProd) {
    _transports.push(createConsoleTransport())
} else {
    const _t = new DailyRotateFile({
        dirname: 'logs',
        filename: `${LOG_NS}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '3d'
    });
    _t.on('error', (err) => {

        console.log('Transport error', err);
    });
    _t.on('rotate', (oldFile, newFile) => {
        console.log('Transport rotate', { oldFile, newFile });
    });
    _transports.push(_t);
}

const loggerFormat = isProd ? [
    format.timestamp(),
    format.splat(),
    format.json()
] : [    
    format.errors({ stack: true }),
    format.splat(),
    format.json()
]

export const logger = winston.createLogger({
    level: env.LOG_LEVEL || 'info',
    format: format.combine(...loggerFormat),
    transports: _transports,
    silent: env.NODE_ENV === 'test',
});

export const getChildLogger = (ns: string, parentLogger?: winston.Logger) => {
    return (parentLogger || logger).child({ ns });
}

export type Logger = winston.Logger;