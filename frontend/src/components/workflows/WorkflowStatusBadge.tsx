import React from 'react';
import { CapabilityStatus, ActorType } from '../../types/workflows';
import { User, Cpu, Sparkles, Heart, Server } from 'lucide-react';

interface WorkflowStatusBadgeProps {
  status: CapabilityStatus;
  size?: 'sm' | 'md';
}

export const WorkflowStatusBadge: React.FC<WorkflowStatusBadgeProps> = ({ status, size = 'sm' }) => {
  const styles: Record<CapabilityStatus, string> = {
    PRODUCTION: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    PLANNED: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
    DEMO: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    PROTOTYPE: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    'STRATEGIC TARGET': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
    CONCEPT: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
  };

  const dotColors: Record<CapabilityStatus, string> = {
    PRODUCTION: 'bg-emerald-500',
    PLANNED: 'bg-sky-500',
    DEMO: 'bg-amber-500',
    PROTOTYPE: 'bg-indigo-500',
    'STRATEGIC TARGET': 'bg-purple-500 animate-pulse',
    CONCEPT: 'bg-zinc-400'
  };

  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${styles[status]} ${sizeClasses}`}
      title={`Capability Status: ${status}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`} />
      <span>{status}</span>
    </span>
  );
};

interface WorkflowActorBadgeProps {
  actorType: ActorType;
  actorName: string;
}

export const WorkflowActorBadge: React.FC<WorkflowActorBadgeProps> = ({ actorType, actorName }) => {
  const getActorMeta = () => {
    switch (actorType) {
      case 'human':
        return {
          icon: User,
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          label: 'Human Clinician'
        };
      case 'ai':
        return {
          icon: Cpu,
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          label: 'AI Inference'
        };
      case 'hybrid':
        return {
          icon: Sparkles,
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          label: 'Doctor in Loop'
        };
      case 'patient':
        return {
          icon: Heart,
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          label: 'Patient Touchpoint'
        };
      case 'infrastructure':
      default:
        return {
          icon: Server,
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          label: 'Automated System'
        };
    }
  };

  const meta = getActorMeta();
  const Icon = meta.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${meta.bg}`}>
      <Icon className="w-3 h-3" />
      <span>{actorName}</span>
    </span>
  );
};
