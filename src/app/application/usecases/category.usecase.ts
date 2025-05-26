import { inject, Injectable } from '@angular/core';
import { CATEGORY_PORT } from "../../core/ports/category.port";
import {Category} from "../../core/models/category.model";
import {from, Observable} from "rxjs";
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";

@Injectable({providedIn: 'root'})
export class CategoryUseCase {
  private categoryPort = inject(CATEGORY_PORT);

  private afs = inject(Firestore);
  private auth = inject(Auth);

  getUserCategories() {
    return this.categoryPort.getUserCategories();
  }

  addCategory(category: Category) : Promise<any> {
    return this.categoryPort.addCategory(category);
  }

  updateCategory(categoryId: string, name: string): Promise<any> {
    return this.categoryPort.updateCategory(categoryId, name);
  }

  deleteCategory(id: string): Promise<any> {
    return this.categoryPort.deleteCategory(id);
  }

  createCategory(name: string): Observable<any> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const categoriesRef = collection(this.afs, 'categories');
    const promise = addDoc(categoriesRef, { name, userId: user.uid });

    return from(promise);
  }
}
