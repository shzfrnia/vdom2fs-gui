import { PythonShell } from "python-shell";

class Python {
  static async execute(path, options) {
    return new Promise((resolve, reject) => {
      PythonShell.run(
        path,
        { pythonPath: "python", args: options?.args || [] },
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}

export default Python;
