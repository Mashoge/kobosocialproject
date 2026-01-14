import { db } from "../lib/firebase.ts";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const usersCollection = collection(db, "users");

// Add a new team member (email as document ID)
export async function addTeamMember(email: string, role: string) {
  const userRef = doc(db, "users", email);

  await setDoc(userRef, {
    email,
    role,
    status: "Active",
    tasksCount: 0,
    createdAt: serverTimestamp(),
  });
}

// Get all team members
export async function getAllTeamMembers() {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Update user role and department
export async function updateUserRole(email: string, role: string, department?: string) {
  const userRef = doc(db, "users", email);
  const updateData: any = { role };
  if (department) {
    updateData.department = department;
  }
  await updateDoc(userRef, updateData);
}

// Activate / Deactivate user
export async function updateUserStatus(
  email: string,
  status: "Active" | "Inactive",
) {
  const userRef = doc(db, "users", email);
  await updateDoc(userRef, { status });
}

// Assign task count to user
export async function updateUserTaskCount(email: string, count: number) {
  const userRef = doc(db, "users", email);
  await updateDoc(userRef, { tasksCount: count });
}
