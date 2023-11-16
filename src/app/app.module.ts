import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MainpageComponent } from './components/mainpage/mainpage.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardComponent } from './components/sub/dashboard/dashboard.component';
import { KundenComponent } from './components/sub/kunden/kunden.component';
import { AuftraegeComponent } from './components/sub/auftraege/auftraege.component';
import { AddCustomerComponent } from './components/dialogs/add-customer/add-customer.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

// Currently using development environment
import { environment } from 'src/environments/environment.development';
import { KundenDetailsComponent } from './components/sub/kunden-details/kunden-details.component';
import { EditCustomerComponent } from './components/dialogs/edit-customer/edit-customer.component';
import { AddTaskComponent } from './components/dialogs/add-task/add-task.component';
import { AuftraegeDetailsComponent } from './components/sub/auftraege-details/auftraege-details.component';
import { EditTaskComponent } from './components/dialogs/edit-task/edit-task.component';
import { ProdukteComponent } from './components/sub/produkte/produkte.component';
import { AddProductComponent } from './components/dialogs/add-product/add-product.component';
import { ProdukteDetailsComponent } from './components/sub/produkte-details/produkte-details.component';
import { EditProductComponent } from './components/dialogs/edit-product/edit-product.component';
import { DecimalPipe } from './shared/pipes/decimal.pipe';
import { StatusRedDirective } from './shared/directives/status-red.directive';
import { StatusOrangeDirective } from './shared/directives/status-orange.directive';
import { StatusGreenDirective } from './shared/directives/status-green.directive';
import { LieferAdresseComponent } from './components/sub/liefer-adresse/liefer-adresse.component';
import { RechnungsAdresseComponent } from './components/sub/rechnungs-adresse/rechnungs-adresse.component';
import { EditAddressComponent } from './components/dialogs/edit-address/edit-address.component';
import { TodoPipe } from './shared/pipes/todo.pipe';
console.log('%cThis is the development environment.', 'color: orange; font-size: 18px; font-weight: bold;');


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    SidenavComponent,
    ToolbarComponent,
    DashboardComponent,
    KundenComponent,
    AuftraegeComponent,
    AddCustomerComponent,
    KundenDetailsComponent,
    EditCustomerComponent,
    AddTaskComponent,
    AuftraegeDetailsComponent,
    EditTaskComponent,
    ProdukteComponent,
    AddProductComponent,
    ProdukteDetailsComponent,
    EditProductComponent,
    DecimalPipe,
    StatusRedDirective,
    StatusOrangeDirective,
    StatusGreenDirective,
    LieferAdresseComponent,
    RechnungsAdresseComponent,
    EditAddressComponent,
    TodoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
