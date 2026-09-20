import { FormsModule } from '@angular/forms';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Task {
  id: number;
  text: string;
}

@Component({
  imports: [RouterOutlet, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('todolist');
  txt = '';
  todos = signal<Task[]>([]);
  nextId = 1;

  showUpdatePopup = false;
  updateId: number | null = null;
  updateText = '';

  addItem() {
    this.todos.update((todos) => [...todos, { id: this.nextId++, text: this.txt }]);
    this.txt = '';
  }
  // taskUpdate( id : number ) {
  //   this.todos.update((todos) => todos.map((todo) => todo.id === id ? { ...todo, text: this.txt } : todo));
  //   this.txt = '';
  // }

  // Open popup
  taskUpdate(id: number) {
    const todo = this.todos().find((todo) => todo.id === id);

    if (!todo) return;

    this.updateId = id;
    this.updateText = todo.text;
    this.showUpdatePopup = true;
  }

  // Save updated task
  saveUpdate() {
    if (this.updateId === null || !this.updateText.trim()) return;

    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === this.updateId ? { ...todo, text: this.updateText } : todo)),
    );

    this.closePopup();
  }

  // Close popup
  closePopup() {
    this.showUpdatePopup = false;
    this.updateText = '';
    this.updateId = null;
  }

  // Delete task
  taskDelete(id: number) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }
}
