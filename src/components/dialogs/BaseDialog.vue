<template>
  <el-dialog
    :title="dialogTitle"
    :model-value="modelValue"
    :before-close="closeDialog"
  >
    <slot name="dialog-content" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog"> Cancel </el-button>
        <el-button
          type="primary"
          :disabled="confirmBtnDisabled"
          @click="$emit('confirm-click')"
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  emits: ['confirm-click', 'update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    dialogTitle: {
      type: String,
      default: '',
      required: true,
    },
    confirmBtnDisabled: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  methods: {
    async closeDialog() {
      this.$emit('update:modelValue', false)
    },
  },
}
</script>
