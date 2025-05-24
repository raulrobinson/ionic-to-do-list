import {inject, Injectable} from "@angular/core";
import { CategoryPort } from "../../core/ports/category.port";
import { Category } from "src/app/core/models/category.model";
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
import { Observable } from "rxjs";
import {Auth} from "@angular/fire/auth";

@Injectable({providedIn: 'root'})
export class FirebaseCategoryAdapter implements CategoryPort {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  getUserCategories(): Observable<Category[]> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');
    const q = query(
      collection(this.firestore, 'categories'),
      where('userId', '==', user.uid)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Category[]>;
  }

  async addCategory(category: Category) : Promise<any> {
    if (!category.userId) throw new Error('Usuario no autenticado');
    const categoriesRef = collection(this.firestore, 'categories');
    return addDoc(categoriesRef, { category })
  }

  async updateCategory(id: string, name: string): Promise<any> {
    const docRef = doc(this.firestore, 'categories', id);
    return updateDoc(docRef, { name });
  }

  async deleteCategory(id: string): Promise<any> {
    const docRef = doc(this.firestore, 'categories', id);
    return deleteDoc(docRef);
  }

}
