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
import { LoginComponent } from './components/login/login.component';
import { authguardGuard } from './shared/authguard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainpageComponent, canActivate: [authguardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [authguardGuard] },
      { path: 'kunden', component: KundenComponent, canActivate: [authguardGuard] },
      { path: 'kunden/:id', component: KundenDetailsComponent, canActivate: [authguardGuard] },
      { path: 'auftraege', component: AuftraegeComponent, canActivate: [authguardGuard] },
      { path: 'auftraege/:id', component: AuftraegeDetailsComponent, canActivate: [authguardGuard] },
      { path: 'produkte', component: ProdukteComponent, canActivate: [authguardGuard] },
      { path: 'produkte/:id', component: ProdukteDetailsComponent, canActivate: [authguardGuard] },
    ]
  },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
