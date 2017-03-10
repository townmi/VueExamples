<style lang="sass" scoped>
    .member {
        .collapsible, .row:last-child {
            margin-bottom: 0;
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
        .block_title {
            text-align: left;
        }
        .more {
            text-align: right;
            .fa {
                font-size: 16px;
            }
        }
        .card {
            .fa {
                font-size: 20px;
            }
            .card-content .card-title {
                margin-bottom: 20px;
            }
            .body {
                img {
                    width: 80px;
                }
            }
            
        }
    }
</style>
<template>
        <div class="member">
            <br/>
            <div class="row">
                <div class="col s10 m9">
                    <ul class="collapsible" data-collapsible="accordion" v-if="memberInfo.recent_replies && memberInfo.recent_replies.length">
                        <li class="block_title">
                            <div class="collapsible-header">
                                最近创建的话题
                            </div>
                        </li>
                        <li v-for="item in memberInfo.recent_replies">
                            <router-link :to="{ name: 'topic', params: { tab: 'all', id: item.id } }">
                                <div class="collapsible-header">
                                    <i class="material-icons"><img v-bind:src="item.author.avatar_url"/></i>
                                    <span class="title">{{ item.title }}</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="more">
                            <div class="collapsible-header">
                                <a>查看更多 &nbsp;<em class="fa fa-angle-right" aria-hidden="true"></em></a>
                            </div>
                        </li>
                    </ul>
                    <br/>
                    <ul class="collapsible" data-collapsible="accordion" v-if="memberInfo.recent_topics && memberInfo.recent_topics.length">
                        <li class="block_title">
                            <div class="collapsible-header">
                                最近创建的话题
                            </div>
                        </li>
                        <li v-for="item in memberInfo.recent_topics">
                            <router-link :to="{ name: 'topic', params: { tab: 'all', id: item.id } }">
                                <div class="collapsible-header">
                                    <i class="material-icons"><img v-bind:src="item.author.avatar_url"/></i>
                                    <span class="title">{{ item.title }}</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="more">
                            <div class="collapsible-header">
                                <a>查看更多 &nbsp;<em class="fa fa-angle-right" aria-hidden="true"></em></a>
                            </div>
                        </li>
                    </ul>
                    <br/>
                </div>

                <div class="col s2 m3">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">名片</span>
                            <p class="body">
                                <img :src="memberInfo.avatar_url"/>
                            </p>
                        </div>
                        <div class="card-action">
                            <a v-bind:href="memberInfo.githubUsername ? 'https://www.github.com/' + memberInfo.githubUsername : ''">
                                <i class="fa fa-github" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            

            <div v-if="!dataFetchDown" class="loading">
                <cm-loading></cm-loading>
            </div>
        </div>
</template>

<script type="text/babel">
    import axios from 'axios';
    import Vue from 'vue';

    import Auth from '../services/authToken';

    import Load from '../compontents/Load';

    Vue.component('cm-loading', Load);

    export default {
        data () {
            return {
                memberInfo: {},
                dataFetchDown: false,
            }
        },
        methods: {
                getUserMember (username) {
                    return new Promise((resolve, reject) => {
                        axios.get('https://cnodejs.org/api/v1/user/' + username)
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
                }
        },
        mounted () {
            let self = this;
            const username = this.$route.params.username;
            this.getUserMember(username)
            .then((lastData) => {
                self.dataFetchDown = true;
                self.memberInfo = lastData.data;
            })
            
        }
    };
</script>