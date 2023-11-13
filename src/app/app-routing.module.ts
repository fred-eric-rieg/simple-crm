import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainpageComponent } from './components/mainpage/mainpage.component';
import { DashboardComponent } from './components/sub/dashboard/dashboard.component';
import { KundenComponent } from './components/sub/kunden/kunden.component';
import { AuftraegeComponent } from './components/sub/auftraege/auftraege.component';

const routes: Routes = [
  { path: '', component: MainpageComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'kunden', component: KundenComponent },
      { path: 'auftraege', component: AuftraegeComponent }
    ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
