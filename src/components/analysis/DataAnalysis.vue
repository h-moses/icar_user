<template>
    <div id="data-analysis">
        <el-card id="pie-card" class="chart-card">
                <div class="item-content">
                    <pie-chart class-name="gradingPie" style="width: 450px;height: 450px" data="[]"></pie-chart>
                </div>
        </el-card>
        <el-card id="line-card" class="chart-card">
            <div class="item-content">
                <line-chart class-name="warningLine" style="width: 500px;height: 450px" data="[]"></line-chart>
            </div>
        </el-card>
        <el-card id="gauge-card" class="chart-card">
            <div class="item-content">
                <gauge-chart class-name="degreeGauge" style="width: 400px;height: 450px" data="[]"></gauge-chart>
            </div>
        </el-card>
    </div>
</template>

<script>
    import PieChart from "../echarts/PieChart";
    import LineChart from "../echarts/LineChart";
    import GaugeChart from "../echarts/GaugeChart";
    export default {
        name: "DataAnalysis",
        components: {GaugeChart, LineChart, PieChart, },
        data() {
            return {

            }
        },
        created() {
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    #data-analysis {
        padding: 70px 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .chart-card {
            border-radius: 20px;
            box-sizing: border-box;
            display: inline-flex;
        }

        #pie-card {

            /deep/ .el-card__body {
                padding: 20px 0;
                display: flex;
                justify-content: center;
            }
        }

        #line-card {
            margin-left: 20px;

            /deep/ .el-card__body {
                display: flex;
                justify-content: center;

                .warningLine {
                    width: 860px;
                }
            }
        }

        #gauge-card {
            margin-left: 20px;

            /deep/ .el-card__body {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>
