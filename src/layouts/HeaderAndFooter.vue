
<template>
  <base-layout>
    <template v-slot:header><custom-header /></template>
    <slot />
    <template v-slot:footer><custom-footer /></template>
  </base-layout>
</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BaseLayout from "@/layouts/Base";

export default {
  components: {
    BaseLayout,
    CustomHeader: Header,
    CustomFooter: Footer,
  },
};
</script>

