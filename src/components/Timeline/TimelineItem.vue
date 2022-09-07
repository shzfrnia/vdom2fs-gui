<template>
  <el-timeline-item :timestamp="timestamp" placement="top" :class="activeClass">
    <el-card>
      <h4><i class="icon el-icon-document" />{{ xmlName }} ({{ xmlSize }})</h4>
      <h4 v-if="item.isParsed"><i class="icon el-icon-folder-opened" />{{ xmlName.split(".")[0] }} {{ parsedAppSize }}</h4>
    </el-card>
  </el-timeline-item>
</template>

<script>
export default {
  props: ["item", "active"],
  computed: {
    timestamp() {
      return this.item.name.split(" ").slice(0, 5).join(" ");
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
/* .active {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
} */
</style>