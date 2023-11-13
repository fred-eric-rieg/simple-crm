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

import { environment } from 'src/environments/environment.development'; // Currently using development environment
console.log('%cThis is the development environment.', 'color: orange; font-size: 18px; font-weight: bold;');


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

    provideFirebaseApp(() => initializeApp( environment.firebase )),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
