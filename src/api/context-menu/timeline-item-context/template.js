import configSetup from '@/views/config/setup'

const {
  parseExportedApp: parseHandler,
  openFolderOfExportedApp: openHandler,
  removeExportedApp: removeHandler,
} = configSetup()

export default (exportedApp, parseCallback, removeCallback) => [
  {
    label: 'Parse',
    click() {
      parseHandler(exportedApp, parseCallback)
    },
  },
  { type: 'separator' },
  {
    label: 'Folder',
    click() {
      openHandler(exportedApp)
    },
  },
  {
    label: 'Remove',
    click() {
      removeHandler(exportedApp, removeCallback)
    },
  },
]
