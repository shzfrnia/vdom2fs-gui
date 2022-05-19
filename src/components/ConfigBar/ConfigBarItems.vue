<template>
  <div class="buttons-wrapper">
    <config-bar-item
      v-for="btn in buttons"
      :key="btn.label"
      :label="btn.label"
      :icon="btn.icon"
      @click="btn.handler"
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
          icon: "el-icon-arrow-down",
          handler: () => {
            window.alert(1);
          },
        },
        {
          label: "Parse",
          icon: "el-icon-video-play",
          handler: () => {
            window.alert(2);
          },
        },
      ],
    };
  },
};
</script>

<style scoped>
.buttons-wrapper > * {
  margin: 0 2px;
}
</style>