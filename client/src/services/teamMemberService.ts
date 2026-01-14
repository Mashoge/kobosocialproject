import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

const teamMembersCollection = collection(db, "team_members");

export interface TeamMemberData {
  email: string;
  assignedTasks: string[]; // array of task IDs or project IDs
  role: string; // optional
  active: boolean;
}

// Add a team member (can also come from userRolesService)
export async function addTeamMember(member: TeamMemberData) {
  await addDoc(teamMembersCollection, member);
}

// Update assigned tasks and sync count to users collection
export async function updateAssignedTasks(email: string, tasks: string[]) {
  const q = query(
    teamMembersCollection,
    where("email", "==", email.toLowerCase()),
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const memberRef = doc(db, "team_members", snapshot.docs[0].id);
    await updateDoc(memberRef, { assignedTasks: tasks });
  } else {
    // Create if doesn't exist
    await addDoc(teamMembersCollection, {
      email: email.toLowerCase(),
      assignedTasks: tasks,
      active: true,
      role: "team-member"
    });
  }
  
  // Sync tasksCount to users collection for Manage Roles UI
  const userRef = doc(db, "users", email);
  await updateDoc(userRef, { tasksCount: tasks.length });
}

// Get all team members
export async function getAllTeamMembers() {
  const snapshot = await getDocs(teamMembersCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get a team member by email
export async function getTeamMemberByEmail(email: string) {
  const q = query(
    teamMembersCollection,
    where("email", "==", email.toLowerCase()),
  );
  const snapshot = await getDocs(q);
  return snapshot.empty
    ? null
    : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}
