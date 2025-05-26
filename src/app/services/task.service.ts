import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore, getDoc,
  query,
  updateDoc,
  where
} from "@angular/fire/firestore";
import {Auth, authState } from "@angular/fire/auth";
import {catchError, from, map, Observable, switchMap, take, throwError} from "rxjs";
import {Category} from "../core/models/category.model";
import {Task} from "../core/models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private afs = inject(Firestore);
  private auth = inject(Auth);

  getTasks(categoryId?: string): Observable<Task[]> {
    return authState(this.auth).pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error('Usuario no autenticado'));
        }

        const ref = collection(this.afs, 'tasks');
        const conditions = [where('userId', '==', user.uid)];

        if (categoryId) {
          conditions.push(where('categoryId', '==', categoryId));
        }

        const q = query(ref, ...conditions);
        return collectionData(q, { idField: 'id' }) as Observable<Task[]>;
      }),
      catchError(err => throwError(() => err))
    );
  }

  createTask(taskTitle: string, selectedCategoryId: string) {
    return authState(this.auth).pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          throw new Error('Usuario no autenticado');
        }
        const tasksRef = collection(this.afs, 'tasks');
        const newTask = {
          title: taskTitle,
          completed: false,
          userId: user.uid,
          categoryId: selectedCategoryId
        };
        return from(addDoc(tasksRef, newTask)).pipe(
          map(() => {})
        );
      })
    );
  }

  updateTask(id: string, data: Partial<Task>) {
    return authState(this.auth).pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          throw new Error('Usuario no autenticado');
        }
        if (!data.id) {
          throw new Error('ID de tarea no definido');
        }
        const taskRef = doc(this.afs, 'tasks', id);
        const updateTaskData = {
          title: data.title,
          completed: data.completed,
          userId: data.userId,
          categoryId: data.categoryId
        };
        return from(updateDoc(taskRef, updateTaskData)).pipe(
          // emitimos el task actualizado tras la operación
          map(() => data)
        );
      })
    );
  }

  deleteTask(id: string) {
    return authState(this.auth).pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          throw new Error('Usuario no autenticado');
        }
        const taskRef = doc(this.afs, 'tasks', id);
        return from(deleteDoc(taskRef)).pipe(
          map(() => id) // emitimos el id del task eliminado
        );
      })
    );
  }

  getCategoryName(categoryId: string): Observable<string | null> {
    return authState(this.auth).pipe(
      take(1),
      switchMap(user => {
        if (!user) throw new Error('Usuario no autenticado');

        const docRef = doc(this.afs, 'categories', categoryId);
        return from(getDoc(docRef)).pipe(
          map(docSnap => {
            if (docSnap.exists()) {
              const data = docSnap.data() as Category;
              return data.userId === user.uid ? data.name : null;
            }
            return null;
          })
        );
      })
    );
  }

}
