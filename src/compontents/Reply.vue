<template>
    <li class="collection-item avatar" :id="replyInfo.id">
        <router-link :to="{ name: 'member', params: { id: replyInfo.author.loginname } }">
            <i class="mdi-file-folder circle">
                <img :src="replyInfo.author.avatar_url" /> 
            </i>
        </router-link>
        <div class="title">
            <span> {{ replyInfo.author.loginname }} </span>
            <a :href="'#'+replyInfo.id"> {{ (index+1)+'楼 '+ dateToLest(replyInfo.create_at) }} </a>
        </div>
        <p v-html="replyInfo.content">
        </p>
        <a href="#!" class="secondary-content"><i class="mdi-action-grade"></i></a>
    </li>
</template>
<script type="text/babel">

    import { dateToLest } from '../services/utils';

    export default {
        name: "cm-reply",
        data () {
            return {

            }
        },
        methods: {
                dateToLest: dateToLest
        },
        props: ["replyInfo", "authorId", "index"],
        mounted () {
        }
    }
</script>