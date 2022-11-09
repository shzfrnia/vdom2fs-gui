<template>
  <el-timeline>
    <el-timeline-item
      v-for="(log, i) in logs"
      :key="log.timestamp"
      :icon="icon(log)"
      :type="type(log)"
      :color="color(log)"
      :size="size(log)"
      :timestamp="timestamp(log)"
      :ref="`log_${i}`"
    >
      {{ log.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      logs: (state) => state.logs.logsRows,
    }),
    icon() {
      return (log) => log.icon
    },
    type() {
      return (log) => log.type
    },
    color() {
      return (log) => log.color
    },
    size() {
      return (log) => log.size
    },
    timestamp() {
      return (log) => new Date().toLocaleTimeString(log.timestamp)
    },
  },
  methods: {
    scrollToLastLog() {
      const el = this.$refs[`log_${this.logs.length - 1}`][0]
      if (el) {
        el.$el.scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
}
</script>

<style scoped>
.el-timeline {
  overflow: auto;
  height: 100%;
  padding: 20px;
  white-space: break-spaces;
}
</style>
