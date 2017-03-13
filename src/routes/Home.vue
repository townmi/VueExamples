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
        .pagination {
            padding: 15px 0;
            text-align: center;
            li.active {
                background-color: #2962FF;
            }
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
       
        <cm-list-cell :topicList="topicList" v-if="topicList.length" :tab="tab"></cm-list-cell>
        
        <div>
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
        </div>
        <br/>
    </div>
</template>

<script type="text/babel">
    import axios from 'axios';
    import Vue from 'vue';

    import Load from '../compontents/Load';
    import ListCell from '../compontents/ListCell';
    Vue.component('cm-loading', Load);
    Vue.component('cm-list-cell', ListCell);

    export default {
        data () {
            return {
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