<template>
    <div class="index">
        <el-container class="index-container">
            <el-header class="index-header" style="height: 50px">
                <div class="navbar-brand">
                    <img alt="" class="navbar-logo" src="../assets/logo.png"/>
                    <span class="navbar-title">驭鹰</span>
                </div>
                <div class="navbar-collapse">
                    <ul class="navbar-nav">
                        <router-link id="nav-index" to="https://www.baidu.com/">首页</router-link>
                        <router-link id="nav-hardware" to="https://www.baidu.com/">硬件介绍</router-link>
                        <router-link id="nav-software" to="https://www.baidu.com/">软件介绍</router-link>
                        <router-link id="nav-download" to="https://www.baidu.com/">APP下载</router-link>
                    </ul>
                </div>
                <div class="navbar-login-register">
                    <ul class="navbar-user">
                        <router-link id="nav-login" target="_self" to="/userLogin">登录</router-link>
                        <router-link id="nav-register" target="_self" to="/userRegister">注册</router-link>
                    </ul>
                </div>
            </el-header>
            <el-main class="index-main"></el-main>
            <el-footer class="index-footer"></el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Index",
        methods: {}
    }
</script>

<style lang="less" scoped>
    .index-container {
        width: 100%;
        height: 100%;

        .index-header {
            position: absolute;
            width: 100%;
            padding: 0 25px;
            box-sizing: border-box;
            box-shadow: 0 0 20px #cccccc;

            .navbar-brand {
                width: 100px;
                height: 50px;
                display: inline-flex;
                align-items: center;


                .navbar-logo {
                    width: 35px;
                    height: 35px;
                }

                .navbar-title {
                    margin-left: 10px;
                    font-size: 25px;
                    color: #6C75D1;
                }
            }

            /deep/ .navbar-collapse {
                position: absolute;
                margin: 0;
                height: 50px;
                display: inline-flex;
                align-items: center;

                .navbar-nav {
                    width: 400px;
                    height: 50px;
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    list-style: none;
                    font-family: pingfang SC,helvetica neue,arial,hiragino sans gb,microsoft yahei ui,microsoft yahei,simsun,sans-serif;

                    > a {
                        margin-left: 40px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-decoration: none;
                        color: black;
                    }

                    > a:hover {
                        color: 	#7A84D2;
                    }
                }
            }

            /deep/ .navbar-login-register {
                position: absolute;
                right: 0;
                height: 50px;
                display: inline-flex;
                align-items: center;

                .navbar-user {
                    width: 160px;
                    height: 50px;
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    display: inline-flex;
                    justify-content: space-between;
                    align-items: center;
                    list-style: none;

                    > a {
                        width: 80px;
                        height: 50px;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-decoration: none;
                        color: black;
                    }

                    > a:hover {
                        color: 	#7A84D2;
                    }
                }
            }
        }
    }

</style>
