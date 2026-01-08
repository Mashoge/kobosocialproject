import { useState } from "react";
import { Plus, ChevronRight, FolderPlus, Home, Users, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface Folder {
  id: string;
  name: string;
  tabs: string[];
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  folders: Folder[];
}

export const CampaignPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [showCreateFolderInput, setShowCreateFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleLogout = () => {
    setLocation("/");
  };

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Campaign 1",
      description: "Lorem ipsum dolor sit amet, Ut minim aliquam ca quasi natus et consequatur sapic.",
      folders: [
        { id: "f1", name: "Folder", tabs: ["ALL STRAF VE...", "BARANGAYS", "BATTLE EMO..."] },
        { id: "f2", name: "Folder", tabs: [] },
        { id: "f3", name: "Folder", tabs: [] },
      ],
    },
    {
      id: "2",
      name: "Campaign 1",
      description: "Lorem ipsum dolor sit amet, Ut minim aliquam ca quasi natus et consequatur sapic.",
      folders: [],
    },
    {
      id: "3",
      name: "Campaign 1",
      description: "Lorem ipsum dolor sit amet, Ut minim aliquam ca quasi natus et consequatur sapic.",
      folders: [],
    },
  ]);

  const handleCreateFolder = () => {
    if (selectedCampaign && newFolderName.trim()) {
      const updatedCampaigns = campaigns.map((c) =>
        c.id === selectedCampaign.id
          ? {
              ...c,
              folders: [...c.folders, { id: Date.now().toString(), name: newFolderName, tabs: [] }],
            }
          : c
      );
      setCampaigns(updatedCampaigns);
      setSelectedCampaign(updatedCampaigns.find((c) => c.id === selectedCampaign.id) || null);
      setNewFolderName("");
      setShowCreateFolderInput(false);
    }
  };

  const handleNewCampaign = () => {
    setLocation("/create-template");
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
        <button className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
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

  if (selectedFolder && selectedCampaign) {
    return (
      <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
        <AdminHeader />
        <div className="px-10 py-4">
          <button
            onClick={() => setSelectedFolder(null)}
            className="text-black text-sm font-playfair hover:opacity-70"
            data-testid="button-back-to-folders"
          >
            ← Back to {selectedCampaign.name}
          </button>
        </div>

        <main className="flex-1 px-10 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
            <h2 className="text-2xl font-playfair font-semibold text-black mb-6">
              Create New Tab
            </h2>
            <p className="text-gray-600 mb-6">
              Select a template to start building your project
            </p>

            <div className="space-y-3">
              {["ALL STAFF VERIFICATION FORM", "BARANGAYS", "BATTLE EMO...", "TIMETABLE"].map(
                (tab, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    data-testid={`item-tab-${idx}`}
                  >
                    {tab}
                  </div>
                )
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (selectedCampaign) {
    return (
      <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
        <AdminHeader />
        <div className="px-10 py-4">
          <button
            onClick={() => setSelectedCampaign(null)}
            className="text-black text-sm font-playfair hover:opacity-70"
            data-testid="button-back-to-campaigns"
          >
            ← Back to campaign list
          </button>
        </div>

        <main className="flex-1 px-10 py-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#e5e5e5] h-16 flex items-center px-6">
              <h2 className="text-black font-semibold text-lg font-playfair">Folders</h2>
            </div>

            <div className="p-8">
              <div className="space-y-3 mb-6">
                {selectedCampaign.folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="flex items-center justify-between border border-gray-300 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedFolder(folder)}
                    data-testid={`item-folder-${folder.id}`}
                  >
                    <span className="font-playfair font-medium text-gray-800">{folder.name}</span>
                    <ChevronRight size={20} className="text-gray-600" />
                  </div>
                ))}
              </div>

              <div>
                <button
                  onClick={() => setShowCreateFolderInput(!showCreateFolderInput)}
                  className="flex items-center gap-2 text-black font-playfair font-medium hover:opacity-70"
                  data-testid="button-create-folder"
                >
                  <FolderPlus size={20} />
                  Create Folder
                </button>

                {showCreateFolderInput && (
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleCreateFolder()}
                      placeholder="Folder name..."
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      data-testid="input-folder-name"
                      autoFocus
                    />
                    <Button
                      onClick={handleCreateFolder}
                      className="bg-[#83ffb3] hover:bg-[#6ae091] text-black"
                      data-testid="button-confirm-folder"
                    >
                      Create
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
      <AdminHeader />
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-48 bg-white shadow-md p-6 flex flex-col">
          <Button
            onClick={handleNewCampaign}
            className="w-full mb-6 bg-white border border-gray-300 text-black hover:bg-gray-50 font-playfair font-semibold rounded-lg"
            data-testid="button-new-campaign"
          >
            + New Campaign
          </Button>

          <div className="space-y-3 flex-1 overflow-auto">
            {campaigns.map((campaign: any) => {
              const isSelected = selectedCampaign && (selectedCampaign as any).id === campaign.id;
              return (
                <button
                  key={campaign.id}
                  onClick={() => setSelectedCampaign(campaign)}
                  className={`w-full text-left p-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition ${
                    isSelected ? "bg-blue-50 border-blue-300" : ""
                  }`}
                  data-testid={`button-campaign-${campaign.id}`}
                >
                  <h3 className="font-playfair font-bold text-gray-800">{campaign.name}</h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{campaign.description}</p>
                  <ChevronRight className="w-4 h-4 text-gray-600 mt-2" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-10 py-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-[#83ffb333] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-12 h-12 text-cyan-400"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6v6H9z" />
              </svg>
            </div>
            <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-2">
              Select a campaign to get started
            </h2>
            <p className="text-gray-600">Choose from the list on the left to view and manage folders</p>
          </div>
        </main>
      </div>
    </div>
  );
};
