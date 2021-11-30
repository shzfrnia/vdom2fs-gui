<template>
  <el-footer height="30px">
    <el-tag
      @click="chooseFolder"
      v-if="pathIsValid"
      size="mini"
      class="vdom2fspath"
    >
      {{ currentPath }}
    </el-tag>
    <el-tag size="mini">{{ $store.getters.appVersion }}</el-tag>
  </el-footer>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  methods: {
    ...mapMutations("vdom2fs", ["clearPath"]),
    ...mapActions("vdom2fs", ["chooseFolder"]),
  },
  computed: {
    ...mapGetters("vdom2fs", ["currentPath", "pathIsValid"]),
  },
};
</script>

<style scoped>
.el-footer {
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.el-tag {
  margin-right: 5px;
}

.vdom2fspath {
  text-decoration: none;
  color: #409eff !important;
}

.vdom2fspath:hover {
  text-decoration: underline !important;
  cursor: pointer;
}

.vdom2fspath:active {
  color: #409eff !important;
}
</style>