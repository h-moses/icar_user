<template>
    <el-container class="home-container">
        <el-aside class="home-aside" width="200px">
            <div class="aside-brand">
                <img alt="" class="aside-logo" src="../../assets/logo.png"/>
                <span class="aside-title">驭鹰</span>
            </div>
            <el-menu class="aside-menu" :default-active="activePath" background-color="#EDF3FF" active-text-color="#409eff" router text-color="#000000" unique-opened>
                <el-menu-item class="menu-item" index="/index">
                    <template slot="title">
                        <i class="icar_user iconshouye1"/>
                        <span class="menu-title">首页</span>
                    </template>
                </el-menu-item>
                <el-menu-item class="menu-item" index="/personalInfo">
                    <template slot="title">
                        <i class="icar_user icongerenziliao"/>
                        <span class="menu-title">个人信息</span>
                    </template>
                </el-menu-item>
                <el-menu-item class="menu-item" index="/drivingWarning">
                    <template slot="title">
                        <i class="icar_user icon-yujingyucefenxi"/>
                        <span class="menu-title">行车预警</span>
                    </template>
                </el-menu-item>
                <el-menu-item class="menu-item" index="/drivingVideo">
                    <template slot="title">
                        <i class="icar_user iconshipin2"/>
                        <span class="menu-title">行车视频</span>
                    </template>
                </el-menu-item>
                <el-submenu class="menu-item" index="5">
                    <template slot="title">
                        <i class="icar_user icondrxx66"/>
                        <span class="menu-title">个人工单</span>
                    </template>
                    <el-menu-item index="/submitOrder">提交工单</el-menu-item>
                    <el-menu-item index="/checkOrder">查看工单</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="home-header" style="height:50px">
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
                currentTime
            }
        },
        filters: {
            formatDate:function (value) {
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

            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        width: 100%;
        height: 100%;

        .home-aside {
            height: 100%;
            background-color: #EDF3FF;

            .aside-brand {
                width: 200px;
                height: 50px;
                /*margin-left: 25px;*/
                display: inline-flex;
                justify-content: center;
                align-items: center;

                .aside-logo {
                    width: 40px;
                    height: 40px;
                }

                .aside-title {
                    margin-left: 20px;
                    font-size: 25px;
                    color: #6C75D1;
                }
            }

            .aside-menu {
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                .menu-item {
                    width: 100%;

                    .menu-title {
                        margin-left: 20px;
                    }
                }
            }
        }

        /deep/ .home-header {
            background-color: #ffffff;
            display: flex;
            justify-content: flex-end;
            /*background-color: #EDF3FF;*/
            box-shadow: 0 10px 10px -10px #CCD0D3;

            .current-time {
                margin-right: 20px;
                display: flex;
                align-items: center;
                font-size: 14px;
                font-family: "微软雅黑",sans-serif;

                color: #6C75D1;
            }

            .header-avatar {
                width: 50px;
                height: 100%;
                display: inline-flex;
                justify-content: center;
                align-items: center;

                .popover-avatar {
                    width: 40px;
                    height: 40px;
                }
            }
        }


        .home-main {
            background-color: #cccccc;
            opacity: 0.3;
        }

    }

    .el-popover {
        .popover-content {
            font-size: 12px;

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
</style>
