const fs = require('fs-extra');
const path = require('node:path');

const ROOT_DIRECTORY = __dirname;

(() => {
  fs.readdir(ROOT_DIRECTORY, (err, files) => {
    if(err)
      throw err;

      for(let i = 0; i < files.length; i++) {
        const file = files[i];

        if(file.endsWith('.js')) {

          const NEW_FILENAME = `${file.slice(0, file.length-3)}.cjs`;

          if(fs.pathExistsSync(NEW_FILENAME))
            fs.removeSync(NEW_FILENAME);

          fs.rename(file, NEW_FILENAME);
        }
        else
          continue;
      }
  });
})();
