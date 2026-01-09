import { Home, MessageSquare, FolderPlus, LogOut, Settings } from "lucide-react";
import { useLocation } from "wouter";

export const TeamMemberDashboardPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    setLocation("/");
  };

  const dashboardCards = [
    {
      title: "Campaign",
      description: "View and create campaign",
      bgColor: "bg-[#83ffb333]",
      icon: FolderPlus,
      path: "/campaign",
    },
    {
      title: "Message",
      description: "Communicate with team members and clients",
      bgColor: "bg-[#7974ffcc]",
      icon: MessageSquare,
      path: "/message",
    },
    {
      title: "Tools",
      description: "Access evaluation, etc",
      bgColor: "bg-[#ff7d8e33]",
      icon: Settings,
      path: "/team-evaluation-form",
    },
  ];

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
        <div className="bg-white px-6 py-2 rounded-full">
          <span className="text-black text-xl font-semibold font-playfair">TEAM MEMBER</span>
        </div>
        <div className="flex gap-8 items-center">
          <button onClick={() => setLocation("/team-member-dashboard")} className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity" data-testid="button-home">
            <Home size={24} className="text-black" />
            <span className="text-black text-lg font-playfair">Home</span>
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
        <div className="grid grid-cols-3 gap-[50px] mb-[50px]">
          {dashboardCards.map((card, index) => (
            <button
              key={index}
              onClick={() => card.path !== "#" && setLocation(card.path)}
              data-testid={`card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={`${card.bgColor} rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6 flex flex-col items-center text-center hover-elevate transition-all duration-200 cursor-pointer w-full min-h-[146px]`}
            >
              <card.icon size={70} className="text-black mb-4" />
              <h3 className="text-black font-semibold text-2xl font-playfair mb-2">{card.title}</h3>
              <p className="text-black text-base font-playfair">{card.description}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};
