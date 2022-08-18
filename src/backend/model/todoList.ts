import { Todo } from "../../@types/common";

// TODO: Use db to generate unique id
let idCounter = 0;
const getId = () => {
  idCounter++;
  return idCounter;
};

export default class TodoList {
  private _todos: Todo[];

  constructor(todos?: Todo[]) {
    if (todos != null) {
      this._todos = todos;
    } else {
      this._todos = [];
    }
  }

  public getTodos(): Todo[] {
    return this._todos;
  }

  public add(name: string): Todo {
    const id = getId();
    const newTodo = { id, name };
    this._todos.push(newTodo);
    return newTodo;
  }

  public delete(todoId: Todo["id"]): void {
    const idx = this._todos.findIndex((v) => v.id === todoId);
    if (idx === -1) {
      throw Error('Specified todo does not found.');
    } else {
      this._todos.splice(idx, 1);
    }
  }
}