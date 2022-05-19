<template>
  <el-timeline>
    <timeline-item v-for="i in files" :key="i" :file="i" />
  </el-timeline>
</template>

<script>
import TimelineItem from "./TimelineItem";

export default {
  components: { TimelineItem },
  props: ['files']
};
</script>

<style>
.el-timeline .el-timeline-item:last-child {
  padding-bottom: 0;
}
</style>