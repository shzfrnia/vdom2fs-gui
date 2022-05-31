<template>
  <el-timeline>
    <timeline-item
      v-for="i in files"
      :key="i"
      :file="i"
      @click="itemClick(i)"
      :color="i == activeFile ? '#409eff' : null"
      :active="i == activeFile"
    />
  </el-timeline>
</template>

<script>
import TimelineItem from "./TimelineItem";

export default {
  components: { TimelineItem },
  props: {
    activeFile: String,
    files: Array,
  },
  emits: ["item-click"],
  methods: {
    itemClick(i) {
      this.$emit("item-click", i);
    },
  },
};
</script>

<style>
.el-timeline .el-timeline-item:last-child {
  padding-bottom: 0;
}
</style>