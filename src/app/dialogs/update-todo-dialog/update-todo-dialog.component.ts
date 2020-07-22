import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-update-todo-dialog',
  templateUrl: './update-todo-dialog.component.html',
  styleUrls: ['./update-todo-dialog.component.scss']
})
export class UpdateTodoDialogComponent implements OnInit {

  editedTodo: Todo;
  @ViewChild('picker') picker: ElementRef;
  dateInFormat: string;

  // A dialog konstruktorban megkapja a szerkeszteni való todo-t
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.editedTodo = this.data;

    // Dátum formátum átalakítása az input['datetime-local'] miatt
    if (this.editedTodo.deadlineDate !== null && this.editedTodo.deadlineDate !== undefined) {
      this.dateInFormat = this.editedTodo.deadlineDate.toISOString().substr(0, 16);
    } else {
      this.dateInFormat = '';
    }
  }

  ngOnInit(): void {
  }

  // A mezők változásakor automatikusan frissül az editedTodo
  editTodo() {
    this.editedTodo = this.data;
    this.editedTodo.deadlineDate = new Date(this.picker.nativeElement.value);
  }

}
