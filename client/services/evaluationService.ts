import { db } from "../lib/firebase.ts";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const evaluationsCollection = collection(db, "evaluations");

// Create evaluation
export async function createEvaluation(data: {
  evaluatorType: "client" | "team";
  evaluatorName: string;
  evaluatorEmail: string;
  projectTitle: string;
  rating: number;
  feedback: string;
  visibility?: "admin-only" | "team-visible";
}) {
  await addDoc(evaluationsCollection, {
    ...data,
    visibility: data.visibility || "admin-only",
    status: "Pending",
    createdAt: serverTimestamp(),
  });
}

// Get all evaluations (Admin)
export async function getAllEvaluations() {
  const snapshot = await getDocs(evaluationsCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Mark evaluation as reviewed
export async function markEvaluationReviewed(id: string) {
  const docRef = doc(db, "evaluations", id);
  await updateDoc(docRef, { status: "Reviewed" });
}
