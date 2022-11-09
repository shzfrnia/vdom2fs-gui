import { PythonShell } from 'python-shell'
import store from '@/store/index'

class Python {
  static execute(path, options) {
    const args = options?.args || []
    store.commit(
      'logs/addLog',
      {
        content: ['Run script:', path, JSON.stringify(args)],
      },
      { root: true }
    )

    return new Promise((resolve, reject) => {
      PythonShell.run(path, { pythonPath: 'python', args }, (err, results) => {
        if (err) reject(err)
        resolve(results)
      })
    })
      .then((result) => {
        store.commit(
          'logs/addLog',
          {
            content: ['Script executed:', result],
            type: 'success',
          },
          { root: true }
        )
      })
      .catch((err) => {
        store.commit(
          'logs/addLog',
          {
            content: ['Script executed:', err],
            type: 'danger',
          },
          { root: true }
        )
      })
  }

  static runString(src, messageCallback) {
    return new Promise((resolve, reject) => {
      const python = PythonShell.runString(src, null, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
      python.on('message', messageCallback)
    })
  }
}

export default Python
