import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StoryPage from "./pages/StoryPage";
import NotFound from "./pages/NotFound";
import IEIDashboard from "./pages/IEIDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider children={""} />
    <Toaster />
    <Sonner />
    
    {/* Site-wide Background */}
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url(/lovable-uploads/background.jpeg)" }}
      />
      
      {/* Overlay for opacity */}
      <div className="fixed inset-0 bg-black/50 -z-10" />

      {/* App content */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="/dashboard" element={<IEIDashboard />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  </QueryClientProvider>
);

export default App;
