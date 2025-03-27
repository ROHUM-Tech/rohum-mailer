import fs from "fs";
import * as fsPromises from "node:fs/promises";
import path from "node:path";

const __dirname = import.meta.dirname;

const reqLogger = async (logMsg) => {
  if (!fs.existsSync(path.resolve(__dirname, "..", "logs")))
    await fsPromises
      .mkdir(path.resolve(__dirname, "..", "logs"))
      .then(() =>
        console.log("\x1b[32mlogs directory created sucessfully\x1b[0m")
      )
      .catch((e) => {
        console.log("\x1b[31mfalied to create logs directory\x1b[0m" + e);
        return;
      });

  try {
    await fsPromises.appendFile(
      path.resolve(__dirname, "..", "logs", "reqLogs.txt"),
      logMsg
    );
  } catch (error) {
    console.log(error);
  }
};

const reqLogger_middleware = (req, res, next) => {
  const dateTime = new Date().toUTCString();
  const logMsg = `${dateTime}\t${req.ip}\t${req.method}\t${req.headers.origin}\t${req.url}\n`;
  reqLogger(logMsg);
  console.log(
    `\x1b[34m${req.method}\t${req.headers.origin}\t${req.url}\x1b[0m`
  );
  next();
};

export { reqLogger_middleware };
