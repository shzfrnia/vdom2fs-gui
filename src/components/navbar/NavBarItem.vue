<template>
  <router-link :to="to">
    <el-menu-item>
      <div class="wrapper">
        <i :class="icon" class="icon" />
        <p class="item-label">{{ label }}</p>
        <p class="url-label">{{ url }}</p>
      </div>
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

.el-menu-item {
  display: inline-flex;
  padding-top: 15px;
  line-height: initial;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}

a,
.el-menu-item i,
.el-menu-item,
.el-menu-item.is-active {
  color: #333;
}

.icon {
  float: left;
  flex-shrink: 0;
  grid-area: icon;
}

.item-label {
  grid-area: label;
  height: 0;
}

.wrapper {
  display: grid;
  grid-template-areas:
    "icon label"
    "icon url";
}

.url-label {
  grid-area: url;
  color: gray !important;
  font-size: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.dragging .menu-item:hover {
  background: unset;
}

.menu-item:hover {
  background: #ecf5ff;
}

.menu-item:active {
  cursor: grabbing;
}
</style>