<template>
  <default-layout>
    <div class="wrapper">
      <uploader-input
        accept=".txt"
        tip="Upload or create config file"
        :multiple="false"
        @on-success="uploaderSuccess"
        :show-file-list="false"
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
import DefaultLayout from '@/layouts/DefaultLayout'
import UploaderInput from '@/components/inputs/UploaderInput'
import { mapActions } from 'vuex'

export default {
  components: { DefaultLayout, UploaderInput },
  name: 'HomeView',
  methods: {
    ...mapActions('configs', [
      'openCreateConfigDialog',
      'openCreateDialogConfigFromFile',
    ]),
    uploaderSuccess({ file }) {
      this.openCreateDialogConfigFromFile(file)
    },
  },
}
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
