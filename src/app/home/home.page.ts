import { Component } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { Todo } from "../model/todo.model";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgForOf,
    NgIf
  ]
})
export class HomePage {
  todos: Array<Todo> = []
  todoEntry: string = ''

  constructor() {}

  addTodo(){
    let currentId = this.todos.length ? Math.max(...this.todos.map((t) => t.id)) : 0;
    if(this.todoEntry.length != 0){
      this.todos.push({
        id: currentId+1,
        title: this.todoEntry,
        isComplete: false
      })
    }
    this.todoEntry = ''
  }

  setCompleted(id: number){
    let todoToUpdate = this.todos.find(todo => todo.id === id);

    if (todoToUpdate) {
      todoToUpdate.isComplete = true;
    }
  }

  deleteTodo(id: number){
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
