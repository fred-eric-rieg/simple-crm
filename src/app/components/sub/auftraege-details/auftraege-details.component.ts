import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { EditTaskComponent } from '../../dialogs/edit-task/edit-task.component';
import { jsPDF } from 'jspdf';


interface Customer {
  id: number;
  fid: string;
  vorname: string;
  nachname: string;
  unternehmen: string;
  email: string;
  telefon: string;
  strasse: string;
  plz: number;
  ort: string;
  anmerkungen: string;
  erstellt: Timestamp;
  geaendert: Timestamp;
}

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
}

interface Posten {
  anzahl: number;
  produkt: string;
}

interface Produkt {
  id: number;
  fid: string;
  name: string;
  beschreibung: string;
  preis: number;
  erstellt: Timestamp;
  geaendert: Timestamp;
}

@Component({
  selector: 'app-auftraege-details',
  templateUrl: './auftraege-details.component.html',
  styleUrls: ['./auftraege-details.component.scss']
})
export class AuftraegeDetailsComponent {
  taskId: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
    public fs: FirebaseService,) {
    this.route.params.subscribe(params => {
      this.taskId = params['id'];
    });
  }


  formatDate(date: Timestamp) {
    return date.toDate();
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

  formatProduct(product: string) {
    let name = "";
    this.fs.products.getValue()?.forEach(p => {
      if (p.fid === product) {
        name = p.name;
      }
    });
    return name;
  }


  makeNumber(status: string) {
    return Number(status);
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

  getSum(posten: Posten) {
    let preis = 0;
    this.fs.products.getValue()?.forEach(p => {
      if (p.fid === posten.produkt) {
        preis = p.preis;
      }
    });
    return (Math.round((preis * posten.anzahl) * 100) / 100).toFixed(2);
  }


  getTotal(posten: Posten[]) {
    let total = 0;
    posten.forEach(p => {
      this.fs.products.getValue()?.forEach(product => {
        if (product.fid === p.produkt) {
          total += product.preis * p.anzahl;
        }
      });
    });
    return (Math.round((total) * 100) / 100).toFixed(2);
  }


  openDialog(task: Task) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
      height: 'fit-content',
    });
    const sub = dialogRef.afterClosed().subscribe(result => {

    });
  }


  getAddress(task: Task) {
    let address: any = {};
    this.fs.customers.getValue()?.forEach(c => {
      if (c.fid === task.unternehmen) {
        address = {
          strasse: c.strasse,
          plz: c.plz,
          ort: c.ort
        }
      }
    });
    return address;
  }


  getCustomer(unternehmen: string) {
    let name = "";
    this.fs.customers.getValue()?.forEach(c => {
      if (c.fid === unternehmen) {
        name = c.vorname + " " + c.nachname;
      }
    });
    return name;
  }


  calculateProgress(status: string) {
    let num = Number(status);
    return (num / 9) * 100;
  }


  createPdf(task: Task) {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Rechnung", 10, 20);
    doc.setFontSize(10);
    doc.text("Leistungserbringer GmbH, Musterstraße 1, 01234 Musterstadt", 10, 35);
    doc.setFontSize(12);
    doc.text(this.formatCustomer(task.unternehmen), 10, 45);
    doc.text(this.getAddress(task).strasse, 10, 50);
    doc.text(this.getAddress(task).plz + ", " + this.getAddress(task).ort, 10, 55) ;

    doc.setFontSize(16);
    // place infos right
    doc.text("Rechnungsdatum: " + (new Date()).toLocaleString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'}), 120, 60);
    doc.text("Lieferdatum: " + (new Date()).toLocaleString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'}), 120, 70);
    doc.text("Ust.IdNr: 12123123123", 120, 80);

    doc.text("Rechnungsnummer: #2023-"+String(task.id), 10, 90);

    doc.setFontSize(12);
    doc.text("Sehr geehrter Herr " + this.getCustomer(task.unternehmen) + ",", 10, 110);
    doc.text("ich erlaube mir Ihnen die folgenden Posten in Rechnung zu stellen:", 10, 130);


    doc.setFontSize(16);
    doc.text("Posten", 10, 150);
    doc.text("Menge", 80, 150);
    doc.text("Preis Netto", 120, 150);
    doc.text("Summe", 160, 150);
    doc.setFontSize(12);
    let y = 160;
    task.posten.forEach(p => {
      doc.text(this.formatProduct(p.produkt), 10, y);
      doc.text(String(p.anzahl), 80, y);
      doc.text(String(this.getSum(p)) + " €", 120, y);
      y += 10;
    });
    doc.setFontSize(16);
    doc.text("Gesamt Netto", 80, y);
    doc.text(String(this.getTotal(task.posten)) + " €", 120, y);
    doc.setFontSize(12);
    doc.text(this.getTotal(task.posten) + " €", 160, 160);
    y += 10;
    doc.text("zzgl. 19% USt.", 80, y);
    doc.text((Math.round((Number(this.getTotal(task.posten)) * 0.19) * 100) / 100).toFixed(2) + " €" , 120, y);
    y += 10;
    doc.setFontSize(16);
    doc.text("Gesamt Brutto", 80, y);
    doc.text((Math.round((Number(this.getTotal(task.posten)) * 1.19) * 100) / 100).toFixed(2) + " €", 120, y);
    y += 20;
    doc.text("Bitte zahlen Sie innerhalb der nächsten 14 Werkstage", 10, y);

    doc.save("#"+String(task.id) + ".pdf");
  }
}
