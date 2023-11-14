import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { AddCustomerComponent } from '../../dialogs/add-customer/add-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Customer {
  id: number;
  vorname: string;
  nachname: string;
  unternehmen: string;
  email: string;
  telefon: string;
  strasse: string;
  plz: number;
  ort: string;
  anmerkungen: string;
  erstellt: Date;
  geaendert: Date;
}

@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrls: ['./kunden.component.scss']
})
export class KundenComponent implements AfterViewInit {

  searchTerm: string = '';

  displayedColumns: string[] = ['id', 'vorname', 'nachname', 'unternehmen', 'email', 'telefon', 'strasse', 'plz', 'ort'];

  dataSource = new MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public fs: FirebaseService,
    private dialog: MatDialog,
    private renderer: Renderer2,
    private ef: ElementRef) {
    this.fs.customers.subscribe(data => {
      if (data) {
        this.dataSource.data = data;
        setTimeout(() => {
          this.pressEnter();
        }, 1000);
      } else {
        let customer: Customer = { id: 1, vorname: 'No customer found', nachname: '', unternehmen: '', email: '', telefon: '', strasse: '', plz: 0, ort: '', anmerkungen: '', erstellt: new Date(), geaendert: new Date() }
        this.dataSource.data = [customer];
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
    });
    const sub = dialogRef.afterClosed().subscribe(result => { });
    sub.unsubscribe();
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
}
