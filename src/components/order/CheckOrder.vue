<template>
    <div id="check-order" v-loading="loading">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/userHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人工单</el-breadcrumb-item>
            <el-breadcrumb-item>查看工单</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-table :data="this.orderList" border stripe>
                <el-table-column align="center" label="序号" type="index" width="70"></el-table-column>
                <el-table-column align="center" label="工单编号" prop="orderID"></el-table-column>
                <el-table-column align="center" label="工单主题" prop="orderTitle"></el-table-column>
                <el-table-column align="center" label="提交时间" prop="submitTime"></el-table-column>
                <el-table-column align="center" label="工单类别" prop="orderType" :filters="filterTypes" :filter-method="handleFilter"></el-table-column>
                <el-table-column align="center" label="工单状态" prop="orderState" :filters="filterStates" :filter-method="handleFilter">
                    <template slot-scope="scope">
                        <el-tag :type="stateTag[scope.row.orderState]">{{scope.row.orderState}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="scanOrderByID(scope.row.orderID)" icon="el-icon-view" size="mini" type="primary">查看</el-button>
                        <el-button @click="deleteOrderByID(scope.row.orderID)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "CheckOrder",
        data() {
            return {
                orderList: [
                    {
                        'orderID':'20210212',
                        'orderTitle':'系统故障',
                        'userName':'h_admin',
                        'submitTime': '2021-03-30',
                        'orderType': '天气查询',
                        'orderState': '已提交'
                    },
                    {
                        'orderID':'20210212',
                        'orderTitle':'系统故障',
                        'userName':'h_admin',
                        'submitTime': '2021-03-30',
                        'orderType': '天气查询',
                        'orderState': '处理中'
                    },
                    {
                        'orderID':'20210212',
                        'orderTitle':'系统故障',
                        'userName':'h_admin',
                        'submitTime': '2021-03-30',
                        'orderType': '天气查询',
                        'orderState': '已关闭'
                    },
                    {
                        'orderID':'20210212',
                        'orderTitle':'系统故障',
                        'userName':'h_admin',
                        'submitTime': '2021-03-30',
                        'orderType': '天气查询',
                        'orderState': '处理中'
                    }
                ],
                loading: false,
                stateTag: {
                    '已提交': 'danger',
                    '处理中': 'warning',
                    '已关闭': 'success'
                },
                filterStates: [
                    {
                        text: '已提交',
                        value: '已提交'
                    },
                    {
                        text: '处理中',
                        value: '处理中'
                    },
                    {
                        text: '已关闭',
                        value: '已关闭'
                    }
                ],
                filterTypes: [
                    {
                        text: '设备检测',
                        value: '设备检测'
                    },
                    {
                        text: '预警反馈',
                        value: '预警反馈'
                    },
                    {
                        text: '摄像画面',
                        value: '摄像画面'
                    },
                    {
                        text: '历史记录',
                        value: '历史记录'
                    },
                    {
                        text: '数据报告',
                        value: '数据报告'
                    },
                    {
                        text: '天气查询',
                        value: '天气查询'
                    },
                    {
                        text: '碰撞方案',
                        value: '碰撞方案'
                    },
                    {
                        text: '其他功能',
                        value: '其他功能'
                    }
                ]
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
            },
            handleFilter(value,row,column) {
                const property = column['property']
                return row[property] === value
            },
            async scanOrderByID(id) {
                await this.$router.push(`/checkOrder/${id}`)
            },
            async deleteOrderByID(id) {
                const confirmResult = await this.$confirm('确认删除该工单?', '删除工单', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消删除工单')
                }
                const params = new FormData()
                params.append('orderID', id)
                const {data: res} = await this.$http.post('deleteUser', params)
                if (res.code !== 200) {
                    return this.$message.error("删除工单失败")
                }
                this.$message.success("成功删除工单")
                await this.getOrderList()
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

        /deep/ .el-icon-arrow-down {
            width: 20px;
            height: 18px;
            box-sizing: border-box;
        }
    }
</style>
