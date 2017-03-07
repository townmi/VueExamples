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
            <Home />
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

        <div class="fixed-action-btn">
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
<script>

	import Home from './compontents/Home';
    export default {

    }
</script>