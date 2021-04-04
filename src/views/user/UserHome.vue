<template>
    <el-container class="home-container">
        <el-header id="home-header" style="height: 160px">
            <div id="first-layer">
                <div class="header-brand">
                    <img alt="" class="header-logo" src="../../assets/logo.png"/>
                    <span class="header-title">驭鹰</span>
                </div>
                <el-popover class="order-popover" width="50" trigger="hover" placement="bottom">
                    <div class="popover-btn">
                        <el-button class="submit-btn" @click="goSubmit">提交工单</el-button>
                        <el-button class="check-btn" @click="goCheck">我的工单</el-button>
                    </div>
                    <div class="popover-text" slot="reference">工单</div>
                </el-popover>
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
            </div>
            <div id="main-head" >
                <h1 id="head-title">您好，h_admin{{this.userName}}</h1>
                <el-tabs id="head-tab" v-model="activeName" type="card" @tab-click="handleClick(activeName)">
                    <el-tab-pane label="首页" name="homePage"></el-tab-pane>
                    <el-tab-pane label="预警管理" name="drivingWarning"></el-tab-pane>
                    <el-tab-pane label="视频管理" name="drivingVideo"></el-tab-pane>
                    <el-tab-pane label="数据分析" name="dataAnalysis"></el-tab-pane>
                </el-tabs>
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
    const padDate = (value) => {
        return value < 10 ? '0' + value : value;
    };
    export default {
        name: "UserHome",
        data() {
            return {
                activePath: '',
                currentTime,
                activeName: '',
                userName: '',
                // isCollapsed: false,
            }
        },
        filters: {
            formatDate: (value) => {
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
            console.log("created")
            this.activePath = this.$route.path
            this.activeName = this.$route.path.substring(1)
            this.getUserProfile()
        },
        mounted() {
            const _this = this;
            this.timer = setInterval(function () {
                _this.currentTime = new Date()
            })
        },
        // updated() {
        //     this.isCollapsed = !(this.$route.path === '/submitOrder' || this.$route.path === '/checkOrder');
        // },
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
            async handleClick(activeName) {
                await this.$router.push(`/${activeName}`)
            },
            async goSubmit() {
                await this.$router.push('/submitOrder')
            },
            async goCheck() {
                await this.$router.push('/checkOrder')
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        width: 100%;
        height: 100%;

        #home-header {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            padding: 0;
            box-shadow: 0 10px 10px -10px #CCD0D3;


            #first-layer {
                width: 100%;
                height: 50px;
                border-bottom: 2px solid #EAEBF8;

                .header-brand {
                    position: absolute;
                    left: 2%;
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

                .order-popover {
                    position: absolute;
                    right: 18%;
                    width: 50px;
                    height: 50px;

                    .popover-text {
                        font-size: 13px;
                        width: 50px;
                        height:50px;
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .popover-text:hover {
                        color: #667eea;
                    }
                }

                .current-time {
                    position: absolute;
                    right: 5%;
                    height: 50px;
                    display: inline-flex;
                    align-items: center;
                    font-size: 13px;
                    font-family: "microsoft yahei", Arial, Helvetica, sans-serif;
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

            #main-head {
                position: absolute;
                width: 100%;
                height: 105px;
                top: 55px;
                background-color: #ffffff;

                #head-title {
                    font-size: 16px;
                    margin: 20px 0 0 20px;
                }

                #head-tab {
                    position: absolute;
                    bottom: 0;
                    margin-left: 20px;
                    border: 0;

                    /deep/ .el-tabs__header {
                        margin-bottom: 0;

                        .el-tabs__nav-wrap.is-top {
                            margin: 0;
                            padding: 0;
                        }

                        .el-tabs__nav-prev,.el-tabs__nav-next {
                            visibility: hidden;
                        }
                    }

                    /deep/ .el-tabs__item {
                        width: 180px;
                        height: 45px;
                        text-align: center;
                        border: 0;
                        border-right: 1px solid #c0c6cc;
                        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
                        font-weight: bold;
                    }

                    /deep/ .el-tabs__item:last-child {
                        border-right: 0;
                    }

                    /deep/ .el-tabs__item.is-active {
                        border-top: 2px solid #0064C8;
                        color: #0064C8;
                    }
                }
            }

        }


        /deep/ .home-main {
            background-color: #F1F1F2;
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

    .el-popover {
        .submit-btn,.check-btn {
            width: 100px;
            height: 30px;
            border: 0;
            border-radius: 0;
            margin: 0;
        }
    }

    .isHidden {
        visibility: hidden;
    }
</style>
