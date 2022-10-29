import { remote } from 'electron'
import template from './template'
const { Menu } = remote

export default () => {
  const openMenuItemContext = (exportedApp, parseCallback, removeCallback) => {
    const contextMenuTemplate = template(
      exportedApp,
      parseCallback,
      removeCallback
    )
    Menu.buildFromTemplate(contextMenuTemplate).popup({
      window: remote.getCurrentWindow(),
    })
  }

  return { openMenuItemContext }
}
