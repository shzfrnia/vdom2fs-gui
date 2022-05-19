import path from "path";
import fs from "fs";

class FileManager {
  static async filesExists(_path, scripts) {
    const errors = [];
    for (const value of Object.values(scripts)) {
      if (!(await FileManager.fileExists(path.join(_path, value)))) {
        errors.push({ file: value, message: "File not found" });
      }
    }
    if (errors.length > 0) {
      throw errors;
    }
  }

  static async fileExists(path) {
    return new Promise((resolve) => {
      fs.access(path, fs.F_OK, (err) => {
        if (err) resolve(false);
        resolve(true);
      });
    });
  }
}

export default FileManager;
