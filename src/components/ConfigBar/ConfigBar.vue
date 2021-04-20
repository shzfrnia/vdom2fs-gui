<template>
  <el-row>
    <el-col :span="24">
        <config-bar-items />
    </el-col>
  </el-row>
</template>

<script>
import ConfigBarItems from "./ConfigBarItems";

export default {
  components: { ConfigBarItems },
};
</script>

<style scoped>
.el-col {
  background: #b3c0d16e;
  text-align: center;
  padding-top: 1px;
}
</style>