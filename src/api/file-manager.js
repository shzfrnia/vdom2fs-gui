import path from "path";
import fs from "fs";
import temp from "temp";

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

  static cleanupTempFiles() {
    temp.cleanup();
  }

  static async createTempFile(src) {
    return new Promise((resolve, reject) => {
      temp.track();
      temp.open("tempconfig.txt", function(err, info) {
        if (!err) {
          fs.write(info.fd, src, () => {});
          fs.close(info.fd, () => {
            resolve(info);
          });
        } else {
          reject(err);
        }
      });
    });
  }

  static async moveFile(from, dest) {
    await fs.promises.mkdir(path.dirname(dest), { recursive: true });
    await fs.promises.rename(from, dest);
  }

  static async getFilesByPath(_path) {
    return new Promise((resolve) => {
      fs.readdir(_path, (err, files) => {
        if (err) {
          console.warn(err);
          resolve([]);
        } else {
          resolve(files);
        }
      });
    });
  }
}

export default FileManager;
