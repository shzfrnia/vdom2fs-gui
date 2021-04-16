<template>
  <default>
    {{dialogVisible}}
    <div class="wrapper">
      <uploader accept=".txt" tip="Upload application config file or input" />
      <el-button
        @click="dialogVisible = true"
        size="medium"
        icon="el-icon-plus"
        circle
      />
    </div>
    <config-dialog v-model:show="dialogVisible" :config="{ name: 'test' }" />
  </default>
</template>

<script>
import Default from "@/layouts/Default";
import Uploader from "@/components/inputs/Uploader";
import ConfigDialog from "@/components/dialogs/ConfigDialog/ConfigDialog";

export default {
  components: { Default, Uploader, ConfigDialog },
  name: "Home",
  data() {
    return {
      dialogVisible: false,
    };
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
