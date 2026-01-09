import { useState, useEffect } from "react";
import { Home, Users, MessageSquare, LogOut, Search, ChevronDown, Star } from "lucide-react";
import { useLocation } from "wouter";
import { getAllEvaluations, markEvaluationAsReviewed, Evaluation } from "@/services/evaluationService";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const EvaluationReviewPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [activeTab, setActiveTab] = useState<"Overview" | "Client" | "Team" | "Reviewed">("Overview");
  const [reviewedSubTab, setReviewedSubTab] = useState<"Client" | "Team">("Client");
  const [clientSearch, setClientSearch] = useState("");
  const [teamSearch, setTeamSearch] = useState("");

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = async () => {
    try {
      const data = await getAllEvaluations();
      setEvaluations(data);
    } catch (error) {
      console.error("Failed to fetch evaluations:", error);
    }
  };

  const handleMarkAsReviewed = async (id: string) => {
    try {
      await markEvaluationAsReviewed(id);
      fetchEvaluations();
    } catch (error) {
      console.error("Failed to mark as reviewed:", error);
    }
  };

  const handleLogout = () => {
    setLocation("/");
  };

  const AdminHeader = () => (
    <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
      <div className="bg-white px-6 py-2 rounded-full shadow-sm">
        <span className="text-black text-xl font-semibold font-playfair tracking-widest">ADMIN</span>
      </div>
      
      <div className="flex gap-8 items-center">
        <button onClick={() => setLocation("/dashboard")} className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
          <Home size={24} className="text-black" />
          <span className="text-black text-lg font-playfair">Home</span>
        </button>
        <button onClick={() => setLocation("/campaign")} className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
          <Users size={24} className="text-black" />
          <span className="text-black text-lg font-playfair">Manage</span>
        </button>
        <button onClick={() => setLocation("/message")} className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
          <MessageSquare size={24} className="text-black" />
          <span className="text-black text-lg font-playfair">Message</span>
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer hover:opacity-70" 
          data-testid="button-logout"
        >
          <LogOut size={24} className="text-black" />
          <span className="text-black text-lg font-playfair">Logout</span>
        </button>
      </div>
    </header>
  );

  const filteredClientEvaluations = evaluations.filter(e => 
    e.evaluatorType === 'client' && 
    e.evaluatorName.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const filteredTeamEvaluations = evaluations.filter(e => 
    e.evaluatorType === 'team' && 
    e.evaluatorName.toLowerCase().includes(teamSearch.toLowerCase())
  );

  const avgPerformance = evaluations.length > 0 
    ? (evaluations.reduce((acc, curr) => acc + curr.rating, 0) / evaluations.length).toFixed(1) 
    : "0.0";

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col font-sans">
      <AdminHeader />

      <main className="flex-1 p-10 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-zinc-900">Evaluation Results</h1>
            <p className="text-zinc-500">View Evaluations from Client and Team Members</p>
          </div>

          <div className="flex border-b border-zinc-200">
            {["Overview", "Client Evaluation", "Team Evaluation", "Reviewed Evaluations"].map((tab) => {
              const tabId = tab.split(" ")[0] as any;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabId)}
                  className={`px-8 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === tabId ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                  }`}
                >
                  {tab}
                  {activeTab === tabId && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />
                  )}
                </button>
              );
            })}
          </div>

          {activeTab === "Reviewed" ? (
            <div className="space-y-6">
              <div className="flex gap-4">
                <Button 
                  variant={reviewedSubTab === "Client" ? "default" : "outline"}
                  onClick={() => setReviewedSubTab("Client")}
                  className="rounded-full"
                >
                  Client Reviewed
                </Button>
                <Button 
                  variant={reviewedSubTab === "Team" ? "default" : "outline"}
                  onClick={() => setReviewedSubTab("Team")}
                  className="rounded-full"
                >
                  Team Reviewed
                </Button>
              </div>

              <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                <div className="bg-zinc-200 px-6 py-3 flex justify-between items-center">
                  <span className="font-bold text-sm">{reviewedSubTab} Reviewed Evaluations</span>
                </div>
                <div className="divide-y divide-zinc-100 max-h-[600px] overflow-auto">
                  {evaluations
                    .filter(e => e.status === 'Reviewed' && e.evaluatorType === reviewedSubTab.toLowerCase())
                    .map((e) => (
                      <div key={e.id} className="p-6 flex items-start gap-4 hover:bg-zinc-50 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-zinc-100 flex-shrink-0 flex items-center justify-center border border-zinc-200">
                           <Users size={24} className="text-zinc-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-bold text-zinc-900">{e.evaluatorName}</p>
                              <p className="text-xs text-zinc-500">{e.projectName}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star key={s} size={12} className={s <= e.rating ? "fill-zinc-900 text-zinc-900" : "text-zinc-200"} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-zinc-600 italic bg-zinc-50 p-3 rounded-md border border-zinc-100">
                            "{e.feedback}"
                          </p>
                        </div>
                      </div>
                    ))}
                  {evaluations.filter(e => e.status === 'Reviewed' && e.evaluatorType === reviewedSubTab.toLowerCase()).length === 0 && (
                    <div className="p-20 text-center text-zinc-400 italic">No reviewed evaluations found for {reviewedSubTab}</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-6">
                <Card className="bg-white shadow-sm border-zinc-200">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-zinc-500 mb-2">Average Performance</p>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold">{avgPerformance}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={20} className={s <= Math.round(Number(avgPerformance)) ? "fill-zinc-900 text-zinc-900" : "text-zinc-200"} />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border-zinc-200">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-zinc-500 mb-2">Client Evaluation</p>
                      <p className="text-4xl font-bold">{evaluations.filter(e => e.evaluatorType === 'client').length}</p>
                      <p className="text-xs text-zinc-400">All Projects</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-zinc-900">{evaluations.filter(e => e.evaluatorType === 'client' && e.status === 'Pending').length} Unreviewed</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border-zinc-200">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-zinc-500 mb-2">Team Evaluation</p>
                      <p className="text-4xl font-bold">{evaluations.filter(e => e.evaluatorType === 'team').length}</p>
                      <p className="text-xs text-zinc-400">All Projects</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-zinc-900">{evaluations.filter(e => e.evaluatorType === 'team' && e.status === 'Pending').length} Unreviewed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Unreviewed Evaluation</h2>
                <div className="grid grid-cols-2 gap-0 border border-zinc-200 rounded-lg overflow-hidden bg-white">
                  {/* Client Evaluations Column */}
                  <div className="border-r border-zinc-200">
                    <div className="p-4 bg-zinc-50 flex gap-4 border-b border-zinc-200">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <Input 
                          placeholder="Search Users..." 
                          className="pl-10 h-10 bg-white" 
                          value={clientSearch}
                          onChange={(e) => setClientSearch(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" className="h-10 px-4 flex gap-2">
                        All Projects <ChevronDown size={16} />
                      </Button>
                    </div>
                    <div className="bg-zinc-200 px-6 py-2 flex justify-between items-center">
                      <span className="font-bold text-sm">Client Evaluations</span>
                      <div className="flex items-center gap-1 text-xs text-zinc-500 cursor-pointer">
                        Sort By: Newest <ChevronDown size={14} />
                      </div>
                    </div>
                    <div className="divide-y divide-zinc-100 max-h-[500px] overflow-auto">
                      {filteredClientEvaluations.filter(e => e.status === 'Pending').map((e) => (
                        <div key={e.id} className="p-6 flex items-start gap-4 hover:bg-zinc-50 group transition-colors">
                          <div className="w-12 h-12 rounded-full bg-zinc-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200">
                             <Users size={24} className="text-zinc-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <p className="font-bold text-zinc-900 truncate">{e.evaluatorName}</p>
                                <p className="text-xs text-zinc-500 truncate">{e.projectName}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-zinc-400 mb-1">1d ago</p>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={12} className={s <= e.rating ? "fill-zinc-900 text-zinc-900" : "text-zinc-200"} />
                                  ))}
                                </div>
                              </div>
                            </div>
                            {e.status === 'Pending' && (
                              <button 
                                onClick={() => handleMarkAsReviewed(e.id)}
                                className="text-[10px] font-bold text-zinc-900 uppercase hover:underline mt-2"
                              >
                                Mark as Reviewed
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      {filteredClientEvaluations.filter(e => e.status === 'Pending').length === 0 && (
                        <div className="p-10 text-center text-zinc-400 italic text-sm">No pending client evaluations</div>
                      )}
                    </div>
                  </div>

                  {/* Team Evaluations Column */}
                  <div>
                    <div className="p-4 bg-zinc-50 flex gap-4 border-b border-zinc-200">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <Input 
                          placeholder="Search Users..." 
                          className="pl-10 h-10 bg-white" 
                          value={teamSearch}
                          onChange={(e) => setTeamSearch(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" className="h-10 px-4 flex gap-2">
                        All Members <ChevronDown size={16} />
                      </Button>
                    </div>
                    <div className="bg-zinc-200 px-6 py-2 flex justify-between items-center">
                      <span className="font-bold text-sm">Team Evaluations</span>
                      <div className="flex items-center gap-1 text-xs text-zinc-500 cursor-pointer">
                        Sort By: Newest <ChevronDown size={14} />
                      </div>
                    </div>
                    <div className="divide-y divide-zinc-100 max-h-[500px] overflow-auto">
                      {filteredTeamEvaluations.filter(e => e.status === 'Pending').map((e) => (
                        <div key={e.id} className="p-6 flex items-start gap-4 hover:bg-zinc-50 group transition-colors">
                          <div className="w-12 h-12 rounded-full bg-zinc-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200">
                             <Users size={24} className="text-zinc-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <p className="font-bold text-zinc-900 truncate">{e.evaluatorName}</p>
                                <p className="text-xs text-zinc-500 truncate">{e.projectName}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-zinc-400 mb-1">1d ago</p>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={12} className={s <= e.rating ? "fill-zinc-900 text-zinc-900" : "text-zinc-200"} />
                                  ))}
                                </div>
                              </div>
                            </div>
                            {e.status === 'Pending' && (
                              <button 
                                onClick={() => handleMarkAsReviewed(e.id)}
                                className="text-[10px] font-bold text-zinc-900 uppercase hover:underline mt-2"
                              >
                                Mark as Reviewed
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      {filteredTeamEvaluations.filter(e => e.status === 'Pending').length === 0 && (
                        <div className="p-10 text-center text-zinc-400 italic text-sm">No pending team evaluations</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
