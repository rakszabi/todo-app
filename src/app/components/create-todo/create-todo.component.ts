import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  // Outputban átadja az új todo-t
  @Output() creatingTodo = new EventEmitter<Todo>();

  // A picker nevű dátumválasztó értékét lekérdező változó
  @ViewChild('picker') picker: ElementRef;

  newTodo: Todo;
  minDate = new Date();

  constructor(private snackBar: MatSnackBar) {
    // Új, üres todo létrehozása
    this.newTodo = {
      id: '',
      title: '',
      description: '',
      deadlineDate: null,
      isDone: false
    };
  }

  // Snack Bar megnyitása az értesítések miatt
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnInit(): void {
  }

  // Új todo felvétele
  createTodo() {

    // Cím kitöltés validációja
    if (this.newTodo.title !== '') {
      // Dátum hozzávétele, ha létezik
      if (this.picker.nativeElement.value !== '') {
        this.newTodo.deadlineDate = new Date(this.picker.nativeElement.value);
      }
      // Új todo emittálása
      this.creatingTodo.emit(this.newTodo);

      // Form kinullázása
      this.newTodo = {
        id: '',
        title: '',
        description: '',
        deadlineDate: null,
        isDone: false
      };
      this.picker.nativeElement.value = null;

      // Értesítés a sikeres felvételről
      this.openSnackBar('Sikeres feladat felvétel!', 'Rendben');
    } else {
      // Értesítés a cím kötelező megadásáról
      this.openSnackBar('Cím megadása kötelező!', 'Rendben');
    }
  }

}
