import { PythonShell } from 'python-shell'

class Python {
  static execute(path, options) {
    return new Promise((resolve, reject) => {
      PythonShell.run(
        path,
        { pythonPath: 'python', args: options?.args || [] },
        (err, results) => {
          if (err) reject(err)
          resolve(results)
        }
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
