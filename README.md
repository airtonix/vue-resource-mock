# Vue-Resource-Mock

fake backend when using vue-resource

## Usage

```es6

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
