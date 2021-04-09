
<template>
  <el-row>
    <el-col :span="24">
      <el-menu class="el-menu-vertical-demo">
        <nav-bar-item
          @contextmenu="openMenuItemContext(config)"
          v-for="config in favoritesConfigs"
          :key="config.app_id"
          :to="{ name: 'Config', params: { id: config.app_id } }"
          :label="config.name"
        />
        <el-divider margin="0" v-if="favoritesConfigs.length > 0"></el-divider>
        <nav-bar-item
          @contextmenu="openMenuItemContext(config)"
          v-for="config in notFavoritesConfigs"
          :key="config.app_id"
          :to="{ name: 'Config', params: { id: config.app_id } }"
          :label="config.name"
        />
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import NavBarItem from "./NavBarItem";
import { mapGetters } from "vuex";
import menuItemContextSetup from "@/api/context-menu/menu-item-context/menu-item-context-setup";

export default {
  setup() {
    return { openMenuItemContext: menuItemContextSetup() };
  },
  components: { NavBarItem },
  computed: {
    ...mapGetters("configs", ["notFavoritesConfigs", "favoritesConfigs"]),
  },
};
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
