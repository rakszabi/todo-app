import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Todo } from 'src/app/models/todo';
import { UpdateTodoDialogComponent } from 'src/app/dialogs/update-todo-dialog/update-todo-dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  // Inputban megkap egy todo-t
  @Input() todo: Todo;

  // Outputban átadja az adott todo-t, ha valamilyen változás éri
  @Output() changedDone = new EventEmitter<Todo>();
  @Output() deletedTodo = new EventEmitter<Todo>();
  @Output() editedTodo = new EventEmitter<Todo>();

  // Szerkesztéskor használt todo
  onEditTodo: Todo;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // SnackBar megnyitása az értesítések miatt
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  // Adott todo szerkesztés gombjára kattintva fut le a metódus
  editTodo() {
    // Todo szerkesztésekor a dialognak átadja az adott todo objektum tulajdonságait
    this.onEditTodo = {
      id: this.todo.id,
      title: this.todo.title,
      description: this.todo.description,
      deadlineDate: this.todo.deadlineDate,
      isDone: this.todo.isDone
    };

    const dialogRef = this.dialog.open(UpdateTodoDialogComponent, {data: this.onEditTodo});

    // Dialog bezárása után, ha a result-ban van undefined-tól eltérő adat, akkor emittálja a todo-t, majd értesít erről
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.editedTodo.emit(result);
        this.openSnackBar('Sikeres feladat módosítás!', 'Rendben');
      }
    });
  }

  changeDone(event) {
    // Todo státusz változáskor nem nyílik le az expansion panel
    event.stopPropagation();
    this.todo.isDone = !this.todo.isDone;

    // Emittálja a megváltoztatott státuszú todo-t
    this.changedDone.emit(this.todo);
  }

  // Todo törlésekor emittálja a megváltozott státuszú todo-t, majd erről értesít is
  deleteTodo() {
    this.deletedTodo.emit(this.todo);
    this.openSnackBar('Sikeres feladat törlés!', 'Rendben');
  }

}
