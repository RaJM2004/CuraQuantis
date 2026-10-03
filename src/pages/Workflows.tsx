import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { WORKFLOWS } from '../data/workflowsData';
import { Workflow } from '../types/workflows';
import { WorkflowSidebar } from '../components/workflows/WorkflowSidebar';
import { WorkflowMobileNav } from '../components/workflows/WorkflowMobileNav';
import { WorkflowViewer } from '../components/workflows/WorkflowViewer';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

const Workflows: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const workflowParam = searchParams.get('workflow');

  // Find initial workflow based on query param or default to first workflow
  const initialWorkflow = WORKFLOWS.find((w) => w.id === workflowParam) || WORKFLOWS[0];
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>(initialWorkflow);

  // Synchronize with URL parameter changes
  useEffect(() => {
    if (workflowParam) {
      const match = WORKFLOWS.find((w) => w.id === workflowParam);
      if (match) {
        setSelectedWorkflow((prev) => (match.id !== prev.id ? match : prev));
      }
    }
  }, [workflowParam]);

  // Handler for user selecting a workflow
  const handleSelectWorkflow = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setSearchParams({ workflow: workflow.id }, { replace: true });
    // Smoothly scroll to viewer top if on mobile
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 280, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex flex-col">
      {/* Existing Preserved Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Top Hero Breadcrumb Banner */}
          <div className="mb-6 sm:mb-8 text-center sm:text-left p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
            {/* Ambient background grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_50%)] pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-cyan-300 border border-white/10 mb-3 backdrop-blur-xs">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interactive System & Process Explorer</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                CuraQuantis™ Workflow Architecture
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Explore the connected Pan-India healthcare ecosystem through 20 standardized, verified process diagrams. Follow the arrows, inspect inputs and outputs, and understand clinical oversight at every milestone.
              </p>
            </div>
          </div>

          {/* Mobile Workflow Selector */}
          <WorkflowMobileNav
            workflows={WORKFLOWS}
            selectedWorkflow={selectedWorkflow}
            onSelectWorkflow={handleSelectWorkflow}
          />

          {/* Two-Column Desktop Layout */}
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
            {/* Left Sidebar */}
            <WorkflowSidebar
              workflows={WORKFLOWS}
              selectedWorkflow={selectedWorkflow}
              onSelectWorkflow={handleSelectWorkflow}
            />

            {/* Right Visualization Viewer */}
            <WorkflowViewer workflow={selectedWorkflow} />
          </div>
        </div>
      </main>

      {/* Existing Preserved Footer */}
      <Footer />
    </div>
  );
};

export default Workflows;
