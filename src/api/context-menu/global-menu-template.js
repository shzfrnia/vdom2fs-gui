export default (defaultActions, parameters, browserWindow) => [
  defaultActions.copy(),
  {
    label: 'Rainbow',
    // Only show it when right-clicking images
    visible: parameters.mediaType === 'image',
  },
]
