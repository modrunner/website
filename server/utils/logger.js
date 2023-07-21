import { Logtail } from '@logtail/node';

const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

export const logger = {
	info(data) {
		logtail.info(...data);
		logtail.flush();
	},
	error(message, data = {}) {
		logtail.error(message, data);
		logtail.flush();
	},
};
