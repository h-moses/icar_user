<template>
    <div id="data-analysis">
        <el-card>
            <ul id="data-item" v-infinite-scroll="load" style="overflow: auto">
                <li class="item-container">
                    <h2 class="item-title">日时段预警数</h2>
                    <div class="item-content">
                        <line-chart id="period-warning" style="width: 800px;height: 400px"/>
                        <div class="item-text">

                        </div>
                    </div>
                </li>
                <li class="item-container">
                    <h2 class="item-title">日时段预警数</h2>
                    <div class="item-content">
                        <line-chart id="period-" style="width: 800px;height: 400px"/>
                    </div>
                </li>
                <li class="item-container">
                    <h2 class="item-title">日时段预警数</h2>
                    <div class="item-content">
                        <line-chart id="-warning" style="width: 800px;height: 400px"/>
                    </div>
                </li>
                <li class="item-container">
                    <h2 class="item-title">日时段预警数</h2>
                    <div class="item-content">
                        <line-chart id="-" style="width: 800px;height: 400px"/>
                    </div>
                </li>
            </ul>
            <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
        </el-card>
    </div>
</template>

<script>
    import LineChart from "../echarts/LineChart";
    export default {
        name: "DataAnalysis",
        components: {LineChart},
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
        padding: 20px;

        #data-item {
            list-style: none;
        }
    }
</style>
