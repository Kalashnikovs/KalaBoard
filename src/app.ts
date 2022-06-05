import { Server } from './core/Server';
import { Logger } from './core/Logger';
import { StaticConfig } from './config/StaticConfig';

const server = new Server();

server.listen(StaticConfig.get('PORT'), () => {
	Logger.info('Listening on Port: %d', StaticConfig.get('PORT'));
});

process.on('unhandledRejection', (reason: Error) => {
	Logger.error('Unhandled Promise Rejection: reason:', reason.message);
	Logger.error(reason.stack);
});
