<template>
  <default-layout
    padding-top="0"
    padding-left="0"
    padding-right="0"
    padding-bottom="0"
  >
    <config-bar
      @export-click="exportHandler(config, updateExportedApps)"
      @parse-click="parseHandler(currentExportedApp, updateExportedApps)"
      @remove-click="removeHandler(currentExportedApp, afterRemoveExportedApp)"
      @open-click="openHandler(currentExportedApp)"
      :disableParseButton="activeExportedApp == null"
    />
    <div class="content-wrapper">
      <timeline-items
        :exportedApps="exportedApps"
        @item-click="timelineItemClick"
        :activeExportedApp="activeExportedApp"
        @item-right-click="itemRightClick"
      />
    </div>
  </default-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { default as DefaultLayout } from "@/layouts/Default";
import ConfigBar from "@/components/config-bar/ConfigBar";
import TimelineItems from "@/components/timeline/TimelineItems";
import configSetup from "./setup";
import timelineItemContextSetup from "@/api/context-menu/timeline-item-context/menu-setup";

export default {
  setup() {
    const {
      parseExportedApp: parseHandler,
      openFolderOfExportedApp: openHandler,
      removeExportedApp: removeHandler,
      exportApplication: exportHandler,
    } = configSetup();
    const { openMenuItemContext: openTimelineContextMenu } =
      timelineItemContextSetup();
    return {
      parseHandler,
      removeHandler,
      openHandler,
      exportHandler,
      openTimelineContextMenu,
    };
  },
  components: { DefaultLayout, ConfigBar, TimelineItems },
  data() {
    return {
      allExportedApps: [],
      activeStates: {},
    };
  },
  computed: {
    ...mapGetters("configs", ["getConfigById"]),
    activeExportedApp() {
      return this.activeStates[this.config.id]?.activeExportedApp;
    },
    exportedApps() {
      return [...this.allExportedApps].reverse();
    },
    currentExportedApp() {
      return this.exportedApps.filter(
        (el) => el.name == this.activeExportedApp
      )[0];
    },
    config() {
      return { ...this.getConfigById(this.$route.params.id) };
    },
  },
  methods: {
    ...mapActions("vdom2fs", ["getConfigExportedApps"]),
    async timelineItemClick(exportedApp) {
      this.activeStates[this.config.id] = {
        ...this.activeStates[this.config.id],
        activeExportedApp: exportedApp,
      };
    },
    async itemRightClick(exportedApp) {
      this.openTimelineContextMenu(
        exportedApp,
        this.updateExportedApps,
        this.afterRemoveExportedApp
      );
    },
    async setupConfig() {
      this.updateExportedApps();
    },
    async updateExportedApps() {
      this.allExportedApps = await this.getConfigExportedApps(this.config);
    },
    async afterRemoveExportedApp() {
      const indexOfApp = this.exportedApps.findIndex(
        (el) => el.appXml === this.currentExportedApp?.appXml
      );
      await this.updateExportedApps();
      if (indexOfApp === 0 && this.exportedApps.length > 0) {
        this.timelineItemClick(this.exportedApps[0].name);
      } else {
        this.timelineItemClick(null);
      }
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