/**
 * 
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './root';

Vue.use(VueRouter);

import Home from './routes/Home';
import Login from './routes/Login';
import Topic from './routes/Topic';

const routes = [
    { name: 'home', path: '/', component: Home },
    { name: 'login', path: '/login', component: Login },
    { name: 'topic', path: '/topic/:id', component: Topic }
]

const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#root');
