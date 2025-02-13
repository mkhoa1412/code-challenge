import { transports, format } from 'winston';
import expressWinston from 'express-winston';
import { Cradle } from '@/container';
import { env } from "@/config";

export const requestLogger = (deps: Cradle) => expressWinston.logger({
    level: env.LOG_LEVEL,
    transports: [
        new transports.Console()
    ],
    format: format.combine(
        format.json()
    ),
    // skip: env.NODE_ENV === 'test',
    msg: "{{req.method}} | {{res.statusCode}} | {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: (env.NODE_ENV === 'test') ? () => true :
        function (req, res) {
            if (req.path.match(/^\/doc\/.+/)) return true;
            return false;
        },
});
