
<template>
  <div
    class="common-layout"
    v-loading="$store.getters.loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="el-header">
      <slot name="header" />
    </div>
    <el-container class="body">
      <slot name="aside" />
      <el-container>
        <el-main>
          <slot />
        </el-main>
      </el-container>
    </el-container>
    <div class="el-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.common-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.el-header,
.el-footer {
  flex-shrink: 0;
  background-color: #b3c0d1;
  color: #333;
}

.body {
  flex-grow: 1;
  overflow: auto;
  background-color: #e9eef3;
}
</style>
