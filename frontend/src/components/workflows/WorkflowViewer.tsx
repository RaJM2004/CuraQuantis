import React, { useState } from 'react';
import { Workflow, WorkflowStage } from '../../types/workflows';
import { WorkflowStatusBadge } from './WorkflowStatusBadge';
import { WorkflowStageNode } from './WorkflowStageNode';
import { WorkflowConnector } from './WorkflowConnector';
import { WorkflowDetailDrawer } from './WorkflowDetailDrawer';
import { WorkflowCircularView } from './WorkflowCircularView';
import { 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  ArrowDown, 
  CheckCircle2,
  Info,
  Maximize2
} from 'lucide-react';

interface WorkflowViewerProps {
  workflow: Workflow;
}

export const WorkflowViewer: React.FC<WorkflowViewerProps> = ({ workflow }) => {
  const [selectedStage, setSelectedStage] = useState<WorkflowStage | null>(null);

  return (
    <div className="flex-1 w-full space-y-6">
      {/* Workflow Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {workflow.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800">
              {workflow.strategicPhaseRef}
            </span>
          </div>

          <WorkflowStatusBadge status={workflow.status} size="md" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {workflow.title}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-6">
          {workflow.fullDescription}
        </p>

        {/* Human Clinical Oversight Notice */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60 flex items-start sm:items-center gap-3 mb-6 text-xs text-emerald-900 dark:text-emerald-200">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <span className="font-bold">Human Clinical Oversight Boundary: </span>
            <span>{workflow.humanOversightNote}</span>
          </div>
        </div>

        {/* Key Metrics / Stats Row */}
        {workflow.stats && workflow.stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            {workflow.stats.map((st, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
              >
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block mb-0.5">
                  {st.label}
                </span>
                <span className="text-base sm:text-lg font-extrabold text-blue-900 dark:text-blue-300">
                  {st.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Process Flow Visualization */}
      {workflow.layoutType === 'circular' ? (
        <WorkflowCircularView
          workflow={workflow}
          activeStage={selectedStage}
          onSelectStage={(stage) => setSelectedStage(stage)}
        />
      ) : (
        <div className="bg-slate-50/60 dark:bg-slate-900/40 rounded-3xl p-4 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-inner">
          {/* Flow Guidance Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                <span>Process Flow Architecture</span>
                <span className="text-xs font-normal text-slate-400">
                  ({workflow.stages.length} Connected Milestones)
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any stage node to inspect data inputs, execution protocols, validated outputs, and clinical oversight.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>Live Data Flow Active</span>
              </span>
            </div>
          </div>

          {/* Sequential Process Nodes with Connectors */}
          <div className="max-w-2xl mx-auto space-y-0">
            {workflow.stages.map((stage, idx) => {
              const isSelected = selectedStage?.id === stage.id;
              const isLast = idx === workflow.stages.length - 1;

              return (
                <React.Fragment key={stage.id}>
                  {/* Stage Node */}
                  <WorkflowStageNode
                    stage={stage}
                    isActive={isSelected}
                    onSelect={(st) => setSelectedStage(st)}
                    index={idx}
                  />

                  {/* Directional Connector Arrow to Next Stage */}
                  {!isLast && (
                    <WorkflowConnector
                      direction="vertical"
                      label={`Proceeds to Stage ${idx + 2}`}
                      isAnimated={true}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* End of Process Indicator */}
          <div className="mt-8 text-center pt-6 border-t border-slate-200 dark:border-slate-800 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-xs border border-slate-200 dark:border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Process Completed: Validated Healthcare Deliverable Issued</span>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Detail Drawer */}
      <WorkflowDetailDrawer
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
      />
    </div>
  );
};
