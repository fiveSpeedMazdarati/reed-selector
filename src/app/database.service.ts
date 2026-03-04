import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  Firestore,
  WithFieldValue,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private firestore: Firestore = inject(Firestore);

  getCollection<T>(name: string): Observable<T[]> {
    const collectionRef = collection(this.firestore, name);
    return collectionData(collectionRef, { idField: 'id' }) as Observable<T[]>;
  }

  getDocument<T>(collectionName: string, id: string): Observable<T> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<T>;
  }

  addDocument<T extends WithFieldValue<DocumentData>>(collectionName: string, data: T) {
    const collectionRef = collection(this.firestore, collectionName);
    return addDoc(collectionRef, data);
  }

  updateDocument<T extends Partial<WithFieldValue<DocumentData>>>(collectionName: string, id: string, data: T) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return setDoc(docRef, data, { merge: true });
  }

  deleteDocument(collectionName: string, id: string) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return deleteDoc(docRef);
  }
}
