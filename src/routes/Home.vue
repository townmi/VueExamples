<style lang="sass" scoped>
    .content {
        nav {
            background-color: transparent;
            box-shadow: none;
            margin-bottom: 30px;
        }
        .link {
            padding: 0 25px;
            color: #2962FF;
            &.active {
                background-color: #2962FF;
                color: #ffffff;
                box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
            }
        }
        .breadcrumb {
            color: rgba(41, 98, 255, 0.7);
            &:before {
                color: rgba(41, 98, 255, 0.7);
            }
            &:last-child {
                color: rgba(41, 98, 255, 1);
            }
        }
        .collapsible, .row:last-child {
            margin-bottom: 0;
        }
        .pagination {
            padding: 15px 0;
            text-align: center;
            li.active {
                background-color: #2962FF;
            }
        }
    }
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
    @media only screen and (max-width: 768px) {
        nav .nav-wrapper {
            width: 90%;
            margin: 0 auto;
        }
        nav ul.left {
            width: 100%;
            li {
                width: 20%;
            }
            .link {
                padding: 0;
                text-align: center;
            }
        }
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
    <div>
        <nav>
            <div class="nav-wrapper">
                <ul class="left">
                    <li v-for="cell in routers"><a href="#" :class="cell.tab === tab ? 'link active': 'link'" v-on:click="fetch(cell)">{{ cell.title }}</a></li>
                </ul>
            </div>
        </nav>
        <div v-if="!dataFetchDown" class="loading">
            <cm-loading></cm-loading>
        </div>
        <ul :class="isMobile ? 'collection' : 'collapsible'" data-collapsible="accordion" v-if="topicList.length">
            <li v-for="item in topicList" v-if="!isMobile">
                <router-link :to="{ name: 'topic', params: { tab: tab, id: item.id } }">
                    <div class="collapsible-header">
                        <router-link :to="{ name: 'member', params: { username: item.author.loginname } }">
                            <i class="material-icons"><img v-bind:src="item.author.avatar_url"/></i>
                        </router-link>
                        <span class="good" v-if="item.good">精华</span>
                        <span class="top" v-if="item.top">置顶</span>
                        <span class="tab" v-if="!item.good && !item.top">{{ routers[item.tab] && routers[item.tab].title }}</span>
                        <span class="title">{{ item.title }}</span>
                        <span class="badge">{{ item.reply_count + '/' + item.visit_count }}</span>
                    </div>
                    <!--<div class="collapsible-body">{{ 'v-html="item.content"' }}</div>-->
                </router-link>
            </li>
            <li class="collection-item" v-for="item in topicList" v-if="isMobile">
                <router-link :to="{ name: 'topic', params: { tab: tab, id: item.id } }">
                    <div class="top-title">
                        <span class="tip good" v-if="item.good">精华</span>
                        <span class="tip top" v-if="item.top">置顶</span>
                        <span class="tip tab" v-if="!item.good && !item.top">{{ routers[item.tab] && routers[item.tab].title }}</span>
                        <span class="title">{{ item.title }}</span>
                    </div>
                    <div class="bottom-user">
                        <div>
                            <div class="avatar">
                                <router-link :to="{ name: 'member', params: { username: item.author.loginname } }">
                                    <img v-bind:src="item.author.avatar_url"/>
                                </router-link>
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
            <li>
                <ul class="pagination">
                    <li :class="page === 1 ? 'disabled' : ''">
                        <a href="javascript:;" v-on:click="fetch('prev')">
                            <i class="material-icons">chevron_left</i>
                        </a>
                    </li>
                    <li v-if="!lastPage && page < 4" :class="n == page ? 'active' : ''" v-for="n in 5">
                        <a href="javascript:;" v-on:click="fetch(n)">{{ n }}</a>
                    </li>
                    <li v-if="!lastPage && page > 3 && n > page-3" :class="n == page ? 'active' : ''" v-for="n in page+2">
                        <a href="javascript:;" v-on:click="fetch(n)">{{ n }}</a>
                    </li>
                    <li v-if="lastPage && n > page-5" :class="n == page ? 'active' : ''" v-for="n in page">
                        <a href="javascript:;" v-on:click="fetch(n)">{{ n }}</a>
                    </li>
                    <li :class="lastPage ? 'disabled' : ''">
                        <a href="javascript:;" v-on:click="fetch('next')">
                            <i class="material-icons">chevron_right</i>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
        <br/>
    </div>
</template>

<script type="text/babel">
    import axios from 'axios';
    import Vue from 'vue';

    import Load from '../compontents/Load';

    Vue.component('cm-loading', Load);

    export default {
        data () {
            return {
                inputVal: "",
                active: "",
                page: 1,
                tab: 'all',
                limit: 10,
                lastPage: false,
                dataFetchDown: false,
                topicList: [],
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
        methods: {
                dateToLest (dateString = "") {
                    const disMin = Math.floor((new Date() - new Date(dateString))/1000/60);
                    let tip = "刚刚";
                    if (Math.floor(disMin/60/24/365) > 0) {
                        tip = Math.floor(disMin/60/24/365) + "年前";
                    } else if (Math.floor(disMin/60/24/30) > 0) {
                        tip = Math.floor(disMin/60/24/30) + "月前";
                    } else if (Math.floor(disMin/60/24) > 0) {
                        tip = Math.floor(disMin/60/24) + "天前";
                    } else if (Math.floor(disMin/60) > 0) {
                        tip = Math.floor(disMin/60) + "小时前";
                    } else if (disMin > 1) {
                        tip = disMin + "分钟前";
                    }
                    return tip;
                },
                fetch (cell) {
                    let self = this;

                    if( Object.prototype.toString.call(cell) === "[object String]" && (self.lastPage &&  cell === "next" || self.page === 1 && cell === "prev")) {
                        return false;
                    }
                    self.dataFetchDown = false;;
                    self.topicList = [];

                    if(Object.prototype.toString.call(cell) === "[object String]") {
                        cell === "next" ? self.page++ : self.page--;
                    } else if(Object.prototype.toString.call(cell) === "[object Number]") {
                        self.page = cell;
                    } else if(Object.prototype.toString.call(cell) === "[object Object]") {
                        self.page = 1;
                        self.tab = cell.tab;
                    }
                    this.__fetch();
                },
                getList () {
                    let self = this;
                    return new Promise((resolve, reject) => {
                        axios.get('https://cnodejs.org/api/v1/topics', {
                            params: {
                                tab: self.tab,
                                page: self.page,
                                limit: self.limit
                            }
                        })
                        .then((response) => {
                            resolve({
                                status: "success",
                                data: response.data.data
                            });
                        })
                        .catch((error) => {
                            resolve({
                                status: "fail",
                                data: error
                            });
                        });
                    });

                },
                __fetch () {
                    let self = this;
                    return this.getList()
                    .then((lastData) => {
                        if(lastData.status === "success" && !!lastData.data.length) {
                            self.dataFetchDown = true;
                            self.topicList = lastData.data;
                            self.lastPage = lastData.data.length < self.limit ? true : false;
                        } else {
                            self.page--;
                            return self.__fetch();
                        }
                    });
                },
                authToken (id) {
                    return new Promise((resolve, reject) => {
                        axios.post('https://cnodejs.org/api/v1/accesstoken?accesstoken=' + id)
                        .then((response) => {
                            resolve({
                                status: "success",
                                data: response.data
                            });
                        })
                        .catch((error) => {
                            resolve({
                                status: "fail",
                                data: error
                            });
                        });
                    });
                }
        },
        mounted () {
            let self = this;
            self.limit = Math.ceil(window.screen.availHeight / 120) ;
            // self.limit = 50;
            if(this.$route && this.$route.params && this.$route.params.tab) {
                self.tab = this.$route.params.tab;
            }
            this.__fetch();
        }
    };
</script>