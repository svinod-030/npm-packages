type StepFn = (context: Record<string, any>) => Promise<string | null | void>;
type RollbackFn = (context: Record<string, any>) => Promise<void>;

interface Step {
    stepFn: StepFn;
    rollbackFn: RollbackFn;
}

interface WorkflowComposerOptions {
    maxIterations?: number;
}

class WorkflowComposer {
    private steps: Map<string, Step>;
    private context: Record<string, any>;
    private history: string[];
    private isRunning: boolean;
    private runningStep: string | null;
    private maxIterations: number;

    constructor(options: WorkflowComposerOptions = {}) {
        this.steps = new Map<string, Step>();
        this.context = {};
        this.history = [];
        this.isRunning = false;
        this.runningStep = "init";
        this.maxIterations = options.maxIterations ?? 1000;
    }

    addStep(name: string, stepFn: StepFn, rollbackFn: RollbackFn): void {
        if (typeof name !== 'string' || typeof stepFn !== 'function' || typeof rollbackFn !== 'function') {
            throw new Error("Invalid step name or functions");
        }
        this.steps.set(name, { stepFn, rollbackFn });
    }

    async run(): Promise<Record<string, any>> {
        if (this.isRunning) throw new Error("Already running");
        this.isRunning = true;
        let iterations = 0;
        try {
            while (this.runningStep && this.steps.has(this.runningStep)) {
                if (iterations++ >= this.maxIterations) {
                    throw new Error(`Max iterations (${this.maxIterations}) exceeded`);
                }
                const step = this.steps.get(this.runningStep)!;
                this.history.push(this.runningStep);
                const nextStep = await step.stepFn(this.context);
                this.runningStep = nextStep || null;
            }
            this.isRunning = false;
            return this.context;
        } catch (e) {
            await this.rollback();
            this.isRunning = false;
            throw e;
        }
    }

    private async rollback(): Promise<void> {
        while (this.history.length > 0) {
            const stepName = this.history.pop()!;
            const step = this.steps.get(stepName)!;
            await step.rollbackFn(this.context);
        }
    }

    reset(): void {
        this.steps = new Map<string, Step>();
        this.context = {};
        this.history = [];
        this.isRunning = false;
        this.runningStep = "init";
    }
}

export default WorkflowComposer;