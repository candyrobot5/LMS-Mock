<template>
  <b-container fluid>
    <!-- content header -->
    <b-row class="app-main-content-header">
      <b-col md="12">
        <h4>集中度測定</h4>
      </b-col>
    </b-row>
    <!-- content body -->
    <b-row class="app-main-content-body">
      <b-col md="12">
        <!-- title  -->
        <b-row>
          <b-col md="12">
            <h4>AI講座 #01</h4>
          </b-col>
        </b-row>
        <b-row>
          <!-- left pane -->
          <b-col md="6">
            <!-- graph -->
            <b-row>
              <b-col>
                <!-- GraphChart.vue -->
                <graph-chart
                  :graph-data="graphData"
                  :is-disabled-prev-button="isDisabledPrevButton"
                  :is-disabled-next-button="isDisabledNextButton"
                  @click:prev="onPrevData"
                  @click:next="onNextData"
                />
              </b-col>
            </b-row>
            <!-- graph message -->
            <b-row class="mt-2">
              <b-col>
                <div>
                  <b-form-textarea
                    v-model="feedbackMessage"
                    rows="6"
                    readonly
                    class="bg-light"
                  />
                </div>
              </b-col>
            </b-row>
          </b-col>
          <!-- right pane -->
          <b-col md="6">
            <!-- concentration low -->
            <b-row>
              <b-col md="12">
                <!-- GraphConcentrationSelect.vue -->
                <graph-concentration-select
                  v-model="concentrationLow"
                  label="集中度: 低"
                  :options="concentrationLowOptions"
                  @play="onPlayConcentrationLow"
                />
              </b-col>
            </b-row>
            <!-- concentration middle -->
            <b-row>
              <b-col md="12">
                <!-- GraphConcentrationSelect.vue -->
                <graph-concentration-select
                  v-model="concentrationMiddle"
                  label="集中度: 中"
                  :options="concentrationMiddleOptions"
                  @play="onPlayConcentrationMiddle"
                />
              </b-col>
            </b-row>
            <!-- concentration high -->
            <b-row>
              <b-col md="12">
                <!-- GraphConcentrationSelect.vue -->
                <graph-concentration-select
                  v-model="concentrationHigh"
                  label=""
                  :options="concentrationHighOptions"
                  @play="onPlayConcentrationHigh"
                />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'PlaygroundGraph',
  data() {
    // create graph data
    const fromDate = this.$dateFns.parseISO(
      '2021-12-01T00:00:00+09:00',
      new Date()
    )
    const toDate = this.$dateFns.parseISO(
      '2021-12-05T00:00:00+09:00',
      // '2021-12-31T23:59:59+09:00',
      new Date()
    )
    const rawData = [] // { x: timestamp, y: value }
    const stepTime = 1000 * 60 * 5 // 5 minutes
    for (let t = fromDate.getTime(); t <= toDate.getTime(); t = t + stepTime) {
      const val = Math.floor(Math.random() * 101) // 0 - 100
      const data = { x: t, y: val }
      rawData.push(data)
    }
    // return data
    return {
      feedbackMessage:
        '15～20分は集中度が落ちています。\n畳み込み層の概念を理解できているか確認してください。',
      concentrationLow: 1,
      concentrationMiddle: 1,
      concentrationHigh: 1,
      concentrationLowOptions: [
        { value: 1, text: '15:20～25:30 畳み込み層' },
        { value: 99, text: 'その他' }
      ],
      concentrationMiddleOptions: [
        { value: 1, text: '30:00～45:00 CNN実装' },
        { value: 99, text: 'その他' }
      ],
      concentrationHighOptions: [
        { value: 1, text: '50:00～55:00 転移学習' },
        { value: 99, text: 'その他' }
      ],
      rawData,
      baseIndex: 0,
      perPage: 100,
      stepTime
    }
  },
  computed: {
    graphData() {
      const rawData = [...this.rawData]
      const data = rawData.splice(this.baseIndex, this.perPage)
      if (data.length < this.perPage) {
        const diff = this.perPage - data.length
        for (let i = 0; i < diff; i++) {
          const lastRawData = rawData[rawData.length - 1]
          const timestamp = lastRawData.x + this.stepTime * (i + 1)
          const d = { x: timestamp, y: null }
          data.push(d)
        }
      }
      return data
    },
    isDisabledPrevButton() {
      return Math.trunc(this.baseIndex / this.perPage) <= 0
    },
    isDisabledNextButton() {
      return (
        Math.trunc(this.baseIndex / this.perPage) >=
        Math.trunc(this.rawData.length / this.perPage)
      )
    }
  },
  methods: {
    onPlayConcentrationLow() {},
    onPlayConcentrationMiddle() {},
    onPlayConcentrationHigh() {},
    onPrevData() {
      const idx = this.baseIndex - this.perPage
      this.baseIndex = idx > 0 ? idx : 0
    },
    onNextData() {
      const idx = this.baseIndex + this.perPage
      this.baseIndex = idx < this.rawData.length ? idx : this.rawData.length - 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';
</style>
