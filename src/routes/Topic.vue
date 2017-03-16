<style lang="sass" scoped>
    .topic {
        img {
            max-width: 100%;
        }
        nav {
            margin-top: 10px;
            line-height: 42px;
            height: 42px;
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
        #editor {
            width: 100%;
            height: 300px;
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
                <div v-if="topicInfo">
                    <router-link :to="{name:'home', params:{ tab: tab }}" class="breadcrumb"> {{ tab && getTab(tab) }} </router-link>
                    <span class="breadcrumb">{{ topicInfo.title && topicInfo.title }}</span>
                </div>
            </div>
        </nav>
        <div class="row">

            <div class="col s12 m12 grey-text">
                  •&nbsp;发布于 <span>{{ topicInfo && dateToLest(topicInfo.create_at) }}</span> &nbsp;&nbsp;•&nbsp;作者 <span>{{ topicInfo && topicInfo.author.loginname }}</span>&nbsp;&nbsp;•&nbsp;<span>{{ topicInfo && topicInfo.visit_count}}</span>次浏览&nbsp;&nbsp;•&nbsp;来自 <span>{{ getTab(tab) }}</span>
            </div>
            <div class="col s12 m12">
                <div class="body" v-html="topicInfo && topicInfo.content">
                    <!--{{topic && topic.content}}-->
                </div>
                <br/>
                <ul class="collection" v-if="topicInfo && topicInfo.replies.length && topicInfo.replies" >
                    <cm-reply :replyInfo="item" v-for="(item, index) in topicInfo.replies" :authorId="topicInfo.author_id " :index="index" :key="topicInfo.id"></cm-reply>
                </ul>
                <br/>
                <cm-commit :topicId="topicInfo.id" v-if="authToken && topicInfo"></cm-commit>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import axios from 'axios';

    import { dateToLest } from '../services/utils';
    import Auth from '../services/authToken';

    import Load from '../compontents/Load';
    import Reply from '../compontents/Reply';
    import Commit from '../compontents/Commit';

    export default {
        data () {
            return {
                dataFetchDown: false,
                topicInfo: null,
                tab: null,
                authToken: false
            }
        },
        methods: {
            getTab (tabEn) {
                let tab = "";
                switch (tabEn) {
                    case "all":
                        tab = "全部";
                        break;
                    case "good":
                        tab = "精华";
                        break;
                    case "share":
                        tab = "分享";
                        break;
                    case "ask":
                        tab = "问答";
                        break;
                    case "job":
                        tab = "招聘";
                        break;
                    default:
                        tab = "全部";
                        break;
                }
                return tab;
            },
            dateToLest: dateToLest
        },
        mounted () {
            const token = Auth.getLocalToken() && Auth.getLocalToken().user_accessToken ? Auth.getLocalToken().user_accessToken : "";
            if(!!token && /^[a-z0-9\-]+$/g.test(token)) {
                this.authToken = true;
            }
            
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
                self.topicInfo = response.data.data;
                console.log(self.topicInfo)
            })
            .catch((error) => {
                self.dataFetchDown = true;
            });

        },
        components: {
            "cm-loading": Load, 
            "cm-reply": Reply,
            "cm-commit": Commit
        }
    }
</script>