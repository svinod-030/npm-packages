# workflow-composer

A lightweight, TypeScript-based library for composing and executing dynamic async workflows with built-in rollback support. Built with Vite and tested with Jest, it offers a flexible way to manage dependent async tasks that can adapt at runtime and recover gracefully from failures.

## Features
- **Dynamic Workflow**: Define named steps and jump between them based on task results.
- **Rollback on Failure**: Automatically undo completed steps in reverse order if a task fails.
- **TypeScript Support**: Fully typed for a robust development experience.
- **Dual Module**: Supports both CommonJS and ES Modules.
- **Lightweight**: No external dependencies, built for simplicity and performance.

## Installation
Install the package via NPM:
```bash
npm install workflow-composer
```

## Usage
Below is an example of how to use `WorkflowComposer` in a TypeScript project:

### Basic Example
```typescript
import WorkflowComposer from '@svinod-030/workflow-composer';

const composer = new WorkflowComposer();

composer.addStep('init', async (context) => {
    context.count = 0;
    console.log('Init:', context.count);
    return 'increment'; // Jump to 'increment'
}, async (context) => {
    console.log('Rollback init');
    delete context.count;
});

composer.addStep('increment', async (context) => {
    context.count++;
    console.log('Increment:', context.count);
    return null; // End workflow
}, async (context) => {
    console.log('Rollback increment');
    context.count--;
});

composer.run()
    .then((context) => console.log('Done:', context))
    .catch((err) => console.log('Failed:', err));
```

**Output:**
```
Init: 0
Increment: 1
Done: { count: 1 }
```

### Example with Rollback
```typescript
import WorkflowComposer from '@svinod-030/workflow-composer';

const composer = new WorkflowComposer();

composer.addStep('init', async (ctx) => {
    ctx.count = 0;
    console.log('Init:', ctx.count);
    return 'increment';
}, async (ctx) => {
    console.log('Rollback init');
    delete ctx.count;
});

composer.addStep('increment', async (ctx) => {
    ctx.count++;
    console.log('Increment:', ctx.count);
    if (ctx.count < 2) return 'increment'; // Loop
    return 'fail';
}, async (ctx) => {
    console.log('Rollback increment');
    ctx.count--;
});

composer.addStep('fail', async () => {
    console.log('Failing...');
    throw new Error('Oops');
}, async () => {
    console.log('Rollback fail');
});

composer.run()
    .then(() => console.log('Done'))
    .catch((err) => console.log('Failed:', err.message));
```

**Output:**
```
Init: 0
Increment: 1
Increment: 2
Failing...
Rollback fail
Rollback increment
Rollback increment
Rollback init
Failed: Oops
```

## API
### `WorkflowComposer`
- **`addStep(name: string, stepFn: (context: Record<string, any>) => Promise<string | null | void>, rollbackFn: (context: Record<string, any>) => Promise<void>): void`**
    - Adds a named step to the workflow.
    - `name`: Unique identifier for the step.
    - `stepFn`: Async function that modifies context and returns the next step name (or `null` to end).
    - `rollbackFn`: Async function to undo the step on failure.
    - Throws if inputs are invalid.

- **`run(): Promise<Record<string, any>>`**
    - Executes the workflow starting from `"init"`.
    - Returns the final `context` on success, or throws an error with rollback on failure.
    - Prevents concurrent runs.

- **`reset(): void`**
    - Clears all steps, context, and history, resetting to initial state.

## Development
- **Build**: `npm run build` (uses Vite to compile TypeScript to ES and CommonJS).
- **Test**: `npm run test` (runs Jest with TypeScript support).

### Prerequisites
- Node.js >= 14
- TypeScript >= 5.0 (optional for users)

### Install Dependencies
```bash
npm install
```

### Run Tests
```bash
npm test
```

## Contributing
Feel free to submit issues or pull requests on [GitHub](#) (https://github.com/svinod-030/npm-packages/issues). Contributions are welcome!

## License
MIT License © 2025 Vinod Sigadana

## Author
- [Vinod Sigadana](https://www.npmjs.com/~svinod)

