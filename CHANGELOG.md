# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.1.3](https://github.com/mokkapps/changelog-generator-demo/compare/v2.1.2...v2.1.3) (2024-04-22)


### Features

* **codebase:** move utils functions to new submodule from core of plugin ([91d839e](https://github.com/mokkapps/changelog-generator-demo/commits/91d839eb899d8527a0fcece849e41019659ad3d0))


### Build system

* **build-deps:** update every dependency and test them with new build ([e52d59d](https://github.com/mokkapps/changelog-generator-demo/commits/e52d59dc35fd0ef0b3ec2c73f31285e96471252d))


### Fixes

* **settings:** hard-fix of again occuring mobile config always enabling ([e11a6df](https://github.com/mokkapps/changelog-generator-demo/commits/e11a6dfcb0336e85c7050e333a1c1a284cdffc70))


### Refactoring

* **ts-locales:** lining and semantic fix of semicolons in settings locales ([150066c](https://github.com/mokkapps/changelog-generator-demo/commits/150066c6e4ed62e901a8b7b70fddf463df6c2663))
* **ts-utils:** lining and semantic fix of semicolons in the utils module ([80f6c4c](https://github.com/mokkapps/changelog-generator-demo/commits/80f6c4ce4ba6287dbd3b36397491f865e0aa751f))

### [2.1.2](https://github.com/mokkapps/changelog-generator-demo/compare/v2.1.1...v2.1.2) (2024-04-18)


### Fixes

* **edit-modal:** fix behaviour of edit extension modal ([897c4d2](https://github.com/mokkapps/changelog-generator-demo/commits/897c4d273c574e09f88b1126377edbfe8ae24919))

### [2.1.1](https://github.com/mokkapps/changelog-generator-demo/compare/v2.1.0...v2.1.1) (2024-04-15)


### Features

* **modals:** add modal in files menu which allows you to create files with custom extensions ([4880eac](https://github.com/mokkapps/changelog-generator-demo/commits/4880eac0770aa8d7dffdf60b554abdba74ef022f))
* **modals:** add modal in files menu which allows you to edit file's extensions ([1637443](https://github.com/mokkapps/changelog-generator-demo/commits/163744371915269703538ce404092767bab68d05))
* **modals:** add new modals for creating and editing files ([5d40b5b](https://github.com/mokkapps/changelog-generator-demo/commits/5d40b5b7694d37fcabd2de4bee28ec544b985864))


### Build system

* **build-env:** update manifest for OBSIDIAN's API ([24d0ecf](https://github.com/mokkapps/changelog-generator-demo/commits/24d0ecff595b78240ce4b629805636f67f957ed1))


### Documentation

* **naming:** update naming of project (visual purposes) ([443189b](https://github.com/mokkapps/changelog-generator-demo/commits/443189b1e9f40070149087cddaab1cea490d812f))

## [2.1.0](https://github.com/mokkapps/changelog-generator-demo/compare/v2.0.0...v2.1.0) (2024-04-10)


### Features

* **debug-mode:** add debug mode in hidden extensions (accessed through data.json) to show more data in console ([ccfdda6](https://github.com/mokkapps/changelog-generator-demo/commits/ccfdda622cdc65df64349174bc90858846c9aa7c))
* **errors:** now error handling is more complex and it tries to show user any error possible (without spam) ([d97c645](https://github.com/mokkapps/changelog-generator-demo/commits/d97c645dcde964020824b5fbf0dbdc1d96d2606d))
* **hard-load:** add hard-load button to force-load extensions ([8859546](https://github.com/mokkapps/changelog-generator-demo/commits/8859546cafb9b4ee551ff1dc60ef2951ec107748))
* **semifix-group:** add parallel loading to the extensions block of groups and defaults one for less bugs and errors ([442d253](https://github.com/mokkapps/changelog-generator-demo/commits/442d2532b135ef09aceb17c1ef8c05013af7843c))


### Fixes

* **core:** fix always 'true' in mobile extensions settings (can't turn off) ([3878d61](https://github.com/mokkapps/changelog-generator-demo/commits/3878d614f1028e3922bce1a5ca5ef9f889103679))
* **core:** fix ignoring masks mode for files and fix parsing of regular expressions ([2beccba](https://github.com/mokkapps/changelog-generator-demo/commits/2beccba376dbd920aacd068230068c868dc1fb56))
* **global:** fix of [#32](https://github.com/Falcion/UNITADE.md/issues/32), [#31](https://github.com/Falcion/UNITADE.md/issues/31), [#30](https://github.com/Falcion/UNITADE.md/issues/30) ([267d823](https://github.com/mokkapps/changelog-generator-demo/commits/267d823c2923da78a44febbf9fff59a2d9004613))

## [2.0.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.2.0...v2.0.0) (2024-04-09)


### Features

* **codemirror:** revampe codemirror support ([6f0dcb6](https://github.com/mokkapps/changelog-generator-demo/commits/6f0dcb6ef52557ec75b7ae4daef1a0be6b51dc43))
* **codemirrors:** add support for codemirrors with extensions ([e470fb9](https://github.com/mokkapps/changelog-generator-demo/commits/e470fb994f74111806600b1debc9ded1cc84c76a))
* **core:** add custom view for extension as extension (grouped) mode ([367036b](https://github.com/mokkapps/changelog-generator-demo/commits/367036b716c839f2d8388137135cfd4dfc519f59))
* **core:** add extension as extension mode ([979f38b](https://github.com/mokkapps/changelog-generator-demo/commits/979f38b1d9b38d27210a728490703d49eca07c6a))
* **core:** add ignore extensions mode ([33982d2](https://github.com/mokkapps/changelog-generator-demo/commits/33982d29dd2f2196f9e0a49157b64af3b3a0b5d7))
* **core:** add ignore masks (filenames by regular expressions) mode ([e895bc3](https://github.com/mokkapps/changelog-generator-demo/commits/e895bc3c1f0afcd1e4ca463e790a5968099c38a3))
* **core:** add local codemirror support ([888442b](https://github.com/mokkapps/changelog-generator-demo/commits/888442bfb4713b68542369a94ae466fd4cf7a2ec))
* **core:** change reading way for user input ([533b287](https://github.com/mokkapps/changelog-generator-demo/commits/533b2875794082dd716a6fff1e09cb8943c68b1d))
* **core:** full rework of past plugin's functionality ([1dff5eb](https://github.com/mokkapps/changelog-generator-demo/commits/1dff5ebfdb8ce33ace6ed210868f429ebda849f4))
* **onload:** add support for ignoring dynamic registry mode ([e46895a](https://github.com/mokkapps/changelog-generator-demo/commits/e46895a5614047f137680f4ce8f5deafa69d2e7a))
* **onload:** add support for safe dynamic registry mode ([75444d9](https://github.com/mokkapps/changelog-generator-demo/commits/75444d90caa430416e5cd765cba23089ad3d102b))
* **onload:** add support for unsafe dynamic registry mode ([c2e9f34](https://github.com/mokkapps/changelog-generator-demo/commits/c2e9f34d659fe67df5ec0f842d7a8fde568ea168))
* **onload:** add two modes of dynamic registry, safe and unsafe ([06d93c6](https://github.com/mokkapps/changelog-generator-demo/commits/06d93c64dd08c91f4ad252e805d8d09b66c656f7))
* **registry:** add system for unloading registries ([75495d6](https://github.com/mokkapps/changelog-generator-demo/commits/75495d6261ae8da673ae47e2c5634ba4d9c0e47e))
* **registry:** add system which checks registered extensions ([3ade6aa](https://github.com/mokkapps/changelog-generator-demo/commits/3ade6aae68b00b92ab6fb47ceddf1a5804072f89))
* **registry:** reconfigure and rewrite at its concept the idea of registries in OBSIDIAN ([5241357](https://github.com/mokkapps/changelog-generator-demo/commits/5241357e7fb13c5cf77af04c53195e6a722932e2))
* **settings:** add errors view and mobile settings to the plugin ([dd63b1b](https://github.com/mokkapps/changelog-generator-demo/commits/dd63b1ba7107d741f2ce5fb4751f625bbac28f06))
* **settings:** add isolated localisation file for settings tab ([c97082e](https://github.com/mokkapps/changelog-generator-demo/commits/c97082eafd3d554e79f25413e3f97f8067163a67))
* **settings:** full rework of settings tab and it's visuals ([158eee2](https://github.com/mokkapps/changelog-generator-demo/commits/158eee21308755594e577f8f4fc50069a0b34152))


### Documentation

* **dealings:** add normalized docs for project ([d2ef762](https://github.com/mokkapps/changelog-generator-demo/commits/d2ef76242ba73ebd18c9fa35cf25adb94eeb5bcc))
* **dealings:** add techdocs to the project ([2d69d6a](https://github.com/mokkapps/changelog-generator-demo/commits/2d69d6a8cae4b4c4ed5ba6c3edb942301d47ddfe))
* **docs-env:** add funding sponsorship to the project ([c622c9b](https://github.com/mokkapps/changelog-generator-demo/commits/c622c9b2b06cd9bf1b3fa649aef1ad1e02d63d84))
* **docs-env:** add security policy within ref ([f4c96bd](https://github.com/mokkapps/changelog-generator-demo/commits/f4c96bd176eb84b43faebbd0254e72bfc9623d75))


### Build system

* **build-deps:** add ES builder for project (from OBSIDIAN) ([6daa972](https://github.com/mokkapps/changelog-generator-demo/commits/6daa97227fde129dcd5690fc409b76abd606575b))
* **build-deps:** integrate HUSKY into the environment ([a73a4ce](https://github.com/mokkapps/changelog-generator-demo/commits/a73a4ce7ce5f2951f45939184574b2f5d9f3812c))
* **build-env:** add scripts for environment ([0f17ed8](https://github.com/mokkapps/changelog-generator-demo/commits/0f17ed876cf3c76e574cacf28f27bc918f6b6cfb))
* **build-env:** add support for OBSDIAN in docs purposes ([9a30460](https://github.com/mokkapps/changelog-generator-demo/commits/9a30460d9230b9c6641aefc719ccce789104e2e4))
* **dependabot:** remove dependabot from project ([5960cb1](https://github.com/mokkapps/changelog-generator-demo/commits/5960cb115fed993562f41109cfdbcc6881cfdad7))
* **deps-dev:** bump chai from 4.4.0 to 5.0.0 ([7738d92](https://github.com/mokkapps/changelog-generator-demo/commits/7738d929bd33b3795f66a525ba3e2ba21c0e6418))
* **deps-dev:** bump chai from 4.4.0 to 5.0.0 ([08f1801](https://github.com/mokkapps/changelog-generator-demo/commits/08f1801826c5a3e37a03062a653e31ba83543d20))
* **deps-dev:** bump markdownlint from 0.32.1 to 0.33.0 ([2cdceda](https://github.com/mokkapps/changelog-generator-demo/commits/2cdceda65943fb2bab1e6b466193318199e4d2b9))


### Fixes

* **build:** fix and updated build and environment ([733910b](https://github.com/mokkapps/changelog-generator-demo/commits/733910b3461d6285100a0fb0c0893c8c9cbbc85e))

## [1.2.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.1.1...v1.2.0) (2024-01-10)


### Features

* **compatibility:** add noticing to conflicting plugins ([7aec49a](https://github.com/mokkapps/changelog-generator-demo/commits/7aec49a530dd50152cefcdf67135c468c43d7f4d))
* **dynamic:** add codemirrors support and dynamic registry functioning ([1c165e1](https://github.com/mokkapps/changelog-generator-demo/commits/1c165e1ffdccac26260e8093894f3eab7e57ecb1))


### Fixes

* **error-handling:** add error handling for extensions register and new button ([ab1da6b](https://github.com/mokkapps/changelog-generator-demo/commits/ab1da6b6b7dd00a772cc2a84426558fad03e3813))


### Common

* **publish:** prefinal version of this plugin ([3937096](https://github.com/mokkapps/changelog-generator-demo/commits/393709632e03ee8d5a09de7c95cdd9c7d91bf963))

## [1.1.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.0.2...v1.1.0) (2024-01-10)


### Features

* **os:** open access for mobile users ([6416053](https://github.com/mokkapps/changelog-generator-demo/commits/6416053f08b39ff0438400208cdf392b290ba131)), closes [#6](https://github.com/Falcion/UNITADE.mdOBSIDIAN/issues/6)


### Build system

* **git:** rework of entire repository and infrastructure ([8665663](https://github.com/mokkapps/changelog-generator-demo/commits/86656634580f2382bad252c0a7847c77ef517580))

<!--
 This changelog file will be automatically updated by pending husky-hook scripts and commit's linters, but, it can also be edited in dependent case. 
 -->
