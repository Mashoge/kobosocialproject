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
import { ClientDashboardPage } from "@/pages/ClientDashboardPage";
import { ClientRequestFormPage } from "@/pages/ClientRequestFormPage";
import { ProjectRequestsPage } from "@/pages/ProjectRequestsPage";
import { EvaluationReviewPage } from "./pages/EvaluationReviewPage";
import { ClientEvaluationFormPage } from "@/pages/ClientEvaluationFormPage";
import { TeamMemberDashboardPage } from "@/pages/TeamMemberDashboardPage";
import { TeamMemberEvaluationFormPage } from "@/pages/TeamMemberEvaluationFormPage";
import { ManageRolesPage } from "@/pages/ManageRolesPage";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={LogInPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/campaign" component={CampaignPage} />
      <Route path="/message" component={MessagePage} />
      <Route path="/create-template" component={CreateTemplatePage} />
      <Route path="/client-dashboard" component={ClientDashboardPage} />
      <Route path="/client-request-form" component={ClientRequestFormPage} />
      <Route path="/client-evaluation-form" component={ClientEvaluationFormPage} />
      <Route path="/team-member-dashboard" component={TeamMemberDashboardPage} />
      <Route path="/team-evaluation-form" component={TeamMemberEvaluationFormPage} />
      <Route path="/project-requests" component={ProjectRequestsPage} />
      <Route path="/manage-roles" component={ManageRolesPage} />
      <Route path="/evaluation-review" component={EvaluationReviewPage} />
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
