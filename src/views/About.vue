<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ $store.state.global.loading }}</div>
  </div>
</template>
<script>
import sendToPython from "../api/index";
// import { exec } from 'child_process'


export default {
  setup() {
  },
  created() {
    // exec('ls -lah /tmp', function(error, stdout, stderr) {
    //   console.log(error, stdout, stderr);
    // });
    // exec('ls -lah /tmp', function(error, stdout, stderr) {
    //   console.log(error,stdout, stderr);
    // });
    sendToPython();
  }
};
</script>