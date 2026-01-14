import { useState, useEffect } from "react";
import { Home, MessageSquare, LogOut, Briefcase, Info } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTeamMemberByEmail } from "@/services/teamMemberService";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const TeamMemberViewPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [memberData, setMemberData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, this would come from auth context
  const userEmail = "member1@gmail.com"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch from users collection for status and role
        const usersRef = collection(db, "users");
        const userQ = query(usersRef, where("email", "==", userEmail));
        const userSnapshot = await getDocs(userQ);
        if (!userSnapshot.empty) {
          setUserData(userSnapshot.docs[0].data());
        }

        // Fetch from team_members for tasks
        const data = await getTeamMemberByEmail(userEmail);
        setMemberData(data);
      } catch (error) {
        console.error("Error fetching team member data:", error);
        toast({
          title: "Error",
          description: "Failed to load your profile information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail, toast]);

  const handleLogout = () => {
    setLocation("/");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
        <p className="text-xl font-playfair">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col font-sans">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
        <div className="bg-white px-6 py-2 rounded-full">
          <span className="text-black text-xl font-semibold font-playfair uppercase">Member View</span>
        </div>
        <div className="flex gap-8 items-center">
          <button onClick={() => setLocation("/team-member-dashboard")} className="flex items-center gap-2 cursor-pointer hover:opacity-70">
            <Home size={24} />
            <span className="font-playfair">Home</span>
          </button>
          <button onClick={() => setLocation("/message")} className="flex items-center gap-2 cursor-pointer hover:opacity-70">
            <MessageSquare size={24} />
            <span className="font-playfair">Message</span>
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 cursor-pointer hover:opacity-70">
            <LogOut size={24} />
            <span className="font-playfair">Logout</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-10 py-12 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold font-playfair mb-8">My Profile & Tasks</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2 uppercase tracking-wider">
                <Info size={16} /> Current Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold capitalize font-playfair">
                {userData?.role || "Team Member"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2 uppercase tracking-wider">
                <Info size={16} /> Account Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge 
                className={`px-3 py-1 text-sm ${
                  userData?.status === 'Active' 
                  ? 'bg-green-100 text-green-700 border-green-200' 
                  : 'bg-red-100 text-red-700 border-red-200'
                }`}
                variant="outline"
              >
                {userData?.status || "Active"}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2 uppercase tracking-wider">
                <Briefcase size={16} /> Total Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold font-playfair">
                {memberData?.assignedTasks?.length || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-sm border-gray-200">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="font-playfair text-xl">Assigned Tasks & Projects</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {!memberData?.assignedTasks || memberData.assignedTasks.length === 0 ? (
              <div className="p-12 text-center text-gray-500 italic font-playfair">
                No tasks assigned yet. Check back later or contact your manager.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {memberData.assignedTasks.map((task: string, index: number) => (
                  <div key={index} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-700">{task}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
