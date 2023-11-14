import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainpageComponent } from './components/mainpage/mainpage.component';
import { DashboardComponent } from './components/sub/dashboard/dashboard.component';
import { KundenComponent } from './components/sub/kunden/kunden.component';
import { AuftraegeComponent } from './components/sub/auftraege/auftraege.component';
import { KundenDetailsComponent } from './components/sub/kunden-details/kunden-details.component';

const routes: Routes = [
  {
    path: '', component: MainpageComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'kunden', component: KundenComponent },
      { path: 'kunden/:id', component: KundenDetailsComponent },
      { path: 'auftraege', component: AuftraegeComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
