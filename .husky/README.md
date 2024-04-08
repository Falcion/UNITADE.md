About issues, problems and etc.:

1. Initially, you need to have WSL (if Windows) and installed distributive for your system, in development process, we are using debian;
2. If NPM/NPX not found:
   1. https://github.com/desktop/desktop/issues/12562
   2. Also, check your "%PATH% → Node.js/bin/" paths in variable:\
      - Windows users, if you have everything set up and installed, check this comment from issue above:\
        https://github.com/desktop/desktop/issues/12562#issuecomment-1007154382
3. If you're migrating from "V4" to "V9":\
   https://typicode.github.io/husky/migrate-from-v4.html

More about WSL (you must install NVM+NPM+NPX on it):
1. https://github.com/microsoft/WSL/issues/4249/
2. https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl

This materials also can be helpful for fixing HUSKY hooks:
- https://stackoverflow.com/questions/67115897/vscode-github-desktop-pre-commit-hook-npx-command-not-found
- https://github.com/typicode/husky/issues/
- https://learn.microsoft.com/en-us/windows/wsl/install
- https://stackoverflow.com/questions/44829878/trying-to-use-bash-on-windows-and-got-no-installed-distributions-message
- https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

Next one are popular errors and fails thrown by HUSKY:

### CODE: `001`; spamming of question marks

Set up and install WSL OR set up instructions by this:\
https://github.com/desktop/desktop/issues/12562#issuecomment-1007154382

If this not helping, go through entire algorithm of fixing hooks from HUSKY and setting up WSL.

### Code: `127`; no such file or directory

Code of this exception contains multiple subtypes:

- Bash not found: check "%PATH%" (for .GIT correct paths), otherwise see guidelines above;
- "NPX" not found: make changes "npx" → "npx.cmd" in your scripts;
- "NPM" not found: make changes "npm" → "npm.cmd" in your scripts;
- "NVM" not found: download NVM on your PC and make ref in "%PATH%" variable, otherwise, set up WSL:
  - https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
  - https://learn.microsoft.com/en-us/windows/wsl/install
- Node not found: check "%PATH%" (for NODE correct paths), otherwise see guidelines above;
