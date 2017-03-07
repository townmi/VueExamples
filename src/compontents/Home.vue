<template>
    <div class="content">
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
                <Tree tree={this.state.tree} handToggle={this.toggle.bind(this)} />
            </div>
            <div class="col s9">

                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                            <label htmlFor="first_name" class="active">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="last_name" type="text" value={inputVal} class="validate" onChange={this.check.bind(this)} />
                            <label htmlFor="last_name" class={inputActive}>Last Name</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>