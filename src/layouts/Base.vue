
<template>
  <config-dialog
    v-model:show="configDialog.visible"
    v-model:config="configDialog.config"
    :createMode="configDialog.createMode"
  />
  <loader :loading="$store.getters.loading">
    <div class="common-layout">
      <div class="el-header">
        <slot name="header" />
      </div>
      <el-container class="body">
        <slot name="aside" />
        <el-container>
          <el-main :style="{ ...paddings }">
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
import paddingsMixin from "@/components/utils/paddings-mixin";

export default {
  mixins: [paddingsMixin],
  components: { Loader, ConfigDialog },
  data() {
    return {
      configDialog: {
        visible: false,
        config: {},
      },
    };
  },
  beforeCreate() {
    ipcRenderer.on("open-config-dialog", (event, { config, create }) => {
      const configCopy = { ...config };
      if (create) {
        configCopy.id = -1;
      }
      this.configDialog.config = configCopy;
      this.configDialog.visible = true;
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

.el-main {
  display: flex;
  flex-direction: column;
}
</style>
