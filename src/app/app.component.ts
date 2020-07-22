import { Component } from '@angular/core';

import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';

  todoList: Todo[] = new Array();

  expiredTodos: Todo[] = new Array();
  doneTodos: Todo[] = new Array();
  todos: Todo[] = new Array();

  // A lejárt todo-k teszteléséhez létrehozott 'tegnap' és 'holnap'
  yesterday: Date;
  tomorrow: Date;

  constructor() {
    this.yesterday = new Date();
    this.tomorrow = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    // Néhány alapértelmezett todo készítése
    this.todoList = [
      {
        id: this.generateId(),
        title: 'Bevásárlás',
        description: 'Hétvégi nagy bevásárlás.',
        deadlineDate: this.tomorrow,
        isDone: false
      },
      {
        id: this.generateId(),
        title: 'Mosás',
        description: 'Mindenféle szennyes kimosása.',
        deadlineDate: this.tomorrow,
        isDone: true
      },
      {
        id: this.generateId(),
        title: 'Edzés',
        isDone: true
      },
      {
        id: this.generateId(),
        title: 'Emailek',
        description: 'Felgyülemlett emailek megválaszolása.',
        deadlineDate: this.yesterday,
        isDone: false
      },
      {
        id: this.generateId(),
        title: 'Valami feladat',
        description: 'Sokadik feladat leírása...',
        deadlineDate: this.tomorrow,
        isDone: false
      }
    ];

    this.distribution();

  }

  // Id generálás a todo-knak
  generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // Todo-k szétválasztása a lejárt, befejezett és todo tömbökbe
  distribution() {
    this.expiredTodos = new Array();
    this.doneTodos = new Array();
    this.todos = new Array();

    this.todoList.forEach(todo => {
      if (todo.isDone) {
        this.doneTodos.push(todo);
      } else if (todo.deadlineDate < new Date() && todo.deadlineDate !== null) {
        this.expiredTodos.push(todo);
      } else {
        this.todos.push(todo);
      }
    });
  }

  // Új todo felvétele
  creatingTodo(todo: Todo) {
    this.todoList.push(todo);
    this.distribution();
  }

  // Todo státuszának változtatása
  changeDone(changedTodo: Todo) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].id === changedTodo.id) {
        this.todoList[i].isDone = changedTodo.isDone;
        this.distribution();
        break;
      }
    }
  }

  // Todo törlése
  deleteTodo(todo: Todo) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].id === todo.id) {
        this.todoList.splice(i, 1);
        break;
      }
    }
    this.distribution();
  }

  // Todo szerkesztése
  editTodo(todo: Todo) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].id === todo.id) {
        this.todoList[i] = todo;
        break;
      }
    }
    this.distribution();
  }

}
