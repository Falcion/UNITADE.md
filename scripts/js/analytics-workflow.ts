import fs from 'fs-extra';

const WORKFLOW_FILENAME: string = 'analytics.yml';

const modes: string[] = fs.readFileSync('./../../codeql-analytics.txt', { encoding: 'utf-8' })
    .split('\n')
    .map(str => str.replaceAll('\n', '').trim())
    .join('')
    .split(',')
    .map(str => str.trim());

console.info('Current enabled modes:', modes);

const workflow: string[] = fs.readFileSync('./../../.github/workflows/' + WORKFLOW_FILENAME,
    {
        encoding: 'utf-8'
    }
).split('\n').map(str => str.trimEnd());

for (let i = 0; i < workflow.length; i++) {
    if (workflow[i].trim().includes('language: [') && workflow[i].trim().endsWith(']')) {
        let tabs: number = workflow[i].split('  ').map(str => str === '').length;

        let temp_line: string = '';

        for (let j = 1; j < tabs; j++)
            temp_line += '  ';

        temp_line += `language: [ ${modes.join(', ')} ]`

        workflow[i] = temp_line;
    } else
        continue;
}

console.log(workflow);

fs.writeFileSync('./../../.github/workflows/' + WORKFLOW_FILENAME, workflow.join('\n'));
