<template>
  <router-view />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ipcRenderer } from "electron";

export default {
  methods: {
    ...mapActions("vdom2fs", ["checkVdom2fsFolderOnValid"]),
  },
  computed: {
    ...mapGetters("vdom2fs", ["currentPath"]),
  },
  async created() {
    // renderer
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      ipcRenderer.send("show-context-menu");
    });

    ipcRenderer.on("context-menu-command", (e, command) => {
      console.error(e, command);
    });
    this.$store.commit("setLoading", true);
    try {
      await this.checkVdom2fsFolderOnValid(this.currentPath);
    } catch (error) {
      this.$router.router.push("Setup");
    } finally {
      this.$store.commit("setLoading", false);
    }
  },
};
</script>
<style>
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
