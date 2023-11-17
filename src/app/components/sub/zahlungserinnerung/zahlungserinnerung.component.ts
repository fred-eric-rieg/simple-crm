import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import { FirebaseService } from 'src/app/shared/services/firebase.service';


interface Task {
  title: string;
  id: number;
  fid: string;
  unternehmen: string;
  anmerkungen: string;
  erstellt: any;
  geaendert: any;
  deadline: any;
  wert: number;
  posten: Posten[];
}

interface Posten {
  anzahl: number;
  produkt: string;
}

@Component({
  selector: 'app-zahlungserinnerung',
  templateUrl: './zahlungserinnerung.component.html',
  styleUrls: ['./zahlungserinnerung.component.scss']
})
export class ZahlungserinnerungComponent {

  @Input() task: Task = {
    title: '',
    id: 0,
    fid: '',
    unternehmen: '',
    anmerkungen: '',
    erstellt: '',
    geaendert: '',
    deadline: '',
    wert: 0,
    posten: []
  };

  constructor(private fs: FirebaseService) { }


  formatCustomer(customer: string) {
    let name = "";
    this.fs.customers.getValue()?.forEach(c => {
      if (c.fid === customer) {
        name = c.unternehmen;
      }
    });
    return name;
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


  createPdf(task: Task) {
    const doc = new jsPDF();
    doc.setFont("Helvetica Neue", "normal");
    doc.setFontSize(20);
    doc.text("Zahlungserinnerung", 10, 20);
    doc.setFontSize(10);
    doc.text("Leistungserbringer GmbH, Musterstraße 1, 01234 Musterstadt", 10, 35);
    doc.setFontSize(12);
    doc.text(this.formatCustomer(task.unternehmen), 10, 45);
    doc.text(this.getAddress(task).strasse, 10, 50);
    doc.text(this.getAddress(task).plz + ", " + this.getAddress(task).ort, 10, 55);


    doc.setFontSize(16);
    // place infos right
    doc.text("Datum: " + (new Date()).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }), 120, 60);
    doc.text("Rechnungsnummer: #2023-" + String(task.id), 120, 70);
    doc.text("Ust.IdNr: 12123123123", 120, 80);

    doc.text("Zahlungserinnungerung Nr.: #2023-" + String(task.id) + "-1", 10, 90);

    doc.setFontSize(12);
    doc.text("Sehr geehrter Herr " + this.getCustomer(task.unternehmen) + ",", 10, 110);
    doc.text("ich möchte Sie freundlich an die noch ausstehende Zahlung der oben genannten Rechnung erinnern.", 10, 130);
    doc.text("Bitte überweisen Sie den offenen Betrag i.H.v. "+ (Math.round((Number(this.getTotal(task.posten)) * 1.19) * 100) / 100).toFixed(2) + " € auf das unten angegebene Konto.", 10, 140);
    doc.text("Bei Fragen stehe ich Ihnen gerne zur Verfügung.", 10, 150);

    doc.setFont("Helvetica Neue", "bold");
    doc.text("Mit freundlichen Grüßen", 10, 170);
    doc.text("Leistungserbringer GmbH", 10, 180);

    doc.text("Kontoverbindung:", 10, 200);
    doc.setFont("Helvetica Neue", "normal");
    doc.text("IBAN: DE123123123123123, BLZ: 11122233, Verwendungszweck: #2023-" + String(task.id), 10, 210);

    doc.save('a4.pdf');
  }

}
