<template>
    <div id="check-order" v-loading="loading">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/userHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人工单</el-breadcrumb-item>
            <el-breadcrumb-item>查看工单</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>

        </el-card>
    </div>
</template>

<script>
    export default {
        name: "CheckOrder",
        data() {
            return {
                orderList: [],
                loading: false
            }
        },
        created() {
            this.getOrderList()
        },
        methods: {
            async getOrderList() {
                const {data: res} = await this.$http.post()
                if (res.code !== 200) {
                    return this.$message.error("获取数据失败,请稍后再试")
                }

                this.loading = false
            }
        }
    }
</script>

<style lang="less" scoped>
    #check-order {
        padding: 20px;
    }

    .el-card {
        margin-top: 15px;
        height: 100%;


    }
</style>
