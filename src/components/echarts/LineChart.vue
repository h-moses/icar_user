<template>
    <div :class="className" :style="{width:width,height:height}"></div>
</template>

<script>
    import echarts from 'echarts';

    require('echarts/theme/macarons')

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
                this.chart = echarts.init(this.$el, "macarons")
                let option;

                option = {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        },
                        formatter: '{a} <br/>{b} : {c}'
                    },
                    toolbox: {
                        show: true,
                        itemGap: 5,
                        top: '20',
                        right: '60',
                        feature: {
                            magicType: {
                                type: ['line', 'bar']
                            },
                            restore: {}
                        }
                    },
                    series: [{
                        name: '预警数量',
                        data: [820, 932, 901, 934, 1290, 1330],
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0, color: '#84fab0'
                                    },
                                    {
                                        offset: 1, color: '#8fd3f4'
                                    }
                                ],
                                global: false
                            }
                        },
                        animationDuration: 2800,
                        animationEasing: 'cubicInOut'
                    }]
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
