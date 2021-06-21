<template>
  <default padding-top="0" padding-left="0" padding-right="0">
    <config-bar /> {{ config }}
    <div class="content-wrapper"><timeline-items /></div>
  </default>
</template>

<script>
import { mapActions } from "vuex";
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
    ...mapActions("configs", ["getConfigById"]),
    async setupConfig() {
      this.config = await this.getConfigById(this.$route.params.id);
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