import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { LogInPage } from "@/pages/LogInPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { CampaignPage } from "@/pages/CampaignPage";
import { MessagePage } from "@/pages/MessagePage";
import { CreateTemplatePage } from "@/pages/CreateTemplatePage";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={LogInPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/campaign" component={CampaignPage} />
      <Route path="/message" component={MessagePage} />
      <Route path="/create-template" component={CreateTemplatePage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
