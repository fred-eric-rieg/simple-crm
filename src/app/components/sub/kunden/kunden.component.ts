import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { AddCustomerComponent } from '../../dialogs/add-customer/add-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';

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
    private router: Router,
    private ef: ElementRef) {
    this.fs.customers.subscribe(data => {
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
    const dialogRef = this.dialog.open(AddCustomerComponent, {
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


  selectCustomer(fid: string) {
    this.router.navigate(['kunden/', fid]);
  }
}
