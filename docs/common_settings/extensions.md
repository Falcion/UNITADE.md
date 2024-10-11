UNITADE supports showing any file just as it is in Obsidian Vault and allows you to "read" it, but this setting has it own prerequisites:

1. While it is the fastest way to implement file reading to your Vault, you need to understand that this setting reads every extensions as Markdown file (`markdown` view in Obsidian registry), meaning Obsidian's behaviour with some symbols may interfere with working with extensions.
    - Examples: [issue #73](https://github.com/Falcion/UNITADE.md/issues/73)
2. Theorethically, Obsidian with this setting turned on, Obsidian would try to "parse" file as Markdown, so any binaries files ARE NOT RECOMMENDED to be included in this setting; although this issue could not be replicated and not on the plugin side, still proceed with caution;

**Input example and how plugin it reads:**

```bash
# Example of input from UI (String: type)
data; txt; json; js; data.json; ;; m,d

# Output (String[]: type)
['data', 'txt', 'json', 'js', 'data.json', ' ', '', 'm,d']
```

Strings are split by `;` symbol because it is not supported in any filenames on Window systems and is bad gesture for naming files in UNIX.

> [!Warning]
> Keep in mind not writing `;` at the end of the input, program would try to parse "empty" extensions again, because program splits input string and iterates through every param.

### Minor features

Default extensions setting has it minor feature, or if you call, "hacks", for example as it was stated in example before:

1. If you type `;;` in input, it would support files without any extensions, in plugin environment, they are called "barefiles" and their support are called "barefiling", so, your Vault after this input would accept files, for example, like `data` or `config`;
2. Input splitter for extensions, trims extensions ONLY AT START, so you could enter spaces and "differ" visually your inputs;
   - If the input is `' '` (or by user input of `; ;`) won't be trimmed and remained same.    
