import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainpageComponent } from './components/mainpage/mainpage.component';
import { DashboardComponent } from './components/sub/dashboard/dashboard.component';
import { KundenComponent } from './components/sub/kunden/kunden.component';
import { AuftraegeComponent } from './components/sub/auftraege/auftraege.component';
import { KundenDetailsComponent } from './components/sub/kunden-details/kunden-details.component';
import { AuftraegeDetailsComponent } from './components/sub/auftraege-details/auftraege-details.component';
import { ProdukteComponent } from './components/sub/produkte/produkte.component';
import { ProdukteDetailsComponent } from './components/sub/produkte-details/produkte-details.component';

const routes: Routes = [
  {
    path: '', component: MainpageComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'kunden', component: KundenComponent },
      { path: 'kunden/:id', component: KundenDetailsComponent },
      { path: 'auftraege', component: AuftraegeComponent },
      { path: 'auftraege/:id', component: AuftraegeDetailsComponent },
      { path: 'produkte', component: ProdukteComponent },
      { path: 'produkte/:id', component: ProdukteDetailsComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
