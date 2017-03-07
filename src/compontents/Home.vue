<style lang="sass" scoped>
    .content {
        min-height: calc(100vh - 265px);
        nav {
            background-color: transparent;
            box-shadow: none
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
    }
    .collapsible-body {
        .collapsible {
            display: none;
        }
    }
</style>
<template>
    <div class="content" id="example-2">
        <nav>
            <div class="nav-wrapper">
                <div class="col s12">
                    <a href="#!" class="breadcrumb">首页</a>
                    <a href="#!" class="breadcrumb">路由设置</a>
                </div>
            </div>
        </nav>
        <div class="row">
            <div class="col s3">
                <!--
                <Tree tree={this.state.tree} handToggle={this.toggle.bind(this)} />
                -->
            </div>
            <div class="col s9">

                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <input placeholder="Placeholder" id="first_name" type="text" class="" />
                            <label for="first_name" class="active">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="last_name" type="text" v-model="inputVal" class="validate" v-on:input="check"/>
                            <label for="last_name" v-bind:class="active">Last Name</label>
                            <p>Last Name is: {{ inputVal }}</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
        data () {
            return {
                inputVal: "",
                active: ""
            }
        },
        methods: {
                check: function (event) {
                    this.active = this.inputVal.length ? "active" : "";
                }
            
        }
    };
</script>