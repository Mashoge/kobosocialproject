import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const CampaignPage = (): JSX.Element => {
  const campaigns = [
    {
      id: 1,
      name: "Summer Promotion 2024",
      status: "Active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      budget: "$5,000",
      reach: "15,234",
    },
    {
      id: 2,
      name: "New Product Launch",
      status: "Planned",
      startDate: "2024-12-15",
      endDate: "2024-12-31",
      budget: "$3,500",
      reach: "0",
    },
    {
      id: 3,
      name: "Black Friday 2024",
      status: "Completed",
      startDate: "2024-11-24",
      endDate: "2024-11-30",
      budget: "$8,000",
      reach: "42,891",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Planned":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
        <h1 className="text-black text-2xl font-semibold font-playfair">Campaigns</h1>
        <Button
          data-testid="button-create-campaign"
          className="flex items-center gap-2 bg-[#83ffb3] hover:bg-[#6ae091] text-black font-semibold rounded-lg"
        >
          <Plus size={20} />
          Create Campaign
        </Button>
      </header>

      <main className="flex-1 px-10 py-8">
        <Card className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#e5e5e5] h-16 flex items-center px-6">
            <h2 className="text-black font-semibold text-xl font-playfair">All Campaigns</h2>
          </div>

          <div className="p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search campaigns..."
                  className="pl-10 py-2 border-gray-300"
                  data-testid="input-search-campaigns"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Campaign Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Start Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">End Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Budget</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reach</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-gray-200 hover:bg-gray-50" data-testid={`row-campaign-${campaign.id}`}>
                      <td className="py-4 px-4 text-gray-800 font-medium">{campaign.name}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{campaign.startDate}</td>
                      <td className="py-4 px-4 text-gray-600">{campaign.endDate}</td>
                      <td className="py-4 px-4 text-gray-600">{campaign.budget}</td>
                      <td className="py-4 px-4 text-gray-600">{campaign.reach}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            data-testid={`button-edit-campaign-${campaign.id}`}
                            className="h-8 w-8"
                          >
                            <Edit size={16} className="text-gray-600" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            data-testid={`button-delete-campaign-${campaign.id}`}
                            className="h-8 w-8"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};
