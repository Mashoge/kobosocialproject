import {
  Home,
  Check,
  X,
  FileText,
  User,
  Search,
  Filter,
  Inbox,
  CheckCircle,
  XCircle,
  Star,
  Clock,
  AlertTriangle,
  Paperclip,
  ChevronDown,
  LayoutGrid,
  Users,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  getAllProjectRequests,
  updateProjectRequestStatus,
} from "@/services/projectRequestService";

export const ProjectRequestsPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<"Primary" | "Updates" | "Urgent">(
    "Primary",
  );
  const [sidebarFilter, setSidebarFilter] = useState<
    "Inbox" | "Approved" | "Rejected" | "Important"
  >("Inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [adminComment, setAdminComment] = useState("");

  const handleLogout = () => {
    setLocation("/");
  };

  // Fetch project requests from Firestore
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAllProjectRequests();
        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch project requests:", error);
      }
    };
    fetchRequests();
  }, []);

  // Approve or reject a project request
  const handleAction = async (id: string, status: "Approved" | "Rejected") => {
    try {
      await updateProjectRequestStatus(id, status);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status } : req)),
      );
      setSelectedRequest(null);
    } catch (error) {
      console.error("Failed to update request status:", error);
    }
  };

  const handleCommentSubmit = () => {
    if (!selectedRequest || !adminComment.trim()) return;
    // Update local state for now, normally would call a service
    setRequests((prev: any[]) =>
      prev.map((req) =>
        req.id === selectedRequest.id ? { ...req, adminComment } : req,
      ),
    );
    setSelectedRequest((prev: any | null) =>
      prev ? { ...prev, adminComment } : null,
    );
    setAdminComment("");
  };

  const filteredRequests = requests.filter((req) => {
    // Sidebar filters
    if (sidebarFilter === "Approved" && req.status !== "Approved") return false;
    if (sidebarFilter === "Rejected" && req.status !== "Rejected") return false;
    if (sidebarFilter === "Inbox" && req.status !== "Pending") return false;

    // Search query
    if (
      searchQuery &&
      !req.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !req.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  return (
    <div className="bg-[#f5f5f5] dark:bg-zinc-950 w-full min-h-screen flex flex-col font-sans">
      {/* Top Header Consistent with Dashboard */}
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
        <div className="bg-white px-6 py-2 rounded-full shadow-sm">
          <span className="text-black text-xl font-semibold font-playfair tracking-widest">
            ADMIN
          </span>
        </div>

        <div className="flex gap-8 items-center">
          <button
            onClick={() => setLocation("/dashboard")}
            className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
          >
            <Home size={24} className="text-black" />
            <span className="text-black text-lg font-playfair">Home</span>
          </button>
          <button
            onClick={() => setLocation("/campaign")}
            className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
          >
            <Users size={24} className="text-black" />
            <span className="text-black text-lg font-playfair">Manage</span>
          </button>
          <button
            onClick={() => setLocation("/message")}
            className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
          >
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

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#D9D1C7]/50 dark:bg-zinc-900/50 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
          <div className="p-4 space-y-1">
            {[
              {
                id: "Inbox",
                label: "Inbox",
                icon: Inbox,
                count: requests.filter((r) => r.status === "Pending").length,
              },
              {
                id: "Approved",
                label: "Approved",
                icon: CheckCircle,
                count: requests.filter((r) => r.status === "Approved").length,
              },
              {
                id: "Rejected",
                label: "Rejected",
                icon: XCircle,
                count: requests.filter((r) => r.status === "Rejected").length,
              },
              {
                id: "Important",
                label: "Important",
                icon: Star,
                count: requests.filter((r) => r.isImportant).length || 0,
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSidebarFilter(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  sidebarFilter === item.id
                    ? "bg-zinc-200 dark:bg-zinc-800 font-semibold"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                }`}
              >
                <item.icon size={18} />
                <span className="flex-1 text-left">
                  {item.label} ({item.count})
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 flex flex-col bg-white dark:bg-zinc-950 overflow-hidden relative">
          <div className="p-6 pb-0">
            <h1 className="text-2xl font-serif text-center mb-6">
              Project Request Page
            </h1>

            {/* View Switching / Tabs */}
            {!selectedRequest && (
              <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                <button
                  onClick={() => setActiveTab("Primary")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 text-sm transition-colors ${activeTab === "Primary" ? "bg-white dark:bg-zinc-800 shadow-sm font-semibold" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"}`}
                >
                  <LayoutGrid size={16} />
                  <span>Primary</span>
                </button>
                <div className="w-px h-8 bg-zinc-200 dark:border-zinc-800" />
                <button
                  onClick={() => setActiveTab("Updates")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 text-sm transition-colors ${activeTab === "Updates" ? "bg-white dark:bg-zinc-800 shadow-sm font-semibold" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"}`}
                >
                  <Clock size={16} />
                  <span>Updates</span>
                </button>
                <div className="w-px h-8 bg-zinc-200 dark:border-zinc-800" />
                <button
                  onClick={() => setActiveTab("Urgent")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 text-sm transition-colors ${activeTab === "Urgent" ? "bg-white dark:bg-zinc-800 shadow-sm font-semibold" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"}`}
                >
                  <AlertTriangle size={16} />
                  <span>Urgent</span>
                </button>
                <div className="flex-1 flex items-center px-4 gap-2">
                  <div className="flex-1" />
                  <Filter size={16} className="text-zinc-400" />
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                    <Input
                      placeholder="Search..."
                      className="h-8 pl-8 w-48 text-xs bg-transparent border-none focus-visible:ring-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-auto p-6">
            {selectedRequest ? (
              /* DETAIL VIEW (Image 2) */
              <div className="max-w-5xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm p-12 min-h-[80vh] flex flex-col relative">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="absolute left-6 top-6 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X size={24} />
                </button>

                <h2 className="text-2xl font-serif text-center mb-12">
                  Project Request Page
                </h2>

                <div className="grid grid-cols-12 gap-12 flex-1">
                  {/* Left Column: Details */}
                  <div className="col-span-4 space-y-8">
                    <div>
                      <h3 className="text-xl font-bold font-serif mb-1">
                        {selectedRequest.projectTitle}
                      </h3>
                      <p className="text-sm text-zinc-600">
                        Client: {selectedRequest.clientName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-zinc-500">
                          Submitted on Jan 1
                        </p>
                        <Badge
                          variant="outline"
                          className="text-[10px] uppercase py-0 px-1"
                        >
                          [{selectedRequest.status.toUpperCase()}]
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-sm">Project Details:</h4>
                      <div className="grid grid-cols-2 gap-y-2 text-xs">
                        <span className="font-bold">Deadline:</span>
                        <span>{selectedRequest.deadline || "N/A"}</span>
                        <span className="font-bold">Budget:</span>
                        <span>{selectedRequest.budget || "N/A"}</span>
                        <span className="font-bold">Platform:</span>
                        <span className="break-words">
                          {selectedRequest.platforms || "N/A"}
                        </span>
                        <span className="font-bold">Deliverables:</span>
                        <span>{selectedRequest.deliverables || "N/A"}</span>
                      </div>
                    </div>

                    <div className="border border-zinc-300 dark:border-zinc-700 p-4 rounded shadow-[2px_2px_0px_rgba(0,0,0,0.1)] flex flex-col h-64">
                      <h4 className="font-bold text-xs underline mb-2">
                        Comment Box (Admin Only):
                      </h4>
                      <div className="flex-1 text-[10px] leading-relaxed overflow-auto pr-2 mb-2">
                        {selectedRequest.adminComment || "No comments yet."}
                      </div>
                      <textarea
                        className="w-full h-20 text-[10px] border border-zinc-200 p-2 mb-2 focus:outline-none resize-none"
                        placeholder="Type your comment here..."
                        value={adminComment}
                        onChange={(e) => setAdminComment(e.target.value)}
                      />
                      <div className="text-right">
                        <button
                          onClick={handleCommentSubmit}
                          className="text-[10px] font-bold uppercase hover:underline"
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-8 pt-4">
                      <button
                        onClick={() =>
                          handleAction(selectedRequest.id, "Approved")
                        }
                        className="text-sm font-bold uppercase hover:underline"
                      >
                        APPROVE
                      </button>
                      <button
                        onClick={() =>
                          handleAction(selectedRequest.id, "Rejected")
                        }
                        className="text-sm font-bold uppercase hover:underline"
                      >
                        REJECT
                      </button>
                    </div>
                  </div>

                  {/* Middle Column: Description */}
                  <div className="col-span-5 flex flex-col">
                    <h4 className="text-center font-bold text-sm mb-4">
                      Project Description
                    </h4>
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-8 shadow-sm flex-1 text-xs leading-relaxed overflow-auto">
                      <p className="mb-4 font-bold"></p>
                      <p className="mb-4">
                        {selectedRequest.projectDescription}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Category/Files */}
                  <div className="col-span-3 space-y-12">
                    <div className="text-right">
                      <h4 className="font-bold text-xs">
                        Project Type/Category:
                      </h4>
                      <p className="text-xs">
                        {selectedRequest.category || "N/A"}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 mb-2">
                        <span className="font-bold text-xs">
                          Attached Files
                        </span>
                        <ChevronDown size={14} />
                      </div>
                      <div className="space-y-2">
                        {selectedRequest.attachments?.map(
                          (file: any, idx: number) => (
                            <a
                              key={idx}
                              href={file.url}
                              className="flex items-center justify-end gap-2 text-[10px] hover:underline"
                            >
                              <Paperclip size={12} />
                              <span>{file.name}</span>
                            </a>
                          ),
                        )}
                        {(!selectedRequest.attachments ||
                          selectedRequest.attachments.length === 0) && (
                          <span className="text-[10px] text-zinc-400 italic">
                            No files attached
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* LIST VIEW (Image 1) */
              <div className="border-t border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800">
                      <th className="py-3 px-4 font-medium text-zinc-500 w-1/4">
                        Client
                      </th>
                      <th className="py-3 px-4 font-medium text-zinc-500 w-1/2">
                        Request Details
                      </th>
                      <th className="py-3 px-4 font-medium text-zinc-500 w-1/4 text-right">
                        Status / Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr
                        key={request.id}
                        onClick={() => setSelectedRequest(request)}
                        className="border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer transition-colors"
                      >
                        <td className="py-4 px-4 font-medium">
                          {request.clientName}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2 items-baseline">
                            <span className="font-bold whitespace-nowrap">
                              {request.projectTitle}
                            </span>
                            <span className="text-zinc-500 text-xs truncate">
                              - {request.projectDescription?.substring(0, 100)}
                              ...
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-sm">{request.status}</span>
                            <span className="text-[10px] text-zinc-400">
                              Jan 1
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredRequests.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-12 text-center text-zinc-400 italic"
                        >
                          No requests found matching current filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
