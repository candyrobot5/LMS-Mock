<template>
  <b-container fluid>
    <!-- content header -->
    <b-row class="app-main-content-header">
      <b-col cols="12">
        <h4>集中度測定</h4>
      </b-col>
    </b-row>
    <!-- content body -->
    <b-row class="app-main-content-body">
      <b-col cols="12">
        <!-- title  -->
        <b-row>
          <b-col cols="12">
            <h4>AI講座 #01</h4>
          </b-col>
        </b-row>
        <b-row>
          <!-- left pane -->
          <b-col cols="6">
            <!-- graph -->
            <b-row>
              <b-col>
                <div class="my-graph">
                  <div class="my-graph-wrapper">
                    <div class="my-graph-content">
                      <!-- GraphChart.vue -->
                      ※グラフ表示箇所
                    </div>
                  </div>
                </div>
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
          <b-col cols="6">
            <!-- concentration low -->
            <b-row>
              <b-col cols="12">
                <b-form-group>
                  <label for="cmyConcentrationLowSelect" class="mt-2">
                    集中度: 低
                  </label>
                  <b-input-group class="my-conentration-select">
                    <!-- select -->
                    <template #prepend>
                      <b-form-select
                        id="myConcentrationLowSelect"
                        v-model="concentrationLow"
                        :options="concentrationLowOptions"
                      />
                    </template>
                    <!-- play -->
                    <b-input-group-append>
                      <b-input-group-text>
                        <b-icon icon="caret-right-fill" />
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- concentration middle -->
            <b-row>
              <b-col cols="12">
                <b-form-group>
                  <label for="myConcentrationMiddleSelect" class="mt-2">
                    集中度: 中
                  </label>
                  <b-input-group class="my-conentration-select">
                    <!-- select -->
                    <template #prepend>
                      <b-form-select
                        id="myConcentrationMiddleSelect"
                        v-model="concentrationMiddle"
                        :options="concentrationMiddleOptions"
                      />
                    </template>
                    <!-- play -->
                    <b-input-group-append>
                      <b-input-group-text>
                        <b-icon icon="caret-right-fill" />
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- concentration high -->
            <b-row>
              <b-col cols="12">
                <b-form-group>
                  <label for="myConcentrationHighSelect" class="mt-2" />
                  <b-input-group class="my-conentration-select">
                    <!-- select -->
                    <template #prepend>
                      <b-form-select
                        id="myConcentrationHighSelect"
                        v-model="concentrationHigh"
                        :options="concentrationHighOptions"
                      />
                    </template>
                    <!-- play -->
                    <b-input-group-append>
                      <b-input-group-text>
                        <b-icon icon="caret-right-fill" />
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
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
    return {
      feedbackMessage:
        '15～20分は集中度が落ちています。\n畳み込み層の概念を理解できているか確認してください。',
      concentrationLow: 1,
      concentrationMiddle: 1,
      concentrationHigh: 1,
      concentrationLowOptions: [{ value: 1, text: '15:20～25:30 畳み込み層' }],
      concentrationMiddleOptions: [{ value: 1, text: '30:00～45:00 CNN実装' }],
      concentrationHighOptions: [{ value: 1, text: '50:00～55:00 転移学習' }]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

.my-graph {
  max-width: $chart-width;
  min-height: $chart-height;
  &-wrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  // &-content {}
}
.my-conentration {
  &-select .input-group-prepend {
    width: calc(100% - 48px);
  }
}
</style>
