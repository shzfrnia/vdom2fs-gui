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
      :disableParseButton="activeFile == null"
    />
    <div class="content-wrapper">
      <timeline-items
        :files="files"
        @item-click="timelineItemClick"
        :activeFile="activeFile"
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
      files: [],
      activeStates: {},
    };
  },
  computed: {
    activeFile() {
      return this.activeStates[this.config.id]?.activeFile;
    },
  },
  methods: {
    ...mapActions("configs", ["getConfigById"]),
    ...mapActions("vdom2fs", [
      "exportApplication",
      "getConfigExportedAppsFiles",
      "parseApplication",
    ]),
    async timelineItemClick(fileName) {
      this.activeStates[this.config.id] = {
        ...this.activeStates[this.config.id],
        activeFile: fileName,
      };
    },
    async setupConfig() {
      this.config = await this.getConfigById(this.$route.params.id);
      this.updateFiles();
    },
    async updateFiles() {
      this.files = await this.getConfigExportedAppsFiles(this.config);
    },
    async exportHandler() {
      await this.exportApplication(this.config);
      this.updateFiles();
    },
    async parseHandler() {
      this.parseApplication({ config: this.config, file: this.activeFile });
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