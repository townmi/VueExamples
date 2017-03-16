<style lang="sass" scoped>
    .member {
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
                    <cm-list-cell :title="'最近创建的话题'" :topicList="memberInfo.recent_replies" v-if="memberInfo && memberInfo.recent_replies && memberInfo.recent_replies.length" :tab="'all'"></cm-list-cell>
                    <br/>
                    <cm-list-cell :title="'最近参与的话题'" :topicList="memberInfo.recent_topics" v-if="memberInfo && memberInfo.recent_topics && memberInfo.recent_topics.length" :tab="'all'"></cm-list-cell>
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

    import Auth from '../services/authToken';

    import Load from '../compontents/Load';
    import ListCell from '../compontents/ListCell';

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
            const username = this.$route.params.id;
            this.getUserMember(username)
            .then((lastData) => {
                self.dataFetchDown = true;
                self.memberInfo = lastData.data;
            })
            
        },
        components: {
            "cm-loading": Load, 
            "cm-list-cell": ListCell
        }
    };
</script>