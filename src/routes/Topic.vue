<style lang="sass" scoped>
    .topic {
        img {
            max-width: 100%;
        }
        nav {
            background-color: transparent;
            box-shadow: none
        }
        .breadcrumb {
            color: rgba(41, 98, 255, 0.7);
            &:before {
                color: rgba(41, 98, 255, 0.7);
            }
            &:first-child {
                color: #2962FF;
            }
        }
    }
    .root {
        background-color: #f2f2f2;
    }
    @media only screen and (max-width: 768px) {
        nav .nav-wrapper {
            width: 90%;
            padding-top: 15px;
            margin: 0 auto;
            &>div {
                line-height: 1em;
            }
        }

        span.breadcrumb {
            display: inline-block;
            width: 80%;
            line-height: 22px;
            position: relative;
            top: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .body {
            width: 90%;
            margin: 0 auto;
        }
    }
</style>
<template>
    <div class="topic">
        <div v-if="!dataFetchDown" class="loading">
            <cm-loading></cm-loading>
        </div>
        <nav>
            <div class="nav-wrapper">
                <div class="col s12" v-if="topic">
                    <router-link :to="{name:'home', params:{ tab: tab }}" class="breadcrumb"> {{ tabs[tab].title }} </router-link>
                    <span class="breadcrumb">{{ topic.title }}</span>
                </div>
            </div>
        </nav>
        <div class="row">
            <div class="col s12 m12">
                <div class="body" v-html="topic && topic.content">
                    <!--{{topic && topic.content}}-->
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import axios from 'axios';
    import Vue from 'vue';

    import {markdown} from 'markdown';

    import Load from '../compontents/Load';

    Vue.component('cm-loading', Load);

    export default {
        data () {
            return {
                dataFetchDown: false,
                topic: null,
                tab: null,
                tabs: {
                    "all": {
                        title: "全部"
                    },
                    "good": {
                        title: "精华"
                    },
                    "share": {
                        title: "分享"
                    },
                    "ask": {
                        title: "问答"
                    },
                    "job": {
                        title: "招聘"
                    }
                }
            }
        },
        methods: {
            getRoute () {
            }
        },
        mounted () {
            let self = this;
            const topicId  = this.$route.params.id;
            self.tab = this.$route.params.tab;
            
            axios.get('https://cnodejs.org/api/v1/topic/' + topicId, {
                params: {
                    mdrender: true
                }
            })
            .then((response) => {
                self.dataFetchDown = true;
                self.topic = response.data.data;
                // self.topic.content = markdown.toHTML( self.topic.content );
            })
            .catch((error) => {
                console.log(error);
                self.dataFetchDown = true;
            });
        }
    }
</script>