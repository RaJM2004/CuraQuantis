import React, { useState } from 'react';
import { Workflow } from '../../types/workflows';
import { WorkflowStatusBadge } from './WorkflowStatusBadge';
import { ChevronDown, Check, X, Compass, Search } from 'lucide-react';

interface WorkflowMobileNavProps {
  workflows: Workflow[];
  selectedWorkflow: Workflow;
  onSelectWorkflow: (workflow: Workflow) => void;
}

export const WorkflowMobileNav: React.FC<WorkflowMobileNavProps> = ({
  workflows,
  selectedWorkflow,
  onSelectWorkflow
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = workflows.filter(
    (w) =>
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.category.toLowerCase().includes(search.toLowerCase()) ||
      w.strategicPhaseRef.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="lg:hidden mb-6">
      {/* Mobile Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3 text-left"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider block">
              Active Workflow ({selectedWorkflow.strategicPhaseRef})
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate block">
              {selectedWorkflow.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <WorkflowStatusBadge status={selectedWorkflow.status} size="sm" />
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </button>

      {/* Modal Sheet for selecting workflow */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex flex-col justify-end p-0 sm:p-4 animate-fade-in">
          <div className="w-full max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom duration-300">
            {/* Sheet Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Select Workflow
                </h3>
                <p className="text-xs text-slate-400">
                  Choose from {workflows.length} standardized clinical workflows
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search workflows..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            {/* List */}
            <div className="p-3 space-y-1.5 overflow-y-auto max-h-[60vh]">
              {filtered.map((w, idx) => {
                const isSelected = selectedWorkflow.id === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => {
                      onSelectWorkflow(w);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-2xl flex items-center justify-between gap-3 transition-colors ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-bold border border-blue-300'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] flex items-center justify-center font-bold text-slate-500">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs truncate block">{w.title}</span>
                        <span className="text-[10px] text-slate-400 block font-normal">
                          {w.strategicPhaseRef} • {w.stages.length} stages
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <WorkflowStatusBadge status={w.status} size="sm" />
                      {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
