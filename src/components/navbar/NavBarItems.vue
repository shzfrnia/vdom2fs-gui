<template>
  <draggable
    :list="modelValue"
    handle=".el-icon-d-caret"
    @start="dragging = true"
    @end="dragging = false"
    item-key="app_id"
    :class="{ dragging: dragging }"
    @change="$emit('update:modelValue', modelValue)"
  >
    <template #item="{ element }">
      <nav-bar-item
        class="menu-item"
        :class="{ hide: showFavorites ^ (element.favorite == true) }"
        @contextmenu.prevent.stop="openMenuItemContext(element)"
        :to="{ name: 'Config', params: { id: element.id } }"
        :label="element.name"
        :url="element.url"
        :icon="reorder ? 'el-icon-d-caret' : 'el-icon-menu'"
      />
    </template>
  </draggable>
</template>

<script>
import NavBarItem from './NavBarItem'
import draggable from 'vuedraggable'
import menuItemContextSetup from '@/api/context-menu/menu-item-context/menu-setup'

export default {
  setup() {
    return { ...menuItemContextSetup() }
  },
  data() {
    return {
      dragging: false,
    }
  },
  props: {
    modelValue: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
    showFavorites: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  components: { NavBarItem, draggable },
  emits: ['update:modelValue'],
}
</script>

<style scoped>
.hide {
  display: none;
}

.sortable-ghost {
  opacity: 0.1;
}
</style>
