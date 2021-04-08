<template>
  <el-dialog :title="dialogTitle" :model-value="modelValue">
    <slot name="dialog-content" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">
          Cancel
        </el-button>
        <el-button type="primary" @click="closeDialog"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  emits: [
    "close-click",
    "confirm-click",
    "header-close-click",
    "update:modelValue",
  ],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    dialogTitle: {
      type: String,
      default: "",
      required: true,
    },
  },
  methods: {
    async closeDialog() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>