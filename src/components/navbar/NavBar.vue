<template>
  <el-row @contextmenu.prevent="openMenuContext">
    <el-col :span="24">
      <el-menu class="el-menu-vertical-demo">
        <nav-bar-item
          class="menu-item"
          :to="{ name: 'Home' }"
          label="New"
          icon="el-icon-plus"
          url="Create config"
        />
        <el-divider margin="0"></el-divider>
        <nav-bar-items v-model="configs" :show-favorites="true" />
        <el-divider margin="0" v-if="favoritesConfigs.length > 0"></el-divider>
        <nav-bar-items v-model="configs" :show-favorites="false" />
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NavBarItems from './NavBarItems'
import menuContextSetup from '@/api/context-menu/menu-context/menu-setup'
import navBarItem from './NavBarItem'

export default {
  setup() {
    return { ...menuContextSetup() }
  },
  components: { NavBarItems, navBarItem },
  methods: {
    ...mapMutations('configs', ['updateConfigs']),
  },
  computed: {
    ...mapGetters('configs', ['favoritesConfigs']),
    configs: {
      get() {
        return this.$store.state.global.configs.configs
      },
      set(value) {
        this.updateConfigs(value)
      },
    },
  },
}
</script>

<style scoped>
.el-row {
  height: 100%;
  background: white;
}

.el-divider--horizontal {
  margin: 0;
}
</style>
