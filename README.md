# Vue-Resource-Mock

**status: unstable, untested**

fake backend when using vue-resource

## Usage

```es6
// index.js

import Vue from 'vue';
import VueResource from 'vue-resource';
import VueResourceInterceptor from 'vue-resource-mock';

// your local route object
import Routes from './routes';

Vue.use(VueResource);
Vue.http.options.root = '/api';
Vue.http.interceptors.push(VueResourceInterceptor(Routes));

...
// rest of your Vue application.
```

```es6
// routes.js

export defaut {

    ['GET /api/hello'] (request, next) {
        let body = 'world!';
        next(request.respondWith(body, {status: 200}));
    },

};
```


## Sources

**Route Handlers**

- https://github.com/vuejs/vue-resource/blob/master/docs/http.md#interceptors