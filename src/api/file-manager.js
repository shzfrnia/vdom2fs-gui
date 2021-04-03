import { Python } from "@/api/index";
import path from "path";
import fs from "fs";

class FileManager {
  static async checkFolderOnValidVdom2fsScripts(_path, scripts = {}) {
    const errors = [];
    const exporterPath = path.join(_path, scripts.exporter);
    const parsePath = path.join(_path, scripts.parse);
    const fileNotFoundMessage = "File not found";
    if (!await FileManager.fileExists(exporterPath)) {
      errors.push({ file: scripts.exporter, message: fileNotFoundMessage });
    }
    if (!await FileManager.fileExists(parsePath)) {
      errors.push({ file: scripts.parse, message: fileNotFoundMessage });
    }
    if (errors.length > 0) return { pathIsValid: false, errors };
    try {
      await Python.execute(exporterPath, { args: ["-h"] });
    } catch (error) {
      errors.push({
        file: scripts.exporter,
        message: error.toString().slice(0),
      });
    }
    try {
      await Python.execute(parsePath, { args: ["-h"] });
    } catch (error) {
      errors.push({ file: scripts.parse, message: error.toString().slice(0) });
    }
    return { pathIsValid: errors.length == 0, errors };
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
