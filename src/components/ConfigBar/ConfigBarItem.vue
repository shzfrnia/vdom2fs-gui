<template>
  <el-button @focus="$event.target.blur()" class="button" plain type="text">
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
  margin-bottom: 5px;
}

.icon {
  color: #303133;
  font-size: 20px;
}

.button {
  width: 55px;
  padding: 5px;
  border-radius: 0;
}

.button:hover {
  color: #303133;
  background: #e9eef3;
  border: 1px solid #e9eef3;
}

/* .button:active {
  transform: scale(.9);
} */
</style>