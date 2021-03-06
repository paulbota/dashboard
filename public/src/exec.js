const path = require('path');
const app = require('electron').app;
const {spawn} = require('child_process');

const afs = require('./afs');
const execStatus = require('../api/execStatus');

const idToPath = (id) => id.replace(/\*/g, '_');

module.exports = {
  runAction: async (id, action, onStatusChange) => {
    const dataFolder = path.join(app.getPath('userData'), 'data', idToPath(id));
    const batFileName = 'run.bat';
    const batFile = path.join(dataFolder, batFileName);

    await afs.mkdir(dataFolder);
    await afs.writeFile(batFile, `${ action }\n`);

    const commandProc = spawn(`"${ batFile }"`, [], {shell: true, cwd: dataFolder});

    onStatusChange({id, status: execStatus.RUNNING});

    commandProc.stdout.on('data', (data) => {
      onStatusChange({id, status: execStatus.INFO, data});
      console.log(`stdout: ${ data }`);
    });

    commandProc.stderr.on('data', (data) => {
      onStatusChange({id, status: execStatus.ERROR, data});
      console.log(`stderr: ${ data }`);
    });

    commandProc.on('close', (code) => {
      if (code === 0) {
        onStatusChange({id, status: execStatus.DONE_SUCCESS});
      } else {
        onStatusChange({id, status: execStatus.DONE_ERROR});
      }
      console.log(`child process exited with code ${ code }`);
    });
  },
};
