<template>
  <el-timeline>
    <timeline-item
      v-for="i in [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ]"
      :key="i"
    />
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