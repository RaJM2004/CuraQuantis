import React from 'react';
import { WorkflowStage } from '../../types/workflows';
import { WorkflowActorBadge } from './WorkflowStatusBadge';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle,
  Activity,
  Microscope,
  Stethoscope,
  Cpu,
  HeartPulse,
  Search,
  FileCheck,
  Building2,
  Syringe,
  Truck,
  RotateCw,
  Award,
  Send,
  Lock,
  Key,
  Database,
  Globe,
  Users,
  Compass,
  MapPin,
  FileText
} from 'lucide-react';

interface WorkflowStageNodeProps {
  stage: WorkflowStage;
  isActive: boolean;
  onSelect: (stage: WorkflowStage) => void;
  index: number;
}

// Icon mapper
const getStageIcon = (name?: string) => {
  const iconProps = { className: 'w-4 h-4 text-blue-600 dark:text-blue-400' };
  switch (name) {
    case 'Microscope': return <Microscope {...iconProps} />;
    case 'Stethoscope': return <Stethoscope {...iconProps} />;
    case 'Cpu': return <Cpu {...iconProps} />;
    case 'HeartPulse': return <HeartPulse {...iconProps} />;
    case 'Search': return <Search {...iconProps} />;
    case 'FileCheck': return <FileCheck {...iconProps} />;
    case 'Building2': return <Building2 {...iconProps} />;
    case 'Syringe': return <Syringe {...iconProps} />;
    case 'Truck': return <Truck {...iconProps} />;
    case 'RotateCw': return <RotateCw {...iconProps} />;
    case 'Award': return <Award {...iconProps} />;
    case 'Send': return <Send {...iconProps} />;
    case 'Lock': return <Lock {...iconProps} />;
    case 'Key': return <Key {...iconProps} />;
    case 'Database': return <Database {...iconProps} />;
    case 'Globe': return <Globe {...iconProps} />;
    case 'Users': return <Users {...iconProps} />;
    case 'Compass': return <Compass {...iconProps} />;
    case 'MapPin': return <MapPin {...iconProps} />;
    case 'FileText': return <FileText {...iconProps} />;
    case 'Activity':
    default:
      return <Activity {...iconProps} />;
  }
};

export const WorkflowStageNode: React.FC<WorkflowStageNodeProps> = ({
  stage,
  isActive,
  onSelect,
  index
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(stage)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(stage);
        }
      }}
      className={`group relative text-left w-full transition-all duration-300 rounded-2xl p-4 sm:p-5 border cursor-pointer ${
        isActive
          ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-500/10 ring-2 ring-blue-400/30'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
      }`}
      aria-expanded={isActive}
      aria-label={`Workflow Stage: ${stage.title}`}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="w-7 h-7 rounded-xl bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center font-bold text-xs text-blue-700 dark:text-blue-300 flex-shrink-0">
            {stage.stepNumber}
          </div>
          <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            {getStageIcon(stage.iconName)}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {stage.title}
            </h4>
            {stage.subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {stage.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-1.5">
          {stage.sla && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{stage.sla}</span>
            </span>
          )}
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
              isActive ? 'bg-blue-600 text-white rotate-90' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 line-clamp-2 leading-relaxed">
        {stage.description}
      </p>

      {/* Meta Indicators: Actor & Oversight */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <WorkflowActorBadge actorType={stage.actorType} actorName={stage.actor} />
        
        {stage.clinicalOversight && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="truncate max-w-[220px]">{stage.clinicalOversight}</span>
          </span>
        )}
      </div>

      {/* Inputs / Outputs Quick Indicators */}
      <div className="mt-2.5 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-slate-50/70 dark:bg-slate-800/40 rounded-xl p-2.5 border border-slate-100 dark:border-slate-800">
        <div>
          <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[9px] tracking-wider block">
            Input
          </span>
          <span className="text-slate-700 dark:text-slate-300 truncate block">
            {stage.input}
          </span>
        </div>
        <div>
          <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[9px] tracking-wider block">
            Output
          </span>
          <span className="text-slate-700 dark:text-slate-300 truncate block">
            {stage.output}
          </span>
        </div>
      </div>
    </div>
  );
};
