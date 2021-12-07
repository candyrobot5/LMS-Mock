<template>
  <div>
    <b-form-group>
      <label for="myConcentrationSelect" class="mt-2">{{ label }}</label>
      <b-input-group class="my-conentration-select">
        <!-- select -->
        <template #prepend>
          <b-form-select
            id="myConcentrationSelect"
            :value="concentration"
            :options="options"
            @change="onChangeConcentration"
          />
        </template>
        <!-- play -->
        <b-input-group-append>
          <b-input-group-text role="button" @click="onPlay">
            <b-icon icon="caret-right-fill" />
          </b-input-group-text>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'GraphConcentrationSelect',
  model: {
    prop: 'concentration',
    event: 'change'
  },
  props: {
    concentration: {
      type: Number,
      required: false,
      default: -1
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    onPlay() {
      this.$emit('play')
    },
    onChangeConcentration(event) {
      this.$emit('change', event)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

.my-conentration-select {
  & .input-group-prepend {
    width: calc(100% - 48px);
  }
}
</style>
