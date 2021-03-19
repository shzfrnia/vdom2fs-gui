import { PythonShell } from "python-shell";

function sendToPython() {
  PythonShell.run("src/api/python/main.py", {}, function(err, results) {
    console.log(results);
    if (err) throw err;
    // результаты - это массив, состоящий из сообщений, собранных во время выполнения
    // console.log('results: ', results);
    // result.textContent = results[0];
  });
}

export default sendToPython;
