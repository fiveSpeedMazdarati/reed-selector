import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  deleteDoc,
  docData,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private firestore: Firestore = inject(Firestore);

  /**
   * Retrieves a collection of documents from Firestore.
   * @param name The name of the collection.
   * @returns An Observable array of documents.
   */
  getCollection<T>(name: string): Observable<T[]> {
    const collectionRef = collection(this.firestore, name);
    return collectionData(collectionRef, { idField: 'id' }) as Observable<T[]>;
  }

  /**
   * Retrieves a single document from Firestore.
   * @param collectionName The name of the collection.
   * @param id The ID of the document.
   * @returns An Observable of the document data.
   */
  getDocument<T>(collectionName: string, id: string): Observable<T> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<T>;
  }

  /**
   * Adds a new document to a collection.
   * @param collectionName The name of the collection.
   * @param data The data to add.
   * @returns A promise that resolves with the document reference.
   */
  addDocument<T>(collectionName: string, data: T) {
    const collectionRef = collection(this.firestore, collectionName);
    return addDoc(collectionRef, data);
  }

  /**
   * Updates an existing document in a collection.
   * @param collectionName The name of the collection.
   * @param id The ID of the document to update.
   * @param data The new data for the document.
   * @returns A promise that resolves when the update is complete.
   */
  updateDocument<T>(collectionName: string, id: string, data: T) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return setDoc(docRef, data, { merge: true });
  }

  /**
   * Deletes a document from a collection.
   * @param collectionName The name of the collection.
   * @param id The ID of the document to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  deleteDocument(collectionName: string, id: string) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return deleteDoc(docRef);
  }
}
