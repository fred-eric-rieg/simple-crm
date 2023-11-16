import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';
import { AddTaskComponent } from '../../dialogs/add-task/add-task.component';

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

@Component({
  selector: 'app-auftraege',
  templateUrl: './auftraege.component.html',
  styleUrls: ['./auftraege.component.scss']
})
export class AuftraegeComponent implements AfterViewInit {

  searchTerm: string = '';

  displayedColumns: string[] = ['id', 'erstellt', 'deadline', 'unternehmen', 'anmerkungen', 'wert', 'posten', 'status'];

  dataSource = new MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public fs: FirebaseService,
    private dialog: MatDialog,
    private router: Router,
    private ef: ElementRef) {
    this.fs.tasks.subscribe(data => {
      if (data) {
        this.dataSource.data = data;
        setTimeout(() => {
          this.pressEnter();
        }, 1000);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      height: 'fit-content',
    });
    const sub = dialogRef.afterClosed().subscribe(result => {
      this.pressEnter();
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  pressEnter() {
    let event = new KeyboardEvent("keyup", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      which: 13,
      bubbles: true,
    });

    const input = this.ef.nativeElement.querySelector('input');
    input.dispatchEvent(event);
  }


  formatDate(date: Timestamp) {
    return date.toDate().toLocaleDateString('de-DE');
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


  formatPrice(price: number) {
    return (Math.round((price) * 100) / 100).toFixed(2);
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

  calculateTotal(fid: string) {
    let total = 0;
    this.fs.tasks.getValue()?.forEach(task => {
      if (task.fid === fid) {
        task.posten.forEach(posten => {
          this.fs.products.getValue()?.forEach(product => {
            if (product.fid === posten.produkt) {
              total += posten.anzahl * product.preis;
            }
          });
        });
      }
    });
    return this.formatPrice(total);
  }


  selectTask(fid: string) {
    this.router.navigate(['auftraege/', fid]);
  }
}
