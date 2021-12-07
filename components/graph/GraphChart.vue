<template>
  <div class="my-graph-chart">
    <div class="my-graph-chart-wrapper">
      <!-- chart -->
      <div class="my-graph-chart-content">
        <canvas
          id="myGraphChart"
          :width="style.chartWidth"
          :height="style.chartHeight"
        />
      </div>
      <!-- controller -->
      <div class="my-graph-chart-controller">
        <b-row align-h="between">
          <b-col class="text-left my-graph-chart-control__button">
            <b-button class="px-1 py-0" variant="light" @click="onPrev">
              <b-icon icon="caret-left-fill" />
            </b-button>
          </b-col>
          <b-col class="text-right my-graph-chart-control__button">
            <b-button class="px-1 py-0" variant="light" @click="onNext">
              <b-icon icon="caret-right-fill" />
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import style from '~/assets/style/custom-var.scss'

export default {
  name: 'GraphChart',
  props: {
    graphData: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      style,
      chart: null,
      options: {}
    }
  },
  computed: {
    graphLabel() {
      // x軸の目盛りのラベル
      const labels = this.graphData.map((d, idx) => {
        return idx % 2 === 0 ? this.$dateFns.format(new Date(d.x), 'HH:mm') : ''
      })
      return labels
    }
  },
  watch: {
    graphData: {
      handler(newData) {
        const chart = this.chart
        if (chart) {
          chart.data.datasets[0].data = newData
          chart.data.labels = this.graphLabel
          chart.update() // グラフ更新
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    const ctx = document.getElementById('myGraphChart')
    const config = {
      type: 'line',
      data: {
        labels: this.graphLabel,
        datasets: [
          {
            label: '集中度',
            xAxisID: 'xAxis',
            yAxisID: 'yAxis',
            xAxisKey: 'x',
            yAxisKey: 'y',
            backgroundColor: '#b40914',
            borderColor: '#b40914',
            data: this.graphData
          }
        ]
      },
      options: {
        animate: false,
        plugins: {
          // ツールチップ
          tooltip: {
            callbacks: {
              title: (context) => {
                const {
                  dataIndex,
                  dataset: { data }
                } = context[0]
                const format = this.$dateFns.format(
                  data[dataIndex].x,
                  'yyyy-MM-dd HH:mm'
                )
                return format
              }
            }
          }
        },
        scales: {
          // X軸 目盛
          xAxis: {
            display: true,
            ticks: {
              autoSkip: false,
              stepSize: 20
            }
          },
          // Y軸 目盛
          yAxis: {
            display: true,
            beginAtZero: true,
            max: 100,
            min: 0,
            ticks: {
              autoSkip: false,
              stepSize: 10,
              callback: (v) => {
                return `${v}%`
              }
            }
          }
        }
      }
    }
    // register all the coponents
    Chart.register(...registerables)
    // eslint-disable-next-line no-new
    this.chart = new Chart(ctx, config)
  },
  methods: {
    onPrev() {
      this.$emit('click:prev')
    },
    onNext() {
      this.$emit('click:next')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

#myGraphChart {
  width: $chart-width;
  height: $chart-height;
}

.my-graph-chart {
  max-width: $chart-width;
  min-height: $chart-height;
  &-wrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  // &-content {}
}
</style>
