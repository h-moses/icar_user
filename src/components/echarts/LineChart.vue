<template>
    <div :class="className" :style="{width:width,height:height}"></div>
</template>

<script>
    import * as echarts from 'echarts/core';
    import {GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent} from 'echarts/components';
    import {LineChart} from 'echarts/charts';
    import {CanvasRenderer} from 'echarts/renderers';

    echarts.use(
        [TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer]
    );

    export default {
        name: "LineChart",
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '250px'
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initLineChart()
            })
        },
        data() {
            return {
                chart: null
            }
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initLineChart() {
                this.chart = echarts.init(this.$el)
                this.setOptions()
            },
            setOptions() {
                let option;

                option = {
                    title: {
                        text: '行车预警走势',
                        textStyle: {
                            fontsize: 18,
                            color: '#969CA7'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            return params[0].seriesName + ":" + params[0].value + "<br/>" + params[1].seriesName + ":" + params[1].value
                        }
                    },
                    legend: {
                        data: ['平均预警','个人预警'],
                        textStyle: {
                          fontSize: 13
                        },
                        itemGap: 100
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '平均预警',
                            type: 'line',
                            data: [820, 932, 901, 934, 1290, 1330],
                            animationDuration: 2000,
                            animationEasing: 'cubicInOut'
                        },
                        {
                            name: '个人预警',
                            type: 'line',
                            data: [720, 632, 801, 1234, 1090, 1430],
                            animationDuration: 2000,
                            animationEasing: 'cubicInOut'
                        }
                    ],
                    color: ['#05c091','#4992ff']
                }


                if (option && typeof option === 'object') {
                    this.chart.setOption(option)
                }
            }
        }
    }
</script>

<style scoped>

</style>
