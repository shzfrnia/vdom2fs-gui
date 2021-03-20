<template>
  <el-footer height="30px">
    <el-tag size="mini">{{ 8 }}</el-tag>
  </el-footer>
</template>

<script>
// import { remote } from "electron";
const { remote } = require("electron")

export default {
  data() {
    return {
      appVersion: 1,
    };
  },
  created() {
    console.log(remote);
  }
};
</script>

<style scoped>
.el-footer {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
</style>