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
        render: function (h) {
            alert(1);
             h(
                'div', 
                [
                    h('span', 'Hello'),
                    ' world!'
                ]
            )
        },
        methods: {
            getRoute () {
            }
        },
        mounted () {
            let self = this;
            const topicId  = this.$route.params.id;
            
            axios.get('https://cnodejs.org/api/v1/topic/'+topicId)
            .then((response) => {
                self.dataFetchDown = true;
                self.topic = response.data.data;
            })
            .catch((error) => {
                console.log(error);
                self.dataFetchDown = true;
            });
        },
        updated () {
            var markList = document.querySelectorAll(".prettyprint");
            markList.forEach(function (cell, index) {
                // console.log(cell.innerHTML);
                cell.innerHTML = markdown.toHTML( cell.innerHTML )
            });
        }
    }
</script>