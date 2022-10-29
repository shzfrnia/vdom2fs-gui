<template>
  <el-timeline>
    <timeline-item
      v-for="i in exportedApps"
      :key="i.name"
      :item="i"
      @click="$emit('itemClick', i.name)"
      :color="i.name == activeExportedApp ? '#409eff' : null"
      :active="i.name == activeExportedApp"
      :type="i.isParsed ? 'success' : 'info'"
      @right-click="$emit('itemRightClick', i)"
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
  emits: ["itemClick", "itemRightClick"],
};
</script>

<style>
.el-timeline .el-timeline-item:last-child {
  padding-bottom: 0;
}
</style>