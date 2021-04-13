<template>
    <div id="driving-video">
        <el-card v-loading="loading">
            <el-form :inline="true" ref="searchUserFormRef">
                <el-form-item label="拍摄时间" prop="selectedDate">
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
                    <el-button icon="el-icon-search" plain size="small" type="primary" @click="searchVideo">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="this.videoList" border stripe>
                <el-table-column align="center" label="序号" type="index" width="100px"></el-table-column>
                <el-table-column align="center" label="视频编号" prop="videoID"></el-table-column>
                <el-table-column align="center" label="拍摄时间" prop="videoTime"></el-table-column>
                <el-table-column align="center" label="记录时长" prop="videoDuration"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="scanVideo(scope.row.videoLink)" icon="el-icon-view" size="mini" type="primary">预览</el-button>
                        <el-button @click="downloadVideo(scope.row.id)" icon="el-icon-download" size="mini" type="warning">下载</el-button>
                        <el-button @click="deleteVideo(scope.row.id)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="视频预览" :visible.sync="scanDialogVisible" width="50%" @close="scanDialogVisibleClosed">
            <vue-core-video-player class="video-player" :src="videoSrc"></vue-core-video-player>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueCoreVideoPlayer from 'vue-core-video-player'

    Vue.use(VueCoreVideoPlayer)

    export default {
        name: "DrivingVideo",
        data() {
            return {
                loading: true,
                videoList: [],
                selectedDate: [],
                scanDialogVisible: false,
                videoSrc: null
            }
        },
        created() {
            this.getVideoList()
        },
        methods: {
            async getVideoList() {
                const {data:res} = await this.$http.post('driveVideo',{'user_name':window.sessionStorage.getItem('userName')})
                if (res.code !== 200) {
                    return this.$message.error("获取视频失败")
                }
                this.videoList = res.data.videos
                this.loading = false
            },
            async searchVideo() {
                const searchData = {'user_name':window.sessionStorage.getItem('userName')}
                if (this.selectedDate !== null && this.selectedDate.length > 0) {
                    searchData['start'] = this.selectedDate[0]
                    searchData['end'] = this.selectedDate[1]
                }
                console.log(searchData)
                const {data: res} = await this.$http.post('driveVideo', searchData)
                if (res.code !== 200) {
                    return this.$message.error("查询失败")
                }
                this.videoList = res.data.videos
            },
            scanDialogVisibleClosed() {
                this.videoSrc = null
            },
            scanVideo(videoLink) {
                this.scanDialogVisible = true
                this.videoSrc = videoLink
            }
        }
    }
</script>

<style lang="less" scoped>
    #driving-video {
        padding: 20px;
    }

    .el-card {
        margin-top: 15px;
        height: 100%;

        .el-pagination {
            margin-top: 15px;
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
</style>
