<template>
  <base-layout>
    <template #header><app-header /></template>
    <slot />
    <template #footer><app-footer /></template>
  </base-layout>
</template>

<script>
import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
import BaseLayout from '@/layouts/BaseLayout'

export default {
  components: {
    BaseLayout,
    AppHeader,
    AppFooter,
  },
}
</script>
