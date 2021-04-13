<template>
    <div id="driving-warning">
        <el-card>
            <el-form :inline="true" :model="queryWarningForm" ref="searchWarningFormRef">
                <el-form-item label="预警时间" prop="selectedDate">
                    <el-date-picker
                            end-placeholder="结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            range-separator="至"
                            start-placeholder="开始日期"
                            type="daterange"
                            v-model="selectedDate"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchWarning" icon="el-icon-search" plain size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="this.warningList" border stripe  v-loading="loading">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" class="table-expand">
                            <el-form-item label="预警编号">
                                <div>{{ props.row.recordID }}</div>
                            </el-form-item>
                            <el-form-item label="预警时间">
                                <div>{{ props.row.alarmTime }}</div>
                            </el-form-item>
                            <el-form-item label="预警地点">
                                <span>{{ props.row.location }}</span>
                            </el-form-item>
                            <el-form-item label="预警原因">
                                <span>{{ props.row.alarmReason }}</span>
                            </el-form-item>
                            <el-form-item label="预警距离">
                                <span>{{ props.row.recordDistance }}</span>
                            </el-form-item>
                            <el-form-item label="风险等级">
                                <span>{{ props.row.alarmDegree }}</span>
                            </el-form-item>
                            <el-form-item label="视频链接">
                                <span>{{ props.row.videoLink }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="序号" type="index" width="70px"></el-table-column>
                <el-table-column align="center" label="预警编号" prop="recordID" width="200"></el-table-column>
                <el-table-column align="center" label="预警时间" prop="alarmTime" width="180px"></el-table-column>
                <el-table-column align="center" label="预警地点" prop="location"></el-table-column>
                <el-table-column align="center" label="预警原因" prop="alarmReason" width="150"></el-table-column>
                <el-table-column align="center" label="风险等级" prop="alarmDegree" width="100" :filters="filterDegree" :filter-method="handleFilter">
                    <template slot-scope="scope">
                        <el-tag :type="degreeTags[scope.row.alarmDegree]">{{scope.row.alarmDegree}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="视频编号" prop="videoID" width="200">
                    <template slot-scope="props">
                        <el-link :underline="false" type="danger" @click="scanVideo(props.row.videoLink)">
                            <el-icon class="el-icon-link"/>
                            {{props.row.videoID}}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="deleteWarningByID(scope.row.recordID)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="queryWarningForm.currentPage" :page-size="queryWarningForm.pageSize" :page-sizes="[1,2,5,10]"
                           :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange"
                           background layout="total,sizes,prev,pager,next,jumper"></el-pagination>
        </el-card>
        <el-dialog title="视频预览" :visible.sync="scanDialogVisible" width="50%" @close="scanDialogVisibleClosed">
            <vue-core-video-player class="video-player" :src="this.videoSrc"></vue-core-video-player>
        </el-dialog>
    </div>
</template>

<script>

    import Vue from 'vue'
    import VueCoreVideoPlayer from 'vue-core-video-player'

    Vue.use(VueCoreVideoPlayer)

    export default {
        name: "DrivingWarning",
        data() {
            return {
                queryWarningForm: {
                    user_name: '',
                    currentPage: '1',
                    pageSize: '10'
                },
                loading: true,
                warningList: [],
                total: null,
                degreeTags: {
                    '一级': 'danger',
                    '二级': 'warning',
                    '三级': 'primary'
                },
                filterDegree: [
                    {
                        text: '一级',
                        value: '一级'
                    },
                    {
                        text: '二级',
                        value: '二级'
                    },
                    {
                        text: '三级',
                        value: '三级'
                    }
                ],
                scanDialogVisible: false,
                videoSrc: null,
                selectedDate: []
            }
        },
        created() {
            this.getWarningList()
        },
        methods: {
            async getWarningList() {
                this.queryWarningForm.user_name = window.sessionStorage.getItem('userName')
                const {data: res} = await this.$http.post('alarm/view', this.queryWarningForm)
                if (res.code !== 200) {
                    return this.$message.error("获取预警记录失败")
                }
                this.warningList = res.data.alarmRecord['list']
                this.total = res.data.alarmRecord['total']
                this.queryWarningForm.pageSize = res.data.alarmRecord['pageSize']
                this.loading = false
            },
            async deleteWarningByID(recordID) {
                const confirmResult = await this.$confirm('确认删除该条预警记录?', '删除预警记录', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消删除')
                }
                const {data: res} = await this.$http.post('alarm/delete', {"record_id":recordID})
                if (res.code !== 200) {
                    return this.$message.error("删除失败")
                }
                this.$message.success("成功删除")
                await this.getWarningList()
            },
            async searchWarning() {
                const searchForm = JSON.parse(JSON.stringify(this.queryWarningForm))
                if (null !== this.selectedDate) {
                    searchForm['start'] = this.selectedDate[0]
                    searchForm['end'] = this.selectedDate[1]
                }
                const {data: res} = await this.$http.post('alarm/view', searchForm)
                if (res.code !== 200) {
                    return this.$message.error("查询失败")
                }
                this.warningList = res.data.alarmRecord['list']
                this.total = res.data.alarmRecord['total']
            },
            handleCurrentChange(newPage) {
                this.queryWarningForm.currentPage = newPage
                this.getWarningList()
            },
            handleSizeChange(newSize) {
                this.queryWarningForm.pageSize = newSize
                this.getWarningList()
            },
            handleFilter(value,row,column) {
                const property = column['property']
                return row[property] === value
            },
            scanDialogVisibleClosed() {
                this.videoSrc = ""
            },
            scanVideo(videoLink) {
                this.scanDialogVisible = true
                this.videoSrc = videoLink
            }
        },
    }
</script>

<style lang="less" scoped>
    #driving-warning {
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

    .el-form-item:not(:first-child) {
        margin-left: 20px;
    }

    .el-input /deep/ .el-input__inner {
        height: 32px;
        font-size: 12px;
        border-radius: 0;
        border: 1px solid #cccccc;
    }

    .el-date-editor--daterange {
        height: 32px;
        border-radius: 0;

        /deep/ .el-range__icon, /deep/ .el-range-input, /deep/ .el-range__close-icon {
            height: 30px;
            margin-bottom: 1px;
            font-size: 12px;
        }

        /deep/ .el-range-separator {
            height: 30px;
            margin-bottom: 2px;
        }
    }

    .el-button {
        border-radius: 1px;
        border: 1px solid #cccccc;
    }

    .table-expand {
        /deep/ .el-form-item {
            margin-left: 20px;
        }
    }
</style>
