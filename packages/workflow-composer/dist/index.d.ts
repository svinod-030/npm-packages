type StepFn = (context: Record<string, any>) => Promise<string | null | void>;
type RollbackFn = (context: Record<string, any>) => Promise<void>;
declare class WorkflowComposer {
    private steps;
    private context;
    private history;
    private isRunning;
    private runningStep;
    constructor();
    addStep(name: string, stepFn: StepFn, rollbackFn: RollbackFn): void;
    run(): Promise<Record<string, any>>;
    private rollback;
    reset(): void;
}
export default WorkflowComposer;
