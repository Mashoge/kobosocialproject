import { Home, MessageSquare, Users, FolderPlus, Mail, Settings } from "lucide-react";

export const DashboardPage = (): JSX.Element => {
  const dashboardCards = [
    {
      title: "Campaign",
      description: "View and create campaign",
      bgColor: "bg-[#83ffb333]",
      icon: FolderPlus,
    },
    {
      title: "Project requests",
      description: "Approved or reject projects",
      bgColor: "bg-[#ff78d233]",
      icon: Mail,
    },
    {
      title: "Message",
      description: "Communicate with team members and clients",
      bgColor: "bg-[#7974ffcc]",
      icon: MessageSquare,
    },
    {
      title: "Manage users",
      description: "Assign task and role allocation for employees",
      bgColor: "bg-[#7dffff33]",
      icon: Users,
    },
    {
      title: "Tools",
      description: "Access evaluation, etc",
      bgColor: "bg-[#ff7d8e33]",
      icon: Settings,
    },
  ];

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
        <div className="bg-white px-6 py-2 rounded-full">
          <span className="text-black text-xl font-semibold font-playfair">ADMIN</span>
        </div>
        <div className="flex gap-8 items-center">
          <button className="flex items-center gap-2 cursor-pointer" data-testid="button-home">
            <Home size={24} className="text-black" />
            <span className="text-black text-lg font-playfair">Home</span>
          </button>
          <button className="flex items-center gap-2 cursor-pointer" data-testid="button-manage">
            <Users size={24} className="text-black" />
            <span className="text-black text-lg font-playfair">Manage</span>
          </button>
          <button className="flex items-center gap-2 cursor-pointer" data-testid="button-message">
            <MessageSquare size={24} className="text-black" />
            <span className="text-black text-lg font-playfair">Message</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-[109px] pt-[181px]">
        <div className="grid grid-cols-5 gap-[50px] mb-[50px]">
          {dashboardCards.map((card, index) => (
            <a
              key={index}
              href="#"
              data-testid={`card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={`${card.bgColor} rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6 flex flex-col items-center text-center hover-elevate transition-all duration-200`}
              style={{ width: "218px", minHeight: "146px" }}
            >
              <card.icon size={70} className="text-black mb-4" />
              <h3 className="text-black font-semibold text-2xl font-playfair mb-2">{card.title}</h3>
              <p className="text-black text-base font-playfair">{card.description}</p>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-[50px]">
          <div className="bg-white rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="bg-[#e5e5e5] h-20 flex items-center justify-center">
              <h2 className="text-black font-semibold text-2xl font-playfair tracking-widest">
                Project Overview
              </h2>
            </div>
            <div className="h-[553px]" data-testid="section-project-overview"></div>
          </div>

          <div className="bg-white rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="bg-[#e5e5e5] h-20 flex items-center justify-center">
              <h2 className="text-black font-semibold text-2xl font-playfair tracking-widest">
                Analytics Overview
              </h2>
            </div>
            <div className="h-[553px]" data-testid="section-analytics-overview"></div>
          </div>
        </div>
      </main>
    </div>
  );
};
