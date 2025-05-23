const workerImports = {
    json: () => import('monaco-editor/esm/vs/language/json/json.worker.js'),
    css: () => import('monaco-editor/esm/vs/language/css/css.worker.js'),
    html: () => import('monaco-editor/esm/vs/language/html/html.worker.js'),
    ts: () => import('monaco-editor/esm/vs/language/typescript/ts.worker.js'),
    editor: () => import('monaco-editor/esm/vs/editor/editor.worker.js')
} as const;

(window as any).MonacoEnvironment = {
    getWorker: async (workerId: string, label: string) => {
        const workerType = getWorkerType(label);
        const workerModule = await workerImports[workerType]();
        return new Worker(URL.createObjectURL(
            new Blob([workerModule.default], { type: 'application/javascript' })
        ));
    }
};

function getWorkerType(label: string): keyof typeof workerImports {
    switch (label) {
        case 'json': return 'json';
        case 'css':
        case 'scss':
        case 'less': return 'css';
        case 'html':
        case 'handlebars': return 'html';
        case 'typescript':
        case 'javascript': return 'ts';
        default: return 'editor';
    }
}
