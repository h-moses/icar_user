<template>
    <div :class="className" :style="{width:width, height:height}"></div>
</template>

<script>
    import * as echarts from 'echarts/core';
    import {
        TitleComponent,
        TooltipComponent,
        LegendComponent
    } from 'echarts/components';
    import {
        PieChart
    } from 'echarts/charts';
    import {
        CanvasRenderer
    } from 'echarts/renderers';

    echarts.use(
        [TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]
    );

    export default {
        name: "PieChart",
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
            },
            data: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                chart: null
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el)
                this.setOptions()
            },
            setOptions() {
                let option;

                option = {
                    title: {
                        text: '分级预警占比',
                        left: '5%',
                        textStyle: {
                            fontsize: 18,
                            color: '#969CA7'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'horizontal',
                        left: 'center',
                        bottom: '5%',
                        itemGap: 80
                    },
                    series: [
                        {
                            name: '预警等级',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                {value: 1048, name: '一级预警'},
                                {value: 735, name: '二级预警'},
                                {value: 580, name: '三级预警'},
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0,0,0,0.5)'
                                }
                            }
                        }
                    ],
                    color: ['#ff6e76','#fddd60','#7cffb2',]
                }

                option && this.chart.setOption(option)
            }
        }
    }
</script>

<style scoped>

</style>
