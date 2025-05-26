import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  query,
  updateDoc,
  where
} from "@angular/fire/firestore";
import {Auth, onAuthStateChanged} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {Category} from "../core/models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private afs = inject(Firestore);
  private auth = inject(Auth);

  getCategories() {
    return new Observable<Category[]>(subscriber => {
      onAuthStateChanged(this.auth, user => {
        if (user) {
          const ref = collection(this.afs, 'categories');
          const q = query(ref, where('userId', '==', user.uid));
          collectionData(q, { idField: 'id' }).subscribe({
            next: data => subscriber.next(data as Category[]),
            error: err => subscriber.error(err)
          });
        } else {
          subscriber.error('Usuario no autenticado');
        }
      });
    });
  }

  createCategory(name: string): Observable<any> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const categoriesRef = collection(this.afs, 'categories');
    const promise = addDoc(categoriesRef, { name, userId: user.uid });

    return from(promise);
  }

  updateCategory(categoryId: string, name: string) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');
    const categoriesRef = collection(this.afs, 'categories');
    const categoryRef = doc(categoriesRef, categoryId);
    return updateDoc(categoryRef, { name });
  }

  deleteCategory(categoryId: string) {
    const docRef = doc(this.afs, 'categories', categoryId);
    return deleteDoc(docRef);
  }
}
