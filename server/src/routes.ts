const root = '/api';

const routes = {
	root,
	getCards: `${root}/cards`,
} as const;

export default routes;
