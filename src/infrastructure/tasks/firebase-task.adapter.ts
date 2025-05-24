import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { TaskPort } from '../../core/ports/task.port';

@Injectable({ providedIn: 'root' })
export class FirebaseTaskAdapter implements TaskPort {
  private firestore = inject(Firestore);
  private taskCollection = collection(this.firestore, 'tasks');

  getTasks(): Observable<Task[]> {
    const ref = collection(this.firestore, 'tasks');
    return collectionData(ref, { idField: 'id' }) as Observable<Task[]>;
  }

  async addTask(task: Task): Promise<void> {
    //console.log(`Tarea a agregar: ${task}`);
    await addDoc(this.taskCollection, task).then(() => {
      //console.log(`Tarea agregada a Firestore: ${task}`);
    })
    .catch((error) => {
      console.error('Error al agregar tarea a Firestore:', error);
    });
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
