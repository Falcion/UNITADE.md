import * as fs from 'fs-extra';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as readline from 'readline';

const ROOT_DIRECTORY = __dirname;

const EXCLUDING_DIRECTORIES = ['node_modules', 'venv', '.git', 'out'];

let TARGET_VALUES = ['FALCION', 'PATTERNU', 'PATTERNUGIT'];

(async () => {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });

  const search_data = async (path: string, search_data: string[]) => {
    const content = (await fs.readFile(path, 'utf-8')).split('\n');

    for(let i = 0; i < content.length; i++) {
      const line = content[i].toUpperCase();

      for(const searching_string of search_data)
        if(line.includes(searching_string))
          console.log(`Found "${searching_string}" in L#${i++} of "${path}"`);
    }
  };

  const traverse_dir = async (dirpath: string) => {
    try {
      const files = await fs.readdir(dirpath);

      for (const file of files) {
        const fpath = path.join(dirpath, file);
        const fstat = await fs.stat(fpath);

        if (fstat.isDirectory()) {
          if (!EXCLUDING_DIRECTORIES.includes(file)) {
            await traverse_dir(fpath);
          }
        } else if (fstat.isFile()) {
          await search_data(fpath, TARGET_VALUES);
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${dirpath}: ${err}`);
    }
  };

  const write_manifest = async (packageJSON: any) => {
    const manifestJSON = {
      id: packageJSON.name,
      name: `${packageJSON.name[0].toUpperCase()}${packageJSON.name.slice(1, packageJSON.name.length)}`,
      description: packageJSON.description,
      author: packageJSON.author,
      license: packageJSON.license,
      version: packageJSON.version,
      authorUrl: '-'
    };

    await fs.writeFile('manifest.json', JSON.stringify(manifestJSON, null, 4));
  };

  if(!await fs.pathExists(ROOT_DIRECTORY + '/.env')) {
    await fs.createFile('.env');
    await fs.writeFile('.env', 'EXAMPLE_API_KEY=');
  }

  dotenv.config({
    path: './.env',
    encoding: 'utf-8'
  });

  const packageJSON = JSON.parse(fs.readFileSync('package.json', { encoding: 'utf-8'}));

  if(!await fs.pathExists(ROOT_DIRECTORY + '/manifest.json')) {
    await fs.createFile('manifest.json');

    await write_manifest(packageJSON);
  }

  const manifestAsJSON = JSON.parse(fs.readFileSync('manifest.json', { encoding: 'utf-8'}));

  const checkingRes = packageJSON.id === manifestAsJSON.id && packageJSON.name === manifestAsJSON.name
                  && packageJSON.description === manifestAsJSON.description && packageJSON.author === manifestAsJSON.author
                  && packageJSON.license === manifestAsJSON.license && packageJSON.version === manifestAsJSON.version;

  if(!checkingRes)
    console.error('There is desync in Manifest JSON and Package JSON! Causing override to manifest.json, but backuping at manifest-copy.json');

  await fs.copyFile('manifest.json', 'manifest-backup.json');

  await write_manifest(packageJSON);

  rl.question('Do you want to change the finding signature for the script? (y/n): ', (answ1) => {
    if(answ1 == 'y')
      rl.question('What words you need to find? (separated by comma): ', (answ2) => {
        const res = answ2.split(',');

        TARGET_VALUES = res;

        traverse_dir(ROOT_DIRECTORY);
        rl.close();
      });
    else {
      traverse_dir(ROOT_DIRECTORY);
      rl.close();
    }
  });
})();
