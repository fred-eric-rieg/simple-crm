import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MainpageComponent } from './components/mainpage/mainpage.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardComponent } from './components/sub/dashboard/dashboard.component';
import { KundenComponent } from './components/sub/kunden/kunden.component';
import { AuftraegeComponent } from './components/sub/auftraege/auftraege.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    SidenavComponent,
    ToolbarComponent,
    DashboardComponent,
    KundenComponent,
    AuftraegeComponent
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
    provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-a3a5e","appId":"1:820482635186:web:d7baa23e92801e306fe0ab","storageBucket":"simple-crm-a3a5e.appspot.com","apiKey":"AIzaSyBMvuavzV8ozTEL7o47yVTNApadK6ZzIaE","authDomain":"simple-crm-a3a5e.firebaseapp.com","messagingSenderId":"820482635186"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
