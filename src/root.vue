<style lang="sass" scoped>
    .root {
        .fixed-action-btn {
            ul .btn-floating {
                transform: scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0px);
            }
            &.active {
                ul .btn-floating {
                    transform: scaleY(1) scaleX(1) translateY(0px) translateX(0px);
                    opacity: 1;
                }
            }
        }
        .avatar {
            img {
                width: 30px;
                vertical-align: middle;
                border-radius: 100%;
            }
        }
        
    }
    .content {
        min-height: calc(100vh - 245px);
        position: relative;
        overflow: hidden;
    }
    @media only screen and (max-width: 768px) {
        .container {
            width: 100%;
        }
        footer {
            .container {
                width: 90%;
            }
        }
    }
</style>
<template>
    <div class="root">
        <cm-nav></cm-nav>
        <div class="container">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
        <footer class="page-footer blue accent-4">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">CNODE BY VUE2</h5>
                        <p class="grey-text text-lighten-4">...</p>
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">友情社区</h5>
                        <ul>
                            <li><a class="grey-text text-lighten-3" href="https://cnodejs.org/">cnodejs.org</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container">
                    © {{new Date().getFullYear()}} Copyright HARRY TANG
                    <a class="grey-text text-lighten-4 right" href="#!">CNODE</a>
                </div>
            </div>
        </footer>

        <div v-bind:class="fixActionClass" v-on:mouseover="fixActionShow" v-on:mouseout="fixActionHide">
            <a class="btn-floating btn-large red">
                <i class="large material-icons">add</i>
            </a>
            <ul>
                <li><router-link to="/" class="btn-floating red"><i class="fa fa-home" aria-hidden="true"></i></router-link></li>
                <li v-if="showNewBar"><router-link to="/new" class="btn-floating yellow darken-1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></router-link></li>
                <li><a class="btn-floating green" v-on:click="toTop"><i class="material-icons">publish</i></a></li>
                <!--<li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>-->
            </ul>
        </div>
    </div>
</template>
<script type="text/babel">
    import Vue from 'vue';

    import Auth from './services/authToken';
    import NavStatus from './compontents/NavStatus';

    Vue.component('cm-nav', NavStatus);

    export default {
        name: 'root',
        data () {
            return {
                fixActionClass: "fixed-action-btn",
                showNewBar: false
            }
        },
        methods: {
            fixActionShow (event) {
                this.fixActionClass = "fixed-action-btn active";
            },
            fixActionHide (event) {
                this.fixActionClass = "fixed-action-btn";
            },
            toTop () {
                document.body.scrollTop = 0
            }
        },
        mounted () {
            const userInfo = Auth.getLocalToken();
            if(!!userInfo) {
                this.showNewBar = true;
            }
        }
    }
</script>