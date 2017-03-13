<style lang="sass" scoped>
    .editor-wrapper {
        display: block;
        cursor: pointer;
        min-height: 3rem;
        line-height: 2rem;
        padding: 0 1rem;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .commit-block {
        border-top: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        margin: .5rem 0 1rem 0;
        li {
            // box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2)
        }
        .collapsible-header {
            display: block;
            cursor: pointer;
            min-height: 3rem;
            line-height: 3rem;
            padding: 0 1rem;
            background-color: #fff;
            border-bottom: 1px solid #ddd;
        }
        li.category {
            padding: 0 1rem;
            display: flex;
            .radio-wrap {
                flex: 1;
                *zoom: 1;
                &:before, &:after {
                    content: "";
                    display: table
                }
                &:after {
                    clear: both;
                }

                p {
                    float: left;
                }
            }
            .input-field {
                flex: 1
            }
        }
    }
</style>
<template>  
    <form class="col s6" v-on:submit.prevent="submit">
        <br/>
        <ul class="commit-block" data-collapsible="accordion" v-show="editorShow">
            <li class="block_title">
                <div class="collapsible-header">
                    发布话题
                </div>
            </li>
            <li class="category">
                <div class="radio-wrap">
                    <p>
                        <input v-model="tab" value="share" type="radio" id="test1"/>
                        <label for="test1">分享</label>
                    </p>
                    <p>
                        <input v-model="tab" value="ask" type="radio" id="test2" />
                        <label for="test2">问答</label>
                    </p>
                    <p>
                        <input v-model="tab" value="job" type="radio" id="test3"  />
                        <label for="test3">招聘</label>
                    </p>
                </div>
                <div class="input-field">
                    <input id="last_name" type="text" v-model="title" v-bind:class="active" v-on:input="check"/>
                    <label for="last_name" v-bind:class="active">标题字数 10 字以上</label>
                </div>
            </li>
            <li>
                <div class="editor-wrapper">
                    <textarea id="editor" placeholder="Content here ...."></textarea>
                </div>
            </li>
            <li class="more">
                <div class="collapsible-header">
                    <button class="waves-effect waves-light btn" type="submit" name="action">提交
                        <!--<i class="material-icons right">send</i>-->
                    </button>
                </div>
            </li>
        </ul>
        <div v-show="submitSwitch" class="loading">
            <cm-loading></cm-loading>
        </div>
    </form>
</template>
<script type="text/babel">
    import axios from 'axios';
    import Vue from 'vue';

    import Auth from '../services/authToken';
    import Load from '../compontents/Load';

    Vue.component('cm-loading', Load);
    export default {
        name: "cm-new-topic",
        data () {
            return {
                editorShow: false,
                editor: null,
                active: "",
                title: "",
                submitSwitch: false,
                submitValidate: false,
                tab: ""
            }
        },
        methods : {
            check (event) {

                if(!this.title.length) {
                    this.active = "";
                    this.submitValidate = false;
                } else {
                    if (/^[A-Za-z0-9\u4E00-\u9FA5]{10,}$/.test(this.title)) {
                        this.active = "active";
                        this.submitValidate = true;
                    } else {
                        this.active = "active invalid";
                        this.submitValidate = false;
                    }
                }
            },
            submit () {
                let self = this;

                const token = Auth.getLocalToken() && Auth.getLocalToken().user_accessToken ? Auth.getLocalToken().user_accessToken : "";
                
                if(!this.submitValidate || !this.tab || !self.editor.codemirror.getValue()) {
                    return false;
                }
                this.submitSwitch = true;
                axios.post('https://cnodejs.org/api/v1/topics', {
                    accesstoken: token,
                    title: self.title,
                    tab: self.tab,
                    content: self.editor.codemirror.getValue()
                })
                .then((response) => {
                    self.submitSwitch = false;
                    if(response.data.success) {
                        window.location.href = "/#/"+self.tab+"/"+response.data.topic_id;
                    }
                })
                .catch((error) => {
                    self.submitSwitch = false;
                    console.log(error)
                });
            }
        },
        mounted () {
            let initEditor = () => {
                try {
                    this.editor = new Editor({
                        status: []
                    });
                    this.editor.render();
                    this.editorShow = true;
                } catch (error) {
                    console.log(error)
                }
            }

            if (typeof Editor === "undefined") {
                let editorStyle = document.createElement("link");
                editorStyle.setAttribute("href","//cdn.jsdelivr.net/editor/0.1.0/editor.css");
                editorStyle.setAttribute("rel","stylesheet");
                document.querySelector("head").append(editorStyle);

                let editorCoreScript = document.createElement("script");
                editorCoreScript.setAttribute("src","//cdn.jsdelivr.net/editor/0.1.0/editor.js");
                editorCoreScript.setAttribute("type","text/javascript");
                document.querySelector("body").append(editorCoreScript);

                let editorMdScript = document.createElement("script");
                editorMdScript.setAttribute("src","//cdn.jsdelivr.net/editor/0.1.0/marked.js");
                editorMdScript.setAttribute("type","text/javascript");
                document.querySelector("body").append(editorMdScript);

                editorCoreScript.addEventListener("load", () => {
                    editorCoreScript.setAttribute("load","done");
                    if(editorMdScript.getAttribute("load") === "done") {
                        initEditor()
                    }
                }, false);

                editorMdScript.addEventListener("load", () => {
                    editorMdScript.setAttribute("load","done");
                    if(editorCoreScript.getAttribute("load") === "done") {
                        initEditor()
                    }
                }, false);
                
            } else {
                initEditor()
            }
        }
    }

</script>