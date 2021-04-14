<template>
    <div id="check-order" v-loading="loading">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/userHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人工单</el-breadcrumb-item>
            <el-breadcrumb-item>查看工单</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-table :data="orderList" border stripe>
                <el-table-column align="center" label="序号" type="index" width="70"></el-table-column>
                <el-table-column align="center" label="工单编号" prop="feedbackID"></el-table-column>
                <el-table-column align="center" label="工单主题" prop="feedbackTitle"></el-table-column>
                <el-table-column align="center" label="提交时间" prop="feedbackTime"></el-table-column>
                <el-table-column align="center" label="工单类别" prop="feedbackLabel" :filters="filterTypes" :filter-method="handleFilter"></el-table-column>
                <el-table-column align="center" label="工单状态" prop="feedbackState" :filters="filterStates" :filter-method="handleFilter">
                    <template slot-scope="scope">
                        <el-tag :type="stateTag[scope.row.feedbackState]">{{scope.row.feedbackState}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="scanOrderByID(scope.row.feedbackID)" icon="el-icon-view" size="mini" type="primary">查看</el-button>
                        <el-button @click="deleteOrderByID(scope.row.feedbackID)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="queryInfo.currentPage" :page-size="queryInfo.pageSize" :page-sizes="[1,2,5,10]"
                           :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange"
                           background layout="total,sizes,prev,pager,next,jumper"></el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "CheckOrder",
        data() {
            return {
                total: null,
                queryInfo: {
                    currentPage: '1',
                    pageSize: '5'
                },
                orderList: [],
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
                const data = JSON.parse(JSON.stringify(this.queryInfo))
                data['user_phone'] = window.sessionStorage.getItem('userPhone')
                const {data: res} = await this.$http.post('feedback/view',data)
                if (res.code !== 200) {
                    return this.$message.error("获取数据失败,请稍后再试")
                }
                this.orderList = res.data.feedbackRecord.list
                this.total = res.data.feedbackRecord.total
                this.queryInfo.pageSize = res.data.feedbackRecord.pageSize
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
                    return this.$message.info('取消删除')
                }
                const params = {}
                params['feedback_id'] = id
                const {data: res} = await this.$http.post('feedback/delete', params)
                if (res.code !== 200) {
                    return this.$message.error("删除工单失败")
                }
                this.$message.success("成功删除工单")
                await this.getOrderList()
            },
            handleCurrentChange(newPage) {
                this.queryInfo.currentPage = newPage
                this.getOrderList()
            },
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize
                this.getOrderList()
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
