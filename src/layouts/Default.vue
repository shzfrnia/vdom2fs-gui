
<template>
  <base-layout
    :padding-top="paddingTop"
    :padding-left="paddingLeft"
    :padding-right="paddingRight"
    :padding-bottom="paddingBottom"
  >
    <template #header><app-header /></template>
    <template #aside>
      <el-aside><nav-bar /></el-aside>
    </template>

    <slot />

    <template #footer><app-footer /></template>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/Base";
import NavBar from "@/components/NavBar/NavBar";
import { default as AppFooter } from "@/components/Footer";
import { default as AppHeader } from "@/components/Header";
import paddingsMixin from "@/components/utils/paddings-mixin";

export default {
  mixins: [paddingsMixin],
  components: {
    NavBar,
    AppHeader,
    BaseLayout,
    AppFooter,
  },
};
</script>

<style scoped>
.el-aside {
  width: 200px !important;
}
</style>
