<template>
  <header-and-footer>
    <el-empty description="Укажите путь до vdom2fs">
      <el-button @click="chooseFolder" type="primary">
        Настроить папку
      </el-button>
    </el-empty>
  </header-and-footer>
</template>

<script>
import HeaderAndFooter from "@/layouts/HeaderAndFooter";
import { remote } from "electron";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    HeaderAndFooter,
  },
  computed: {
    ...mapGetters("vdom2fs", ["pathErrors"]),
  },
  watch: {
    pathErrors() {
      this.printPathErrors();
    },
  },
  methods: {
    ...mapActions("vdom2fs", ["checkVdom2fsFolderOnValid"]),
    ...mapActions(["notify"]),
    ...mapActions("notification", ["clearAll"]),
    chooseFolder() {
      remote.dialog
        .showOpenDialog({ properties: ["openDirectory"] })
        .then((result) => {
          if (!result.canceled) {
            this.checkVdom2fsFolderOnValid(result.filePaths[0]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async printPathErrors() {
      this.clearAll();
      this.pathErrors.forEach(async (el) => {
        this.notify({
          title: el.file,
          message: el.message,
          duration: 0,
          type: "error",
        });
      });
    },
  },
  created() {
    this.printPathErrors();
  },
};
</script>