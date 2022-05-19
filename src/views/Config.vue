<template>
  <default-layout
    padding-top="0"
    padding-left="0"
    padding-right="0"
    padding-bottom="0"
  >
    <config-bar @export-click="exportHandler" />
    <div class="content-wrapper"><timeline-items /></div>
  </default-layout>
</template>

<script>
import { mapActions } from "vuex";
import { default as DefaultLayout } from "@/layouts/Default";
import ConfigBar from "@/components/ConfigBar/ConfigBar";
import TimelineItems from "@/components/Timeline/TimelineItems";

export default {
  components: { DefaultLayout, ConfigBar, TimelineItems },
  data() {
    return {
      config: {},
    };
  },
  methods: {
    ...mapActions("configs", ["getConfigById"]),
    ...mapActions("vdom2fs", ["exportApplication"]),
    async setupConfig() {
      this.config = await this.getConfigById(this.$route.params.id);
    },
    async exportHandler() {
      this.exportApplication(this.config);
    },
  },
  async beforeUpdate() {
    this.setupConfig();
  },
  async created() {
    this.setupConfig();
  },
};
</script>

<style scoped>
.content-wrapper {
  padding: 20px;
  overflow: auto;
  flex: 1;
}
</style>