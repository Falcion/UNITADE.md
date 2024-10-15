UNITADE provides several functionalities to work with Obsidian's registry: one of them is the so-called "Hard-delete" functionality.

Upon clicking, this button launches a special method, which reads every extension registered in the Obsidian Vault and then unregisters them by a specified private API method of Obsidian.

Here is an example code of this method (it may differ in the source code):

```typescript
public unapplyRegistry(): void {
    /**@ts-expect-error: not part of public API, accessing through runtime. */
    for (const extensionKey in this.app.viewRegistry.typeByExtension) {
        /**@ts-expect-error: not part of public API, accessing through runtime. */
        this.app.viewRegistry.unregisterExtensions([extensionKey]);
    }
}
```

> [!Note]
> Since this is a public API of UNITADE's core, you can call this method from other places, like a custom plugin or the developer console.
