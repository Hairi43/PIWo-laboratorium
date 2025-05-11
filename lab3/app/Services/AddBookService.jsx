import { addDoc, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { firestore } from "./init";

const col = collection(firestore, "bookstore-001");
 
export const addBook = async (book, user) => {
    const docRef = doc(collection(firestore, "bookstore-001"));
    const newBook = {
      ...book,
      id: docRef.id,
    };

    await setDoc(docRef, newBook);
  };
  

export const listBooksByUser = async (uid) => {
    const q = query(col, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter((book) => book.uid === uid);
}