<template>
  <header-and-footer>
    <el-empty description="Укажите путь до vdom2fs">
      <el-button @click="chooseFolder" type="primary">
        Настроить папку
      </el-button>
      <div>{{pathErrors}}</div>
    </el-empty>
  </header-and-footer>
</template>

<script>
import HeaderAndFooter from "@/layouts/HeaderAndFooter";
import { remote } from "electron";
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    HeaderAndFooter,
  },
  computed: {
    ...mapGetters('vdom2fs', [
      'pathErrors'
    ])
  },
  methods: {
    ...mapActions('vdom2fs', [
      'checkVdom2fsFolderOnValid'
    ]),
    chooseFolder() {
      remote.dialog
        .showOpenDialog({ properties: ["openDirectory"] })
        .then((result) => {
          if (!result.canceled) {
            this.checkVdom2fsFolderOnValid(result.filePaths[0]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>