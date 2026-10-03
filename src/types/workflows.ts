export type CapabilityStatus = 
  | 'CONCEPT'
  | 'PROTOTYPE'
  | 'DEMO'
  | 'PLANNED'
  | 'PRODUCTION'
  | 'STRATEGIC TARGET';

export type ActorType = 
  | 'human'         // Clinician, Doctor, Pathologist, Nurse
  | 'ai'            // Inference engine, Model, Algorithm
  | 'hybrid'        // AI assisted with mandatory Doctor-in-the-Loop
  | 'patient'       // Patient, Citizen
  | 'infrastructure'; // IoT, LIS/HIS, Server, Command Desk

export type DiagramLayoutType = 
  | 'linear'        // Sequential pipeline (Discover -> Register -> ...)
  | 'branching'     // Multi-track or tiered pipeline
  | 'circular'      // Continuous cycle (Build -> Prove -> Standardize -> ...)
  | 'hub-spoke'     // Rural hub and spoke topology
  | 'loop'          // Closed telemetry loop (10-step telemetry loop)
  | 'matrix';       // Capability matrix

export interface WorkflowStage {
  id: string;
  stepNumber: number | string;
  title: string;
  subtitle?: string;
  description: string;
  actor: string;
  actorType: ActorType;
  input: string;
  process: string;
  output: string;
  clinicalOversight: string;
  sla?: string;
  iconName?: string;
  isMilestone?: boolean;
}

export interface WorkflowStat {
  label: string;
  value: string;
  subtext?: string;
}

export interface Workflow {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 
    | 'Clinical Care'
    | 'Diagnostics'
    | 'AI & Technology'
    | 'Network & Reach'
    | 'Governance & Operations'
    | 'Commercial & Scale';
  status: CapabilityStatus;
  strategicPhaseRef: string; // e.g. "Phase 1", "Phase 8", "Phases 1-52"
  layoutType: DiagramLayoutType;
  humanOversightNote: string;
  keyOutputs: string[];
  stats: WorkflowStat[];
  stages: WorkflowStage[];
  cycleNotice?: string;
}
