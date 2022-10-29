import store from '@/store/index'

export default () => [
  {
    label: 'New config',
    click() {
      store.dispatch('configs/openCreateConfigDialog')
    },
  },
]
