import { db, storage } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Reference to the Firestore collection
const projectRequestsCollection = collection(db, "project_requests");

// Create a new project request
export async function createProjectRequest(
  data: {
    clientName: string;
    email: string;
    projectTitle: string;
    projectDescription: string;
  },
  files: File[] = [], // array of uploaded files
) {
  const uploadedFiles: { name: string; url: string; type: string }[] = [];

  // Upload each file to Firebase Storage
  for (const file of files) {
    const fileRef = ref(storage, `project_requests/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    uploadedFiles.push({
      name: file.name,
      url,
      type: file.type,
    });
  }

  // Add the request to Firestore
  await addDoc(projectRequestsCollection, {
    ...data,
    attachments: uploadedFiles,
    status: "Pending",
    createdAt: serverTimestamp(),
  });
}

// Get all project requests
export async function getAllProjectRequests() {
  const snapshot = await getDocs(projectRequestsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get a single project request by ID
export async function getProjectRequestById(id: string) {
  const docRef = doc(db, "project_requests", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Update status (approve/reject)
export async function updateProjectRequestStatus(
  id: string,
  status: "Pending" | "Approved" | "Rejected",
) {
  const docRef = doc(db, "project_requests", id);
  await updateDoc(docRef, { status });
}
