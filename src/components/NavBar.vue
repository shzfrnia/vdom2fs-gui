
<template>
  <el-row>
    <el-col :span="24">
      <el-menu class="el-menu-vertical-demo">
        <router-link to="/">
          <el-menu-item>
            <i class="el-icon-menu"></i>
            <span>app1</span>
          </el-menu-item>
        </router-link>
        <router-link to="/about">
          <el-menu-item>
            <i class="el-icon-menu"></i>
            <span>app2</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style>
a {
  text-decoration: none;
  text-align: left;
}

.router-link-active span,
.router-link-active i {
  color: #409eff !important;
}

.el-row {
  height: 100%;
  background: white;
}
</style>
