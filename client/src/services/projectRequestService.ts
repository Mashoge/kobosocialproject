import { collection, addDoc, getDocs, updateDoc, doc, Timestamp, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export const createProjectRequest = async (data: any, files: File[]) => {
  console.log("Starting project request creation with data:", data);
  const attachments = [];
  
  try {
    // Upload files to Firebase Storage
    if (files && files.length > 0) {
      for (const file of files) {
        console.log(`Uploading file: ${file.name}`);
        // Create a unique path for the file
        const fileName = `${Date.now()}_${file.name}`;
        const fileRef = ref(storage, `project-requests/${fileName}`);
        
        // Use uploadBytes to upload the file
        await uploadBytes(fileRef, file);
        
        // Get the public download URL
        const url = await getDownloadURL(fileRef);
        console.log(`File uploaded successfully: ${url}`);
        attachments.push({ name: file.name, url });
      }
    }

    // Store request in Firestore
    console.log("Saving to Firestore...");
    const docRef = await addDoc(collection(db, "projectRequests"), {
      clientName: data.clientName,
      email: data.email,
      projectTitle: data.projectTitle,
      projectDescription: data.projectDescription,
      country: data.country,
      address: data.address,
      contactNumber: data.contactNumber,
      deadline: data.deadline,
      budget: data.budget,
      platforms: data.platforms,
      deliverables: data.deliverables,
      category: data.category,
      attachments,
      status: "Pending",
      createdAt: Timestamp.now()
    });
    console.log("Firestore document created with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Detailed error in createProjectRequest:", error);
    // Log the full error object for better debugging
    if (error && typeof error === 'object') {
      console.error("Error properties:", Object.getOwnPropertyNames(error));
    }
    throw error;
  }
};

export const getAllProjectRequests = async () => {
  const q = query(collection(db, "projectRequests"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateProjectRequestStatus = async (id: string, status: string) => {
  const requestRef = doc(db, "projectRequests", id);
  await updateDoc(requestRef, { status });
};
