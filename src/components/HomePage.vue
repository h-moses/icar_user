<template>
    <div id="home-page">
        <el-col :span="15">
            <el-row>
                <el-card id="assess-card" class="home-card">
                    <div id="basic-content">{{this.userName}}</div>
                    <div id="assess-content">您目前的驾车评定等级为<span id="assess-degree" :style="{color: ratingColor[this.userRating]}">{{this.userRating}}</span></div>
                </el-card>
                <el-card id="data-record" class="home-card">
                    <div class="record-item">
                        <div class="item-title">预警总数</div>
                        <div class="item-content">0</div>
                    </div>
                    <div class="record-item">
                        <div class="item-title">高危预警</div>
                        <div class="item-content">0</div>
                    </div>
                    <div class="record-item">
                        <div class="item-title">普通预警</div>
                        <div class="item-content">0</div>
                    </div>
                </el-card>
            </el-row>
            <el-card id="data-chart" class="home-card">
                <h3 style="margin: 0">日均预警趋势</h3>
                <warning-chart class-name="warning-chart" style="width: 100%;height:350px"></warning-chart>
            </el-card>
        </el-col>
        <el-col :span="9">
            <el-card id="warning-card" class="home-card">
                <el-table :data="recentWarning">
                    <el-table-column prop="alarmReason" label="预警事件" align="center"></el-table-column>
                    <el-table-column prop="alarmTime" label="时间" align="center"></el-table-column>
<!--                    <el-table-column prop="location" label="地点" width="180px" align="center"></el-table-column>-->
                    <el-table-column prop="alarmDegree" label="风险等级" align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.alarmDegree === 'A'" type="danger" size="small" effect="plain">A级</el-tag>
                            <el-tag v-else-if="scope.row.alarmDegree === 'B'" type="warning" size="small" effect="plain">B级</el-tag>
                            <el-tag v-else-if="scope.row.alarmDegree === 'C'" size="small" effect="plain">C级</el-tag>
                            <el-tag v-else type="success" size="small" effect="plain">D级</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <el-card id="order-card" class="home-card">
                <el-table :data="recentOrder">
                    <el-table-column prop="feedbackID" label="工单号" width="100px" align="center"></el-table-column>
                    <el-table-column prop="feedbackTitle" label="主题" width="160px" align="center"></el-table-column>
                    <el-table-column prop="feedbackTime" label="时间" width="160px" align="center"></el-table-column>
                    <el-table-column prop="feedbackState" label="状态" align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.feedbackState === '已提交'" type="success" size="small" effect="plain">已提交</el-tag>
                            <el-tag v-else-if="scope.row.feedbackState === '处理中'" type="warning" size="small" effect="plain">处理中</el-tag>
                            <el-tag v-else type="info" size="small" effect="plain">已关闭</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </div>
</template>

<script>
    import WarningChart from "./echarts/LineChart";

    export default {
        name: "HomePage",
        components: {WarningChart},
        data() {
            return {
                drivingDegree: 'A',
                recentWarning: [],
                recentOrder: [],
                userName: '',
                userRating: '',
                ratingColor: {
                    'A': 'green',
                    'B': 'orange',
                    'C': 'yellow',
                    'D': 'red'
                }
            }
        },
        created() {
            this.userRating = window.sessionStorage.getItem('userRating')
            this.userName = window.sessionStorage.getItem('userName')
            this.getRecentWarning()
            this.getRecentOrder()
        },
        methods: {
            async getRecentWarning() {
                const data = {}
                data['currentPage'] = 1
                data['pageSize'] = 4
                data['user_name'] = this.userName
                const {data:res} = await this.$http.post('alarm/view',data)
                if (res.code !== 200) {
                    return this.$message.error('获取预警数据失败')
                }
                this.recentWarning = res.data.alarmRecord['list']
            },
            async getRecentOrder() {
                const data = {}
                data['currentPage'] = 1
                data['pageSize']  = 3
                data['user_phone'] = window.sessionStorage.getItem('userPhone')
                const {data:res} = await this.$http.post('feedback/view',data)
                if (res.code !== 200) {
                    return this.$message.error('获取工单数据失败')
                }
                this.recentOrder = res.data.feedbackRecord['list']
            }
        }
    }
</script>

<style lang="less" scoped>
    #home-page {
        padding: 0 20px;

        .el-row {
            display: flex;
            align-items: flex-start;
        }

        .home-card {
            margin: 10px 5px;
            border: 1px solid #e3e4e6;
            box-sizing: border-box;
            box-shadow: none;
        }

        .home-card:hover {
            box-shadow: 0 1px 15px 0 rgb(0 0 0 / 10%);
        }

        #assess-card {
            width: 40%;
            height: 150px;
            font-size: 20px;
            display: inline-block;

            #basic-content {
                margin-bottom: 8px;
            }

            #assess-content {
                text-indent: 20px;
                letter-spacing: 5px;
            }

            #assess-degree {
                font-size: 29px;
                color: red;
            }
        }

        #data-record {
            width: 58%;
            height: 150px;
            margin-left: 2%;
            display: flex;
            align-items: center;

            .record-item {
                width: 150px;
                height: 80px;
                flex: 1;
                display: inline-block;
                background-color: rgba(233, 241, 259, 0.3);
                font-size: 13px;
            }

            .record-item:not(:first-child) {
                margin-left: 10px;
            }

            .item-title {
                margin: 10px 0 0 20px;
            }

            .item-content {
                margin: 10px 0 0 20px;
                font-size: 30px;
            }
        }
    }
</style>
