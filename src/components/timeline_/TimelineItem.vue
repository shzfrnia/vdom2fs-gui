<template>
  <el-timeline-item :timestamp="timestamp" placement="top" :class="activeClass">
    <el-card @contextmenu.prevent.stop="$emit('rightClick')">
      <h4><i class="icon el-icon-document" />({{ xmlSize }})</h4>
      <h4 v-if="item.isParsed">
        <i class="icon el-icon-folder-opened" />{{ parsedAppSize }}
      </h4>
    </el-card>
  </el-timeline-item>
</template>

<script>
export default {
  props: ["item", "active"],
  computed: {
    timestamp() {
      return new Date(Number(this.item.name) * 1000).toLocaleString();
    },
    activeClass() {
      return this.active ? "active" : "";
    },
    xmlName() {
      return this.item.appXmlName;
    },
    xmlSize() {
      return this.item.appXmlSizeFormatted;
    },
    parsedAppSize() {
      return this.item.isParsed
        ? `(${this.item.parsedFolderSizeFormatted})`
        : ``;
    },
  },
};
</script>

<style>
.icon {
  margin-right: 3px;
}
h4 {
  display: inline;
  margin-right: 5px;
}
/* .active {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
} */
</style>