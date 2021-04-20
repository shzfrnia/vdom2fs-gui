<template>
  <router-link :to="to">
    <el-menu-item>
      <i :class="icon" />
      <span class="item-label">
        {{ label }}
        <span class="url-label">{{ url }}</span>
      </span>
    </el-menu-item>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
      default: "el-icon-menu",
    },
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  text-align: left;
  user-select: none;
  display: block;
}

a li:focus,
a li:hover {
  background: unset;
}

.router-link-active .item-label,
.router-link-active i {
  color: #409eff !important;
}

.el-icon-d-caret {
  cursor: grab;
}

a,
.el-menu-item i,
.el-menu-item,
.el-menu-item.is-active {
  color: #333;
}

.item-label {
  position: relative;
}

.url-label {
  color: gray !important;
  top: -6px;
  left: 0;
  font-size: 10px;
  position: absolute;
}
</style>