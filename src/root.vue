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
}
</style>
<template>
    <div class="root">
        <nav class="blue accent-4">
            <div class="nav-wrapper container">
                <a href="#" class="brand-logo">FaceTime</a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="#">首页</a></li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <cm-home></cm-home>
        </div>
        <footer class="page-footer blue accent-4">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">FaceTime website CMS</h5>
                        <p class="grey-text text-lighten-4">...</p>
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">其他系统</h5>
                        <ul>
                            <li><a class="grey-text text-lighten-3" href="#!">FaceTime</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container">
                    © 2014 Copyright FaceTime
                    <a class="grey-text text-lighten-4 right" href="#!">FaceTime</a>
                </div>
            </div>
        </footer>

        <div v-bind:class="fixActionClass" v-on:mouseover="fixActionShow" v-on:mouseout="fixActionHide">
            <a class="btn-floating btn-large red">
                <i class="large material-icons">mode_edit</i>
            </a>
            <ul>
                <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
                <li><a class="btn-floating yellow darken-1"><i
                    class="material-icons">format_quote</i></a></li>
                <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
                <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
            </ul>
        </div>
    </div>
</template>
<script type="text/babel">
    import Vue from 'vue';
	import Home from './compontents/Home.vue';

    Vue.component('cm-home', Home);

    export default {
        name: 'root',
        data () {
            return {
                fixActionClass: "fixed-action-btn"
            }
        },
        methods: {
            fixActionShow: function (event) {
                this.fixActionClass = "fixed-action-btn active";
            },
            fixActionHide: function (event) {
                this.fixActionClass = "fixed-action-btn";
            }
        }
    }
</script>