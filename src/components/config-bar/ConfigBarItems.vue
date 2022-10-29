<template>
  <div class="buttons-wrapper">
    <config-bar-item
      v-for="btn in buttons"
      :key="btn.id"
      :label="btn.label"
      :tooltip="btn.tooltip"
      :icon="btn.icon"
      @click="callClickEmit(btn)"
      :disabled="btn.disabled"
    />
  </div>
</template>

<script>
import ConfigBarItem from './ConfigBarItem'

export default {
  components: {
    ConfigBarItem,
  },
  props: {
    disableParseButton: Boolean,
  },
  computed: {
    buttons() {
      return [
        {
          id: 'export',
          label: 'Export',
          tooltip: 'Export application',
          icon: 'el-icon-arrow-down',
        },
        {
          id: 'parse',
          label: 'Parse',
          tooltip: 'Parse exported xml to folder tree',
          icon: 'el-icon-video-play',
          disabled: this.disableParseButton,
        },
        {
          id: 'open',
          label: 'Folder',
          tooltip: 'Open folder',
          icon: 'el-icon-folder',
          disabled: this.disableParseButton,
        },
        {
          id: 'remove',
          label: 'Remove',
          tooltip: 'Remove folder',
          icon: 'el-icon-delete',
          disabled: this.disableParseButton,
        },
      ]
    },
  },
  methods: {
    callClickEmit(btn) {
      this.$emit(`${btn.id.toString().toLowerCase()}-click`)
    },
  },
}
</script>

<style scoped>
.buttons-wrapper > * {
  margin: 0 2px;
}
</style>
