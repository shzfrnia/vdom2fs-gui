import { remote } from 'electron'
import { ref } from 'vue'
import template from './template'
const { Menu } = remote

export default () => {
  const reorder = ref(false)

  const openMenuItemContext = (config) => {
    const contextMenuTemplate = template(config, { reorder })
    Menu.buildFromTemplate(contextMenuTemplate).popup({
      window: remote.getCurrentWindow(),
    })
  }

  return { openMenuItemContext, reorder }
}
