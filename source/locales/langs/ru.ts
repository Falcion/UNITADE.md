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
        "3": "Открыть wiki"
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
        "1": "🛠 Работник: {0} ",
        "2": "exts.: {0}, views: {1} ",
        "3": "col.: {0}, line: {1} ",
        "4": "📋 Рендеринг: {0} "
    },
    "UNITADE_SETTINGS_COMMON2": {
        "0": "UI/UX"
    },
    "SETTINGS_STATUS_BAR": {
        "0": "Включить статус бар",
        "1": "При включении позволяет не только видеть статус бар для текущего экземпляра файла, но и выбирать, какие данные отображать."
    },
    "SETTINGS_STATUS_BAR_EXTS": {
        "0": "Считать зарегистрированные расширения",
        "1": "Включить или отключить счетчик зарегистрированных расширений в строке состояния."
    },
    "SETTINGS_STATUS_BAR_EXTS_DEFAULT": {
        "0": "Считать стандартные расширения",
        "1": "Добавлять стандартные расширения (например, Markdown) в счетчик на строке состояния для итоговой суммы. Если стандартные расширения используются в модуле кодового редактора, они не учитываются в итоговой сумме."
    },
    "SETTINGS_STATUS_BAR_EXTS_GROUPED": {
        "0": "Считать сгруппированные расширения",
        "1": "Добавлять сгруппированные (эксклюзивные) расширения в счетчик на строке состояния для итоговой суммы. Сгруппированные расширения, такие как Markdown или кодовый редактор, не включаются в эту сумму."
    },
    "SETTINGS_STATUS_BAR_EXTS_CODE_EDITOR": {
        "0": "Считать расширения кодового редактора",
        "1": "Добавлять эксклюзивные расширения кодового редактора в счетчик на строке состояния для итоговой суммы. Если стандартные расширения кодового редактора включены, они учитываются в этой итоговой сумме."
    },
    "SETTINGS_STATUS_BAR_VIEWS": {
        "0": "Считать представления",
        "1": "Включить счетчик на строке состояния, отображающий количество зарегистрированных представлений в открытом хранилище."
    },
    "SETTINGS_STATUS_BAR_PROCESSOR": {
        "0": "Показывать текущий процессор/исполнитель",
        "1": "Отображать обработчик языка (кодовый редактор) или зарегистрированный процессор для открытого файла."
    },
    "SETTINGS_STATUS_BAR_LANGUAGE_MODEL": {
        "0": "Показывать текущую языковую модель",
        "1": "Отображать текущее представление, в котором рендерится открытый файл."
    },
    "SETTINGS_STATUS_BAR_CURSOR_POSITION": {
        "0": "Показывать позицию курсора",
        "1": "Отображать строку и столбец позиции текстового курсора (каретки) в открытом файле, сбрасывается при открытии новых файлов."
    },
    "SAFE_MODE": {
        "0": "Безопасный режим:",
        "1": "Если включено, плагин проверит, будет ли это расширение повреждено при открытии через представление Markdown.",
        "2": "ОТКЛЮЧАЙТЕ НА СВОЙ СТРАХ И РИСК: вы сможете работать со всеми расширениями в представлении Markdown, но с риском повреждения файлов.",
        "3": "Безопасный режим {1}!",
        "4": "Отключает защитные меры для работы с нетекстовыми расширениями."
    },
    "SETTINGS_RESET_TO_DEFAULTS": {
        "0": "Сбросить настройки",
        "1": "Сбросить настройки до значений по умолчанию.",
        "2": "Сброс",
        "3": "Настройки не будут сохранены.",
        "4": "ВНИМАНИЕ: при нажатии ваши пользовательские настройки не будут сохранены, используйте на свой страх и риск."
    },
    "COMMAND_TOGGLE_SAFE": {
        "0": "Переключить безопасный режим"
    },
    "COMMAND_TOGGLE_CASE_INSENSITIVE": {
        "0": "Переключить режим без учёта регистра"
    },
    "COMMAND_TOGGLE_MD_OVERCHARGE": {
        "0": "Переключить перегрузку Markdown"
    },
    "COMMAND_ADD_DEFAULT_EXTENSIONS": {
        "0": "Добавить расширения в виде Markdown",
        "1": "Введите ваши расширения"
    },
    "COMMAND_ADD_CODE_EXTENSIONS": {
        "0": "Добавить расширения в виде редактора кода",
        "1": "Введите ваши расширения"
    },
    "PROMPT_LOCALES": {
        "0": "Ввод",
        "1": "Отправить"
    },
    "SETTINGS_FORCE_VANILLA_PASTE": {
        "0": "Принудительно использовать стандартную комбинацию вставки",
        "1": "В новых версиях OBSIDIAN редактор кода может вставлять данные только с помощью CTRL+SHIFT+V. Этот параметр возвращает пользовательскую функцию вставки через CTRL+V.",
        "2": "ВНИМАНИЕ! Включайте этот параметр только если стандартная комбинация CTRL+V не работает."
    },
    "CODE_EDITOR_ZOOM_OPTION": {
        "0": "Включить масштабирование в редакторе",
        "1": "Если включено, позволяет увеличивать/уменьшать масштаб в редакторе, удерживая Ctrl+Колесо мыши. После изменения закройте и откройте файл заново для применения.",
        "2": "Этот параметр изменяет размер шрифта в настройках плагина. Будьте осторожны с возможными ошибками."
    }
};