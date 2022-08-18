import sqlite3 from 'sqlite3';
import { Todo } from "../../@types/common";


export default class TodoList {
  private _todos: Todo[];
  private _db: sqlite3.Database;

  private constructor() {
    this._todos = [];
    // an empty string for an anonymous disk-based database
    this._db = new sqlite3.Database('');
  }
  
  // set up new instance and return it
  // asynchronous for database initialization
  public static build(): Promise<TodoList> {
    return new Promise((resolve, reject) => {
      const tl = new TodoList();

      // at most one statement object can execute a query at a time.
      tl._db.serialize(() => {
        tl._db.run('CREATE TABLE todo(id INTEGER PRIMARY KEY, name TEXT);', (err) => {
          if (err) throw err;
        });
        tl._db.each('SELECT * FROM todo;', (err, row) => {
          if (err) throw err;
          tl._todos.push({
            id: row.id,
            name: row.name
          });
        }, () => {
          // resolve on complete
          resolve(tl);
        })
      })
    })
  }

  public getTodos(): Todo[] {
    return this._todos;
  }

  public add(name: string): Promise<Todo> {
    return new Promise((resolve, reject) => {
      this._db.get('INSERT INTO todo(name) VALUES(?) RETURNING id;', [name], (err, row) => {
        if (err) reject(err);
        if (!row || row.id == null) reject('Could not add todo.');

        const id = row.id;
        const newTodo = { id, name };
        this._todos.push(newTodo);
        resolve(newTodo);
      })
    })
  }

  public delete(todoId: Todo["id"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this._db.get(`DELETE FROM todo WHERE id=? RETURNING id;`, [todoId], (err, row) => {
        if (err) reject(err);
        if (!row || row.id == null) reject('Could not delete todo.');

        const idx = this._todos.findIndex((v) => v.id === todoId);
        if (idx === -1) {
          reject('Specified todo does not found.');
        } else {
          this._todos.splice(idx, 1);
          resolve();
        }
      });
    });
  }
}