<template>
  <div class="buttons-wrapper">
    <config-bar-item
      v-for="btn in buttons"
      :key="btn.id"
      :label="btn.label"
      :icon="btn.icon"
      @click="callClickEmit(btn)"
      :disabled="btn.disabled"
    />
  </div>
</template>

<script>
import ConfigBarItem from "./ConfigBarItem";

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
          id: "export",
          label: "Export",
          icon: "el-icon-arrow-down",
        },
        {
          id: "parse",
          label: "Parse",
          icon: "el-icon-video-play",
          disabled: this.disableParseButton,
        },
      ]
    },
  },
  methods: {
    callClickEmit(btn) {
      this.$emit(`${btn.id.toString().toLowerCase()}-click`);
    },
  },
};
</script>

<style scoped>
.buttons-wrapper > * {
  margin: 0 2px;
}
</style>