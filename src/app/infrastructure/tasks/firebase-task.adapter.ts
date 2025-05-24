import {inject, Injectable} from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TaskPort } from "../../core/ports/task.port";
import { Task } from '../../core/models/task.model';
import {Auth} from "@angular/fire/auth";

@Injectable({ providedIn: 'root' })
export class FirebaseTaskAdapter implements TaskPort {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  getUserTasks(): Observable<Task[]> {
    //const user = JSON.parse(localStorage.getItem('user') || '{}');
    const user = this.auth.currentUser;
    const taskRef = collection(this.firestore, 'tasks');
    const q = query(taskRef, where('userId', '==', user?.uid));
    return collectionData(q, { idField: 'id' }) as Observable<Task[]>;

    //const ref = collection(this.taskSvc, 'tasks');
    //return collectionData(ref, { idField: 'id' }) as Observable<Task[]>;
  }

  addTask(task: Task) {
      const tasksRef = collection(this.firestore, 'tasks');
      return addDoc(tasksRef, task);
  }

  deleteTask(id: string): Promise<void> {
      const docRef = doc(this.firestore, 'tasks', id);
      return deleteDoc(docRef);
  }

  updateTask(id: string, data: Partial<Task>) {
      const docRef = doc(this.firestore, 'tasks', id);
      return updateDoc(docRef, data);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

}
