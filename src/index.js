import UrlPattern from 'url-pattern';

/**
 * Route Map Creator
 * @param  {[type]} map [description]
 * @return {[type]}     [description]
 */
export const mapRoutes = (map) => {
	// https://www.npmjs.com/package/url-pattern
	return Object.keys(map)
		.reduce((result, route) => {
			let [method, url] = route.split(),
				handler = routes[route];

			if (handler.constructor.name === 'Function') {
				result.concat([{
					method: method,
					pattern: new UrlPattern(url),
					handler: handler
				}]);
			} else if (handler.constructor.name === 'Object') {
				result.concat(mapRoutes(handler));
			} else {
				throw new Error('Routes must be an object or function');
			}

		}, []);
};

/**
 * Interceptor Middleware
 * @param  {object} routes   route definition object
 * @return {function}        middleware function
 */
export const MockServer = (routes) => {
	let Routes = mapRoutes(routes);

	// https://github.com/vuejs/vue-resource/blob/master/docs/http.md#interceptors
	return (request, next) => {

		let route = Routes.filter((item) => {
			return request.method === item.method && !!item.pattern.match(request.url);
		});

		if (!route) {
			next(request.respondWith({
				status: 404,
				statusText: 'Not Found',
			}));
		} else {
			next(request.respondWith(route.handler(request, next)));
		}

		return;
	};

}

