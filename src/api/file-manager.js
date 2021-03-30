import { Python } from "@/api/index";
const path = require("path");

class FileManager {
  static async checkFolderOnValidVdom2fsScripts(_path, scripts = {}) {
    const errors = [];
    const exporterPath = path.join(_path, scripts.exporter);
    const parsePath = path.join(_path, scripts.parse);
    try {
      await Python.execute(exporterPath, { args: ["-h"] });
    } catch (error) {
      errors.push({ file: scripts.exporter, message: error });
    }
    try {
      await Python.execute(parsePath, { args: ["-h"] });
    } catch (error) {
      errors.push({ file: scripts.parse, message: error });
    }
    return { pathIsValid: errors.length == 0, errors };
  }
}

export default FileManager;
