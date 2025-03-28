import WorkflowComposer from '../src/index';

describe('WorkflowComposer', () => {
    test('runs steps successfully and returns context', async () => {
        const composer = new WorkflowComposer();
        composer.addStep('init', async (ctx) => {
            ctx.value = 'test';
            return null;
        }, async () => {});

        const ctx = await composer.run();
        expect(ctx.value).toBe('test');
    });

    test('handles dynamic step navigation', async () => {
        const composer = new WorkflowComposer();
        composer.addStep('init', async (ctx) => {
            ctx.count = 0;
            return 'increment';
        }, async (ctx) => {
            delete ctx.count;
        });
        composer.addStep('increment', async (ctx) => {
            ctx.count++;
            return null;
        }, async (ctx) => {
            ctx.count--;
        });

        const ctx = await composer.run();
        expect(ctx.count).toBe(1);
    });

    test('rolls back on failure', async () => {
        const composer = new WorkflowComposer();
        let rolledBackInit = false;
        let rolledBackNext = false;

        composer.addStep('init', async (ctx) => {
            ctx.data = 'start';
            return 'next';
        }, async (ctx) => {
            rolledBackInit = true;
            delete ctx.data;
        });

        composer.addStep('next', async () => {
            return Promise.reject('Fail');
        }, async () => {
            rolledBackNext = true;
        });

        await expect(composer.run()).rejects.toBe('Fail');
        expect(rolledBackNext).toBe(true);
        expect(rolledBackInit).toBe(true);
        // expect(composer.context.data).toBeUndefined();
    });

    test('throws on invalid step input', () => {
        const composer = new WorkflowComposer();
        expect(() => composer.addStep(42 as any, () => Promise.resolve(), () => Promise.resolve())).toThrow('Invalid step name or functions');
        expect(() => composer.addStep('valid', 'notFn' as any, () => Promise.resolve())).toThrow('Invalid step name or functions');
        expect(() => composer.addStep('valid', () => Promise.resolve(), 'notFn' as any)).toThrow('Invalid step name or functions');
    });

    test('prevents concurrent runs', async () => {
        const composer = new WorkflowComposer();
        composer.addStep('init', async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
            return null;
        }, async () => {});

        const firstRun = composer.run();
        await expect(composer.run()).rejects.toThrow('Already running');
        await firstRun; // Ensure first run completes
    });
});