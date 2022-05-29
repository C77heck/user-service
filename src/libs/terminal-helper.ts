const { exec } = require("child_process");

const terminal = (command: string) => {
  exec(command, (error: any, stdout: string, stderr: string) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  // to call it recursively.
  // setTimeout(() => terminal(command), 4000)
};

exports.terminal = terminal;
