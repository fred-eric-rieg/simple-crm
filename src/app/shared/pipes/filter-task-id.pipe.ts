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
}

interface Posten {
  anzahl: number;
  produkt: string;
}

@Pipe({
  name: 'filterTaskId'
})
export class FilterTaskIdPipe implements PipeTransform {

  transform(value: Task[] | null, ...args: string[]): Task[] | null {
    if (value) {
      let filteredTasks: Task[] = [];
      value.forEach(task => {
        if (task.fid === args[0]) {
          filteredTasks.push(task);
        }
      });
      return filteredTasks;
    }
    return null;
  }

}
