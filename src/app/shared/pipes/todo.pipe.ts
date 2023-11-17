import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

interface Task {
  title: string;
  id: number;
  fid: string;
  unternehmen: string;
  anmerkungen: string;
  erstellt: Timestamp;
  geaendert: Timestamp;
  deadline: Timestamp;
  wert: number;
  posten: Posten[];
  status: string;
}

interface Posten {
  anzahl: number;
  produkt: string;
}

@Pipe({
  name: 'todo',
  pure: false
})
export class TodoPipe implements PipeTransform {

  transform(value: Task[] | null, ...args: number[]): Task[] | null {
    if (value) {

      let result: Task[] = [];

      value.forEach((task: Task) => {
        if (task.status == args[0].toString()) {
          result.push(task);
        }
      });
      result.sort((a: Task, b: Task) => {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
      return result;
    }
    return value;
  }

}
