<template>
  <my-dialog
    dialogTitle="Create application config"
    @update:modelValue="this.$emit('update:show', $event)"
    :model-value="show"
    @confirm-click="onConfirmClick"
  >
    <template #dialog-content> <config-form :config="config" /> </template>
  </my-dialog>
</template>

<script>
import MyDialog from "@/components/dialogs/Dialog";
import ConfigForm from "./ConfigForm";

export default {
  emits: ["created", "update:show"],
  components: { MyDialog, ConfigForm },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true,
    },
    config: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  methods: {
    async closeDialog() {
      this.$emit("update:show", false);
    },
    async onConfirmClick() {
      this.closeDialog();
    }
  },
};
</script>