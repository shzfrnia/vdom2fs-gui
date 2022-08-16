<template>
  <el-timeline>
    <timeline-item
      v-for="i in exportedApps"
      :key="i.name"
      :item="i"
      @click="itemClick(i.name)"
      :color="i.name == activeExportedApp ? '#409eff' : null"
      :active="i.name == activeExportedApp"
      :type="i.isParsed ? 'success' : 'info'"
    />
  </el-timeline>
</template>

<script>
import TimelineItem from "./TimelineItem";

export default {
  components: { TimelineItem },
  props: {
    activeExportedApp: String,
    exportedApps: Array,
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