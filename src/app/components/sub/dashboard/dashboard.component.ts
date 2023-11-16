import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

interface Task {
  title: string;
  id: number;
  fid: string;
  unternehmen: string;
  anmerkungen: string;
  erstellt: number;
  geaendert: number;
  deadline: number;
  wert: number;
  posten: Posten[];
  status: string;
}

interface Posten {
  anzahl: number;
  produkt: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  today: Date = new Date();

  constructor(
    public fs: FirebaseService,
    private router: Router) {
    setInterval(() => {
      this.today = new Date();
    }, 60000);
  }


  formatTime(time: string | null) {
    if (time) {
      return Number(time);
    }
    return 0;
  }


  formatCustomer(customer: string) {
    let name = "";
    this.fs.customers.getValue()?.forEach(c => {
      if (c.fid === customer) {
        name = c.unternehmen;
      }
    });
    return name;
  }


  formatDate(date: Timestamp) {
    return date.toDate();
  }


  writeStatus(status: string) {
    if (status === '1') return 'Anfrage';
    if (status === '2') return 'Angebot verschickt';
    if (status === '3') return 'Angebot angenommen';
    if (status === '4') return 'Lieferung abgeschickt';
    if (status === '5') return 'Rechung verschickt';
    if (status === '6') return 'Zahlungserinnerung';
    if (status === '7') return '1. Mahnung';
    if (status === '8') return '2. Mahnung';
    if (status === '9') return 'Bezahlung erhalten';
    return 'Unbekannt';
  }


  navigateToTask(fid: string) {
    this.router.navigate(['auftraege', fid]);
  }


  formatStatus(status: string) {
    if (status === '1') return 'Anfrage';
    if (status === '2') return 'Angebot verschickt';
    if (status === '3') return 'Angebot angenommen';
    if (status === '4') return 'Lieferung abgeschickt';
    if (status === '5') return 'Rechung verschickt';
    if (status === '6') return 'Zahlungserinnerung';
    if (status === '7') return '1. Mahnung';
    if (status === '8') return '2. Mahnung';
    if (status === '9') return 'Bezahlung erhalten';
    return 'Unbekannt';
  }


}
