<template>
  <el-timeline-item :timestamp="new Date(file.slice(0, -4)).toDateString()" placement="top">
    <el-card>
      <h4>{{file}}</h4>
    </el-card>
  </el-timeline-item>
</template>

<script>
export default {
  props: [
    'file'
  ]
};
</script>

<style>
</style>