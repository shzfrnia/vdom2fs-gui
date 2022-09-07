<template>
  <el-row>
    <el-col :span="24">
      <config-bar-items
        @export-click="$emit('export-click')"
        @parse-click="$emit('parse-click')"
        @open-click="$emit('open-click')"
        @remove-click="$emit('remove-click')"
        :disableParseButton="disableParseButton"
      />
    </el-col>
  </el-row>
</template>

<script>
import ConfigBarItems from "./ConfigBarItems";

export default {
  components: { ConfigBarItems },
  emits: ["export-click", "parse-click", "open-click", "remove-click"],
  props: {
    disableParseButton: Boolean,
  },
  methods: {
    check(event) {
      console.log(event);
    },
  },
};
</script>

<style scoped>
.el-col {
  background: #b3c0d16e;
  text-align: center;
  padding-top: 1px;
}
</style>