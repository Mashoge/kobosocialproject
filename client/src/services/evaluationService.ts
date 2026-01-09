import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Evaluation {
  id: string;
  evaluatorName: string;
  evaluatorType: 'client' | 'team';
  projectName: string;
  rating: number;
  feedback: string;
  status: 'Pending' | 'Reviewed';
  createdAt: any;
}

export const getAllEvaluations = async (): Promise<Evaluation[]> => {
  const q = query(collection(db, "evaluations"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Evaluation));
};

export const markEvaluationAsReviewed = async (id: string) => {
  const evaluationRef = doc(db, "evaluations", id);
  await updateDoc(evaluationRef, { status: "Reviewed" });
};
