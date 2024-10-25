declare module 'monaco-editor/esm/vs/editor/editor.worker' {
    const WorkerFactory: new () => Worker;
    export default WorkerFactory;
}

declare module 'monaco-editor/esm/vs/language/typescript/ts.worker' {
    const WorkerFactory: new () => Worker;
    export default WorkerFactory;
}

declare module 'monaco-editor/esm/vs/language/json/json.worker' {
    const WorkerFactory: new () => Worker;
    export default WorkerFactory;
}

declare module 'monaco-editor/esm/vs/language/css/css.worker' {
    const WorkerFactory: new () => Worker;
    export default WorkerFactory;
}

declare module 'monaco-editor/esm/vs/language/html/html.worker' {
    const WorkerFactory: new () => Worker;
    export default WorkerFactory;
}
