<template>
  <router-view />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions('vdom2fs', ['checkVdom2fsFolderOnValid']),
  },
  computed: {
    ...mapGetters('vdom2fs', ['currentPath']),
  },
  async created() {
    this.checkVdom2fsFolderOnValid(this.currentPath)
  },
}
</script>
<style>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
