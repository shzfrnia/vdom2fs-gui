<template>
  <el-footer height="30px">
    <el-tag size="mini">{{ $store.getters.appVersion }}</el-tag>
  </el-footer>
</template>

<script>
export default {
};
</script>

<style scoped>
.el-footer {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
</style>