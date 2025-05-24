import { inject, Injectable } from "@angular/core";
import { CATEGORY_PORT } from "../../core/ports/category.port";

@Injectable({ providedIn: 'root' })
export class CategoryUseCase {
  private categoryAdapter = inject(CATEGORY_PORT);

  getCategories() {
    return this.categoryAdapter.getCategories();
  }

  addCategory(category: any) {
    return this.categoryAdapter.addCategory(category);
  }

  deleteCategory(id: string) {
    return this.categoryAdapter.deleteCategory(id);
  }

  updateCategory(category: any) {
    return this.categoryAdapter.updateCategory(category);
  }
}
