import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Todo } from './models/todo.models';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: string = 'Minhas tarefas';
  public form: FormGroup;
  public mode: String = 'list';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  changeMode(mode: String) {
    this.mode = mode;
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));

    this.save()
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1)
      this.todos.splice(index, 1);

    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('todos');
      try {
        this.todos = data ? JSON.parse(data) : [];
      } catch (error) {
        this.todos = [];
      }
    } else {
      this.todos = [];
    }
  }



}
