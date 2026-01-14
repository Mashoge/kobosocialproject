import { useState, useEffect } from "react";
import { Home, Users, MessageSquare, LogOut, Search, Filter, Plus, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getAllTeamMembers, updateUserRole, updateUserStatus } from "@/services/userRolesService";
import { updateAssignedTasks, getTeamMemberByEmail } from "@/services/teamMemberService";

export const ManageRolesPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newTask, setNewTask] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);

  const DEPARTMENT_ROLES: Record<string, string[]> = {
    "Creative Department": ["Creative Director", "Copywriter", "Art Director", "Graphic Designer", "Video Editor"],
    "Media Department": ["Media Planner", "Media Buyer", "Social Media Manager"],
    "Project Management": ["Project Manager", "Assistant Project Manager"],
    "Operations": ["Operations Manager", "Finance Officer"],
    "IT / Development": ["Developer", "Systems Admin", "Security Engineer"]
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllTeamMembers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDepartmentChange = async (email: string, newDept: string) => {
    try {
      // When department changes, default to the first role in that department
      const defaultRole = DEPARTMENT_ROLES[newDept][0];
      await updateUserRole(email, defaultRole, newDept);
      toast({ 
        title: "Department Updated", 
        description: `User moved to ${newDept} as ${defaultRole}` 
      });
      fetchUsers();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update department", variant: "destructive" });
    }
  };

  const handleRoleChange = async (email: string, newRole: string, dept: string) => {
    try {
      await updateUserRole(email, newRole, dept);
      toast({ title: "Role Updated", description: `User role changed to ${newRole}` });
      fetchUsers();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update role", variant: "destructive" });
    }
  };

  const handleStatusToggle = async (email: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await updateUserStatus(email, newStatus);
      toast({ title: "Status Updated", description: `User is now ${newStatus}` });
      fetchUsers();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  const handleAssignTask = async () => {
    if (!selectedUser || !newTask.trim()) return;
    
    setIsAssigning(true);
    try {
      const memberData = await getTeamMemberByEmail(selectedUser.id);
      const currentTasks = (memberData as any)?.assignedTasks || [];
      const updatedTasks = [...currentTasks, newTask.trim()];
      
      await updateAssignedTasks(selectedUser.id, updatedTasks);
      
      toast({
        title: "Task Assigned",
        description: `Successfully assigned task to ${selectedUser.id}`,
      });
      
      setNewTask("");
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error assigning task:", error);
      toast({
        title: "Error",
        description: "Failed to assign task",
        variant: "destructive",
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col font-sans">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
        <div className="bg-white px-6 py-2 rounded-full">
          <span className="text-black text-xl font-semibold font-playfair uppercase">Admin</span>
        </div>
        <div className="flex gap-8 items-center">
          <button onClick={() => setLocation("/dashboard")} className="flex items-center gap-2 cursor-pointer hover:opacity-70">
            <Home size={24} />
            <span className="font-playfair">Home</span>
          </button>
          <button onClick={() => setLocation("/project-requests")} className="flex items-center gap-2 cursor-pointer hover:opacity-70">
            <Users size={24} />
            <span className="font-playfair">Manage</span>
          </button>
          <button onClick={() => setLocation("/message")} className="flex items-center gap-2 cursor-pointer hover:opacity-70">
            <MessageSquare size={24} />
            <span className="font-playfair">Message</span>
          </button>
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 cursor-pointer hover:opacity-70">
            <LogOut size={24} />
            <span className="font-playfair">Logout</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-10 py-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-bold font-playfair mb-2">Team Management</h1>
            <p className="text-gray-600 font-playfair">Manage Users, Roles and Assignments.</p>
          </div>
          <Button className="bg-white text-black border border-gray-300 hover:bg-gray-50 font-playfair h-12 px-6 shadow-sm flex gap-2">
            <Plus size={20} />
            Add User
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              placeholder="Search Users..." 
              className="pl-10 h-12 bg-white border-gray-300 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-12 px-6 bg-white flex gap-2">
            All Roles <Filter size={16} />
          </Button>
          <Button variant="outline" className="h-12 px-6 bg-white flex gap-2">
            All Status <Filter size={16} />
          </Button>
          <Button variant="outline" className="h-12 px-6 bg-white flex gap-2">
            Sort By <Filter size={16} />
          </Button>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <Badge variant="outline" className="px-4 py-1 cursor-pointer bg-white">All (100)</Badge>
          <Badge variant="outline" className="px-4 py-1 cursor-pointer bg-white">Active (54)</Badge>
          <Badge variant="outline" className="px-4 py-1 cursor-pointer bg-white">Invited (2)</Badge>
          <Badge variant="outline" className="px-4 py-1 cursor-pointer bg-white">Disabled (4)</Badge>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[1fr_260px_150px_120px_50px] gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
            <div>NAME</div>
            <div className="text-center">DEPARTMENT & ROLE</div>
            <div className="text-center">STATUS</div>
            <div className="text-center">TASKS</div>
            <div></div>
          </div>

          <div className="divide-y divide-gray-100">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No users found.</div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-[1fr_260px_150px_120px_50px] gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{user.email?.split('@')[0]}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled={user.role === 'Admin'}>
                        <Button variant="outline" size="sm" className="w-32 truncate text-xs">
                          {user.department || "Select Dept"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {Object.keys(DEPARTMENT_ROLES).map((dept) => (
                          <DropdownMenuItem key={dept} onClick={() => handleDepartmentChange(user.id, dept)}>
                            {dept}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled={!user.department || user.role === 'Admin'}>
                        <Button variant="outline" size="sm" className="w-32 truncate text-xs">
                          {user.role || "Select Role"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {user.department && DEPARTMENT_ROLES[user.department]?.map((role: string) => (
                          <DropdownMenuItem key={role} onClick={() => handleRoleChange(user.id, role, user.department)}>
                            {role}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleStatusToggle(user.id, user.status)}
                      className={`w-24 border ${user.status === 'Active' ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}
                    >
                      {user.status || "Active"}
                    </Button>
                  </div>
                  <div className="text-center text-gray-600 font-medium">
                    {user.tasksCount || 0} Tasks
                  </div>
                  <div className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)}>
                          <Plus size={20} className="text-blue-600" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-playfair">Assign Task</DialogTitle>
                          <DialogDescription>
                            Add a new project or task for {user.email}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Input
                            placeholder="Project Name or Task Description"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAssignTask()}
                          />
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={handleAssignTask} 
                            disabled={isAssigning || !newTask.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            {isAssigning ? "Assigning..." : "Assign Task"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
