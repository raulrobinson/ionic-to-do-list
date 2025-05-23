import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { TaskPort } from '../../core/ports/task.port';

@Injectable({ providedIn: 'root' })
export class FirebaseTaskAdapter implements TaskPort {
  constructor(private firestore: Firestore) {}

  getTasks(): Observable<Task[]> {
    const ref = collection(this.firestore, 'tasks');
    return collectionData(ref, { idField: 'id' }) as Observable<Task[]>;
  }

  async addTask(task: Task): Promise<void> {
    const ref = collection(this.firestore, 'tasks');
    await addDoc(ref, task);
  }

  async deleteTask(id: string): Promise<void> {
    const taskRef = doc(this.firestore, `tasks/${id}`);
    await deleteDoc(taskRef);
  }

  async updateTask(task: Task): Promise<void> {
    const taskRef = doc(this.firestore, `tasks/${task.id}`);
    await updateDoc(taskRef, { title: task.title, completed: task.completed });
  }
}
