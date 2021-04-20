<template>
  <div class="buttons-wrapper">
    <config-bar-item
      v-for="btn in buttons"
      :key="btn.label"
      :label="btn.label"
      :icon="btn.icon"
    />
  </div>
</template>

<script>
import ConfigBarItem from "./ConfigBarItem";
export default {
  components: {
    ConfigBarItem,
  },
  data() {
    return {
      buttons: [
        {
          label: "Export",
          icon: "el-icon-arrow-down"
        },
        {
          label: "Parse",
          icon: "el-icon-video-play"
        },
      ]
    }
  }
};
</script>

<style scoped>
.buttons-wrapper > * {
  margin: 0 5px;
}
</style>