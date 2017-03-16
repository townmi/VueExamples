<style lang="sass" scoped>
    .login{
        width: 100%;
        height: 300px;
        margin: auto;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        &>.row {
            margin-bottom: 0;
        }
        .waves-effect {
            width: 100%;
            line-height: 42px;
            height: 42px;
        }
    }
</style>
<template>
        <div class="login">
            <div class="row">
                <div class="col s3">&nbsp;</div>
                <form class="col s6" v-on:submit.prevent="submit">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="last_name" type="text" v-model="token" v-bind:class="active" v-on:input="check"/>
                            <label for="last_name" v-bind:class="active">Token from Cnode.org</label>
                            <button class="waves-effect waves-light btn-large" type="submit" name="action">登录
                                <!--<i class="material-icons right">send</i>-->
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div v-show="submitSwitch" class="loading">
                <cm-loading></cm-loading>
            </div>
        </div>
</template>

<script type="text/babel">
    import axios from 'axios';

    import Auth from '../services/authToken';

    import Load from '../compontents/Load';
    export default {
        data () {
            return {
                token: "",
                active: "",
                submitSwitch: false,
                submitValidate: false
            }
        },
        methods: {
                check (event) {

                    if(!this.token.length) {
                        this.active = "";
                        this.submitValidate = false;
                    } else {
                        if(/[^a-z0-9\-]+/g.test(this.token)) {  
                            this.active = "active invalid";
                            this.submitValidate = false;
                        } else {
                            this.active = "active";
                            this.submitValidate = true;
                        }
                    }
                },
                submit (event) {
                    let self = this;
                    if(!!this.submitSwitch || !this.submitValidate){
                        return;
                    }
                    this.submitSwitch = true;
                    
                    axios.post('https://cnodejs.org/api/v1/accesstoken?accesstoken=' + this.token)
                    .then(function (response) {
                        self.submitSwitch = false;

                        if (response.data.success) {
                            const userInfo = {
                                'name' : response.data.loginname,
                                'avatar' : response.data.avatar_url,
                                'id' : response.data.id,
                                'accesstoken' : self.token.trim()
                            }
                            Auth.setLocalToken(userInfo);
                            window.location.reload();

                        } else {
                            alert(response.data.error_msg)
                        }
                        
                    })
                    .catch(function (error) {
                        self.submitSwitch = false;
                    });
                }
        },
        mounted () {

        },
        components: {
            "cm-loading": Load
        }
    };
</script>