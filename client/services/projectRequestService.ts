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
    country?: string;
    address?: string;
    contactNumber?: string;
  },
  files: File[] = [],
) {
  console.log("Uploading files:", files.length);

  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      console.log("Uploading:", file.name);

      const fileRef = ref(
        storage,
        `project_requests/${Date.now()}_${file.name}`,
      );

      await uploadBytes(fileRef, file);
      console.log("Uploaded:", file.name);

      const url = await getDownloadURL(fileRef);
      console.log("URL:", url);

      return { name: file.name, url, type: file.type };
    }),
  );

  console.log("All files uploaded");

  await addDoc(projectRequestsCollection, {
    clientName: data.clientName,
    email: data.email,
    projectTitle: data.projectTitle,
    projectDescription: data.projectDescription,
    country: data.country || "",
    address: data.address || "",
    contactNumber: data.contactNumber || "",
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
