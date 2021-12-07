<template>
  <canvas id="myGraphChart" />
</template>
<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  name: 'GraphChart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  data() {
    return {
      chartData: {},
      options: {}
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

#myGraphChart {
  width: $chart-width;
  height: $chart-height;
}
</style>
