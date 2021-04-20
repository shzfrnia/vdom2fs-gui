<template>
  <el-button class="button" plain type="text">
    <div class="label">{{ label }}</div>
    <i :class="[icon]" class="icon" />
  </el-button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      reqired: true,
    },
    icon: {
      type: String,
      reqired: true,
    },
  },
};
</script>

<style scoped>
.label {
  color: #3a3b3d;
  font-size: 12px;
  margin-bottom: 3px;
}
.icon {
  color: #303133;
  font-size: 24px;
}
.button {
  width: 55px;
  padding: 5px;
}
.button:hover,
.button:focus {
  color: #303133;
  background: #e9eef3;
  border: 1px solid #e9eef3;
}
</style>