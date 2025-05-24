import { inject, Injectable } from "@angular/core";
import { CategoryPort } from "../../core/ports/category.port";
import { Category } from "src/core/models/category.model";
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class FirebaseCategoryAdapter implements CategoryPort {
  private firestore = inject(Firestore);
  private categoryCollection = collection(this.firestore, 'categories');

    getCategories(): Observable<Category[]> {
      const ref = collection(this.firestore, 'categories');
      return collectionData(ref, { idField: 'id' }) as Observable<Category[]>;
    }

    async addCategory(category: Category): Promise<void> {
      await addDoc(this.categoryCollection, category).then(() => {
        console.log('Categoria agregada a Firestore');
      })
        .catch((error) => {
          console.error('Error al agregar categoria a Firestore:', error);
        });
    }

    async deleteCategory(id: string): Promise<void> {
      const categoryRef = doc(this.firestore, `categories/${id}`);
      await deleteDoc(categoryRef);
    }

    async updateCategory(category: Category): Promise<void> {
      const categoryRef = doc(this.firestore, `categories/${category.id}`);
      await updateDoc(categoryRef, { name: category.name, color: category.color });
    }

}
