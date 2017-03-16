<style lang="sass" scoped>
    nav {
        img {
            width: 30px;
            vertical-align: middle;
            border-radius: 100%;
        }
    }
</style>
<template>
    <nav class="blue accent-4">
        <div class="nav-wrapper container">
            <a href="/" class="brand-logo">CNODE</a>
            <ul class="right hide-on-med-and-down">
                <li><a href="/">首页</a></li>
                <li><a href="/">新手入门</a></li>
                <li v-if="!authStatus"><router-link to="/login">登录</router-link></li>
                <li v-if="authStatus" class="avatar">
                    <router-link :to="{ name: 'member', params: { id: authInfo.user_name } }">
                        <img :src="authInfo && authInfo.user_avatar" :title="authInfo && authInfo.user_name"/>
                    </router-link>
                </li>
                <li v-if="authStatus"><a href="javascript:;" @click="logout">退出</a></li>
            </ul>
        </div>
    </nav>
</template>
<script type="text/babel">
    import Auth from '../services/authToken';

    export default {
        name: 'root',
        data () {
            return {
                authStatus: false,
                authInfo: null
            }
        },
        methods: {
            logout () {
                Auth.delLocalToken();
                return window.location.reload();
            }
        },
        mounted () {
            const userInfo = Auth.getLocalToken();
            if(!!userInfo) {
                this.authStatus = true;
                this.authInfo = userInfo;
            }
        }
    }
</script>