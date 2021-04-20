<template>
  <default padding-top="0" padding-left="0" padding-right="0">
    <config-bar />
    <div class="content-wrapper">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>{{ config.name }} 2018/4/3 20:46</h4>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>Fetched 2018/4/3 20:46</h4>
            <p></p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </default>
</template>

<script>
import Default from "@/layouts/Default";
import ConfigBar from "@/components/ConfigBar/ConfigBar";

export default {
  components: { Default, ConfigBar },
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