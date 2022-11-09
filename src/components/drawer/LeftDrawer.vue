<template>
  <el-drawer
    :title="title"
    :model-value="visible"
    @update:modelValue="this.$emit('update:visible', false)"
    direction="rtl"
    @closed="$emit('closed')"
    @open="$emit('open')"
    @opened="$emit('opened')"
    size="90%"
  >
    <slot name="body" />
  </el-drawer>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true,
    },
    title: {
      type: String,
      default: 'Title',
    },
  },
}
</script>

<style>
.el-drawer__body {
  overflow: hidden;
}
</style>
