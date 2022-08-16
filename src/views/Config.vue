<template>
  <default-layout
    padding-top="0"
    padding-left="0"
    padding-right="0"
    padding-bottom="0"
  >
    <config-bar
      @export-click="exportHandler"
      @parse-click="parseHandler"
      :disableParseButton="activeExportedApp == null"
    />
    <div class="content-wrapper">
      <timeline-items
        :exportedApps="exportedApps"
        @item-click="timelineItemClick"
        :activeExportedApp="activeExportedApp"
      />
    </div>
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
      allExportedApps: [],
      activeStates: {},
    };
  },
  computed: {
    activeExportedApp() {
      return this.activeStates[this.config.id]?.activeExportedApp;
    },
    exportedApps() {
      return [...this.allExportedApps].sort((f) => new Date(f)).reverse();
    }
  },
  methods: {
    ...mapActions("configs", ["getConfigById"]),
    ...mapActions("vdom2fs", [
      "exportApplication",
      "getConfigExportedApps",
      "parseApplication",
    ]),
    async timelineItemClick(exportedApp) {
      this.activeStates[this.config.id] = {
        ...this.activeStates[this.config.id],
        activeExportedApp: exportedApp,
      };
    },
    async setupConfig() {
      this.config = await this.getConfigById(this.$route.params.id);
      this.updateExportedApps();
    },
    async updateExportedApps() {
      this.allExportedApps = await this.getConfigExportedApps(this.config);
    },
    async exportHandler() {
      await this.exportApplication(this.config);
      this.updateExportedApps();
    },
    async parseHandler() {
      await this.parseApplication({ config: this.config, folder: this.activeExportedApp });
      this.updateExportedApps();
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