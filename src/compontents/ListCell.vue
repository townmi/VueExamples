<style lang="sass" scoped>
.collapsible-header {
    span.good, span.top, span.tab {
        padding: 2px 7px;
        margin-right: 0.5rem;
        border-radius: 2px;
        font-size: 12px;
        color: #ffffff;
    }
    span.good, span.top {
        background-color: #2962FF;
    }
    span.tab {
        background-color: #c4c4c4;
    }
    span.title {
        width: 70%;
        position: relative;
        top: 8px;
        display: inline-block;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    img {
        width: 100%;
        vertical-align: sub;
    }
}
.collapsible-body {
    .collapsible {
        display: none;
    }
}
.block_title {
    text-align: left;
}
.more {
    text-align: right;
    .fa {
        font-size: 16px;
    }
}
@media only screen and (max-width: 768px) {
    .collection {
        border-left: none;
        border-right: none;
        border-radius: 0;
    }
    .collection-item {
        .top-title {
            height: 22px;
            .tip {
                width: 13%;
                float: left;
                text-align: center;
                border-radius: 2px;
                color: #ffffff;
                font-size: 12px;
                &.good, &.top {
                    background-color: #2962FF;
                }
                &.tab {
                    background-color: #c4c4c4;
                }
            }
            .title {
                width: 85%;
                height: 22px;
                float: right;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .bottom-user {
            margin: 1rem 0 0 0;
            display: flex;
            &>div {
                height: 44px;
                flex: 1;
            }
            h6 {
                margin: 0;
                padding: 0;
                height: 22px;
                line-height: 22px;
                text-align: right;
                color: #757575;
                &:last-child {
                    padding: 0 6px;
                }
            }
            .avatar {
                width: 30%;
                max-width: 55px;
                height: 44px;
                line-height: 44px;
                overflow: hidden;
                float: left;
                text-align: left;
            }
            p {
                width: 70%;
                margin: 0;
                float: left;
                line-height: 22px;
                color: #333333;

                span {
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
        img {
            width: 80%;
            vertical-align: middle;
            border-radius: 5px;
        }
    }
}
</style>

<template>
    <ul :class="isMobile ? 'collection' : 'collapsible'" data-collapsible="accordion">
        <li class="block_title" v-if="title">
            <div class="collapsible-header">
                {{ title }}
            </div>
        </li>
        <li v-for="item in topicList" v-if="!isMobile">
            <div class="collapsible-header">
                <a :href="rePath(item.author.loginname)">
                    <i class="material-icons"><img v-bind:src="item.author.avatar_url"/></i>
                </a>
                <span class="good" v-if="!item.top && item.good" >精华</span>
                <span class="top" v-if="item.top">置顶</span>
                <span class="tab" v-if="!item.good && !item.top && item.tab">{{ routers[item.tab] && routers[item.tab].title }}</span>
                <router-link :to="{ name: 'topic', params: { tab: tab, id: item.id } }">
                    <span class="title">{{ item.title }}</span>
                </router-link>
                <span class="badge" v-if="item.reply_countn && item.visit_count">{{ item.reply_count + '/' + item.visit_count }}</span>
            </div>
        </li>
        <li class="collection-item" v-for="item in topicList" v-if="isMobile">
            <router-link :to="{ name: 'topic', params: { tab: tab, id: item.id } }">
                <div class="top-title">
                    <span class="tip good" v-if="!item.top && item.good">精华</span>
                    <span class="tip top" v-if="item.top">置顶</span>
                    <span class="tip tab" v-if="!item.good && !item.top && item.tab">{{ routers[item.tab] && routers[item.tab].title }}</span>
                    <span class="title">{{ item.title }}</span>
                </div>
                <div class="bottom-user">
                    <div>
                        <div class="avatar">
                            <a :href="rePath(item.author.loginname)">
                                <img v-bind:src="item.author.avatar_url"/>
                            </a>
                        </div>
                        <p>
                            <span> {{ item.author.loginname }} </span>
                            <span> {{ dateToLest(item.create_at) }} </span>
                        </p>
                    </div>
                    <div>
                        <h6>
                            <span class="badge"><span style="color: #2979ff;">{{ item.reply_count }}</span> {{ '/' + item.visit_count }}</span>
                        </h6>
                        <h6>{{ dateToLest(item.last_reply_at) }}</h6>  
                    </div>
                </div>
            </router-link>
        </li>
        <li class="more" v-if="title">
            <div class="collapsible-header">
                <a>查看更多 &nbsp;<em class="fa fa-angle-right" aria-hidden="true"></em></a>
            </div>
        </li>
    </ul>
</template>

<script type="text/babel">
    import { dateToLest } from '../services/utils';
    
    export default {
        name: "cm-list-cell",
        data () {
            return {
                isMobile: /mobile/i.test(navigator.userAgent),
                routers: {
                    "all": {
                        title: "全部",
                        tab: "all",
                        exact: true,
                        active: "active"
                    },
                    "good": {
                        title: "精华",
                        tab: "good",
                        exact: true,
                        active: ""
                    },
                    "share": {
                        title: "分享",
                        tab: "share",
                        exact: true,
                        active: ""
                    },
                    "ask": {
                        title: "问答",
                        tab: "ask",
                        exact: true,
                        active: ""
                    },
                    "job": {
                        title: "招聘",
                        tab: "job",
                        exact: true,
                        active: ""
                    }
                }
            }
        },
        props: ["topicList", "tab", "title"],
        methods: {
                dateToLest: dateToLest,
                rePath (loginname) {
                    return "/user/"+loginname; 
                }
        },
        mounted () {
        }
    };
</script>