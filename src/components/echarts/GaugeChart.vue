<template>
    <div :class="className" :style="{width:width, height:height}"></div>
</template>

<script>
    import * as echarts from 'echarts/core';
    import {
        GaugeChart
    } from 'echarts/charts';
    import {
        CanvasRenderer
    } from 'echarts/renderers';

    echarts.use(
        [GaugeChart, CanvasRenderer]
    );

    export default {
        name: "GaugeChart",
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
                    series: [{
                        type: 'gauge',
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: 1,
                        splitNumber: 8,
                        axisLine: {
                            lineStyle: {
                                width: 6,
                                color: [
                                    [0.25, '#FF6E76'],
                                    [0.5, '#FDDD60'],
                                    [0.75, '#58D9F9'],
                                    [1, '#7CFFB2']
                                ]
                            }
                        },
                        pointer: {
                            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                            length: '12%',
                            width: 20,
                            offsetCenter: [0, '-60%'],
                            itemStyle: {
                                color: 'auto'
                            }
                        },
                        axisTick: {
                            length: 12,
                            lineStyle: {
                                color: 'auto',
                                width: 2
                            }
                        },
                        splitLine: {
                            length: 20,
                            lineStyle: {
                                color: 'auto',
                                width: 5
                            }
                        },
                        axisLabel: {
                            color: '#464646',
                            fontSize: 20,
                            distance: -60,
                            formatter: function (value) {
                                if (value === 0.875) {
                                    return 'A';
                                }
                                else if (value === 0.625) {
                                    return 'B';
                                }
                                else if (value === 0.375) {
                                    return 'C';
                                }
                                else if (value === 0.125) {
                                    return 'D';
                                }
                            }
                        },
                        title: {
                            offsetCenter: [0, '-30%'],
                            fontSize: 25
                        },
                        detail: {
                            fontSize: 20,
                            offsetCenter: [0, '0%'],
                            valueAnimation: true,
                            formatter: function (value) {
                                return Math.round(value * 100) + '分';
                            },
                            color: 'inherit'
                        },
                        data: [{
                            value: 0.90,
                            name: '等级评定'
                        }]
                    }]
                }

                option && this.chart.setOption(option)
            }
        }
    }
</script>

<style scoped>

</style>
