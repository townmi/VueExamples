/**
 * 
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './root';

import Auth from './services/authToken';

Vue.use(VueRouter);

import Home from './routes/Home';
import Login from './routes/Login';
import Topic from './routes/Topic';
import NewTopic from './routes/NewTopic';
import Member from './routes/Member';

const auth = (to, from, next) => {
    const token = Auth.getLocalToken();
    let userInfo;
    if(!!token) {
        Auth.authToken(token.user_accessToken)
        .then((lastData) => {
            if(lastData.status === "success") {
                userInfo = lastData.data;
                to.name === "login" ? next("home") : next();
            } else {
                Auth.delLocalToken();
                next("login");
            }
        });
    } else {
        Auth.delLocalToken();
        to.name === "login" ? next() : next("login");
    }
}

const routes = [
    { name: 'home', path: '/', component: Home },
    { name: 'login', path: '/login', component: Login, beforeEnter: auth },
    { name: 'member', path: '/user/:username', component: Member },
    { name: 'newTopic', path: '/new', component: NewTopic },
    { name: 'topic', path: '/:tab/:id', component: Topic },
    { path: '*', redirect: '/' }
]

const router = new VueRouter({
    routes,
    mode: 'hash'
});

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#root');


