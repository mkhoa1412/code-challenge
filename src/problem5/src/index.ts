import container from "@/container";

const logger = container.resolve('logger');

const startApp = async () => {
    const db = container.resolve('db');
    await db.init();

    container.resolve('server');
}

const handleCloseSignal = async (isException: boolean, info?) => {
    if (isException) {
        logger.error('Server error', info);
    } else {
        logger.info("Sigint, cleaning up", info);
    }

    setTimeout(
        () => process.exit(1),
        5000,
    ).unref();

    try {
        // const server = container.resolve('server');
        await container.dispose();
        logger.info('Container disposed');
    } catch(err) {
        console.log('Unable to exit server: ' + err.message);
        process.exit(1);
    }
};

startApp();

process.on("SIGQUIT", () => handleCloseSignal(false, { sig: 'SIGQUIT' }));
process.on("SIGINT", () => handleCloseSignal(false, { sig: 'SIGINT' }));
process.on("SIGTERM", () => handleCloseSignal(false, { sig: 'SIGTERM' }));
process.on('uncaughtException', (err, origin) => handleCloseSignal(true, { err, origin }));