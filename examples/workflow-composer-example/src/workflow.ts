import WorkflowComposer from 'workflow-composer';

// Test 1: Basic Workflow
async function testBasicWorkflow() {
    console.log('--- Test 1: Basic Workflow ---');
    const composer = new WorkflowComposer();

    composer.addStep('init', async (ctx) => {
        ctx.value = 'start';
        console.log('Init:', ctx.value);
        return 'next';
    }, async (ctx) => {
        console.log('Rollback init');
        delete ctx.value;
    });

    composer.addStep('next', async (ctx) => {
        ctx.value += ' -> next';
        console.log('Next:', ctx.value);
        return null;
    }, async (ctx) => {
        console.log('Rollback next');
        ctx.value = 'start';
    });

    try {
        const result = await composer.run();
        console.log('Result:', result);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Test 2: Rollback on Failure
async function testRollback() {
    console.log('\n--- Test 2: Rollback on Failure ---');
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
        if (ctx.count < 2) return 'increment';
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

    try {
        await composer.run();
    } catch (err: any) {
        console.error('Failed:', err.message);
    }
}

// Run tests
export async function runTests() {
    await testBasicWorkflow();
    await testRollback();
}