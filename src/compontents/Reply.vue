<template>
    <li class="collection-item avatar">
        <router-link :to="{ name: 'member', params: { username: replyInfo.author.loginname } }">
            <i class="mdi-file-folder circle">
                <img :src="replyInfo.author.avatar_url" /> 
            </i>
        </router-link>
        <div class="title">
            <span> {{ replyInfo.author.loginname }} </span>
            <span> {{ (index+1)+'楼' }} </span>
        </div>
        <p v-html="replyInfo.content">
        </p>
        <a href="#!" class="secondary-content"><i class="mdi-action-grade"></i></a>
    </li>
</template>
<script type="text/babel">
    export default {
        name: "cm-reply",
        data () {
            return {

            }
        },
        props: ["replyInfo", "authorId", "index"],
        mounted () {
        }
    }
</script>