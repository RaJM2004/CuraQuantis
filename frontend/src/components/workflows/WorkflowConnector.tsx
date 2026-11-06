import React from 'react';

interface WorkflowConnectorProps {
  direction?: 'horizontal' | 'vertical';
  label?: string;
  isAnimated?: boolean;
}

export const WorkflowConnector: React.FC<WorkflowConnectorProps> = ({
  direction = 'vertical',
  label,
  isAnimated = true
}) => {
  if (direction === 'horizontal') {
    return (
      <div className="hidden lg:flex flex-col items-center justify-center px-1 flex-shrink-0 relative w-12 xl:w-16">
        {label && (
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1 whitespace-nowrap">
            {label}
          </span>
        )}
        <div className="relative w-full h-8 flex items-center justify-center">
          <svg className="w-full h-6 overflow-visible" viewBox="0 0 60 20">
            <defs>
              <marker
                id="arrowhead-h"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" className="fill-blue-500 dark:fill-blue-400" />
              </marker>
            </defs>

            {/* Background baseline line */}
            <line
              x1="0"
              y1="10"
              x2="52"
              y2="10"
              stroke="currentColor"
              className="text-slate-300 dark:text-slate-700"
              strokeWidth="2"
              strokeDasharray="4 3"
            />

            {/* Directional arrow */}
            <line
              x1="0"
              y1="10"
              x2="52"
              y2="10"
              stroke="#3b82f6"
              strokeWidth="2"
              markerEnd="url(#arrowhead-h)"
            />

            {/* Flowing animated dot */}
            {isAnimated && (
              <circle r="3.5" fill="#2563eb" className="motion-safe:animate-pulse">
                <animate
                  attributeName="cx"
                  from="0"
                  to="48"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values="10;10"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </svg>
        </div>
      </div>
    );
  }

  // Vertical Connector
  return (
    <div className="flex flex-col items-center justify-center my-1.5 relative w-full">
      {label && (
        <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 my-0.5 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
          {label}
        </span>
      )}
      <div className="relative w-6 h-10 flex items-center justify-center">
        <svg className="w-6 h-10 overflow-visible" viewBox="0 0 20 40">
          <defs>
            <marker
              id="arrowhead-v"
              markerWidth="8"
              markerHeight="6"
              refX="3"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 6 3, 0 6" className="fill-blue-500 dark:fill-blue-400" />
            </marker>
          </defs>

          {/* Background line */}
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="34"
            stroke="currentColor"
            className="text-slate-300 dark:text-slate-700"
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Directional arrow */}
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="34"
            stroke="#3b82f6"
            strokeWidth="2"
            markerEnd="url(#arrowhead-v)"
          />

          {/* Flowing animated dot */}
          {isAnimated && (
            <circle r="3.5" fill="#2563eb" className="motion-safe:animate-pulse">
              <animate
                attributeName="cy"
                from="0"
                to="32"
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                values="10;10"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </svg>
      </div>
    </div>
  );
};
