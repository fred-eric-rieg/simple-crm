import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';
import { AddProductComponent } from '../../dialogs/add-product/add-product.component';


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
  selector: 'app-produkte',
  templateUrl: './produkte.component.html',
  styleUrls: ['./produkte.component.scss']
})
export class ProdukteComponent implements AfterViewInit {

  searchTerm: string = '';

  displayedColumns: string[] = ['id', 'name', 'beschreibung', 'preis'];

  dataSource = new MatTableDataSource<Produkt>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public fs: FirebaseService,
    private dialog: MatDialog,
    private router: Router,
    private ef: ElementRef) {
    this.fs.products.subscribe(data => {
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
    const dialogRef = this.dialog.open(AddProductComponent, {
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


  formatCustomer(product: string) {
    let name = "";
    this.fs.products.getValue()?.forEach(p => {
      if (p.fid === product) {
        name = p.name;
      }
    });
    return name;
  }

  
  formatPrice(price: number) {
    return (Math.round((price) * 100) / 100).toFixed(2);
  }


  selectTask(fid: string) {
    this.router.navigate(['produkte/', fid]);
  }
}
