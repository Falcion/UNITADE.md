UNITADE supports displaying any file as it is in your Obsidian Vault and allows you to "read" it, but this setting has its own prerequisites:

1. While it is the fastest way to enable file reading in your Vault, you need to understand that this setting treats every extension as a Markdown file (`markdown` view in the Obsidian registry). This means that Obsidian's behavior with certain symbols may interfere with how extensions function.
    - Example: [issue #73](https://github.com/Falcion/UNITADE.md/issues/73)
2. Theoretically, with this setting enabled, Obsidian would try to "parse" every file as Markdown. Therefore, binary files ARE NOT RECOMMENDED to be included in this setting. Although this issue has not been replicated and is not due to the plugin, it is still advised to proceed with caution.

**Input example and how the plugin reads it:**

```bash
# Example of input from UI (String: type)
data; txt; json; js; data.json; ;; m,d

# Output (String[]: type)
['data', 'txt', 'json', 'js', 'data.json', ' ', '', 'm,d']
```

Strings are split by the `;` symbol because it is not supported in filenames on Windows systems and is considered bad practice for naming files in UNIX.

> [!Warning]
> Keep in mind, if you include a `;` at the end of the input, the program will try to parse "empty" extensions again. This is because the program splits the input string and iterates through each parameter.

### Minor Features

The default extensions setting has minor features, or "hacks," as mentioned in the example above:

1. If you type `;;` in the input, it will support files without extensions. In the plugin environment, these are called "barefiles," and their support is referred to as "barefiling." After this input, your Vault will accept files like `data` or `config` with no extensions.
2. The input splitter for extensions trims extensions ONLY AT THE START, so you can include spaces to visually "separate" your inputs.
   - If the input is `' '` (or entered as `; ;` by the user), it won't be trimmed and will remain the same.
