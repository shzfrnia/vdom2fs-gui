<template>
  <el-timeline-item :timestamp="timestamp" placement="top" :class="activeClass">
    <el-card>
      <h4>{{ file }}</h4>
    </el-card>
  </el-timeline-item>
</template>

<script>
export default {
  props: ["file", "active"],
  computed: {
    timestamp() {
      return new Date(this.file.slice(0, -4)).toDateString();
    },
    activeClass() {
      return this.active ? "active" : "";
    },
  },
};
</script>

<style>
/* .active {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
} */
</style>