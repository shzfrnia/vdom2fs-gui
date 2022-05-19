<template>
  <el-timeline>
    <timeline-item v-for="i in [1]" :key="i" />
  </el-timeline>
</template>

<script>
import TimelineItem from "./TimelineItem";

export default {
  components: { TimelineItem },
};
</script>

<style>
.el-timeline .el-timeline-item:last-child {
  padding-bottom: 0;
}
</style>