import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Timestamp, Unsubscribe } from '@angular/fire/firestore';
import jsPDF from 'jspdf';
import { FirebaseService } from 'src/app/shared/services/firebase.service';


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
  erstellt: any;
  geaendert: any;
}

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

interface Address {
  fid: string;
  kunde: string;
  vorname: string;
  nachname: string;
  unternehmen: string;
  strasse: string;
  plz: number;
  ort: string;
  anmerkungen: string;
  erstellt: Timestamp;
  geaendert: Timestamp;
}

@Component({
  selector: 'app-rechnung-erstellen',
  templateUrl: './rechnung-erstellen.component.html',
  styleUrls: ['./rechnung-erstellen.component.scss']
})
export class RechnungErstellenComponent implements OnInit, OnDestroy {

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

  address: Address = {
    fid: '',
    kunde: '',
    vorname: '',
    nachname: '',
    unternehmen: '',
    strasse: '',
    plz: 0,
    ort: '',
    anmerkungen: '',
    erstellt: Timestamp.now(),
    geaendert: Timestamp.now()
  }

  target: string = 'Rechnungsadresse';

  unsub!: Promise<Unsubscribe>;

  constructor(private fs: FirebaseService) {
  }


  ngOnInit(): void {
    this.unsub = this.fs.getInvoiceAddress(this.task.unternehmen);
    this.fs.invoiceAddress.value?.forEach(a => {
      if (a.kunde === this.task.unternehmen) {
        this.address = a;
      }
    });
  }


  ngOnDestroy(): void {
    this.unsub.then(unsub => unsub());
  }


  requestAddress() {
    if (this.target == 'Rechnungsadresse') {
      this.unsub = this.fs.getInvoiceAddress(this.task.unternehmen);
      this.fs.invoiceAddress.value?.forEach(a => {
        if (a.kunde === this.task.unternehmen) {
          this.address = a;
        }
      });
    } else if (this.target == 'Lieferadresse') {
      this.unsub = this.fs.getDeliveryAddress(this.task.unternehmen);
      this.fs.deliveryAddress.value?.forEach(a => {
        if (a.kunde === this.task.unternehmen) {
          this.address = a;
        }
      });
    }
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


  getPiecePrice(posten: Posten) {
    let preis = 0;
    this.fs.products.getValue()?.forEach(p => {
      if (p.fid === posten.produkt) {
        preis = p.preis;
      }
    });
    return (Math.round((preis) * 100) / 100).toFixed(2);
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


  formatProduct(product: string) {
    let name = "";
    this.fs.products.getValue()?.forEach(p => {
      if (p.fid === product) {
        name = p.name;
      }
    });
    return name;
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


  createPdf(task: Task) {
    const doc = new jsPDF();
    doc.setFont("Helvetica Neue", "normal");
    doc.setFontSize(20);
    doc.text("Rechnung", 10, 20);
    doc.setFontSize(10);
    doc.text("Leistungserbringer GmbH, Musterstraße 1, 01234 Musterstadt", 10, 35);
    doc.setFontSize(12);
    if (this.target == 'Standardadresse') {
      doc.text(this.formatCustomer(task.unternehmen), 10, 45);
      doc.text(this.getAddress(task).strasse, 10, 50);
      doc.text(this.getAddress(task).plz + ", " + this.getAddress(task).ort, 10, 55);
    } else {
      doc.text(this.address.unternehmen, 10, 45);
      doc.text(this.address.strasse, 10, 50);
      doc.text(this.address.plz + ", " + this.address.ort, 10, 55);
    }
   

    doc.setFontSize(16);
    // place infos right
    doc.text("Rechnungsdatum: " + (new Date()).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }), 120, 60);
    doc.text("Lieferdatum: " + (new Date()).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }), 120, 70);
    doc.text("Ust.IdNr: 12123123123", 120, 80);

    doc.text("Rechnungsnummer: #2023-" + String(task.id), 10, 90);

    doc.setFontSize(12);
    doc.text("Sehr geehrter Herr " + this.getCustomer(task.unternehmen) + ",", 10, 110);
    doc.text("ich erlaube mir Ihnen die folgenden Posten in Rechnung zu stellen:", 10, 130);


    doc.setFontSize(16);
    doc.text("Posten", 10, 150);
    doc.text("Menge", 80, 150);
    doc.text("Stück Netto", 120, 150);
    doc.text("Summe Netto", 160, 150);
    doc.setFontSize(12);
    let y = 160;
    task.posten.forEach(p => {
      doc.text(this.formatProduct(p.produkt), 10, y);
      doc.text(String(p.anzahl), 80, y);
      doc.text(String(this.getPiecePrice(p)) + " €", 120, y);
      doc.text(String(this.getSum(p)) + " €", 160, y);
      y += 5;
    });
    y += 5;
    doc.setFont("Helvetica Neue", "bold");
    doc.text("Gesamt Netto", 120, y);
    doc.text(String(this.getTotal(task.posten)) + " €", 160, y);
    doc.setFont("Helvetica Neue", "normal");
    y += 10;
    doc.text("zzgl. 19% USt.", 120, y);
    doc.text((Math.round((Number(this.getTotal(task.posten)) * 0.19) * 100) / 100).toFixed(2) + " €", 160, y);
    y += 10;
    doc.setFont("Helvetica Neue", "bold");
    doc.text("Gesamt Brutto", 120, y);
    doc.text((Math.round((Number(this.getTotal(task.posten)) * 1.19) * 100) / 100).toFixed(2) + " €", 160, y);
    y += 20;
    doc.text("Bitte zahlen Sie innerhalb der nächsten 14 Werkstage auf das folgende Konto:", 10, y);
    y += 10;
    doc.setFont("Helvetica Neue", "normal");
    doc.text("IBAN: DE123123123123123, BLZ: 11122233, Verwendungszweck: #2023-" + String(task.id), 10, y);
    y += 10;
    doc.text("Vielen Dank und beste Grüße, Ihre Leistungserbringer GmbH.", 10, y);

    doc.save("#" + String(task.id) + ".pdf");
  }

}
