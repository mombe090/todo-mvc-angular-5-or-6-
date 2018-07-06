import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoService} from './services/todo.service';
import {TodoModel} from './model/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: TodoModel[] = [];
  filterTodos: TodoModel[] = [];
  editedTodo: TodoModel;
  newTodo = new TodoModel('', false, null, null);
  visibility = 'all';
  editingIndex;

  constructor(private http: HttpClient, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllTodos()
      .subscribe(
        (response: TodoModel[]) => {
          this.todos = response;
          this.filterTodos = this.todos;
        }
      );
  }

  addTodo(event) {
    if (event.key === 'Enter') {
      this.todoService.saveTodo(this.newTodo);
      this.newTodo = new TodoModel('', false);
    }
  }

  editTodo(id: number) {
      this.editingIndex = id;
  }

  removeTodo(todo: TodoModel) {
    this.todoService.removeTodo(todo);
  }

  doneEdit(todo: TodoModel, event) {
      if (event.key === 'Enter') {
        this.todoService.updateTodo(todo);
        this.editingIndex = -1;
      }
  }

  statusEdit(todo: TodoModel) {
    this.todoService.updateTodo(todo);
  }

  removeCompleted() {
    this.todoService.removeAllTodo();
  }

  changeVisibility(visibility: string) {
    this.visibility = visibility;
    if (this.visibility === 'all') {
      this.filterTodos = this.todos;
    } else if (this.visibility === 'active') {
      this.filterTodos = this.todos.filter(todo => !todo.status);
    } else if (this.visibility === 'complete') {
      this.filterTodos = this.todos.filter(todo => todo.status);
    }
  }
}
