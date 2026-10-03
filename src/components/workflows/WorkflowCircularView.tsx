import React from 'react';
import { Workflow, WorkflowStage } from '../../types/workflows';
import { WorkflowActorBadge } from './WorkflowStatusBadge';
import { RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';

interface WorkflowCircularViewProps {
  workflow: Workflow;
  activeStage: WorkflowStage | null;
  onSelectStage: (stage: WorkflowStage) => void;
}

export const WorkflowCircularView: React.FC<WorkflowCircularViewProps> = ({
  workflow,
  activeStage,
  onSelectStage
}) => {
  return (
    <div className="w-full bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl overflow-hidden relative">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />

      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-2">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" style={{ animationDuration: '8s' }} />
          Continuous Unbroken Cycle
        </span>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
          Clinical Quality & SOP Evolution Cycle
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Every standard operating procedure is continuously built, proven, standardized, accredited, replicated, monitored, and refined.
        </p>
      </div>

      {/* Step Sequence Bar (Top) */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 flex-wrap relative z-10 text-xs">
        {workflow.stages.map((st, idx) => {
          const isSelected = activeStage?.id === st.id;
          return (
            <React.Fragment key={st.id}>
              <button
                onClick={() => onSelectStage(st)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/30 text-[10px] flex items-center justify-center">
                  {idx + 1}
                </span>
                <span>{st.title.split(' ')[1] || st.title}</span>
              </button>
              {idx < workflow.stages.length - 1 && (
                <span className="text-slate-600 hidden sm:inline">→</span>
              )}
            </React.Fragment>
          );
        })}
        <span className="text-blue-400 font-bold hidden sm:inline">↺ (Loop Back to 1)</span>
      </div>

      {/* Circular Wheel Diagram (SVG) */}
      <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center my-4">
        {/* Outer orbital track */}
        <div className="absolute inset-4 rounded-full border border-dashed border-blue-500/30 animate-spin" style={{ animationDuration: '60s' }} />
        <div className="absolute inset-8 rounded-full border border-slate-700/60" />

        {/* Center Hub */}
        <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-blue-900 to-indigo-950 border border-blue-500/40 shadow-2xl flex flex-col items-center justify-center text-center p-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 mb-1" />
          <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">
            Zero Harm
          </span>
          <span className="text-xs font-extrabold text-white leading-tight">
            Clinical Quality SOP
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5">
            NABH / NABL
          </span>
        </div>

        {/* Orbiting Stage Nodes */}
        {workflow.stages.map((st, idx) => {
          const total = workflow.stages.length;
          const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
          const radius = 42; // percentage from center
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          const isSelected = activeStage?.id === st.id;

          return (
            <button
              key={st.id}
              onClick={() => onSelectStage(st)}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`absolute z-20 transition-all duration-300 rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center text-center group ${
                isSelected
                  ? 'bg-blue-600 text-white scale-110 shadow-xl ring-2 ring-white/50'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-blue-400'
              }`}
              title={`Click to inspect Stage ${idx + 1}: ${st.title}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${
                isSelected ? 'bg-white text-blue-600' : 'bg-slate-700 text-slate-300'
              }`}>
                {idx + 1}
              </span>
              <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap px-1">
                {st.title.split('(')[0].replace(/^\d+\.\s*/, '')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Detail Callout */}
      {activeStage && (
        <div className="mt-8 p-5 rounded-2xl bg-slate-800/80 border border-slate-700 relative z-10 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                Active Inspected Stage
              </span>
              <h4 className="text-base font-bold text-white">
                {activeStage.title}
              </h4>
            </div>
            <WorkflowActorBadge actorType={activeStage.actorType} actorName={activeStage.actor} />
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
            {activeStage.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[9px] uppercase font-bold text-slate-500 block">Input</span>
              <span className="text-slate-300">{activeStage.input}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[9px] uppercase font-bold text-blue-400 block">Process</span>
              <span className="text-slate-300">{activeStage.process}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[9px] uppercase font-bold text-emerald-400 block">Output</span>
              <span className="text-slate-300">{activeStage.output}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
