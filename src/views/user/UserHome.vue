<template>
    <el-container class="home-container">
        <el-header class="home-header" style="height:50px">
            <div class="header-brand">
                <img alt="" class="header-logo" src="../../assets/logo.png"/>
                <span class="header-title">驭鹰</span>
            </div>
            <el-menu :default-active="activePath" class="header-menu" mode="horizontal" text-color="#000000" router unique-opened>
                <el-menu-item class="menu-item" index="/index">
                    <template slot="title">
                        <span class="menu-title">首页</span>
                    </template>
                </el-menu-item>
                <el-menu-item class="menu-item" index="/drivingWarning">
                    <template slot="title">
                        <span class="menu-title">行车预警</span>
                    </template>
                </el-menu-item>
                <el-menu-item class="menu-item" index="/drivingVideo">
                    <template slot="title">
                        <span class="menu-title">行车视频</span>
                    </template>
                </el-menu-item>
                <el-submenu class="order-submenu" index="5">
                    <template slot="title">
                        <span class="menu-title">个人工单</span>
                    </template>
                    <el-menu-item class="menu-item" index="/submit">提交工单</el-menu-item>
                    <el-menu-item class="menu-item" index="/checkOrder">查看工单</el-menu-item>
                </el-submenu>
            </el-menu>
            <div class="current-time">当前时间：{{currentTime | formatDate}}</div>
            <div class="header-avatar">
                <el-popover class="popover-avatar" placement="bottom-start" trigger="hover" width="300">
                    <div class="popover-content">
                        <el-row :gutter="3" justify="space-between" type="flex">
                            <el-col :span="4">
                                <el-avatar size="large"
                                           src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            </el-col>
                            <el-col :span="20">
                                <div class="username">用户名：h_admin</div>
                                <div class="userID">账号：709820314</div>
                            </el-col>
                        </el-row>
                        <el-divider/>
                        <el-button @click="logout" class="btn-logout">退出登录</el-button>
                    </div>
                    <el-avatar class="reference-avatar" slot="reference"
                               src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </el-popover>
            </div>
        </el-header>
        <el-main class="home-main">
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
    const currentTime = new Date()
    //在月份、日期、小时等小于10前面补0
    const padDate = function (value) {
        return value < 10 ? '0' + value : value;
    };
    export default {
        name: "UserHome",
        data() {
            return {
                activePath: '',
                currentTime,
            }
        },
        filters: {
            formatDate: function (value) {
                const date = new Date(value);
                const year = date.getFullYear();
                const month = padDate(date.getMonth() + 1);
                const day = padDate(date.getDate());
                const hours = padDate(date.getHours());
                const minutes = padDate(date.getMinutes());
                const seconds = padDate(date.getSeconds());
                return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':'
                    + seconds;
            }
        },
        created() {
            this.activePath = this.$route.path
            this.getUserProfile()
        },
        mounted() {
            const _this = this;
            this.timer = setInterval(function () {
                _this.currentTime = new Date()
            })
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        methods: {
            async getUserProfile() {

            },
            logout() {

            },
            changeLang() {
                this.locale = 'en'
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        width: 100%;
        height: 100%;

        .home-header {
            /*display: flex;*/
            /*justify-content: flex-end;*/
            /*background-color: #EDF3FF;*/
            display: flex;
            box-shadow: 0 10px 10px -10px #CCD0D3;

            .header-brand {
                width: 130px;
                height: 50px;
                display: inline-flex;
                justify-content: flex-start;
                align-items: center;

                .header-logo {
                    width: 40px;
                    height: 40px;
                }

                .header-title {
                    margin-left: 10px;
                    font-size: 25px;
                    color: #6C75D1;
                }
            }

            .header-menu {
                width: 400px;
                height: 50px;
                box-sizing: border-box;
                display: inline-flex;
                align-items: center;

                .menu-item {
                    width: 100%;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .menu-title {
                        height: 50px;
                        display: flex;
                        align-items: center;
                        font-size: 13px;
                        font-family: "microsoft yahei", Arial, Helvetica, sans-serif;
                    }

                    .menu-title:hover {
                        color: #6C75D1;
                    }
                }


                .order-submenu {

                    /deep/ .el-submenu__title {
                        height: 50px;
                        display: flex;
                        align-items: center;
                        font-size: 13px;
                        font-family: "microsoft yahei", Arial, Helvetica, sans-serif;

                        .menu-title:hover {
                            color: #6C75D1;
                        }
                    }
                }
            }

            .current-time {
                position: absolute;
                right: 10%;
                height: 50px;
                /*margin-left: 100px;*/
                /*margin-right: 20px;*/
                display: inline-flex;
                align-items: center;
                font-size: 13px;
                font-family: "microsoft yahei", Arial, Helvetica, sans-serif;
                /*color: #6C75D1;*/
            }

            .header-avatar {
                position: absolute;
                right: 1%;
                width: 50px;
                height: 50px;
                display: inline-flex;
                justify-content: center;
                align-items: center;

                .popover-avatar {
                    width: 40px;
                    height: 40px;

                    /deep/ .el-divider--horizontal {
                        margin: 0;
                    }
                }


            }
        }

        /deep/ .home-main {
            background-color: #eaedf1;
            padding: 0;
        }
    }

    .el-popover {
        .popover-content {
            font-size: 13px;
            font-family: "microsoft yahei", Arial, Helvetica, sans-serif;

            .userID, .username {
                margin: 10px 0 0 10px;
            }

            .username {
                margin-top: 0;
            }

            .btn-logout {
                width: 100%;
                border: 0;
                border-radius: 0;
            }
        }
    }

    .el-menu--popup {

        .menu-item:hover {
            background-color: #F4F6F7;
        }
    }
</style>
