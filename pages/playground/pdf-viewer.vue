<template>
  <b-container fluid>
    <!-- Title -->
    <b-row class="app-main-content-header">
      <b-col cols="12">
        <h4>スライド教材 ※現在作成中</h4>
      </b-col>
    </b-row>
    <!-- content body -->
    <b-row class="app-main-content-body">
      <b-col cols="12">
        <b-row>
          <b-col col lg="12" xl="auto" class="my-pdf-container">
            <!-- pdf controller -->
            <b-row class="my-pdf-controllers" align-h="between">
              <b-col class="text-left">
                <b-button :disabled="page === 1" size="sm" @click="onPrevPage">
                  <b-icon icon="caret-left-fill" />
                </b-button>
              </b-col>
              <b-col class="text-right">
                <b-button
                  :disabled="page === numPages"
                  size="sm"
                  @click="onNextPage"
                >
                  <b-icon icon="caret-right-fill" />
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="my-pdf-wrapper">
                <!-- vuePdf -->
                <vue-pdf
                  :src="srcPdf"
                  :page="page"
                  class="my-pdf-content"
                  style="height: 800px"
                  @num-pages="pageCount = $event"
                  @page-loaded="currentPage = $event"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col col lg="12" xl="auto" class="my-pdf-sidebar">
            <b-card>
              <b-list-group>
                <b-list-group-item
                  v-for="p in numPages"
                  :key="p"
                  role="button"
                  @click="onShowPage(p)"
                >
                  タイトル{{ p }}
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import vuePdf from 'vue-pdf'

const loadingTask = vuePdf.createLoadingTask({
  url: '/playground/test.pdf',
  // cMapUrl: './node_modules/pdfjs-dist/cmaps/',
  cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.12.313/cmaps/',
  cMapPacked: true
})

export default {
  name: 'PlaygroundPdfViewer',
  components: { vuePdf },
  data() {
    return {
      srcPdf: loadingTask,
      numPages: undefined,
      page: 1
    }
  },
  mounted() {
    this.srcPdf.promise
      .then((pdf) => {
        this.numPages = pdf.numPages
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.warn(e)
      })
  },
  // 任意の子孫コンポーネントからエラーが捕捉されるときに呼び出される。
  //  - vue-pdf にて errorCaptured() が必要だったので設定した。
  errorCaptured() {
    return false
  },
  methods: {
    onPrevPage() {
      this.page = this.page - 1
    },
    onNextPage() {
      this.page = this.page + 1
    },
    onShowPage(page) {
      this.page = page
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

$my-pdf-sidebar-width: 350px;
$my-pdf-content-height: 600px;

.my-pdf {
  /* .my-pdf-sidebar */
  &-sidebar {
    width: $my-pdf-sidebar-width;
  }
  /* .my-pdf-container */
  &-container {
    width: calc(100% - #{$my-pdf-sidebar-width});
  }
  /* .my-pdf-wrapper */
  &-wrapper {
    height: $my-pdf-content-height;
    overflow: scroll;
  }
  /* .my-pdf-content */
  &-content {
    height: $my-pdf-content-height;
    // overflow: ;
    // &::v-deep canvas {
    // height: 800px !important;
    // }
  }
}
</style>
