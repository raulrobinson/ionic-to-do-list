import { Category } from "../models/category.model";
import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

export interface CategoryPort {
  getCategories(): Observable<Category[]>;
  addCategory(category: Category): Promise<void>;
  deleteCategory(id: string): Promise<void>;
  updateCategory(category: Category): Promise<void>;
}

export const CATEGORY_PORT = new InjectionToken<CategoryPort>('CategoryPort');
