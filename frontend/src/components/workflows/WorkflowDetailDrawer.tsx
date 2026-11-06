import React from 'react';
import { WorkflowStage } from '../../types/workflows';
import { WorkflowActorBadge } from './WorkflowStatusBadge';
import { 
  X, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Cpu, 
  ArrowRight, 
  CheckCircle2,
  Database,
  Sliders
} from 'lucide-react';

interface WorkflowDetailDrawerProps {
  stage: WorkflowStage | null;
  onClose: () => void;
}

export const WorkflowDetailDrawer: React.FC<WorkflowDetailDrawerProps> = ({
  stage,
  onClose
}) => {
  if (!stage) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-sm flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl h-full flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 bg-slate-50/70 dark:bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">
                Stage {stage.stepNumber}
              </span>
              <WorkflowActorBadge actorType={stage.actorType} actorName={stage.actor} />
            </div>
            <h3 id="drawer-title" className="text-lg font-bold text-slate-900 dark:text-white">
              {stage.title}
            </h3>
            {stage.subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {stage.subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close stage details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Stage Overview Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Process Overview
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {stage.description}
            </p>
          </div>

          {/* SLA Indicator */}
          {stage.sla && (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block">
                  Turnaround Time / SLA
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {stage.sla}
                </span>
              </div>
            </div>
          )}

          {/* Three-Box Process Architecture */}
          <div className="space-y-4">
            {/* Input Box */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300">
                <Database className="w-4 h-4 text-slate-400" />
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Stage Inputs & Prerequisites
                </h5>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                {stage.input}
              </p>
            </div>

            {/* Process Box */}
            <div className="p-4 rounded-2xl border border-blue-200 dark:border-blue-800/80 bg-blue-50/30 dark:bg-blue-950/20 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300">
                <Sliders className="w-4 h-4 text-blue-600" />
                <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Core Process & Execution
                </h5>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono bg-white dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/50">
                {stage.process}
              </p>
            </div>

            {/* Output Box */}
            <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/30 dark:bg-emerald-950/20 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Validated Output & Artifacts
                </h5>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono bg-white dark:bg-slate-800/80 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                {stage.output}
              </p>
            </div>
          </div>

          {/* Mandatory Clinical Oversight */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60">
            <div className="flex items-center gap-2 mb-2 text-amber-800 dark:text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h5 className="font-bold text-xs uppercase tracking-wider">
                Clinical Governance & Human Oversight
              </h5>
            </div>
            <p className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed">
              {stage.clinicalOversight}
            </p>
            <div className="mt-2 pt-2 border-t border-amber-200/50 dark:border-amber-800/40 text-[10px] text-amber-700 dark:text-amber-400 font-medium">
              Rule: Alert ≠ Decision. Registered medical practitioners retain sole diagnostic authority.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            CuraQuantis™ Clinical Workflow Engine
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors shadow-sm"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
