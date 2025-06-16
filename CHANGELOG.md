# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.2.6](https://github.com/mokkapps/changelog-generator-demo/compare/v3.2.5...v3.2.6) (2025-06-16)


### Features

* **visuals:** hidden visuals-fix in the latest release ([b48ba98](https://github.com/mokkapps/changelog-generator-demo/commits/b48ba9865bfae8990fddb817d0ae0d1198d60b75))


### Build system

* **deps-dev:** bump brace-expansion ([4819068](https://github.com/mokkapps/changelog-generator-demo/commits/4819068ceb058e9dee8896e8b4a3bdb9c6e8d78c))


### Fixes

* **applying:** revamp apply logic, fix of [#137](https://github.com/Falcion/UNITADE.md/issues/137) ([bc86968](https://github.com/mokkapps/changelog-generator-demo/commits/bc8696831d561eb336218ed442cf929f87acc0ca))
* **unapplying:** revamp unapply logic, fix of [#139](https://github.com/Falcion/UNITADE.md/issues/139) ([a870e6c](https://github.com/mokkapps/changelog-generator-demo/commits/a870e6ce333de3fdfb53d87597058f7701788969))

### [3.2.5](https://github.com/mokkapps/changelog-generator-demo/compare/v3.2.4...v3.2.5) (2025-06-09)


### ⚠ BREAKING CHANGES

* **settings:** fix logic-update issues and update display method
* **apply:** revamp apply and unapply systems for plugin

### Features

* **apply:** revamp apply and unapply systems for plugin ([7d7a4de](https://github.com/mokkapps/changelog-generator-demo/commits/7d7a4deeb1723092a706bd35bd2fdde732065d53)), closes [#135](https://github.com/Falcion/UNITADE.md/issues/135)
* **onload:** optimize plugin's work with vault and it's files ([050d7ba](https://github.com/mokkapps/changelog-generator-demo/commits/050d7bad63c1ee7398618c3182afe0dce890fabf))


### Build system

* **code:** remove legacy-code from plugin's internal API and codebase ([0f5df2b](https://github.com/mokkapps/changelog-generator-demo/commits/0f5df2bbf5234377e5fa1f5325164267f9f454b8))


### Fixes

* **buffer:** remove trigger for paste action, ([a4f4c85](https://github.com/mokkapps/changelog-generator-demo/commits/a4f4c856254748eb15f28bdb593d21c7e3a282ed)), closes [#132](https://github.com/Falcion/UNITADE.md/issues/132)
* **paste:** append multiple paste elements in entire codebase ([0583add](https://github.com/mokkapps/changelog-generator-demo/commits/0583adde6b979cc1f6f549ab572b32f30fbd8f17))
* **settings:** fix logic-update issues and update display method ([f10171d](https://github.com/mokkapps/changelog-generator-demo/commits/f10171dfb2b674f2d32c9ec399922a84aa7ffe53))

### [3.2.4](https://github.com/mokkapps/changelog-generator-demo/compare/v3.2.3...v3.2.4) (2025-04-11)


### Features

* **debug:** add ability to silence specific errors ([9d1c662](https://github.com/mokkapps/changelog-generator-demo/commits/9d1c662aec54745075568d43c8f1e714e1dde60b))
* **silencing:** add advanced silencing based on error's signatures ([67249d2](https://github.com/mokkapps/changelog-generator-demo/commits/67249d238f5b0f286b2ba62c9a00e8a171d718f0))


### Fixes

* **monaco:** fix issue [#119](https://github.com/Falcion/UNITADE.md/issues/119) with URLs of monaco workers for code editor ([4e5aba1](https://github.com/mokkapps/changelog-generator-demo/commits/4e5aba1739254afa9427d501f2fc2c159c2e6987))
* **observer:** force-silence warning-error for the observer, fix of [#126](https://github.com/Falcion/UNITADE.md/issues/126) ([0b230c9](https://github.com/mokkapps/changelog-generator-demo/commits/0b230c90fbc944b675175ea57a45ce63351d20a5))

### [3.2.3](https://github.com/mokkapps/changelog-generator-demo/compare/v3.2.2...v3.2.3) (2025-03-26)


### Features

* **docs:** add brandbook, licenses and etc. ([3444de3](https://github.com/mokkapps/changelog-generator-demo/commits/3444de30807ff6b6a7282f31cb9845302c6b1ce2))
* **localization:** update Russian translation for plugin (removed images) ([8f1d58b](https://github.com/mokkapps/changelog-generator-demo/commits/8f1d58b56d0ac6bba58be63c386d95648115b912))


### Documentation

* **media:** add updated media files for project ([d8cc1a8](https://github.com/mokkapps/changelog-generator-demo/commits/d8cc1a80ef354bb1e452d72ad01582099cb68ea1))

### [3.2.2](https://github.com/mokkapps/changelog-generator-demo/compare/v3.2.1...v3.2.2) (2025-03-20)


### Build system

* **deps-dev:** bump axios in the npm_and_yarn group across 1 directory ([d00acaf](https://github.com/mokkapps/changelog-generator-demo/commits/d00acaf71071814e791a815a8bfd99f11e794453))
* **deps:** bump @babel/runtime ([812a291](https://github.com/mokkapps/changelog-generator-demo/commits/812a29186748651bd372364fc0c906fe7d213ddd))


### Fixes

* **codeview:** fix warning with wheel events in code view ([3575c19](https://github.com/mokkapps/changelog-generator-demo/commits/3575c19638cadf22ccbf826c3b7a3ef57f1748de)), closes [#113](https://github.com/Falcion/UNITADE.md/issues/113)
* **compat:** remove abundancy with reading null data ([cbf9d3a](https://github.com/mokkapps/changelog-generator-demo/commits/cbf9d3a5ae63d33c870434027ba8da27af881728)), closes [#112](https://github.com/Falcion/UNITADE.md/issues/112)
* **optimization:** remove legacy pipeline code, fixes [#107107](https://github.com/Falcion/UNITADE.md/issues/107107) ([0975e8e](https://github.com/mokkapps/changelog-generator-demo/commits/0975e8efa30b9792878b534e8bd97955647d3b3a)), closes [#107](https://github.com/Falcion/UNITADE.md/issues/107)
* **scrolls:** fix blinking file system when scrolling in codeview ([8a6fc01](https://github.com/mokkapps/changelog-generator-demo/commits/8a6fc01f711f4d0e5005d3079c4b6d143e2b5ec5))

### [3.2.1](https://github.com/mokkapps/changelog-generator-demo/compare/v3.2.0...v3.2.1) (2025-03-12)


### Features

* **zoom:** add zoom setting for the code editor ([8366913](https://github.com/mokkapps/changelog-generator-demo/commits/8366913e94929515baf6d5a69c366252fb3af3c1))

## [3.2.0](https://github.com/mokkapps/changelog-generator-demo/compare/v3.1.0...v3.2.0) (2025-03-07)


### Features

* **commands:** create and integrate commands for plugin ([adf7135](https://github.com/mokkapps/changelog-generator-demo/commits/adf7135449715f15a4af78ff81d2b4b442ca7852)), closes [#96](https://github.com/Falcion/UNITADE.md/issues/96)
* **editor-ci:** integrate new obsidian version with code editor ([3ed76c1](https://github.com/mokkapps/changelog-generator-demo/commits/3ed76c1bc3805b09244115b78b6638cb638be1d6)), closes [#104](https://github.com/Falcion/UNITADE.md/issues/104)
* **locales:** add all languages and update them ([847518c](https://github.com/mokkapps/changelog-generator-demo/commits/847518c85eeefa0598d80de940e661942abe8872))
* **settings:** add button to reset to defaults in settings ([115afee](https://github.com/mokkapps/changelog-generator-demo/commits/115afee0232e4761d1ea4d0935fb37f23c1c4cf5)), closes [#100](https://github.com/Falcion/UNITADE.md/issues/100)
* **settings:** add dynamic tooltip for sliders in settings with slider components ([c3a3bdc](https://github.com/mokkapps/changelog-generator-demo/commits/c3a3bdcd64f49508ac66ce1d5fef9b188e3d7c55)), closes [#101](https://github.com/Falcion/UNITADE.md/issues/101)
* **settings:** add settings for the status bar ([572549f](https://github.com/mokkapps/changelog-generator-demo/commits/572549f3f74767821e4a680d90c6d0825b7e0513)), closes [#98](https://github.com/Falcion/UNITADE.md/issues/98)
* **stylings:** implement custom CSS themes for plugin ([b079d8e](https://github.com/mokkapps/changelog-generator-demo/commits/b079d8e8428300f0aacaf32af634bb20cd058624)), closes [#95](https://github.com/Falcion/UNITADE.md/issues/95)


### Build system

* **build-ci:** automate langs synchro ([a7628fb](https://github.com/mokkapps/changelog-generator-demo/commits/a7628fbf1e1e2cb12c1a6bb286bca17a9517f4b3))
* **build-deps:** integrate private types within package ([8052f94](https://github.com/mokkapps/changelog-generator-demo/commits/8052f948c8942cdf16a80731acfc3ba66f7dfb16))
* **deps:** bump esbuild in the npm_and_yarn group across 1 directory ([9768fd6](https://github.com/mokkapps/changelog-generator-demo/commits/9768fd6a02bd7c31859203ece1916dc4a1f82850))
* **deps:** bump the npm_and_yarn group across 1 directory with 2 updates ([0f902ec](https://github.com/mokkapps/changelog-generator-demo/commits/0f902ecaaa3eea5df677c32a51c64db2556c98cb))


### Fixes

* **locales:** add en-GB localisation ([6fb6001](https://github.com/mokkapps/changelog-generator-demo/commits/6fb6001713850980864e3e9d0a0fc90f1cea2ac3)), closes [#103](https://github.com/Falcion/UNITADE.md/issues/103)
* **status:** fix errors when status bar is not initialized ([03db4bb](https://github.com/mokkapps/changelog-generator-demo/commits/03db4bb8e5b2805492061513be774ccf0a31dd8d))

## [3.1.0](https://github.com/mokkapps/changelog-generator-demo/compare/v3.0.2...v3.1.0) (2025-02-11)


### Features

* **extensions:** add new feature "safe mode" to work with binary extensions ([a80d8ef](https://github.com/mokkapps/changelog-generator-demo/commits/a80d8efda11aafc81de079be583f5a2a079aa079)), closes [#85](https://github.com/Falcion/UNITADE.md/issues/85)


### Fixes

* **compatibility:** parse mobile settings in compat module ([67fa625](https://github.com/mokkapps/changelog-generator-demo/commits/67fa625a076423d5a2aeae5a38abec2329057442)), closes [#89](https://github.com/Falcion/UNITADE.md/issues/89)
* **themes:** assign correct default key for themes in code editor ([543d7d7](https://github.com/mokkapps/changelog-generator-demo/commits/543d7d751fca805cf804f30bf53b6aed524e2301)), closes [#88](https://github.com/Falcion/UNITADE.md/issues/88)

### [3.0.2](https://github.com/mokkapps/changelog-generator-demo/compare/v3.0.1...v3.0.2) (2024-11-22)


### Features

* **localization:** add Russian translation for plugin ([7aa036c](https://github.com/mokkapps/changelog-generator-demo/commits/7aa036cacaf1a3573c050ed1d5132e59462d3cea))


### Fixes

* **locales:** fix misinterpretation of plugin's work, fix of [#82](https://github.com/Falcion/UNITADE.md/issues/82) ([3d59600](https://github.com/mokkapps/changelog-generator-demo/commits/3d596003cfbc2797ad317a90b8149b5886eb74ff))

### [3.0.1](https://github.com/mokkapps/changelog-generator-demo/compare/v3.0.0...v3.0.1) (2024-11-05)


### Features

* **modals:** now modals support code editor extensions integration ([590f81d](https://github.com/mokkapps/changelog-generator-demo/commits/590f81dbc221adbef9d733abbe60d55733500d57))


### Build system

* **esbuild-tracking:** write special .BAT script to disable worktree for esbuild ([7301437](https://github.com/mokkapps/changelog-generator-demo/commits/73014372429512064e4a6c458ac271be681039c4))
* **esbuild:** add plugin to automatically copy files of plugin build to test folder ([969afd4](https://github.com/mokkapps/changelog-generator-demo/commits/969afd4b69646905166e019f2fd762fdcf0d3373))


### Documentation

* **settings:** add warning about case-insensitive mode in settings ([4a2b3f7](https://github.com/mokkapps/changelog-generator-demo/commits/4a2b3f71dd14a27580fbe561543be44343d59a11))
* **settings:** add warning about errors spam in extensions input ([722e361](https://github.com/mokkapps/changelog-generator-demo/commits/722e361e51cb0fddfe707816505369b001d9c3a6))


### Fixes

* **compatibility-module:** fix skipping work process after getting undefined field in compatibility module ([8fe545d](https://github.com/mokkapps/changelog-generator-demo/commits/8fe545d447f9cf8ea5dee6b0f04a3c3280f75058))
* **docs:** update some required information about plugin in README ([c1a65fb](https://github.com/mokkapps/changelog-generator-demo/commits/c1a65fbe8b95a83edd0389a99b9aaaf3ae07d51d)), closes [#73](https://github.com/Falcion/UNITADE.md/issues/73)
* **locales-settings:** remove misinformation about separating symbols ([166b6ca](https://github.com/mokkapps/changelog-generator-demo/commits/166b6ca2c9a38a8ec8307fc8daeb7f4f0ae10e08)), closes [#73](https://github.com/Falcion/UNITADE.md/issues/73)
* **locales:** sync locales and implement them in stale settings tab ([68b3824](https://github.com/mokkapps/changelog-generator-demo/commits/68b382494a37026f4a732a3cd04a34ab55e5e326))
* **locales:** sync locales between languages and fix bug when settings appear null ([ea6f6f2](https://github.com/mokkapps/changelog-generator-demo/commits/ea6f6f25df0fc372afe5062034481886db625c03)), closes [#73](https://github.com/Falcion/UNITADE.md/issues/73)
* **modals:** now modals are trying to apply new extensions in plugin and fix of semantics for separators ([19bd4e6](https://github.com/mokkapps/changelog-generator-demo/commits/19bd4e65107b3bb0b19c51e8e9f2e9642a3215cd))
* **rendering-extensions:** sync default extensions and code extensions ([a8934ce](https://github.com/mokkapps/changelog-generator-demo/commits/a8934ce171ee94965ca16b869f899ae17ac7a9f8))
* **settings:** now "use default extensions" and input are synchronized in settings tab ([aea3114](https://github.com/mokkapps/changelog-generator-demo/commits/aea311487557040916375da8677b39249d5e56f1)), closes [#73](https://github.com/Falcion/UNITADE.md/issues/73)

## [3.0.0](https://github.com/mokkapps/changelog-generator-demo/compare/v2.4.0...v3.0.0) (2024-11-03)


### Features

* **architecture:** create architecture for code editor and other things ([f37a46d](https://github.com/mokkapps/changelog-generator-demo/commits/f37a46d4d34bc203ed9799e3b7d0f2ebf70193d4))
* **common:** add button to "Reload" registries in soft way which saves default extensions ([ec9c5cc](https://github.com/mokkapps/changelog-generator-demo/commits/ec9c5ccb170d8285c4151a20b9eb2fc256763e6f))
* **common:** add support for default extensions and default views by default ([a918488](https://github.com/mokkapps/changelog-generator-demo/commits/a9184889cf6072e6bccafed3ae8c087993876df8))
* **compatibility:** adapt compatibility module to new `>` semantics ([47b5f80](https://github.com/mokkapps/changelog-generator-demo/commits/47b5f80f6ed34cf5652ba997676669c5332aeab5))
* **locale:** implement localization for errors ([b85563e](https://github.com/mokkapps/changelog-generator-demo/commits/b85563ec47f46537877d9b996bfdded59590febb))
* **modals-locale:** now modals are also localized ([2a96a38](https://github.com/mokkapps/changelog-generator-demo/commits/2a96a386cde0db8199e6065f01297163b310b11f))
* **monaco-editor:** implement monaco view in the main codebase ([9f5ba74](https://github.com/mokkapps/changelog-generator-demo/commits/9f5ba743a18826a01fa76b53c7691e4cee464382))
* **monaco-editor:** integrate workers from monaco to fix visuals of code view ([dd15f31](https://github.com/mokkapps/changelog-generator-demo/commits/dd15f3107f518b8630f6ba700ae65053e2afaa7f))
* **settings:** add block about code editor settings and implement them in code ([3105825](https://github.com/mokkapps/changelog-generator-demo/commits/3105825a1df8de3b6cf832235caa5717a4045d87))
* **settings:** add some little graphics and additions to the settings tab ([d24fc82](https://github.com/mokkapps/changelog-generator-demo/commits/d24fc8207235c037dd4ca030edad8bf967ac73c2))


### Build system

* **build-deps:** include monaco-editor and terser as main dependencies ([7091114](https://github.com/mokkapps/changelog-generator-demo/commits/7091114eddfb04d832b40e7bf3ac6952d045383e))
* **build-deps:** remove PY command from environment of plugin ([2d243da](https://github.com/mokkapps/changelog-generator-demo/commits/2d243da5892851c0da54d5d80eac6b2824519121))
* **build-env:** add cloning script for debug in .SH variation ([ea842ca](https://github.com/mokkapps/changelog-generator-demo/commits/ea842ca1372b2c18d583fa1638713f5b64bd4982))
* **deps-dev:** bump the npm_and_yarn group across 1 directory with 2 updates ([286be59](https://github.com/mokkapps/changelog-generator-demo/commits/286be5960565ececd8fcfedd98fa1e18615f732d))
* **deps:** bump the npm_and_yarn group across 1 directory with 2 updates ([5007fe8](https://github.com/mokkapps/changelog-generator-demo/commits/5007fe82400f8f23918f01f61d958d234230a541))
* **licensing:** update licensing information in every code ([31ebca8](https://github.com/mokkapps/changelog-generator-demo/commits/31ebca83a40c021a84646d066e0074badb39758a))
* **tracking:** create script which allows to skip worktree of clone script and little refactoring of them ([1b527af](https://github.com/mokkapps/changelog-generator-demo/commits/1b527afeca5f399fe0a73a5f91cc9409e0c385e0))


### Documentation

* **wiki:** create a page about case insenstivity mode in plugin ([a7c66d3](https://github.com/mokkapps/changelog-generator-demo/commits/a7c66d39af96537effd580c23d3f83c5655e84f8))
* **wiki:** create a page about extensions processing in plugin on wiki ([958cc1e](https://github.com/mokkapps/changelog-generator-demo/commits/958cc1eceb88a3fa75f43dcde87272155248d9ca))
* **wiki:** create a page about hard-deleting registry by plugin ([515495f](https://github.com/mokkapps/changelog-generator-demo/commits/515495f8f40ac050f5adb30f36483a98687df103))
* **wiki:** create a page about markdown overcharge of plugin on wiki ([2b46b2f](https://github.com/mokkapps/changelog-generator-demo/commits/2b46b2fc518404962254c0eb540b9fd7af766b91))
* **wiki:** create a page about mobile extensions config ([0497f51](https://github.com/mokkapps/changelog-generator-demo/commits/0497f51d9ad7939f9fa260998ebdf520b9a91b8d))
* **wiki:** create a page about unloading registry by plugin ([2e9f961](https://github.com/mokkapps/changelog-generator-demo/commits/2e9f961056de69949e0ae5b157fa155717d5003b))
* **wiki:** create a sidebar for wiki of project ([b8a3bf0](https://github.com/mokkapps/changelog-generator-demo/commits/b8a3bf0d58549b35d1d8adf0fc25b4a4e21c1460))
* **wiki:** create an introduction page ([5c64d72](https://github.com/mokkapps/changelog-generator-demo/commits/5c64d721986a5ad628118860e58c887f7cff97dc))


### Refactoring

* **naming:** now UNITADE's view names correspondingly to stack it uses ([36144de](https://github.com/mokkapps/changelog-generator-demo/commits/36144de0ddb62aad98f6adf469e947b8d77aab43))


### Fixes

* **build:** fix typescript shenanigans and implement clone .SH script for UNIX-systems ([8bf5e0f](https://github.com/mokkapps/changelog-generator-demo/commits/8bf5e0fef1c6ae4dc23a4b039f8fa10f7e52ea45))
* **common:** fix some localizations errors and common TS errors ([30aa283](https://github.com/mokkapps/changelog-generator-demo/commits/30aa28328f1f1e5b39bb72e45dff2033d8a0a20d))
* **global:** fix dependencies of codemirror and monaco from being externals ([d9a0395](https://github.com/mokkapps/changelog-generator-demo/commits/d9a0395c0d2b0bc0959aadb8963f8ff35dd935af))
* **registry:** fix OLR system reading only last, fix of [#75](https://github.com/Falcion/UNITADE.md/issues/75) ([03f70dd](https://github.com/mokkapps/changelog-generator-demo/commits/03f70dd1760565c66bc502f6147e35d4118f35c2))
* **settings:** fix example in settings to new grouped extensions config ([7a38b2c](https://github.com/mokkapps/changelog-generator-demo/commits/7a38b2c280fd041640e117b4afd8125d511bda5f))

## [2.4.0](https://github.com/mokkapps/changelog-generator-demo/compare/v2.3.1...v2.4.0) (2024-07-02)


### Features

* **barefiling:** add support to bare files ([a3099bc](https://github.com/mokkapps/changelog-generator-demo/commits/a3099bc8415c319bb9b48128d8258fefc814d7af))


### Common

* **locales:** fix locales in previous settings ([f7217e4](https://github.com/mokkapps/changelog-generator-demo/commits/f7217e4d02a8b93fd2cd34dd08c81ecd8c9bfc9e))
* **settings:** add some tooltips to settings ([236cd5e](https://github.com/mokkapps/changelog-generator-demo/commits/236cd5ec06fc65df2cfeed3bbcf6aad281454486))
* **stablechecks:** add stable checks and allow empty entry in the settings ([0698a5e](https://github.com/mokkapps/changelog-generator-demo/commits/0698a5e7d6e5890f022ea6835c3a8301474b02ee))

### [2.3.1](https://github.com/mokkapps/changelog-generator-demo/compare/v2.3.0...v2.3.1) (2024-06-23)


### Build system

* **deps:** bump the npm_and_yarn group across 1 directory with 3 updates ([f4dcc67](https://github.com/mokkapps/changelog-generator-demo/commits/f4dcc67f67cb961b17d6a24042650859e349d3bb))

## [2.3.0](https://github.com/mokkapps/changelog-generator-demo/compare/v2.2.1...v2.3.0) (2024-06-22)


### Features

* **files-modal:** add modal to change extension of batch of files ([#62](https://github.com/Falcion/UNITADE.md/issues/62)) ([875ce27](https://github.com/mokkapps/changelog-generator-demo/commits/875ce2782071d25e4b9c30dc95bc118645cbeee8))
* **files-rename:** add modal to rename multiple files ([#62](https://github.com/Falcion/UNITADE.md/issues/62)) ([e535c36](https://github.com/mokkapps/changelog-generator-demo/commits/e535c364691381ca56890155538886d1126d9751))


### Build system

* **clone:** add .BAT script to clone dev-plugin in test-vault directly ([f6233fc](https://github.com/mokkapps/changelog-generator-demo/commits/f6233fce6bae9ef1665673cb1dcdf25ef59e54a5))

### [2.2.1](https://github.com/mokkapps/changelog-generator-demo/compare/v2.2.0...v2.2.1) (2024-05-14)


### Build system

* **build-env:** revamp of build environment ([ea789ee](https://github.com/mokkapps/changelog-generator-demo/commits/ea789eeec28fce277ac2005c08351538a1a85f0c))

## [2.2.0](https://github.com/mokkapps/changelog-generator-demo/compare/v2.1.3...v2.2.0) (2024-05-13)


### Features

* **modals:** add new folder modals support ([432888d](https://github.com/mokkapps/changelog-generator-demo/commits/432888d8ee26874bb0da3e503378d0bfa220ba80))
* **modals:** fix behaviour of modals within creating files ([7f0460e](https://github.com/mokkapps/changelog-generator-demo/commits/7f0460eda231091308c2128e34f9f32cdd732a06))
* **modals:** fix behaviour of modals within editing extensions ([caf81b2](https://github.com/mokkapps/changelog-generator-demo/commits/caf81b225e8dcc676cc1903991ea6af20f65dd58))


### Documentation

* **versioning:** add information about unsupported versions of the project ([5c1d5bf](https://github.com/mokkapps/changelog-generator-demo/commits/5c1d5bf25766ffb6f5836a6c7390c48805995346))


### Build system

* **deps-dev:** bump @commitlint/cli from 19.2.2 to 19.3.0 ([346afa9](https://github.com/mokkapps/changelog-generator-demo/commits/346afa9327932af7458b0f748024e0fe6c2d4946))
* **deps-dev:** bump @npmcli/package-json from 5.0.3 to 5.1.0 ([1555e90](https://github.com/mokkapps/changelog-generator-demo/commits/1555e902efcb912cfcd2e389759e9942ff0c13c4))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([98a5525](https://github.com/mokkapps/changelog-generator-demo/commits/98a5525843e10ada1493ac71de7d0cf722c1fbfe))
* **deps-dev:** bump @typescript-eslint/parser from 7.7.0 to 7.8.0 ([4dc6fbb](https://github.com/mokkapps/changelog-generator-demo/commits/4dc6fbb27e3ed5d6849bc45fba739f250761c488))
* **deps-dev:** bump inquirer from 9.2.19 to 9.2.20 ([b77c98a](https://github.com/mokkapps/changelog-generator-demo/commits/b77c98a336753363196d7672822f734aae2d3178))


### Fixes

* **force-preview:** fix force-preview of extensions in plugin ([4f449d5](https://github.com/mokkapps/changelog-generator-demo/commits/4f449d5478e79200d938eaafdd08d62c12cba753)), closes [#54](https://github.com/Falcion/UNITADE.md/issues/54)
* **modals-folder:** fix of folder edit modal wrong path creation ([887f654](https://github.com/mokkapps/changelog-generator-demo/commits/887f6547c98b8558e25e71201b17bbd1325cf9d3))

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
