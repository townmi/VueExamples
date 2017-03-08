<style lang="sass" scoped>
    .topic {
        img {
            max-width: 100%;
        }
    }
</style>
<template>
    <div class="topic">
        <div v-if="!dataFetchDown" class="loading">
            <cm-loading></cm-loading>
        </div>
        <div class="row">
            <div class="col s12 m12">
                <div v-html="topic && topic.content">
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
                topic: null
            }
        },
        methods: {
            getRoute () {
            }
        },
        mounted () {
            let self = this;
            const topicId  = this.$route.params.id;
            
            axios.get('https://cnodejs.org/api/v1/topic/'+topicId, {
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