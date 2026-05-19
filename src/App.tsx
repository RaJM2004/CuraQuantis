import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Healthcare from "./pages/industries/Healthcare";
import Finance from "./pages/industries/Finance";
import Pharma from "./pages/industries/Pharma";
import Agriculture from "./pages/industries/Agriculture";
import Manufacturing from "./pages/industries/Manufacturing";
import Retail from "./pages/industries/Retail";
import Defence from "./pages/industries/Defence";
import CyberSecurity from "./pages/industries/CyberSecurity";
import Biotech from "./pages/industries/Biotech";
import Products from "./pages/Products";
import Solutions from "./pages/Solutions";
import Insights from "./pages/Insights";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RemoteMonitoring from "./pages/solutions/RemoteMonitoring";
import MedicalBilling from "./pages/solutions/MedicalBilling";
import LabIntegration from "./pages/solutions/LabIntegration";
import AppointmentScheduling from "./pages/solutions/AppointmentScheduling";
import AIChatbot from "./pages/solutions/AIChatbot";
import ClinicalDecision from "./pages/solutions/ClinicalDecision";
import GenAI from "./pages/industries/healthcare/GenAI";
import AgenticAI from "./pages/industries/healthcare/AgenticAI";
import NonInvasiveVentilator from "./pages/NonInvasiveVentilator";
import Law from "./pages/industries/Law";
import Aerospace from "./pages/industries/Aerospace";
import Education from "./pages/industries/Education";
import Semiconductor from "./pages/industries/Semiconductor";
import Nutrition from "./pages/industries/Nutrition";
import Meat from "./pages/industries/Meat";
import Insurance from "./pages/industries/Insurance";
import Robots from "./pages/industries/Robots";
import Drones from "./pages/industries/Drones";
import DemoCenter from "./pages/DemoCenter";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/demo-center" element={<DemoCenter />} />
            <Route path="/solutions/remote-monitoring" element={<RemoteMonitoring />} />
            <Route path="/solutions/medical-billing" element={<MedicalBilling />} />
            <Route path="/solutions/lab-integration" element={<LabIntegration />} />
            <Route path="/solutions/appointment-scheduling" element={<AppointmentScheduling />} />
            <Route path="/solutions/ai-chatbot" element={<AIChatbot />} />
            <Route path="/solutions/clinical-decision" element={<ClinicalDecision />} />
            <Route path="/industries/healthcare" element={<Healthcare />} />
            <Route path="/industries/healthcare/gen-ai" element={<GenAI />} />
            <Route path="/industries/healthcare/agentic-ai" element={<AgenticAI />} />
            <Route path="/industries/finance" element={<Finance />} />
            <Route path="/industries/pharma" element={<Pharma />} />
            <Route path="/industries/agriculture" element={<Agriculture />} />
            <Route path="/industries/manufacturing" element={<Manufacturing />} />
            <Route path="/industries/retail" element={<Retail />} />
            <Route path="/industries/defence" element={<Defence />} />
            <Route path="/industries/cyber-security" element={<CyberSecurity />} />
            <Route path="/industries/biotech" element={<Biotech />} />
            <Route path="/products/ventilator" element={<NonInvasiveVentilator />} />
            <Route path="/industries/law" element={<Law />} />
            <Route path="/industries/aerospace" element={<Aerospace />} />
            <Route path="/industries/education" element={<Education />} />
            <Route path="/industries/semiconductor" element={<Semiconductor />} />
            <Route path="/industries/nutrition" element={<Nutrition />} />
            <Route path="/industries/meat" element={<Meat />} />
            <Route path="/industries/insurance" element={<Insurance />} />
            <Route path="/industries/robots" element={<Robots />} />
            <Route path="/industries/drones" element={<Drones />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
