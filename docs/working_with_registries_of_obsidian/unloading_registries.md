UNITADE provides a variety of functionalities to manage Obsidian's registry, one of which is the "Force-unload" functionality. This feature simulates disabling a plugin by reloading the registry of extensions in the vault to its default state.

Upon clicking, this button causes the plugin to imitate the process of disabling extensions without actually removing them. Instead, it triggers a method that reloads the registry, restoring the default configuration of extensions.

> [!Important]
> If you type default extensions, like mp4 or pdf, in any setting of UNITADE, they will be treated like custom extensions, not default ones. This means they will also be deleted from Obsidian's registry.

Here is an example code of this trigger-method (it may differ in the source code):

```typescript
private __unapply(upt_settings: UNITADE_SETTINGS): void {
    if (this.is_mobile) {
        this.__unapplyCfg(this.settings.mobile_settings.extensions ?? this.settings.extensions, upt_settings.markdown_overcharge);
    } else {
        this.__unapplyCfg(this.settings.extensions, upt_settings.markdown_overcharge);
    }
}

public unapply(): void {
    this.__unapply(this.settings);
}
```

> [!Note]
> Since this is a public API of UNITADE's core, you can call this method from other places, like a custom plugin or the developer console.
