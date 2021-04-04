<template>
    <div id="home-page">
        <el-col :span="15">
            <el-row>
                <el-card id="assess-card" class="home-card">
                    <div id="basic-content">h_admin</div>
                    <div id="assess-content">您目前的驾车评定等级为<span id="assess-degree">{{this.drivingDegree}}</span></div>
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
                <h3 style="margin: 0">月度预警走势</h3>
                <warning-chart class-name="warning-chart" style="width: 100%;height:370px"></warning-chart>
            </el-card>
        </el-col>
        <el-col :span="9">
            <el-card id="warning-card" class="home-card">
                <el-table :data="recentWarning">
                    <el-table-column prop="warningID" label="预警编号" width="100px" align="center"></el-table-column>
                    <el-table-column prop="warningTime" label="时间" width="130px" align="center"></el-table-column>
                    <el-table-column prop="warningLoc" label="地点" width="180px" align="center"></el-table-column>
                    <el-table-column prop="warningDegree" label="风险等级" align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.warningDegree === 'A'" type="danger" size="small" effect="plain">A级</el-tag>
                            <el-tag v-else-if="scope.row.warningDegree === 'B'" type="warning" size="small" effect="plain">B级</el-tag>
                            <el-tag v-else-if="scope.row.warningDegree === 'C'" size="small" effect="plain">C级</el-tag>
                            <el-tag v-else type="success" size="small" effect="plain">D级</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <el-card id="order-card" class="home-card">
                <el-table :data="recentOrder">
                    <el-table-column prop="feedbackID" label="工单号" width="100px" align="center"></el-table-column>
                    <el-table-column prop="feedbackTitle" label="主题" width="160px" align="center"></el-table-column>
                    <el-table-column prop="submitTime" label="时间" width="160px" align="center"></el-table-column>
                    <el-table-column prop="feedBackState" label="状态" align="center">
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
                recentWarning: [
                    {
                        warningID: '系统故障',
                        warningTime: '2017-01-04',
                        warningLoc: '学林街',
                        warningDegree: 'A',
                    },
                    {
                        warningID: '系统故障',
                        warningTime: '2017-01-04',
                        warningLoc: '学林街',
                        warningDegree: 'B',
                    },
                    {
                        warningID: '系统故障',
                        warningTime: '2017-01-04',
                        warningLoc: '学林街',
                        warningDegree: 'C',
                    },
                    {
                        warningID: '系统故障',
                        warningTime: '2017-01-04',
                        warningLoc: '学林街',
                        warningDegree: 'D',
                    }
                ],
                recentOrder: [
                    {
                        feedbackID: '1',
                        feedbackTitle: '系统故障',
                        feedbackState: '处理中',
                        submitTime: '1月前'
                    },
                    {
                        feedbackID: '2',
                        feedbackTitle: '系统故障',
                        feedbackState: '已提交',
                        submitTime: '1月前'
                    },
                    {
                        feedbackID: '3',
                        feedbackTitle: '系统故障',
                        feedbackState: '已关闭',
                        submitTime: '1月前'
                    },
                    {
                        feedbackID: '4',
                        feedbackTitle: '系统故障',
                        feedbackState: '处理中',
                        submitTime: '1月前'
                    }
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
    #home-page {
        padding: 20px;

        .el-row {
            display: flex;
            align-items: flex-start;
        }

        .home-card {
            margin: 20px 5px;
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

        #data-chart {
            height: 400px;
        }
    }
</style>
