<template>
  <default padding-top="0" padding-left="0" padding-right="0">
    <config-bar />
    <div class="content-wrapper">
      <timeline-items />
    </div>
  </default>
</template>

<script>
import Default from "@/layouts/Default";
import ConfigBar from "@/components/ConfigBar/ConfigBar";
import TimelineItems from "@/components/Timeline/TimelineItems";

export default {
  components: { Default, ConfigBar, TimelineItems },
  data() {
    return {
      config: {},
    };
  },
  methods: {
    async setupConfig() {
      this.config = this.$store.state.global.configs.configs.filter(
        (e) => e.id == this.$route.params.id
      )[0];
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
}
</style>