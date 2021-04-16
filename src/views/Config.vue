<template>
  <default>
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>{{ config.name }}</h4>
          <p>Tom committed 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </default>
</template>

<script>
import Default from "@/layouts/Default";

export default {
  components: { Default },
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