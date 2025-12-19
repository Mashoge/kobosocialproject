import { Home, MessageSquare, FileText, CheckSquare, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const ClientDashboardPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    setLocation("/");
  };

  const projectOverviewData = [
    { name: "Jan", completed: 4, pending: 2 },
    { name: "Feb", completed: 3, pending: 3 },
    { name: "Mar", completed: 5, pending: 1 },
    { name: "Apr", completed: 6, pending: 0 },
    { name: "May", completed: 4, pending: 2 },
  ];

  const projectStatusData = [
    { name: "Active", value: 8 },
    { name: "Pending", value: 3 },
    { name: "Completed", value: 12 },
  ];

  const dashboardCards = [
    {
      title: "Request Form",
      description: "Request Projects to the Project Manager",
      bgColor: "bg-pink-200",
      icon: FileText,
      path: "/client-request-form",
    },
    {
      title: "Message",
      description: "Communicate with Team Members",
      bgColor: "bg-purple-200",
      icon: MessageSquare,
      path: "#",
    },
    {
      title: "Evaluation",
      description: "Evaluate Post-Project Results",
      bgColor: "bg-green-200",
      icon: CheckSquare,
      path: "#",
    },
  ];

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
        <div className="bg-white px-6 py-2 rounded-full">
          <span className="text-black text-xl font-semibold font-playfair">CLIENT</span>
        </div>
        <div className="flex gap-8 items-center">
          <button className="flex items-center gap-2 cursor-pointer" data-testid="button-home-client">
            <Home size={24} className="text-black" />
            <span className="text-black text-lg font-playfair">Home</span>
          </button>
          <button className="flex items-center gap-2 cursor-pointer" data-testid="button-message-client">
            <MessageSquare size={24} className="text-black" />
            <span className="text-black text-lg font-playfair">Message</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer hover:opacity-70" 
            data-testid="button-logout-client"
          >
            <LogOut size={24} className="text-black" />
            <span className="text-black text-lg font-playfair">Logout</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-[109px] pt-[181px]">
        <div className="grid grid-cols-3 gap-[50px] mb-[50px]">
          {dashboardCards.map((card, index) => (
            <button
              key={index}
              onClick={() => card.path !== "#" && setLocation(card.path)}
              data-testid={`card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={`${card.bgColor} rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6 flex flex-col items-center text-center hover-elevate transition-all duration-200 cursor-pointer min-h-[146px]`}
            >
              <card.icon size={70} className="text-black mb-4" />
              <h3 className="text-black font-semibold text-2xl font-playfair mb-2">{card.title}</h3>
              <p className="text-black text-base font-playfair">{card.description}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-[50px]">
          <div className="bg-white rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="bg-[#e5e5e5] h-20 flex items-center justify-center">
              <h2 className="text-black font-semibold text-2xl font-playfair tracking-widest">
                Project Overview
              </h2>
            </div>
            <div className="h-[553px] p-6 flex items-center justify-center" data-testid="section-project-overview">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectOverviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#83ffb3" />
                  <Bar dataKey="pending" fill="#ff78d2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="bg-[#e5e5e5] h-20 flex items-center justify-center">
              <h2 className="text-black font-semibold text-2xl font-playfair tracking-widest">
                Project Status
              </h2>
            </div>
            <div className="h-[553px] p-6 flex flex-col justify-center" data-testid="section-project-status">
              <div className="space-y-4">
                {projectStatusData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold">{item.name}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-48 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(item.value / 12) * 100}%` }}
                        />
                      </div>
                      <span className="text-gray-800 font-bold w-8">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
