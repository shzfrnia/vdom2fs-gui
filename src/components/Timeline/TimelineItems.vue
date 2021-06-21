<template>
  <el-timeline>
    <timeline-item v-for="i in [1, 2, 3]" :key="i" />
  </el-timeline>
</template>

<script>
import TimelineItem from "./TimelineItem";

export default {
  components: { TimelineItem },
};
</script>

<style>
</style>