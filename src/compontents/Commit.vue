<style lang="sass" scoped>
    #editor-wrapper {
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
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2)
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
    }
</style>
<template>
    <div>
        <ul class="commit-block" data-collapsible="accordion" v-show="editorShow">
            <li class="block_title">
                <div class="collapsible-header">
                    添加回复
                </div>
            </li>
            <li>
                <div id="editor-wrapper">
                    <textarea id="editor" placeholder="Content here ...."></textarea>
                </div>
            </li>
            <li class="more">
                <div class="collapsible-header">
                    <a href="javascript:;" @click="commit">回复 <em class="fa fa-angle-right" aria-hidden="true"></em></a>
                </div>
            </li>
        </ul>
        <div v-show="submitSwitch" class="loading">
            <cm-loading></cm-loading>
        </div>
    </div>
</template>
<script type="text/babel">
    import axios from 'axios';

    import Auth from '../services/authToken';
    import Load from '../compontents/Load';

    export default {
        name: "cm-commit",
        data () {
            return {
                editorShow: false,
                editor: null,
                submitSwitch: false
            }
        },
        props: ["topicId", "replyId"],
        methods : {
            commit () {
                let self = this;
                const token = Auth.getLocalToken() && Auth.getLocalToken().user_accessToken ? Auth.getLocalToken().user_accessToken : "";
                if(!self.editor.codemirror.getValue()) {
                    return false;
                }
                this.submitSwitch = true;
                axios.post('https://cnodejs.org/api/v1/topic/' + this.topicId+ "/replies", {
                    accesstoken: token,
                    content: self.editor.codemirror.getValue(),
                    reply_id: this.replyId ? this.replyId : ""
                })
                .then((response) => {
                    self.submitSwitch = false;
                    console.log(response);
                })
                .catch((error) => {
                    self.submitSwitch = false;
                });
            }
        },
        mounted () {

            // console.log(this.topicId, this.replyId)
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
        },
        components: {
            "cm-loading": Load
        }
    }

</script>