import { Home, MessageSquare, Users, FolderPlus, Mail, Settings, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

export const DashboardPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    setLocation("/");
  };

  const projectOverviewData = [
    { name: "Week 1", projects: 5, tasks: 12 },
    { name: "Week 2", projects: 8, tasks: 18 },
    { name: "Week 3", projects: 6, tasks: 14 },
    { name: "Week 4", projects: 9, tasks: 22 },
  ];

  const analyticsData = [
    { name: "Campaign A", performance: 65 },
    { name: "Campaign B", performance: 78 },
    { name: "Campaign C", performance: 92 },
    { name: "Campaign D", performance: 73 },
  ];

  const dashboardCards = [
    {
      title: "Campaign",
      description: "View and create campaign",
      bgColor: "bg-[#83ffb333]",
      icon: FolderPlus,
      path: "/campaign",
    },
    {
      title: "Project requests",
      description: "Approved or reject projects",
      bgColor: "bg-[#ff78d233]",
      icon: Mail,
      path: "/project-requests",
    },
    {
      title: "Message",
      description: "Communicate with team members and clients",
      bgColor: "bg-[#7974ffcc]",
      icon: MessageSquare,
      path: "/message",
    },
    {
      title: "Manage users",
      description: "Assign task and role allocation for employees",
      bgColor: "bg-[#7dffff33]",
      icon: Users,
      path: "/manage-roles",
    },
    {
      title: "Tools",
      description: "Access evaluation, etc",
      bgColor: "bg-[#ff7d8e33]",
      icon: Settings,
      path: "/evaluation-review",
    },
  ];

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
        <div className="bg-white px-6 py-2 rounded-full">
          <span className="text-black text-xl font-semibold font-playfair">ADMIN</span>
        </div>
        <div className="flex gap-8 items-center">
          <button onClick={() => setLocation("/dashboard")} className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity" data-testid="button-home">
            <Home size={24} className="text-black" />
            <span className="text-black text-lg font-playfair">Home</span>
          </button>
          <button onClick={() => setLocation("/campaign")} className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity" data-testid="button-manage">
            <Users size={24} className="text-black" />
            <span className="text-black text-lg font-playfair">Manage</span>
          </button>
          <button onClick={() => setLocation("/message")} className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity" data-testid="button-message">
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

      <main className="flex-1 px-[109px] pt-[181px]">
        <div className="grid grid-cols-5 gap-[50px] mb-[50px]">
          {dashboardCards.map((card, index) => (
            <button
              key={index}
              onClick={() => card.path !== "#" && setLocation(card.path)}
              data-testid={`card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={`${card.bgColor} rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6 flex flex-col items-center text-center hover-elevate transition-all duration-200 cursor-pointer`}
              style={{ width: "218px", minHeight: "146px" }}
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
                  <Bar dataKey="projects" fill="#83ffb3" />
                  <Bar dataKey="tasks" fill="#7974ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="bg-[#e5e5e5] h-20 flex items-center justify-center">
              <h2 className="text-black font-semibold text-2xl font-playfair tracking-widest">
                Analytics Overview
              </h2>
            </div>
            <div className="h-[553px] p-6 flex items-center justify-center" data-testid="section-analytics-overview">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="performance" stroke="#ff78d2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
