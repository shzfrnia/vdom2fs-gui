<template>
  <header-and-footer-layout>
    <el-empty description="Укажите путь до vdom2fs">
      <el-button @click="chooseFolder" type="primary">
        Настроить папку
      </el-button>
    </el-empty>
  </header-and-footer-layout>
</template>

<script>
import HeaderAndFooterLayout from '@/layouts/HeaderAndFooterLayout'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    HeaderAndFooterLayout,
  },
  computed: {
    ...mapGetters('vdom2fs', ['pathErrors']),
  },
  watch: {
    pathErrors() {
      this.printPathErrors()
    },
  },
  methods: {
    ...mapActions('vdom2fs', ['chooseFolder']),
    ...mapActions(['notify']),
    ...mapActions('notification', ['clearAll']),
    async printPathErrors() {
      this.clearAll()
      this.pathErrors.forEach(async (el) => {
        this.notify({
          title: el.file,
          message: el.message,
          duration: 0,
          type: 'error',
        })
      })
    },
  },
  created() {
    this.printPathErrors()
  },
}
</script>
