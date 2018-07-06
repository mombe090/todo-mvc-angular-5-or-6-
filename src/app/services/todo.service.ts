import { Injectable } from '@angular/core';
import {TodoModel} from '../model/todo.model';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: BehaviorSubject<TodoModel[]> = new BehaviorSubject<TodoModel[]>(null);
  $todos = this.todos.asObservable();

  constructor(private http: HttpClient) {}

  getAllTodos() {
    this.http.get('http://localhost:3000/todos').subscribe(
      (response: TodoModel[]) => {
        this.todos.next(response);
      }
    );
    return this.$todos;
  }

  getTodo(id: number) {
    this.http.get('http://localhost:3000/todos/' + id).subscribe(
      (response: TodoModel) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveTodo(todo: TodoModel) {
    this.http.post('http://localhost:3000/todos', todo).subscribe(
      (response: TodoModel) => {
        this.getAllTodos();
        return response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTodo(todo: TodoModel) {
    this.http.put('http://localhost:3000/todos/' + todo.id, todo).subscribe(
      (response: TodoModel) => {
        this.getAllTodos();
        return response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeTodo(todo: TodoModel) {
    this.http.delete('http://localhost:3000/todos/' + todo.id).subscribe(
      (response: any) => {
        this.getAllTodos();
        return response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeAllTodo() {
    this.http.delete('http://localhost:3000/todos/all').subscribe(
      (response: string) => {
        this.getAllTodos();
        return response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
