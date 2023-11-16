import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

interface Task {
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
  name: 'todo'
})
export class TodoPipe implements PipeTransform {

  transform(value: Task[] | null, ...args: string[]): Task[] | null {
    if (value) {

      let result: Task[] = [];

      value.forEach((task: Task) => {
        if (task.status != '9') {
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
