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
</style>
<template>
    <div>
        <nav>
            <div class="nav-wrapper">
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li v-for="cell in routers"><a href="#" :class="cell.tab === tab ? 'link active': 'link'" v-on:click="fetch(cell)">{{ cell.title }}</a></li>
                </ul>
            </div>
        </nav>
        <div v-if="!dataFetchDown" class="loading">
            <cm-loading></cm-loading>
        </div>
        <ul class="collapsible" data-collapsible="accordion" v-if="topicList.length">
            <li v-for="item in topicList">
                <router-link :to="{name:'topic', params:{id: item.id}}">
                    <div class="collapsible-header">
                        <i class="material-icons"><img v-bind:src="item.author.avatar_url"/></i>
                        <span class="good" v-if="item.good">精华</span>
                        <span class="top" v-if="item.top">置顶</span>
                        <span class="tab" v-if="!item.good && !item.top">{{ routers[item.tab] && routers[item.tab].title }}</span>
                        <span class="title">{{ item.title }}</span>
                        <span class="badge">{{ item.reply_count + '/' + item.visit_count }}</span>
                    </div>
                    <!--<div class="collapsible-body">{{ 'v-html="item.content"' }}</div>-->
                </router-link>
            </li>
            <li>
                <ul class="pagination">
                    <li :class="page === 1 ? 'disabled' : ''">
                        <a href="javascript:;" v-on:click="fetch('prev')">
                            <i class="material-icons">chevron_left</i>
                        </a>
                    </li>
                    <li v-if="page < 4" :class="n == page ? 'active' : ''" v-for="n in 5">
                        <a href="javascript:;" v-on:click="fetch(n)">{{ n }}</a>
                    </li>
                    <li v-if="page > 3 && n > page-3 " :class="n == page ? 'active' : ''" v-for="n in page+2">
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
                check (event) {
                    this.active = this.inputVal.length ? "active" : "";
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
                    this.getList()
                    .then((lastData) => {
                        if(lastData.status === "success") {
                            self.dataFetchDown = true;
                            self.topicList = lastData.data;
                            self.lastPage = lastData.data.length < self.limit ? true : false;
                        }
                    });
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
            const accessToken = localStorage.getItem("cnode_accesstoken");
            if(accessToken) {
                this.authToken(accessToken)
                .then((lastData) => {
                    if(lastData.status === "success") {
                        self.$parent.authStatus = true;
                        self.$parent.authInfo = lastData.data;
                    }
                    return self.getList();
                })
                .then((lastData) => {
                    if(lastData.status === "success") {
                        self.dataFetchDown = true;
                        self.topicList = lastData.data;
                    }
                })
            } else {
                this.getList()
                .then((lastData) => {
                    if(lastData.status === "success") {
                        self.dataFetchDown = true;
                        self.topicList = lastData.data;
                    }
                });
            }
        }
    };
</script>