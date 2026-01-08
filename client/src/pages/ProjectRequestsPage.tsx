import { Home, Check, X, FileText, User } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

import {
  getAllProjectRequests,
  updateProjectRequestStatus,
} from "@/services/projectRequestService";

export const ProjectRequestsPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

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

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
        <button
          onClick={() => setLocation("/dashboard")}
          className="flex items-center gap-2 text-black hover:opacity-70"
        >
          <Home size={24} />
          <span className="font-playfair text-lg">Home</span>
        </button>
        <h1 className="text-black text-2xl font-semibold font-playfair">
          Project Requests Review
        </h1>
        <div className="w-24" />
      </header>

      <main className="flex-1 px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Request List */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-xl font-playfair font-bold mb-4">
            Pending Requests
          </h2>
          {requests
            .filter((r) => r.status === "Pending")
            .map((request) => (
              <Card
                key={request.id}
                className={`cursor-pointer transition-all hover:border-primary ${selectedRequest?.id === request.id ? "border-primary border-2" : ""}`}
                onClick={() => setSelectedRequest(request)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-playfair">
                    {request.projectTitle}
                  </CardTitle>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <User size={14} /> {request.clientName}
                  </div>
                </CardHeader>
              </Card>
            ))}
          {requests.filter((r) => r.status === "Pending").length === 0 && (
            <p className="text-gray-500 italic">No pending requests</p>
          )}
        </div>

        {/* Request Details */}
        <div className="md:col-span-2">
          {selectedRequest ? (
            <Card className="h-full">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-playfair mb-2">
                      {selectedRequest.projectTitle}
                    </CardTitle>
                    <p className="text-gray-600">
                      Submitted on{" "}
                      {selectedRequest.createdAt?.toDate
                        ? selectedRequest.createdAt
                            .toDate()
                            .toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        handleAction(selectedRequest.id, "Approved")
                      }
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Check className="mr-2" size={18} /> Approve
                    </Button>
                    <Button
                      onClick={() =>
                        handleAction(selectedRequest.id, "Rejected")
                      }
                      variant="destructive"
                    >
                      <X className="mr-2" size={18} /> Reject
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8 space-y-8">
                <section>
                  <h3 className="text-lg font-semibold font-playfair mb-3">
                    Project Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedRequest.projectDescription}
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold font-playfair mb-3">
                    Client Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-bold block">Name</span>
                      {selectedRequest.clientName}
                    </div>
                    <div>
                      <span className="font-bold block">Email</span>
                      {selectedRequest.email}
                    </div>
                    <div>
                      <span className="font-bold block">Contact</span>
                      {selectedRequest.contactNumber || "N/A"}
                    </div>
                    <div>
                      <span className="font-bold block">Address</span>
                      {selectedRequest.address || "N/A"}
                    </div>
                    <div>
                      <span className="font-bold block">Country</span>
                      {selectedRequest.country || "N/A"}
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold font-playfair mb-3">
                    Attached Files
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedRequest.attachments?.map(
                      (file: any, idx: number) => (
                        <a
                          key={idx}
                          href={file.url}
                          target="_blank"
                          className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-md border border-blue-200"
                        >
                          <FileText size={16} />
                          <span className="text-sm">{file.name}</span>
                        </a>
                      ),
                    )}
                    {selectedRequest.attachments?.length === 0 && (
                      <p className="text-gray-500 italic">No files attached</p>
                    )}
                  </div>
                </section>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-lg bg-gray-50 text-gray-400">
              <div className="text-center">
                <FileText size={48} className="mx-auto mb-4 opacity-20" />
                <p>Select a request to review details</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
