<template>
  <el-tooltip
    :disabled="false"
    class="item"
    effect="dark"
    :content="tooltip"
    placement="bottom"
  >
    <div class="button-wrapper">
      <el-button
        @click="$emit('click')"
        @focus="$event.target.blur()"
        class="button"
        plain
        type="text"
        :disabled="disabled"
      >
        <div class="label">{{ label }}</div>
        <i :class="[icon]" class="icon" />
      </el-button>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  emits: ['click'],
  props: {
    label: {
      type: String,
      reqired: true,
    },
    tooltip: {
      type: String,
      reqired: true,
    },
    icon: {
      type: String,
      reqired: true,
    },
    disabled: {
      type: Boolean,
      reqired: false,
      default: false,
    },
  },
}
</script>

<style scoped>
.button-wrapper {
  display: inline-block;
}
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
  padding: 5px;
  border-radius: 0;
}

.button:hover {
  color: #303133;
  background: #e9eef3;
  border: 1px solid #e9eef3;
}

.button[disabled] {
  background: none;
  opacity: 0.3;
  border-color: transparent;
}

.button[disabled]:hover {
  background: none;
  border-color: transparent;
}
</style>
