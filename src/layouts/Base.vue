
<template>
  <config-dialog v-model:show="dialogVisible" :config="{}" />
  <loader :loading="$store.getters.loading">
    <div class="common-layout">
      <div class="el-header">
        <slot name="header" />
      </div>
      <el-container class="body">
        <slot name="aside" />
        <el-container>
          <el-main>
            <slot />
          </el-main>
        </el-container>
      </el-container>
      <div class="el-footer">
        <slot name="footer" />
      </div>
    </div>
  </loader>
</template>

<script>
import Loader from "@/components/Loader";
import ConfigDialog from "@/components/dialogs/ConfigDialog/ConfigDialog";
import { ipcRenderer } from "electron";

export default {
  components: { Loader, ConfigDialog },
  data() {
    return {
      dialogVisible: false,
    };
  },
  beforeCreate() {
    ipcRenderer.on("open-config-dialog", () => {
      this.dialogVisible = true;
    });
  },
};
</script>



<style scoped>
.common-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.el-header,
.el-footer {
  flex-shrink: 0;
  background-color: #b3c0d1;
  color: #333;
}

.body {
  flex-grow: 1;
  overflow: auto;
  background-color: #e9eef3;
}
</style>
