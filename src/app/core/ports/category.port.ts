import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";

export abstract class CategoryPort {
  abstract addCategory(category: Category) : Promise<any>;
  abstract updateCategory(categoryId: string, name: string) : Promise<void>;
  abstract deleteCategory(categoryId: string) : Promise<void>;
  abstract getUserCategories() : Observable<Category[]>;
}

export const CATEGORY_PORT = new InjectionToken<CategoryPort>('CategoryPort');
