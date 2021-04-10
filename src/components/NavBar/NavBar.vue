
<template>
  <el-row>
    <el-col :span="24">
      <el-menu class="el-menu-vertical-demo">
        <nav-bar-items v-model="configs" :show-favorites="true" />
        <el-divider margin="0" v-if="favoritesConfigs.length > 0"></el-divider>
        <nav-bar-items v-model="configs" :show-favorites="false" />
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import NavBarItems from "./NavBarItems";

export default {
  components: { NavBarItems },
  methods: {
    ...mapMutations("configs", ["updateConfigs"]),
  },
  computed: {
    ...mapGetters("configs", ["favoritesConfigs"]),
    configs: {
      get() {
        return this.$store.state.global.configs.configs;
      },
      set(value) {
        this.updateConfigs(value);
      },
    },
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
