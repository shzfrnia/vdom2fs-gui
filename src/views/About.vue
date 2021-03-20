<template>
  <default />
</template>
<script>
import sendToPython from "../api/index";
import Default from "../layouts/Default"

export default {
  components: {
    Default
  },
  setup() {},
  created() {
    sendToPython();
  },
};
</script>