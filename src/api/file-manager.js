import path from "path";
import fs from "fs";
import temp from "temp";
import { shell, remote } from "electron";
import fastFolderSizeSync from "fast-folder-size/sync";
const { dialog } = remote;

class FileManager {
  static async filesExists(_path, files) {
    const errors = [];
    for (const value of Object.values(files)) {
      if (!(await FileManager.fileExists(path.join(_path, value)))) {
        errors.push({ file: value, message: "File not found" });
      }
    }
    if (errors.length > 0) {
      throw errors;
    }
  }

  static async fileExists(_path) {
    return new Promise((resolve) => {
      fs.access(_path, fs.F_OK, (err) => {
        if (err) resolve(false);
        resolve(true);
      });
    });
  }

  static fileExistsSync(_path) {
    return fs.existsSync(_path);
  }

  static cleanupTempFiles() {
    temp.cleanup();
  }

  static createTempFile(src) {
    return new Promise((resolve, reject) => {
      temp.track();
      temp.open("tempvdom2fsconfig", function(err, info) {
        if (!err) {
          fs.write(info.fd, src, (err) => {
            if (err) {
              console.error(err);
              reject("Error when creating temp file: ", err);
            } else {
              resolve(info);
            }
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

  static async readdir(_path) {
    return new Promise((resolve) => {
      fs.readdir(_path, { withFileTypes: true }, (err, files) => {
        if (err) {
          console.warn(err);
          resolve([]);
        } else {
          files = files.filter((file) => ![".DS_Store"].includes(file.name));
          resolve(files);
        }
      });
    });
  }

  static async getFilesByPath(_path) {
    return (await FileManager.readdir(_path))
      .filter((file) => file.isFile())
      .map((file) => file.name);
  }

  static async getFoldersByPath(_path) {
    return (await FileManager.readdir(_path))
      .filter((file) => !file.isFile())
      .map((file) => file.name);
  }

  static rmdirSync(_path) {
    return fs.rmdirSync(_path, { recursive: true });
  }

  static getFileStatSync(_path) {
    return fs.statSync(_path);
  }

  static getFolderSize(_path) {
    return fastFolderSizeSync(_path);
  }

  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  static openPath(_path) {
    shell.openPath(_path);
  }

  static removeFolder(_path) {
    fs.rmdirSync(_path, { recursive: true, force: true });
  }

  static saveAs(fileName, src) {
    dialog
      .showSaveDialog({
        title: "Select the File Path to save",
        defaultPath: fileName,
        buttonLabel: "Save",
        filters: [
          {
            name: "Text Files",
            extensions: ["txt"],
          },
        ],
      })
      .then((file) => {
        if (!file.canceled) {
          fs.writeFile(file.filePath.toString(), src, (err) => {
            if (err) throw err;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default FileManager;
