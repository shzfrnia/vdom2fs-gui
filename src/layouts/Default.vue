
<template>
  <base-layout>
    <template #header><custom-header /></template>
    <template #aside>
      <el-aside style="width: 200px"><nav-bar /></el-aside>
    </template>
    <slot />
    <template #footer><custom-footer /></template>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/Base";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
  components: {
    NavBar,
    CustomHeader: Header,
    BaseLayout,
    CustomFooter: Footer,
  },
};
</script>
