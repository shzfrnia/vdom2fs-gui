<template>
  <default>
    <div class="wrapper">
      <uploader accept=".txt" tip="Upload application config file or input" />
      <el-button
        @click="openCreateConfigDialog"
        size="medium"
        icon="el-icon-plus"
        circle
      />
    </div>
  </default>
</template>

<script>
import Default from "@/layouts/Default";
import Uploader from "@/components/inputs/Uploader";
import { ipcRenderer } from "electron";

export default {
  components: { Default, Uploader },
  name: "Home",
  methods: {
    openCreateConfigDialog() {
      ipcRenderer.send("open-config-dialog", { config: {}, create: true });
    },
  },
};
</script>

<style scoped>
.wrapper {
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.uploader {
  margin-bottom: 10px;
}
</style>
