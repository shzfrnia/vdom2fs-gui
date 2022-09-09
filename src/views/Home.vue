<template>
  <default-layout>
    <div class="wrapper">
      <uploader
        accept=".txt"
        tip="Upload or create config file"
        :multiple="true"
        @on-change="uploaderOnChange"
      />
      <el-button
        @click="openCreateConfigDialog"
        size="medium"
        icon="el-icon-plus"
        circle
      />
    </div>
  </default-layout>
</template>

<script>
import { default as DefaultLayout } from "@/layouts/Default";
import Uploader from "@/components/inputs/Uploader";
import { mapActions } from "vuex";

export default {
  components: { DefaultLayout, Uploader },
  name: "Home",
  methods: {
    ...mapActions("vdom2fs", ["openCreateConfigDialog"]),
    uploaderOnChange({ fileList }) {
      // fs.readFile(fileList[0].raw.path, "utf8", (err, data) => {
      //   if (err) {
      //     console.error(err);
      //     return;
      //   }
      //   console.log(data);
      // });
      console.log(fileList);
    },
  },
};
</script>

<style scoped>
.wrapper {
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.uploader {
  margin-bottom: 10px;
}
</style>
