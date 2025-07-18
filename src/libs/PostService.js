import { db } from "@/libs/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
  updateDoc 
} from "firebase/firestore";

const postsRef = collection(db, "posts");

export const createPost = async (user, content, images = []) => {
  await addDoc(collection(db, "posts"), {
    userId: user.uid,
    email: user.email,
    content,
    images,
    createdAt: serverTimestamp()
  });
};

export async function getAllPosts() {
  const snapshot = await getDocs(collection(db, "posts"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    images: doc.data().images || [] // ✅ 기본값 처리
  }));
}

export async function deletePost(id) {
  return await deleteDoc(doc(postsRef, id));
}

export const updatePost = async (id, content) => {
  const postRef = doc(db, 'posts', id);
  await updateDoc(postRef, { content });
};