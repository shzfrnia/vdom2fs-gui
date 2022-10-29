import { remote } from 'electron'
import template from './template'
const { Menu } = remote

export default () => {
  const openMenuContext = () => {
    const contextMenuTemplate = template()
    Menu.buildFromTemplate(contextMenuTemplate).popup({
      window: remote.getCurrentWindow(),
    })
  }

  return { openMenuContext }
}
