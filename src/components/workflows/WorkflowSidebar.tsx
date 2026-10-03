import React, { useState, useMemo } from 'react';
import { Workflow, CapabilityStatus } from '../../types/workflows';
import { WORKFLOW_CATEGORIES } from '../../data/workflowsData';
import { WorkflowStatusBadge } from './WorkflowStatusBadge';
import { 
  Search, 
  ChevronRight, 
  Layers, 
  Filter, 
  Activity, 
  Compass, 
  Microscope, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Building 
} from 'lucide-react';

interface WorkflowSidebarProps {
  workflows: Workflow[];
  selectedWorkflow: Workflow;
  onSelectWorkflow: (workflow: Workflow) => void;
}

export const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  workflows,
  selectedWorkflow,
  onSelectWorkflow
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredWorkflows = useMemo(() => {
    return workflows.filter((w) => {
      const matchesSearch =
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.strategicPhaseRef.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || w.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [workflows, searchQuery, selectedCategory]);

  return (
    <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-sm h-fit lg:sticky lg:top-24">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Workflow Registry
            </h3>
            <span className="text-[11px] text-slate-400">
              {workflows.length} Process Workflows
            </span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-3.5">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter workflows or phases..."
          className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none text-[11px]">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all font-medium ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          All ({workflows.length})
        </button>
        {WORKFLOW_CATEGORIES.map((cat) => {
          const count = workflows.filter((w) => w.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all font-medium ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Workflows List */}
      <div 
        className="space-y-1.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1"
        role="tablist"
        aria-label="CuraQuantis Workflows"
      >
        {filteredWorkflows.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No workflows match "{searchQuery}"
          </div>
        ) : (
          filteredWorkflows.map((w, idx) => {
            const isSelected = selectedWorkflow.id === w.id;
            return (
              <button
                key={w.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectWorkflow(w)}
                className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-start justify-between gap-3 group relative border ${
                  isSelected
                    ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-500/80 text-blue-950 dark:text-white shadow-sm ring-1 ring-blue-500/20'
                    : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4
                        className={`text-xs font-semibold truncate ${
                          isSelected ? 'text-blue-900 dark:text-blue-300 font-bold' : ''
                        }`}
                      >
                        {w.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {w.strategicPhaseRef}
                      </span>
                      <span className="text-[10px] text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {w.stages.length} stages
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <WorkflowStatusBadge status={w.status} size="sm" />
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping mt-1" />
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
