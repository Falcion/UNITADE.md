/*
 * MIT License
 *
 * Copyright (c) 2023-2024 Falcion
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * Any code and/or API associated with OBSIDIAN behaves as stated in their distribution policy.
 */

/**
 * JSON for translation of
 * `ru: "Pусский"`
 * Contributed by: @Axialer
 * - Reviewed by: @angelomira
 */
export const LOCALES_RU = {
    "UNITADE_SETTINGS_COMMON": {
        "0": "Настройки UNITADE:",
        "1": "Ошибки:",
        "2": "Продвинутый блок",
        "3": "Блок редактора кода",
        "4": "Дополнительно"
    },
    "SETTINGS_EXTENSIONS": {
        "0": "Расширения:",
        "1": "Введите расширения файлов, которые должны быть зарегистрированы в хранилище и с которых приложение должно начать регистрацию (с учетом): вводимые расширения должны быть разделены знаком 'больше' ('>').",
        "2": "Будьте осторожны при вводе расширений в этом блоке, это может вызвать 'спам' ошибок и уведомлений: чтобы избежать этого, вы можете включить функцию \"заглушения ошибок\" в блоке дополнительных настроек."
    },
    "SETTINGS_MOBILE_SPECIFIC": {
        "0": "Поддержка мобильных устройств:",
        "1": "При включении этого режима на мобильных устройствах будут использоваться как расширения этого модуля, так и расширения, установленные по умолчанию (если не заданы мобильные настройки)."
    },
    "SETTINGS_MD_OVERRIDE": {
        "0": "Включить переопределение Markdown:",
        "1": "Если включено, то при инициализации плагина отключает Markdown-файлы из реестра OBSIDIAN."
    },
    "SETTINGS_HARD_DELETE": {
        "0": "Форсированное удаление реестра",
        "1": "При нажатии вызывает полное удаление реестра расширений, каждое расширение, которое Obsidian мог бы прочитать, будет удалено. Используйте с осторожностью или для отладки."
    },
    "SETTINGS_HARD_LOAD": {
        "0": "Форсированная загрузка реестра плагина",
        "1": "При нажатии имитирует включение плагина, т.е. перезагружает реестры, которые определены и указаны в настройках плагина."
    },
    "SETTINGS_FORCED_EXTENSIONS": {
        "0": "Расширения с принудительным просмотром:",
        "1": "Внедренные расширения будут стремиться к инициализации через настройку редакторов технологии CodeMirror, позволяя отображать их в приложении OBSIDIAN.",
        "2": "Эта функция доступна в тестовом режиме из-за отсутствия поддержки от OBSIDIAN API для некоторых возможностей. Она также менее стабильна на мобильных устройствах."
    },
    "SETTINGS_ONLOAD_REGISTRY": {
        "0": "Реестр расширений при загрузке:",
        "1": "Если включено, плагин будет регистрировать расширение каждого файла (последняя часть последовательности расширений) при появлении нового файла в хранилище OBSIDIAN.",
        "2": "Этот режим взаимоисключаем (то есть, выключается при включении другого) когда небезопасный реестр расширений при загрузке включён."
    },
    "SETTINGS_ONLOAD_UNSAFE": {
        "0": "Небезопасный реестр расширений при загрузке:",
        "1": "Если включено, плагин будет регистрировать расширение каждого файла (каждую часть последовательности расширений) при появлении нового файла в хранилище OBSIDIAN.",
        "2": "Этот режим взаимоисключаем (то есть, выключается при включении другого) когда реестр расширений при загрузке включён."
    },
    "SETTINGS_WARNING_MSG": {
        "0": "ВНИМАНИЕ: эта настройка может вызвать «спам-атаку» расширениями в реестре расширений OBSIDIAN и повредить некоторые файлы из-за формата редактирования самого приложения, будьте осторожны при использовании этой функции."
    },
    "SETTINGS_IGNORE_MODE": {
        "0": "Игнорирование:",
        "1": "Если включено, плагин будет игнорировать указанные типы расширений, заданные пользователем, и файлы, заданные регулярными выражениями."
    },
    "SETTINGS_IGNORE_EXTENSIONS": {
        "0": "Игнорировать расширения:",
        "1": "Введите расширения файлов, которые должны быть проигнорированы плагином перед взаимодействием с реестром расширений при загрузке."
    },
    "SETTINGS_IGNORE_FILES": {
        "0": "Игнорировать файлы (регулярные выражения):",
        "1": "Введите маски файлов (регулярные выражения), которые должны быть проигнорированы плагином."
    },
    "SETTINGS_IGNORE_MSG": {
        "0": "Эта настройка действует исключительно в контексте реестра расширений при загрузке: она позволяет игнорировать расширения и файлы исключительно при работе с этой функцией, когда файлы добавляются в хранилище."
    },
    "SETTINGS_GROUP_EXTENSIONS": {
        "0": "Группированные расширения:",
        "1": "Укажите расширения в заданном формате, которые вы хотите рассматривать как специальные пользовательские расширения. Группы разделяются точкой с запятой (';'), а значения — символом ('>') (больше).",
        "2": "Ознакомьтесь с документацией плагина для списка представлений. Дополнительная информация на вики."
    },
    "SETTINGS_GROUP_MSG": {
        "0": "Обратите внимание, что эта настройка может быть нестабильной из-за особенностей инфраструктуры плагина и API OBSIDIAN. Поэтому рекомендуется отключить все другие настройки и очистить их, если это возможно, перед использованием данного модуля. Все остальные настройки можно реализовать используя только этот блок."
    },
    "SETTINGS_BAREFILES": {
        "0": "Реестр загрузки файлов без расширения:",
        "1": "Если включено, плагин будет пытаться регистрировать файлы без расширений (так называемые bare-файлы): для файлов с одним расширением (так называемые dot-файлы) используйте реестр расширений при загрузке.",
        "2": "Эти настройки регистрируют пустое расширение, которое можно сделать вручную в блоке настроек расширений."
    },
    "MODALS_INCLUDE_REGISTRY": {
        "0": "Включить в реестр расширений:",
        "1": "Если включено, расширение созданного файла будет вставлено в реестр расширений."
    },
    "SETTINGS_FORCE_UNLOAD": {
        "0": "Принудительная выгрузка",
        "1": "При нажатии имитирует отключение плагина, т.е. перезагружает реестр расширений в хранилище в режим по умолчанию."
    },
    "SETTINGS_RELOAD_REGISTRIES": {
        "0": "Перезагрузить реестры",
        "1": "При нажатии перезагружает представления и реестры расширения, добавляя новые настройки и данные в приложение, поддерживая актуальность настроек плагина с приложением."
    },
    "SETTINGS_DEBUG_MODE": {
        "0": "Режим отладки:",
        "1": "Этот режим выводит в консоль приложения информацию о ваших действиях.",
        "2": "Не используйте этот режим, если вы не разработчик или не знакомы с консолью."
    },
    "SETTINGS_SILENCE_ERRORS": {
        "0": "Подавление ошибок:",
        "1": "Этот режим подавляет все ошибки и отключает уведомления: может помочь в случае спама ошибок."
    },
    "MODAL_EDIT_EXTENSION": {
        "0": "Редактировать расширение"
    },
    "MODAL_CREATE_WITH_EXTENSION": {
        "0": "Создать с расширением"
    },
    "MODAL_EDIT_MULTIPLE": {
        "0": "Редактировать несколько расширений",
        "1": "Переименовать несколько файлов"
    },
    "SETTINGS_COMPATIBILITY": {
        "0": "Модуль совместимости:",
        "1": "Если включено, при запуске плагин попытается преобразовать конфигурации предыдущих версий в новую с сохранением старых данных: может быть нестабильно, по умолчанию включено."
    },
    "SETTINGS_COMPATIBILITY_BUTTON": {
        "0": "Сделать конфигурацию совместимой",
        "1": "При нажатии плагин попытается сделать конфигурацию совместимой с новой функциональностью и версией конфигурации."
    },
    "BUTTON_WIKI": {
        "0": "Открыть wiki",
        "1": "При нажатии происходит переход на страницу wiki проекта на GitHub, которая содержит описание плагина.",
        "2": "Это действие перенаправляет на внешнюю ссылку. Требуется доступ к интернету.",
        "3": "Открыть документацию"
    },
    "MODAL_INCLUDE_IN_REGISTRY": {
        "0": "Добавить в реестр расширений:",
        "1": "Если включено, расширение созданного файла будет добавлено в реестр расширений."
    },
    "ERROR_REGISTRY_EXTENSION": {
        "0": "Не удалось зарегистрировать расширение: {0} для отображения как {1}.\nОно уже зарегистрировано.",
        "1": "Не удалось зарегистрировать расширение: {0} для отображения как {1}.\n{2}",
        "2": "Не удалось удалить из реестра расширение: {0}.",
        "3": "Ошибка регистрации расширений:"
    },
    "ERROR_COMMON_MESSAGE": {
        "0": "Ошибка плагина UNITADE:"
    },
    "SETTINGS_CASE_INSENSITIVE": {
        "0": "Режим нечувствительности к регистру:",
        "1": "Если включено, плагин будет регистрировать все варианты расширений в верхнем и нижнем регистре, чтобы обеспечить работу в стиле Windows.",
        "2": "Нестабильно на UNIX-системах.",
        "3": "ВНИМАНИЕ: этот режим может \"бесконечно\" приводить к сбоям хранилища при наличии большого количества расширений и/или массивных расширений. Используйте с крайней осторожностью!"
    },
    "MODAL_EDIT_FENCE": {
        "0": "Редактировать блок кода"
    },
    "SETTINGS_CODE_EDITOR": {
        "0": "Включить модуль редактора кода:",
        "1": "Этот режим активирует функционал редактора кода, включая подсветку синтаксиса, IntelliSense и т. д.",
        "2": "Может вызывать задержки и другие проблемы.",
        "3": "Настройки шрифта для редактора кода:"
    },
    "CODE_EDITOR_USE_DEFAULT": {
        "0": "Использовать стандартные расширения:",
        "1": "Если отключено, модуль редактора кода потребует указать свои расширения. В противном случае будут использоваться \"стандартные\" расширения из конфигурации.",
        "2": "Этот блок также может быть заменён на сгруппированные расширения.",
        "3": "Обратите внимание, эти расширения должны исключаться из всех других. Для \"клонирования\" расширений используйте специальную функцию."
    },
    "CODE_EDITOR_FOLDING": {
        "0": "Включить сворачивание:",
        "1": "Функция, позволяющая скрывать (сворачивать) части кода для повышения читаемости."
    },
    "CODE_EDITOR_LINE_NUMBERS": {
        "0": "Нумерация строк:",
        "1": "Функция отображения нумерации строк в редакторе."
    },
    "CODE_EDITOR_WORD_WRAPPING": {
        "0": "Перенос слов:",
        "1": "Функция автоматического переноса текста на следующую строку, если он превышает ширину редактора."
    },
    "CODE_EDITOR_MINIMAPPING": {
        "0": "Включить мини-карту:",
        "1": "Функция, предоставляющая миниатюрный вид всего документа."
    },
    "CODE_EDITOR_SEMANTIC_VALIDATION": {
        "0": "Включить семантическую проверку:",
        "1": "Процесс проверки кода на логические ошибки и правильное использование переменных, функций и других элементов. Семантическая проверка учитывает контекст и значение кода."
    },
    "CODE_EDITOR_SYNTAX_VALIDATION": {
        "0": "Включить синтаксическую проверку:",
        "1": "Процесс проверки кода на ошибки, связанные с его структурой и синтаксисом. Анализирует, соответствует ли код правилам языка программирования."
    },
    "CODE_EDITOR_EDIT_THEME": {
        "0": "Тема редактора:",
        "1": "Выберите конкретную тему для редактора кода. Влияет на визуальное отображение подсветки синтаксиса."
    },
    "CODE_EDITOR_FONT_SIZE": {
        "0": "Размер шрифта:"
    },
    "CODE_EDITOR_FONT_FAMILY": {
        "0": "Семейство шрифтов:",
        "1": "Укажите здесь существующие семейства шрифтов и шрифты: формат ввода как в любом редакторе кода."
    },
    "CODE_EDITOR_FONT_LIGATURES": {
        "0": "Лигатуры шрифта:",
        "1": "Если ваш шрифт поддерживает лигатуры, вы можете включить их.",
        "2": "Если лигатуры не поддерживаются шрифтом, эта функция работать не будет."
    },
    "MODAL_INCLUDE_IN_CODE_EDITOR": {
        "0": "Включить в модуль редактора кода:",
        "1": "Если включено, созданный файл будет обрабатываться модулем редактора кода как Markdown-разметка, а не стандартными расширениями.",
        "2": "Если оба режима включены, это может привести к нестабильному поведению.",
        "3": "Если файл обрабатывается как модулем редактора кода, так и стандартным Markdown, это может вызвать нестабильное поведение системы рендеринга. Используйте оба режима только для крайних случаев.",
        "4": "Если модуль редактора кода использует реестр стандартных расширений (с настройкой \"использовать стандартные расширения\"), расширение будет добавлено в реестр стандартных расширений. В противном случае оно будет добавлено в реестр расширений редактора кода."
    },
    "STATUS_BAR": {
        "0": "NONE",
        "1": "🛠 Worker: {0} ",
        "2": "exts.: {0}, views: {1} ",
        "3": "col.: {0}, line: {1} ",
        "4": "📋 Render: {0} "
    },
    "UNITADE_SETTINGS_COMMON2": {
        "0": "UI/UX"
    },
    "SETTINGS_STATUS_BAR": {
        "0": "Enable status bar",
        "1": "Upon enabling, allows you not only to see status bar about current instance of file, but also which data to display."
    },
    "SETTINGS_STATUS_BAR_EXTS": {
        "0": "Count registered extensions",
        "1": "Implement counter for registered extensions in statur bar or not."
    },
    "SETTINGS_STATUS_BAR_EXTS_DEFAULT": {
        "0": "Count default extensions",
        "1": "Add to the counter in status bar default extensions (as markdown) to the final sum. If default extensions go to the code editor module, they are not part of the final sum."
    },
    "SETTINGS_STATUS_BAR_EXTS_GROUPED": {
        "0": "Count grouped extensions",
        "1": "Add to the counter in status bar grouped (exclusive) extensions to the final sum. Grouped extensions as markdown or code editor are not included in this sum."
    },
    "SETTINGS_STATUS_BAR_EXTS_CODE_EDITOR": {
        "0": "Count code editor extensions",
        "1": "Add to the counter in the status bar code editor (exclusive) extensions to the final sum. If default as code editor extensions enabled, they are part of this final sum."
    },
    "SETTINGS_STATUS_BAR_VIEWS": {
        "0": "Count views",
        "1": "Enable counter in the status bar which displays amount of registered views in the opened Vault."
    },
    "SETTINGS_STATUS_BAR_PROCESSOR": {
        "0": "Show current processor/worker",
        "1": "Displays language worker (code editor) or registered processor for opened file."
    },
    "SETTINGS_STATUS_BAR_LANGUAGE_MODEL": {
        "0": "Show current language model",
        "1": "Displays current view within which opened file is rendered."
    },
    "SETTINGS_STATUS_BAR_CURSOR_POSITION": {
        "0": "Show cursor position",
        "1": "Displays line and column for text cursor (caret) position in opened file, resets upon opening new files."
    },
    "SAFE_MODE": {
        "0": "Safe mode:",
        "1": "If enabled, the plugin will check if this extension will be damaged when opened via Markdown view.",
        "2": "DISABLE AT YOUR OWN RISK: you will be able to work with all extensions in Markdown representation, but with the risk of damaging files.",
        "3": "Safe-mod is {1}!",
        "4": "Disables defensive tactics for non-text extensions behaviour."
    },
    "SETTINGS_RESET_TO_DEFAULTS": {
        "0": "Reset to defaults",
        "1": "Reset settings to their default values.",
        "2": "Reset",
        "3": "Settings won't be saved.",
        "4": "CAUTION: upon clicking, your preferred settings won't be saved in any other way, use with your own risk."
    },
    "COMMAND_TOGGLE_SAFE": {
        "0": "Toggle safe mode"
    },
    "COMMAND_TOGGLE_CASE_INSENSITIVE": {
        "0": "Toggle case insensitive mode"
    },
    "COMMAND_TOGGLE_MD_OVERCHARGE": {
        "0": "Toggle markdown overcharge"
    },
    "COMMAND_ADD_DEFAULT_EXTENSIONS": {
        "0": "Add extensions to the extensions as markdown",
        "1": "Enter your extensions"
    },
    "COMMAND_ADD_CODE_EXTENSIONS": {
        "0": "Add extensions to the extensions as code editor",
        "1": "Enter your extensions"
    },
    "PROMPT_LOCALES": {
        "0": "Input",
        "1": "Submit"
    },
    "SETTINGS_FORCE_VANILLA_PASTE": {
        "0": "Force vanilla paste keybind",
        "1": "In new versions of OBSIDIAN, code editor can paste data only with CTRL+SHIFT+V combination, this setting is created for this versions, returning custom CTRL+V paste function.",
        "2": "CAUTION! This setting needs to be enabled only if default CTRL+V doesn't work."
    },
    "CODE_EDITOR_ZOOM_OPTION": {
        "0": "Enable zoom in/out in editor",
        "1": "If enabled, allows you to zoom in/out in the editor by holding Ctrl+MOUSEWHEEL correspondively. Upon changing option, close and reopen the file to apply.",
        "2": "This option changes font size in the settings of the plugin, so be careful with this option and possible spam errors."
    }
};
