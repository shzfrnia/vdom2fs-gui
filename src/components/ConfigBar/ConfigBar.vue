<template>
  <el-row>
    <el-col :span="24">
        <config-bar-items 
          @export-click="$emit('export-click')"
          @parse-click="$emit('parse-click')"
        />
    </el-col>
  </el-row>
</template>

<script>
import ConfigBarItems from "./ConfigBarItems";

export default {
  components: { ConfigBarItems },
  emits: ['export-click', 'parse-click']
};
</script>

<style scoped>
.el-col {
  background: #b3c0d16e;
  text-align: center;
  padding-top: 1px;
}
</style>