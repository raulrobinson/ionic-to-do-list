import { inject, Injectable } from '@angular/core';
import { CATEGORY_PORT } from "../../core/ports/category.port";
import {Category} from "../../core/models/category.model";

@Injectable({providedIn: 'root'})
export class CategoryUseCase {
  private categoryPort = inject(CATEGORY_PORT);

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
}
