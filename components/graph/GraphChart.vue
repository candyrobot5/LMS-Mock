<template>
  <div
    ref="graphChart"
    class="my-graph-chart"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="my-graph-chart-wrapper">
      <!-- chart -->
      <div class="my-graph-chart-content">
        <canvas
          id="myGraphChart"
          :width="style.chartMaxWidth"
          :height="style.chartHeight"
        />
      </div>
      <!-- controller -->
      <div v-show="isHovered" class="my-graph-chart-controller">
        <b-row align-h="between" align-v="center" class="h-100">
          <b-col class="text-left my-graph-chart-controller__button">
            <b-button
              class="px-1 py-0 h-100"
              variant="light"
              :disabled="isDisabledPrevButton"
              @click="onPrev"
            >
              <b-icon icon="caret-left-fill" variant="info" />
            </b-button>
          </b-col>
          <b-col class="text-right my-graph-chart-controller__button">
            <b-button
              class="px-1 py-0 h-100"
              variant="light"
              :disabled="isDisabledNextButton"
              @click="onNext"
            >
              <b-icon icon="caret-right-fill" variant="info" />
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <canvas id="myGraphChartAxis" :width="0" :height="style.chartHeight" />
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
    },
    isDisabledPrevButton: {
      type: Boolean,
      required: false,
      default: false
    },
    isDisabledNextButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      style,
      chart: null,
      options: {},
      isHovered: false
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
    // データが更新されたら、グラフを更新する
    graphData: {
      handler(newData) {
        const chart = this.chart
        if (chart) {
          chart.data.datasets[0].data = newData
          chart.data.labels = this.graphLabel
          this.$nextTick(() => {
            chart.update() // グラフ更新
          })
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
        spanGaps: true,
        animation: {
          duration: 0
        },
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
      this.$refs.graphChart.scrollLeft = parseInt(this.style.chartMaxWidth)
      this.$emit('click:prev')
    },
    onNext() {
      this.$refs.graphChart.scrollLeft = 0
      this.$emit('click:next')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

#myGraphChart {
  width: $chart-max-width;
  height: $chart-height;
}

.my-graph-chart {
  position: relative;
  overflow-x: scroll;
  min-height: $chart-height;
  /* .my-graph-chart > canvas */
  & > canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
  /* .my-graph-chart-wrapper */
  &-wrapper {
    width: $chart-max-width;
    height: 100%;
    background-color: #fff;
  }
  /* .my-graph-chart-content */
  // &-content {}
  /* .my-graph-chart-controller */
  &-controller {
    position: absolute;
    top: 0;
    left: 0;
    width: $chart-max-width;
    height: 100%;
    &__button {
      height: 100%;
    }
  }
}
</style>
