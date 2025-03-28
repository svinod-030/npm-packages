type StepFn = (context: Record<string, any>) => Promise<string | null | void>;
type RollbackFn = (context: Record<string, any>) => Promise<void>;

interface Step {
    stepFn: StepFn;
    rollbackFn: RollbackFn;
}

class WorkflowComposer {
    private steps: Map<string, Step>;
    private context: Record<string, any>;
    private history: string[];
    private isRunning: boolean;
    private runningStep: string | null;

    constructor() {
        this.steps = new Map<string, Step>();
        this.context = {};
        this.history = [];
        this.isRunning = false;
        this.runningStep = "init";
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
        try {
            while (this.runningStep && this.steps.has(this.runningStep)) {
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