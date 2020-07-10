import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  // Inputban megkapja a todo-kat tartalmazó tömböket
  @Input() expiredTodos: Todo[] = new Array();
  @Input() doneTodos: Todo[] = new Array();
  @Input() todos: Todo[] = new Array();

  // Outputban átadja az adott todo-t, ha valamilyen változás éri
  @Output() changedDone = new EventEmitter<Todo>();
  @Output() deletedTodo = new EventEmitter<Todo>();
  @Output() editedTodo = new EventEmitter<Todo>();

  constructor() {}

  ngOnInit(): void {
  }

  // Todo státusz változásakor emittálja a todo-t
  changeDone(todo: Todo) {
    this.changedDone.emit(todo);
  }

  // Todo törléskor emittálja a todo-t
  deleteTodo(todo: Todo) {
    this.deletedTodo.emit(todo);
  }

  // Todo módosításkor emittálja a todo-t
  editTodo(todo: Todo) {
    this.editedTodo.emit(todo);
  }

}
