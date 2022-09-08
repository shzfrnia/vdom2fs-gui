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
      @remove-click="removeHandler"
      @open-click="openHandler"
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
      return [...this.allExportedApps].reverse();
    },
    currentExportedApp() {
      return this.exportedApps.filter(
        (el) => el.name == this.activeExportedApp
      )[0];
    },
  },
  methods: {
    ...mapActions("configs", ["getConfigById"]),
    ...mapActions(["notify"]),
    ...mapActions("vdom2fs", [
      "exportApplication",
      "getConfigExportedApps",
      "parseApplication",
      "openExportedAppFolder",
      "removeExportedApp",
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
      const notificationPromise = this.notify({
        title: "Message",
        message: "Fetching application...",
        duration: 0,
        type: "info",
      });
      await this.exportApplication(this.config);
      notificationPromise.then((notification) => {
        setTimeout(notification.close, 200);
        this.notify({
          title: "Success",
          message: "Application was exported",
          duration: 2000,
          type: "success",
        });
      });
      this.updateExportedApps();
    },
    async parseHandler() {
      const notificationPromise = this.notify({
        title: "Message",
        message: "Parse application...",
        duration: 0,
        type: "info",
      });
      await this.parseApplication(this.currentExportedApp);
      notificationPromise.then((notification) => {
        setTimeout(notification.close, 200);
        this.notify({
          title: "Success",
          message: "Application was parsed",
          duration: 2000,
          type: "success",
        });
      });
      this.updateExportedApps();
    },
    async openHandler() {
      this.openExportedAppFolder(this.currentExportedApp);
    },
    async removeHandler() {
      this.removeExportedApp(this.currentExportedApp);
      const indexOfApp = this.exportedApps.findIndex(
        (el) => el.appXml === this.currentExportedApp.appXml
      );
      await this.updateExportedApps();
      if (indexOfApp === 0 && this.exportedApps.length > 0) {
        this.timelineItemClick(this.exportedApps[0].name);
      } else {
        console.log("reset");
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